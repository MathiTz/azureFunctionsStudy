import { AzureFunction, Context, HttpRequest } from "@azure/functions";
const azure = require("azure-storage");
const connectionString: String = process.env.AzureStorageConnectionString;
const tableService = azure.createTableService(connectionString);
const tableName: String = "mytable";

const httpTrigger: AzureFunction = async function(
  context: Context,
  req: HttpRequest
): Promise<void> {
  const id = req.params.id;

  if (req.body) {
    const item = req.body;
    item.RowKey = id;

    await tableService.insertOrReplaceEntity(
      tableName,
      item,
      (error, result, response) => {
        if (!error) {
          context.res = {
            status: 200,
            body: result
          };
        } else {
          context.res = {
            status: 500,
            body: error
          };
        }
      }
    );
  } else {
    context.res = {
      status: 400,
      body: "Please pass an item in the request body"
    };
    context.done();
  }
};

export default httpTrigger;
