"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const storage_1 = require("./storage");
const tableName = "sampletable";
(() => __awaiter(this, void 0, void 0, function* () {
    const storage = yield storage_1.Storage.Create(tableName);
    const record = yield storage.GetRecord("SamplePartition", "SampleRow");
    console.log(record);
    // await storage.AddOrMergeRecord({
    //   PartitionKey: "SamplePartition",
    //   RowKey: "SampleRow",
    //   SampleInt: 42,
    //   SampleString: "Amazing!"
    // });
    // console.log("Record added");
}))();
