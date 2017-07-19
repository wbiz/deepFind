# deepFind
find item(s) in an array or objects recursively. 

## Installation
```
npm install deep_find --save
```
or
```
bower install deep_find --save
```

## Usage

```
var deepFind = require('deep_find').find;
var deepFindAll = require('deep_find').findAll;
var obj = deepFind(value, data, options);
var obj = deepFindAll(value, data, options);
```

* value: value to be searched by key field
* data: object or array of objects
* options(optional): {searchField: 'key', children: 'children'} 
  * searchField: string (the field will be search against default is 'key')
  * children: string or array (the children to recursively look for, without this option it will try all the array properties in the object.
 

Examples
```

var testData=[
  {
    "children": [
      {
        "children": [
          {
            "key": "k1-1-1-1",
            "name": "n1-1-1-1"
          }
        ],
        "key": "k1-1-1",
        "name": "n1-1-1"
      }
    ],
    "children1": [
      {
        "children": [
          {
            "key": "k1-1-2",
            "name": "n1-1-2"
          }
        ],
        "key": "k1-1",
        "name": "n1-1"
      }
    ],
    "key": "k1",
    "name": "n1"
  },
  {
    "children": [
      {
        "children": [
          {
            "key": "k2-1-1",
            "name": "n2-1-1"
          }
        ],
        "key": "k2-1",
        "name": "n2-1"
      }
    ],
    "ch2": [
      {
        "children": [
          {
            "key": "k2-1-1",
            "name": "n2-1-1(2)"
          }
        ],
        "key": "k2-1",
        "name": "n2-1"
      }
    ],
    "key": "k2",
    "name": "n2"
  }
];

```
```
deepFind('k1-1-1-1', testData);
// ->  {"key": "k1-1-1-1", "name": "n1-1-1-1"}

deepFind('k2-1-1', testData);
// ->  [{"key": "k2-1-1", "name": "n2-1-1"},
        {"key": "k2-1-1", "name": "n2-1-1(2)"}]

deepFindAll('n2-1-1(2)', testData, {searchField: 'name'});
// ->  {"key": "k1-1-1-1", "name": "n1-1-1-1"}

```
