import { Client } from "@notionhq/client"
import { config } from "dotenv";

config();

const secret = process.env.SECRET;
const databaseId = process.env.DatabaseID;

const notion = new Client({
    auth: "",
});