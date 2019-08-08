const MongoClient = require("mongodb").MongoClient;
const auth = {
  user: process.env.CosmosDBUser,
  password: process.env.CosmosDBPassword
};

module.exports = function(context, req) {
  MongoClient.connect(
    process.env.CosmosDBURL,
    { auth: auth },
    (err, database) => {
      if (err) throw err;
      let puppy = ({ id, name, saying } = req.body);
      var db = database.db("admin");
      db.collection("Puppies").insertOne(
        {
          id: puppy.id,
          name: puppy.name,
          saying: puppy.saying
        },
        (err, result) => {
          if (err) throw err;
          context.res = {
            body: puppy
          };
          database.close();
          context.done();
        }
      );
    }
  );
};
