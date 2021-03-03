COLLSCAN vs IXSCAN

default index is { _id: 1 } //i.e _id in ascending order

db.users.getIndexes() // return arrray of indexes in the users collection

db.users.createIndex( { age: 1 }, option ) // create age index in ascending order

options {
  background: true    // DB is live & creating the index should not interrupt the DB
  unique: true        // Index must be unique
  name: "customName"  // Specify custom name for the index
}

// Query Performance

db.users.explain().method  or db.users.explain("executionStats").method

db.users.explain("executionStats").find({ age: {$gt: 25} })
db.users.explain("executionStats").aggregate([{ $group: {_id: "$country"} }])
db.users.explain("executionStats").find({ "name": /el/i })      //regex


db.users.dropIndex( { age: 1 } )     // Delete specified index
db.users.dropIndexes()               // Delete all indexes




////////////////////////  How to optimize MongoDB & Mongoose for Performance  ////////////////////////
https://mongoosejs.com/docs/guide.html#indexes

const userSchema = new Schema({
    name: String,
    type: String,
    tags: { type: [String], index: true } // field level
  });

  userSchema.index({ name: 1, type: -1 }); // schema level

//Disable autoIndex

 mongoose.connect('mongodb://user:pass@localhost:port/database', { autoIndex: false });
  // or
  mongoose.createConnection('mongodb://user:pass@localhost:port/database', { autoIndex: false });
  // or
  userSchema.set('autoIndex', false);
  // or
  new Schema({..}, { autoIndex: false });




////////////////////////  How to optimize MongoDB & Mongoose for Performance  ////////////////////////
https://itnext.io/performance-tips-for-mongodb-mongoose-190732a5d382

1. Use lean queries for GET operations

2. Create custom Indexes for your queries

3. Minimise DB requests (avoid .populate() if possible)
    - Its better to favour using .aggregate() instead of .populate()

4. Use .select() to select specific properties to return
    - Model.find({type: "Animal"}).select({name: 1, age:1})
    - Protip: This works really well if you’re using GraphQL, so you know what fields exactly the client requested and can select these fields from the database.

5. Run db operations in parallel
    - First Instance
        const user = new User({name: "bob"})
        const post = new Post({title: "hello"})
        await user.save()
        await post.save()
    - Second Instance (Running in parallel)
        const [user, post] = await Promise.all([user.save(), post.save()])

    - Pro tips
        While this may improve the performance on the api level, we’re still doing two requests to the database, so its even better to use insertMany() orbulkWrite() if you want to do multiple operations as a batch.

6. Cache/reuse mongoose connections
    - connect once at the beginning of your app and reuse the connection.

7. Example Query
    - userWithIndex.find(user).select({name: 1, email:1, name: 1}).lean()
