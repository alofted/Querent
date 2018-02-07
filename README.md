# Querent

Syntax is based of [SailsJS Waterline Query Language](http://sailsjs.com/documentation/concepts/models-and-orm/query-language).

## How it works

Run `Querent.query(collection, filters)` where `collection` is an array of objects and `filters` is an object like `{ surname: 'Simpson' }`.

The property's key is the attribute that will be looked for in the object, and the value is the filter for the object to be returned.

### Examples

You can add multiple attributes to narrow down your selection. `{ surname: 'Simpson', age: 10 }` will return the elements that match both conditions.

Or you can widen it by allowing for multiple values. `{ surname: ['Simpson', 'Van Houten'] }` will return the elements that match either value.

Another available structure is to negate the predicate by writing. `{ surname: { '!': 'Wiggum' } }` will return the elements whose name is not Wiggum.

You can also filter using nested properties. `{ grades: { math: { '!': ['A', 'B'] } } }` will return the elements whose grade on math not A or B.

### Criteria Modifiers

The following modifiers are available to use when querying:

* `<` *(less than)*
* `<=` *(less than or equal)*
* `>` *(greater than)*
* `>=` *(greater than or equal)*
* `!` *(not)*

## Build

You can build from source by running `npm run build`.

## Tests

You can run the test suite by running `npm run test`.
