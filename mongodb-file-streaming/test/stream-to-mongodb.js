var Code = require('code');
var Lab = require('lab');
var lab = exports.lab = Lab.script();

var expect   = Code.expect;
var before   = lab.before;
var after    = lab.after;
var describe = lab.describe;
var it       = lab.it;

var mongodb     = require('mongodb');
var MongoClient = mongodb.MongoClient;
var GridStore   = mongodb.GridStore;

var fs = require('fs');

var images = {};

images.name = {
  large: {
    input: 'images/nexus-wallpaper2.jpg',
    output: 'images/output-nexus-wallpaper2.jpg'
  },
  small: {
    input: 'images/squirrelmobster.jpeg',
    output: 'images/output-squirrelmobster.jpeg'
  }
};

images.stream = {
  large: {
    input: fs.createReadStream(images.name.large.input),
    output: fs.createWriteStream(images.name.large.output)
  },
  small: {
    input: fs.createReadStream(images.name.small.input),
    output: fs.createWriteStream(images.name.small.output)
  }
};


var fixtures = {};

describe("Stream to mongo", function() {

  before(function(done) {
    MongoClient.connect('mongodb://localhost:27017/test', function(err, db) {
      expect(err).to.be.null;
      fixtures.db = db;
      done();
    });
  });

  it('store large image', function(done) {

    var gridStore = new GridStore(fixtures.db, images.name.large.input, 'w', {
      content_type: 'images/jpeg',
      metadata: {
        account: {
          id: 42
        }
      }
    });

    gridStore.on('close', function(err) {
      expect(err).to.be.null;
      done();
    });

    images.stream.large.input.pipe(gridStore);
  });

  it('read large image', function(done) {

    var gridStore = new GridStore(fixtures.db, images.name.large.input, 'r');

    images.stream.large.output.on('finish', function(err) {
      expect(err).to.be.null;
      done();
    });

    gridStore.pipe(images.stream.large.output);
  });

  it('store small image', function(done) {

    var gridStore = new GridStore(fixtures.db, images.name.small.input, 'w', {
      content_type: 'images/jpeg',
      metadata: {
        account: {
          id: 42
        }
      }
    });

    gridStore.on('close', function(err) {
      expect(err).to.be.null;
      done();
    });

    images.stream.small.input.pipe(gridStore);
  });

  it('read small image', function(done) {

    var gridStore = new GridStore(fixtures.db, images.name.small.input, 'r');

    images.stream.small.output.on('finish', function(err) {
      expect(err).to.be.null;
      done();
    });

    gridStore.pipe(images.stream.small.output);
  });

  it('large to be eq', function(done) {

    var input  = fs.readFileSync(images.name.large.input);
    var output = fs.readFileSync(images.name.large.output);

    expect(input).to.be.deep.equal(output);

    done();
  });

  it('small to be eq', function(done) {

    var input = fs.readFileSync(images.name.large.input);
    var output = fs.readFileSync(images.name.large.output);

    expect(input).to.be.deep.equal(output);

    done();
  });

  after(function(done) {
    fixtures.db.close(done)
  });

});
