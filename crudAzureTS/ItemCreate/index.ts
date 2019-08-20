import { AzureFunction, Context, HttpRequest } from "@azure/functions";
const azure = require("azure-storage");
const uuid = require("uuid/v1");
const connectionString: String = process.env.AzureStorageConnectionString;
const tableService = azure.createTableService(connectionString);
const tableName: String = "mytable";

const httpTrigger: AzureFunction = async function(
  context: Context,
  req: HttpRequest
): Promise<void> {
  context.log("StartItemCreate");

  if (req.body) {
    const item: String = req.body;
    item["PartitionKey"] = "Partition";
    item["RowKey"] = uuid();

    await tableService.insertEntity(
      tableName,
      item,
      { echoContent: true },
      (error, result, response) => {
        if (!error) {
          context.res.status(200).send({ response });
        } else {
          context.res.status(500).json({ error: error.message });
        }
      }
    );
  } else {
    context.res = {
      status: 400,
      body: "Please pass an item in the request body"
    };
  }
};

export default httpTrigger;
