---
title: 'Test in Database Transaction with Hono'
url: 'test-in-database-transation-with-hono'
date: 2025-02-14
draft: false
description: 'I’m currently working on a service that’s basically an API implemented in Hono running on NodeJs backed by a Postgres database. Since we prefer to implement data validation as close to the source as possible in my team, we need a way to test the whole service with the database included, rather than mocked...'
summary: 'I’m currently working on a service that’s basically an API implemented in Hono running on NodeJs backed by a Postgres database. Since we prefer to implement data validation as close to the source as possible in my team, we need a way to test the whole service with the database included, rather than mocked...'
tags: [testing, postgres,typescript, javascript,nodejs]
categories: [coding]
---

I'm currently working on a service that's basically an {{<API />}} implemented in [Hono][1] running on [NodeJs][2] backed by a [Postgres][3] database. Since we prefer to implement data validation as close to the source as possible in my team, we need a way to test the whole service with the database included, rather than mocked. See my previous post [Databases as a Dev Tool][4] for a more detailed explanation of this way of thinking.

## The code to test

This is the endpoint I'm going to use as an example:

``` typescript
import { zValidator } from '@hono/zod-validator'
import { createFactory } from 'hono/factory'
import { HTTPException } from 'hono/http-exception'
import * as middleware from '../lib/middleware'
const factory = createFactory<middleware.AuthenticationMiddleware>()
const apiRouter = factory.createApp()

apiRouter.use(middleware.authenticationMiddleware)

apiRouter.get(
  '/person/:person_id',
  zValidator(
    'param',
    z.object({
      person_id: z.string().uuid(),
    })
  ),
  async (c) => {
    const { person_id } = c.req.valid('param')

    const [[person]] = await c.var.db.query(
      sql`
        select
          p.public_id as person_id,
          p.first_name,
          p.last_name,
        -- more columns...
        from app.person p
        -- more joins...
        where p.public_id = ${person_id}
      `
    )

    if (!person) {
      throw new HTTPException(404)
    }

    return c.json({ person })
  }
)
```

Ideally we would like to call this endpoint in our tests in the same way as a real consumer of the API would do. Hono makes this easy where we can simply import the `apiRouter` in our test file and use the `apiRouter.request` function. To not be dependent on the available endpoints for setting up test data, being able to run the tests in parallel (isolated) etc, we need a way to wrap each test in a database transaction and use that transaction in the endpoint's handler during test execution, and of course abort the transaction when we're done and pretend like our database operations never happened.

## Create and abort a transaction

Similar to how we create the regular database connection and transaction from our middleware, we define this additional function called `testDb`. We have a bit of [Zod][6] code wrapping the [postgres][7] lib for convenience, but basically it returns a function that creates a transaction, executes our test code and throws an exception to abort the transaction. The catch block checks if it's the explicit throw to abort the transaction or something else that's failed. I also found the `txid_current()` function in Postgres to be valuable when asserting that we use the same transaction throughout the entire test execution.

``` typescript
import postgres from 'postgres'
import { pgz, PostgresZodWrapper } from './lib/postgres-zod'

export const testDb = async (
  func: (
    tx: PostgresZodWrapper,
    rawTx: postgres.TransactionSql<{}>,
  ) => Promise<any>,
) => {
  const transactionAborted = 'ABORT_TRANSACTION'
  const connection = postgres(createPostgresConnectionConfig('OUR_SERVICE'))
  let result: any
  try {
    return await connection.begin('read write', async (tx) => {
      const client = pgz.wrapPostgresTransaction(tx)
      result = await func(client, tx)
      throw new Error(transactionAborted)
    })
  } catch (err: any) {
    if (!(err instanceof Error) || err?.message !== transactionAborted) {
      console.error('❌ Test execution failed: ', err?.message)
      throw err
    }
  } finally {
    connection.end()
  }
  return result
}
```
## Injecting the database transaction

In Hono you can pass a third argument to the request, which is useful for testing. My initial thought when seeing the name [Env][5] was a key value pair, but you can set anything here, like a database transaction!

```typescript
// Hono's documentation for Env.
// https://hono.dev/docs/guides/testing#env
const MOCK_ENV = {
  API_HOST: 'example.com',
  DB: {
    prepare: () => {
      /* mocked D1 */
    },
  },
}

test('GET /posts', async () => {
  const res = await app.request('/posts', {}, MOCK_ENV)
})
```

We already have a middleware that is responsible for creating the database transaction and set the correct user/role for the lifetime of the transaction based on the calling client. So this is were we read the `c.env` and prefer that to the regular database client if it is set. Like this:

``` typescript
// in middleware.ts
c.set('db', c.env?.testTx ?? productionDbClient)
return await next()
```
## Helper functions to wrap test code
Now we need a bit of test helper code to make it nice to write the tests. This is more or less wrapping the `apiRouter.request` function and passing the third parameter so we don't have to do that in every test.

``` typescript
import { apiRouter } from '../api/router'
import { testDb } from '../db'
import { PostgresZodWrapper, sql } from './postgres-zod'

type RequestType = typeof apiRouter.request

const testApiRouter = (
  func: (
    tx: PostgresZodWrapper,
    testRequest: RequestType,
  ) => Promise<void>,
) => {
  return testDb(async (db, tx) => {
    const testRequest: RequestType = (
      input,
      requestInit,
      env,
      executionContext,
    ) => {
      return apiRouter.request(
        input,
        requestInit,
        { testTx: tx, ...(typeof env === 'object' ? env: {}) },
        executionContext,
      )
    }
    return await func(db, testRequest)
  })
}
```
## Finally, the test code
With all this in place we can now test the endpoint from the first code snippet like this:
 ```typescript
import assert from 'node:assert'
import { test } from 'node:test'
import { create, testApiRouter } from '../lib/test-helper'

test('Can get person by person_id', () => {
  testApiRouter(async (db, request) => {
    const person = await create.person(db, { email: 'bo.ek@example.com' })

    const res = await request(
      `/person/${person.public_id}`,
      {
        headers: {
          'x-local-service-auth': 'service-xyz',
          'content-type': 'application/json',
        },
      },
    )

    assert.deepStrictEqual(res.status, 200)
    assert.deepStrictEqual(await res.json(), person)
  })
})
```

Our test helper file has a bunch of `create.*` and `get.*` functions for setting up and verifying stuff against the database before and after a request has been made to the endpoint under test.

## Running the tests

To run these tests I do a `docker build .` The tests are a stage in our `Dockerfile` in the repo and that's also what the build ({{<CI />}}) server builds. Locally the tests run continuously as part of a [docker compose][8] with file watching during development.


[1]: https://hono.dev/
[2]: https://nodejs.org/
[3]: https://www.postgresql.org/
[4]: /databases-as-dev-tool
[5]: https://hono.dev/docs/guides/testing#env
[6]: https://zod.dev/
[7]: https://www.npmjs.com/package/postgres
[8]: https://docs.docker.com/compose/
