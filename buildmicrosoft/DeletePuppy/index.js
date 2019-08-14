const MongoClient = require("mongodb");

module.exports = async function(context, req) {
  context.log("JavaScript HTTP trigger function processed a request.");

  MongoClient.connect(
    process.env.CosmosDBURL,
    {
      useNewUrlParser: true
    },
    (err, database) => {
      if (err) throw err;
      console.log("Connected successfully");

      const puppy = ({ id } = req.params);

      const db = database.db("admin");

      db.collection("Puppies").deleteOne({ id: puppy.id }, (err, result) => {
        if (err) throw err;
        console.log("Deleted Successfully");
        context.res = {
          body: result
        };

        database.close();
        context.done();
      });
    }
  );
};
