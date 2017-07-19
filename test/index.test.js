var expect = require('chai').expect;
var _ = require('lodash');
var deepFind = require('../index').find;
var deepFindAll = require('../index').findAll;

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
        "ch2": [
          {
            "key": "k2-1-2",
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


describe('deepFind', function () {

  it('should find the first data from an array objects', function (done) {
    var results = {
      "key": "k1-1-2",
      "name": "n1-1-2"
    };

    var obj = deepFind('k1-1-2', testData);
    expect(obj).to.eql(results);
    done();
  });

  it('should find all the data from an array objects', function (done) {
    var results = [{
      "key": "k2-1-1",
      "name": "n2-1-1"
    },{
      "key": "k2-1-1",
      "name": "n2-1-1(2)"
    }];

    var obj = deepFindAll('k2-1-1', testData);
    expect(obj).to.eql(results);
    done();
  });

  it('should find the first data from an object', function (done) {
    var results = {
      "key": "k1-1-1-1",
      "name": "n1-1-1-1"
    };

    var obj = deepFind('k1-1-1-1', testData[0]);
    expect(obj).to.eql(results);
    done();
  });

  it('should find all the data from an object', function (done) {
    var results = [{
      "key": "k2-1-1",
      "name": "n2-1-1"
    },{
      "key": "k2-1-1",
      "name": "n2-1-1(2)"
    }];

    var obj = deepFindAll('k2-1-1', testData[1]);
    expect(obj).to.eql(results);
    done();
  });

  it('should find the first data by name from an object', function (done) {
    var results = {
      "key": "k1-1-1-1",
      "name": "n1-1-1-1"
    };

    var obj = deepFind('n1-1-1-1', testData, {searchField: 'name'});
    expect(obj).to.eql(results);
    done();
  });

  it('should find all the data by name from an object', function (done) {
    var results = [{
      "key": "k2-1-1",
      "name": "n2-1-1(2)"
    }, {
      "key": "k2-1-2",
      "name": "n2-1-1(2)"
    }];

    var obj = deepFindAll('n2-1-1(2)', testData, {searchField: 'name'});
    expect(obj).to.eql(results);
    done();
  });

  it('should return undefined if not found from an array objects', function (done) {

    var obj = deepFind('k', testData);
    expect(obj).to.be.undefined;
    done();
  });

  it('should find in given children from an array objects', function (done) {

    var obj = deepFind('k1-1-1', testData, {children: 'children1'});
    expect(obj).to.be.undefined;
    done();
  });

  it('should find all only in given children from an object', function (done) {
    var results = [ {
      "key": "k2-1-2",
      "name": "n2-1-1(2)"
    }];

    var obj = deepFindAll('n2-1-1(2)', testData[1], {searchField: 'name', children: 'ch2'});
    expect(obj).to.eql(results);
    done();
  });
});
