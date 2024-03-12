---
title: Databases as a Dev Tool
url: /databases-as-dev-tool
date: 2024-03-03T16:38:00+01:00
description: Some years ago I had the view that databases were a persistence tool, that they hadn’t evolved in any significant way in the last decades and that they were a somewhat necessary evil. Today I use databases as a tool among others in my developer’s toolbox. I think there are a number of reasons why my views have changed.
summary: Some years ago I had the view that databases were a persistence tool, that they hadn’t evolved in any significant way in the last decades and that they were a somewhat necessary evil. Today I use databases as a tool among others in my developer’s toolbox. I think there are a number of reasons why my views have changed.
tags: [postgres,docker,nodejs,typescript,testing]
categories: [Coding]
ogimage: elephant.jpg
draft: false
---

Some years ago I had the view that databases were a persistence tool, that they
hadn't evolved in any significant way in the last decades and that they were a
somewhat necessary evil. Today I use databases as a tool among others in
my developer's toolbox. I think there are a number of reasons why my views have
changed.

1. Knowledge
2. Ownership
3. Tooling
4. Database features

As a [.Net](https://dot.net) developer I seldom interacted directly with the
database. We used an
[ORM](https://en.wikipedia.org/wiki/Object%E2%80%93relational_mapping) and
migrations were scary. Running [SQL](https://en.wikipedia.org/wiki/SQL) queries
directly was done by selecting text in [SQL Server Management
Studio](https://en.wikipedia.org/wiki/SQL_Server_Management_Studio) and hitting
F5, preferably by a colleague, hoping we didn't forget a `where` statement.

As [a SharePoint
consultant](http://localhost:46433/getting-a-divorce-from-sharepoint/) I was
explicitly trained not to touch the database, as that would void the support
agreement and that the database should be considered a black box. 

So a large part of my unwillingness to do database work was definitely caused
by my lack of knowledge, paired with a culture promoting as many layers of
abstraction as possible, i.e [baklava
code](https://www.johndcook.com/blog/2009/07/27/baklav-code/)

The database was usually owned and operated by some other part of the
organisation than the dev team I was part of. Creating a new database, a new
user with appropriate permissions or getting access to a backup involved lead
time. 

For the rare occasion I would update a stored procedure, I would be handed a
high privileged account with a password set 8 years ago. I would do my update
and hopefully forget the account credentials. Version control was nowhere in
sight. 

The database server was always a somewhat aged version of Microsoft SQL Server.
Poor JSON support, no arrays, no ranges and not even a boolean. 

Having lived with the consequences of poor database design has also made me
appreciate the value a sane database design can provide. Without constraints,
bad data needs to be handled after *reading* it from the database, rather than
at *writing* (creating, updating, deleting).

Now that I've learned
[CTE](https://www.postgresql.org/docs/current/queries-with.html)'s and have
access to better tooling, I find databases more enjoyable to work with. Let me
break it down.

## Ownership and Tooling

We have a database server for our team, defined by a [Terraform](https://www.terraform.io/) JSON file. To
add a new database or an account (Postgres role), we add a name to an array and
run a CLI command to apply the change to *Dev* and *Prod* respectively. Let's
say we want to add a database for our new *"Experiment Y"* proof of concept, we
add two lines:

{{<code json "hl_lines=10 19">}}
// wfm-pg.tf.json
{
  ..., 
  "team": "workforce-management",
  "databases": [
	"cc_wfm",
	"aw_wfm",
	"brights_wfm",
	"dialga",
	"experiment_y",
	...
  ],
  "roles": [
	"cc_wfm_app",
	"aw_wfm_app",
	"aw_nps_app",
	"brights_wfm_app",
	"dialga",
	"experiment_y_app",
	...
  ],
  ...
}
{{</code>}}


By owning our own database server we are also responsible for the costs
associated and the routines for backup/restore (with help from team Tooling).

I can connect to the new database using short-lived credentials through a
`./scripts/connect-db.sh -e [local|dev|prod]` script in the repo.

> For Swedish speakers, there is a podcast episode [Kodsnack
546](https://kodsnack.se/546) where the guys from our Tooling team expands on
our infrastructure.

Our repos usually have a `docker-compose.yml` that spinns up everything we
need. We have a script that seeds the local database from the production
database, anonymises personal identifiable information and dumps it to a local
file. With that file on disk, the local database is seeded on `docker compose
up`. The repo contains both the application code and all the database code.
*Functions*, *procedures*, *views*, *triggers* and *policies* are written with
`create or replace`, so they can be changed in the same way as our TypeScript
functions or CSS rules, with a file watcher looking for changes in `*.sql`
files as well as other source files. 

### Tests
Another container defined by our `docker-compose.yml` runs the tests on file
changes. Let's look at a test to prevent supplements (like expenses or
allowances) from being placed outside a consultant's employment (we're in the
HR business, look at this from a time/expense reporting perspective).

{{<code typescript>}}
test('Should not be able to create supplement outside employment periods', async (t) => {
  const agreement = agreementCreated()
  const consultant = consultantCreated()
  const employment = employmentCreated({
    consultantId: consultant.data.consultantId,
    agreementId: agreement.data.agreementId,
    startDate: Dt.parse('2022-01-01'),
    endDate: Dt.parse('2024-03-01')
  })
  const error = await t.throwsAsync<CommandValidationError>(
    runCommandTest({
      commandName: 'CreateSupplement',
      withHistory: [agreement, consultant, employment],
      withPayload: {
        employmentId: employment.data.employmentId.toString(),
        date: '2024-06-15',
        description: 'Train ticket to conference',
        category: 'expense',
        quantity: { type: 'count', count: 1 },
        amount: 715_00,
        currency: 'SEK'
      }
    })
  )
  t.is(error.data.code, 'supplement_outside_employment')
})
{{</code>}}

The `withHistory` part of this test is the *arrange* in "*arrange*, *act*,
*assert*" steps of a test. It creates a collective bargain agreement, a
consultant and an employment for the consultant. Only the employment period is
important for this particular test. We then call the command for creating a
supplement (expense or allowance). The command may be simple or complex, but
will result in a database *insert* in this case. We expect the error code
`supplement_outside_employment` for this test. For the successful case we query
the database for the inserted expense.

Constraints between tables are implemented using triggers in this code base. An
employment can have multiple employment periods if the conditions have changed
during the employment, like an updated salary. Another test asserts that
employment periods are contiguous. 

{{<code plpgsql>}}
create or replace function core.trigger_supplement_before_insert()
returns trigger
 language plpgsql
 strict
as $$
begin
  -- Make sure supplement is contained by the employment's date range
  if not (
    select daterange(
      min(date_trunc_month(lower(ep.date_range))),
      max(upper(ep.date_range))
    ) as date_range
    from core.employment_period ep
    where ep.employment_id = NEW.employment_id
    group by ep.employment_id
  ) @> NEW.date then
    raise exception 'Custom constraint in func_trigger_supplement_before_insert failed' using
      errcode = 'integrity_constraint_violation',
      table = 'supplement',
      constraint = 'supplement_outside_employment';
  end if;

  return NEW;
end;
$$;

drop trigger if exists trigger_supplement_before_insert on core.supplement;

create trigger trigger_supplement_before_insert
  before insert on core.supplement
  for each row
  execute function core.trigger_supplement_before_insert();
{{</code>}}

*Apparently there is no law that require us to hold shift while typing SQL* ☝️
*We also have better syntax highlighting in our editors than my blog can
render.*

### Migrations

We write migrations by adding a `.sql` file to the database folder which is
then run against the local database seeded with realistic data. 

With a new feature developed, tested locally in the web interface and some
level of automated tests, all code changes, including database code, can be
pushed in one commit. The build server then builds the app's Docker image,
creates a temporary database and run all the tests in the repo in the same way
as done on our local dev machines. If all tests pass, the Docker image is
deployed to our Dev environment and the database migrations get applied to the
Dev database server. 

### ORM

Since I'm talking about using database queries together with other code, we
need some kind of transformation between the two. We're using
[PostgreSQL](https://www.postgresql.org) and [NodeJS](https://nodejs.org/en)
with [TypeScript](https://www.typescriptlang.org) and for that we're using the
[postgres npm library](https://www.npmjs.com/package/postgres) to interact with
Postgres. For an overview of different options, *Beyond Fireship* has a speedy
walkthrough of ORM's in the YouTube video [I tried 8 different Postgres
ORMs](https://www.youtube.com/watch?v=4QN1BzxF8wM) where the one we're using is
also mentioned. Combined with [Zod](https://zod.dev/), that can provide a nice
mapping between SQL and TypeScript. 

{{<code typescript>}}
const [{ count }] = await db.query(
  (sql) =>
    sql`
      select count(1)::int4 as count
      from cc.employee
      where office_id = ${props.id}
    `.validate(
      z.object({
        count: z.number()
      })
    )
)
{{</code>}}

*Again, we have better syntax highlighting in our editors than my blog can render, so
it's not just a plain SQL string to look at.*

## Database features

Having access to powerful features and sensible syntax makes it attractive to
implement more logic in the database, especially when operating on larger
datasets. Extracting large chunks of data into memory, performing the logic and
then applying the updates back to the database is sometimes not feasible. This
does couple the particular database engine tighter to the rest of the system,
but the idea of simply swapping one database engine for another one is only
relevant when viewing the database as pure persistence. Replacing Postgres with
another database engine in our applications would be like replacing NodeJS with
.NET, or Python with Java or whatever you might come up with -- basically a
rewrite.

By implementing constraints at the database level, you don't have to deal with
bad data quality. Using row-level security (RLS) decreases the risk of exposing
too much data and ensures only authorised people make changes, like preventing
your colleagues to see your salary and only letting your manager change it.
This is also easy to test: just create two rows, one a user is supposed to see
and one the user is *not* supposed to see. Make a select query as the user and
see which rows were returned. 

[modern-sql.com](https://modern-sql.com) contains a boat load of explanations
of SQL features and [Postgres' Feature
Matrix](https://www.postgresql.org/about/featurematrix/) clearly shows that
database development hasn't stood still since I got out of university.
