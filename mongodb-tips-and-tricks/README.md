### Mongodb tips and tricks

#### Shell

* Copy document from another database
```
use dev_db;
var prod_db = db.getSiblingDB('prod_db');
var doc = prod_db.collection.findOne(ObjectId('52dea749eb05fdab0a4ca902'));
db.collection.insert(doc);
```
