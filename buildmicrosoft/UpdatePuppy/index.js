const MongoClient = require("mongodb");

module.exports = async function(context, req) {
  context.log("JavaScript HTTP trigger function processed a request.");

  MongoClient.connect(
    process.env.CosmosDBURL,
    { useNewUrlParser: true },
    (err, database) => {
      if (err) throw err;
      console.log("Connected Successfully");
      const puppy = ({ id } = req.params);

      const puppyUpdate = ({ id, name, saying } = req.body);

      const db = database.db("admin");

      db.collection("Puppies").updateOne(
        {
          id: puppy.id
        },
        {
          $set: {
            id: puppyUpdate.id,
            name: puppyUpdate.name,
            saying: puppyUpdate.saying
          }
        },
        (err, result) => {
          if (err) throw err;
          console.log("Update Successfully");
          context.res = {
            body: result
          };
          database.close();
          context.done();
        }
      );
    }
  );
};
