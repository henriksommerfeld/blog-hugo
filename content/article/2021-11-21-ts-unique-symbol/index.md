---
title: Alternative to Typescript Classes that can be Compared
url: /alternative-to-typescript-classes-that-can-be-compared
date: 2021-11-27T12:15:00+02:00
description: "Classes in Typescript have the drawback of not being comparable, like when used as a key in a Map.
This post describes a possible alternative using unique symbols. Works well when you don't have to perform operations on the values."
summary: "Classes in Typescript have the drawback of not being comparable, like when used as a key in a Map.
This post describes a possible alternative using unique symbols. Works well when you don't have to perform operations on the values."
tags: [typescript]
categories: [Coding]
ogimage:
draft: false
---

When building a piece of software that has become quite complex, the choise of NodeJS and Typescript feels less and less convincing. C# or Java might have been a better fit, but here we are. We found that using classes help us avoid misstakes. The initial use of `string` and `number` for everything resulted in double parsing and made refactoring harder.

So, by using classes we became more confident in writing logic, like `Time.parse('18:30').add(Minutes.parse(10))` (with the actual values being user input or reads from a database). But a downside of using classes is the inability to use simple `===` comparison.

``` typescript
if (Time.parse('18:30') === Time.parse('18:30')) {
  // nope
}
```

This was still a step forward from passing numbers and strings around, so we made more classes, like one for UUID.

When `Uuid` is a class in the code below, we will not find what we're looking for, since the instances we're comparing are not the same (eventhough they might have the same value). It's also type-wise nothing wrong with the code, so we won't have any compilation issues hinting that we may have made a mistake (the `has` function will always return `false` unless we're comparing the same class instances).

``` typescript
const agreementIds: Set<Uuid> = await getFromSomewhere()
const relevantEmploments = employments.filter(e => agreementIds.has(e.agreementId))
```

## Using unique symbols

If we insted of using a class, implement the `Uuid` as a unique symbol type combined with functions in a module, we can compare two values as if they were regular strings.

``` typescript
// uuid.ts
import assert from 'assert'
import { randomUUID } from 'crypto'

type Uuid = string & { readonly whatever: unique symbol }

const Uuid = {
  parse(input: string) {
    assert(validUuidRegex.test(input), 'invalid uuid')
    return input as Uuid
  },

  create() {
    return randomUUID() as Uuid
  },
}

const validUuidRegex =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i

export default Uuid
```

This works good for anything that is essentially a value that we don't have a need to perform operations on, like dividing one such value with another one. The same code for finding relevant employments will do what we intended with this new `Uuid` implementation.

[1]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set
[2]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Equality_comparisons_and_sameness#same-value-zero_equality
[3]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map
