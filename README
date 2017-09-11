# Querent

Syntax is based of [SailsJS Waterline Query Language](http://sailsjs.com/documentation/concepts/models-and-orm/query-language).

## How it works

You are able to run `Querent.query(collection, filters);` where `collection` is an array of objects (in our case links or nodes) and `filters` is an object like `{ link_verb: 'classifier' }`.

The property's key is the attribute that will be looked for in the object, and the value is the filter for the object to be returned.

### Examples

One can also add multiple attributes to be matched in the filtering option. `{ link_verb: 'classifier', line-weight: 30 }` will return the links that match both conditions.

If multiple values are accepted, you can do `{ link_verb: ['classifier', 'classifies'] }` so the attribute needs to match any of the values.

Another available structure is to negate the predicate by writing `{ link_verb: { '!': 'classifier' } }`. This will retrieve all the links that are NOT classifier.

You can also filter using nested properties, for instance: `{ source: { id: { '!': [1, 2] } }`. This would filter out the link's whose source node's id is any of 1 or 2.

### Criteria Modifiers

The following modifiers are available to use when building queries.

* '<' (less than)
* '<=' (less than or equal)
* '>' (greater than)
* '>=' (greater than or equal)
* '!' (not)

## Trying it out

You can try this in the console by copy/pasting the following code:

```
const links = [
  { id: 1, verb: 'jump', active: true },
  { id: 2, verb: 'run', active: false },
  { id: 3, verb: 'swim', active: true },
];


console.log('run', Querent.filter(links, { verb: 'run' }));
console.log('dry', Querent.filter(links, { verb: ['jump', 'run'] }));
console.log('not wet', Querent.filter(links, { verb: { '!': 'swim' } }));
console.log('in land active', Querent.filter(links, { active: true, verb: { '!': 'swim' } }));
```
