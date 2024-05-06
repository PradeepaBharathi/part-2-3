import { client } from "../db.js";
import { ObjectId } from "bson";
export function getApps() {
    return client
        .db("Launcher")
        .collection("app")
    .find().toArray()
}

export function addApp(data) {
  return client.db("Launcher").collection("app").insertOne(data);
}

export function deleteAppById(id, data) {
  return client
    .db("Launcher")
    .collection("app")
    .findOneAndDelete({ _id: new ObjectId(id) }, { $set: data });
}