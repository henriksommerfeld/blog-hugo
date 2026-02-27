---
title: 'Working with Postgres Range Types'
url: '/working-with-postgres-range-types'
date: 2026-02-27
draft: false
description: 'Discussing different approaches to handling inclusive/exclusive ranges in PostgreSQL'
summary: 'Ever since I got introduced to PostgreSQL a couple of years ago, I have appreciated the range types. You can for example use daterange to represent data that change over time, but should only have one value at a given date. The alternative to a daterange column is of course to have separate start_date and end_date columns, but a range enables you to specify February 2026 as [2026-02-01,2026-03-01) without having to think about leap years. Let’s look at an example.'
tags: [postgres]
categories: [coding]
---

Ever since I got introduced to PostgreSQL a couple of years ago, I have appreciated the range types. You can for example use `daterange` to represent data that change over time, but should only have one value at a given date.

The alternative to a daterange column is of course to have separate `start_date` and `end_date` columns, but a range enables you to specify February 2026 as `[2026-02-01,2026-03-01)` without having to think about leap years. Let's look at an example.

We're storing employees' bank account to be able to pay them. A time dimension enables us to add a new account in advance. This isn't the best example of data with validity periods, but it's only two columns, [IBAN](https://en.wikipedia.org/wiki/International_Bank_Account_Number) and [BIC](https://en.wikipedia.org/wiki/ISO_9362), so we don't have to clutter the example with loads of columns. Let's also handle validation of those values outside the database so we can just use `text` as data type, giving us the following table. 

```sql
create table bank_account (
  bank_account_id int8 primary key generated always as identity,
  employee_id int8 not null,
  iban text not null,
  bic text not null,
  period daterange not null,

  constraint "bank_account/period/no_overlap"
    exclude using gist (employee_id with =, period with &&),

  constraint "bank_account/period/valid" check (
    lower(period) is not null     -- but '-infinity' is fine
    and upper(period) is not null -- but 'infinity' is fine
    and not isempty(period)
  ),

  foreign key (employee_id) references employee (employee_id) on delete cascade
);
```

_NOTE: I included the constraints here for completeness. I prefer 'infinity' to 'null' to avoid accidentally comparing a real date with a null value. We can use triggers for resolving range conflicts and ensuring contiguous ranges, but that's another post._

## The Upside

This enables us to query any account for an employee during 2025 with:
```sql
select *
from bank_account
where employee_id = 1
  and period && '[2025-01-01,2026-01-01)'::daterange
```

See [PostgreSQL documentation on Range/Multirange Functions and Operators][1]

## The Downside

Returning the date range is a bit trickier though. In all cases I've come across we want separate `start_date` and `end_date` properties, whether it's in a user interface or an API. And we want them to be inclusive (valid on the start and end dates). Since ranges can be inclusive (`[]`) or exclusive (`()`) or any combination thereof, we could construct our query like this:

```sql
select
  employee_id,
  iban,
  bic,
  case
    when lower_inc(period) then
      lower(period)
    else
      (lower(period) + '1 day'::interval)::date
  end as period_from,
  case
    when upper_inc(period) then
      upper(period)
    else
      (upper(period) - '1 day'::interval)::date
  end as period_to
from bank_account
where employee_id = 1
```


This is not logic I want spread out throughout my application – hard to read and easy to mistype. So here are a few ways to tackle this. 

## 1. Using SQL Functions

The above can be extracted into two functions, like this...

```sql
create or replace function as_inclusive_start_date (
  range daterange
)
returns text
  language sql
  parallel safe
  immutable
  strict
as $$
  select
    case when lower_inc($1) then lower($1)
    else (lower($1) + '1 day'::interval)::date
  end
$$;

```

and

```sql
create or replace function as_inclusive_end_date (
  range daterange
)
returns text
  language sql
  parallel safe
  immutable
  strict
as $$
  select
    case
      when upper($1) = 'infinity' then null
      when upper_inc($1) then upper($1)
      else (upper($1) - '1 day'::interval)::date
  end
$$;
```

and be used like this:

```sql
select
  employee_id,
  iban,
  bic,
  as_inclusive_start_date(period) as period_from,
  as_inclusive_end_date(period) as period_to
from bank_account
where employee_id = 1;

```

A clear improvement in my book and an approach my team is currently using.

## 2. Having a Range Type in Application Code

By creating a corresponding range type in the language of your app surrounding the database, you can just return the range type as a string an have it handled there. This is how we've done it in Typescript with the [postgres npm package](https://www.npmjs.com/package/postgres).

We have a `DateRange` class that handles parsing of any date range value, can serialize such a value and hold any function related to date range needs. By registering it to the type it is automatically converted to this class in the calling application code.

```typescript
const dbConfig = {
  host: process.env('host'),
  database: process.env('database'),
  user: process.env('username'),
  password: process.env('password'),
  port: process.env('port'),
  ssl: process.env('ssl_mode'),
  },
  types: {
    // Get range types from `select * from pg_range`
    daterange: {
      to: 3912,
      from: [3912],
      serialize: (range: DateRange) => range.toString(),
      parse: (x: string) => DateRange.parse(x),
    },
    int4range: {
      to: 3904,
      from: [3904],
      serialize: (range: Int4Range) => range.toString(),
      parse: (x: string) => Int4Range.parse(x),
    },
    numrange: {
      to: 3906,
      from: [3906],
      serialize: (range: NumericRange) => range.toString(),
      parse: (x: string) => NumericRange.parse(x),
    },
  },
}
```

## 3. Adding Duplicate Columns

 A simple solution is to just duplicate the columns by having both `period_to`, `period_from` and `period`. 

```sql
create table bank_account (
  bank_account_id,
  iban text not null,
  bic text not null,
  period_from date not null,
  period_to date not null,
  period daterange not null (
    period_from, period_to, '[]'
  ) stored
);
```

This enables us to select `period_from` and `period_to` and use `period` in `where` clauses, but also to ignore the range column on `insert` and `update`.

```sql
--- inserting without caring we have a range type
insert (
  employee_id,
  iban,
  bic,
  period_from,
  period_to
) values (
  1,
  'SE7280000810340009783242',
  'HANDSESSXXX'
  '2026-02-22',
  '2027-02-22'
);

-- and selecting
select
  employee_id,
  iban,
  bic,
  period_from,
  period_to
from bank_account
where employee_id = 1
  and period @> current_date;

```

[1]: https://www.postgresql.org/docs/current/functions-range.html
