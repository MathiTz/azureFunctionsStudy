const azure = require("azure-storage");

const connectionString = process.env.StorageConnectionString;

const tableService = azure.createTableService(connectionString);
const tableName = "mytable";

module.exports = function(context, req) {
  context.log("Start ItemDelete");

  const id = req.params.id;
  if (id) {
    var item = { PartitionKey: "Partition", RowKey: id };
    tableService.deleteEntity(tableName, item, function(
      error,
      result,
      response
    ) {
      if (!error) {
        context.res.status(204).send({ body: "Successfully Deleted" });
      } else {
        context.res.status(500).json({ error: error.message });
      }
    });
  } else {
    context.res.status(404).send();
  }
};
