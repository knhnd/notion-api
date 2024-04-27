import { config } from "dotenv";
import { Client } from "@notionhq/client";

config();

const secret = process.env.SECRET;
const databaseId = process.env.DatabaseID;

const notion = new Client({auth: secret})

export default class NotionAccess {

    // Create Method
    static async createData() {}

    // Read Method
    static async getDataById(itemId) {
        try {
            const data = await notion.databases.query({
                database_id: databaseId,
                filter: {
                    property: "ID",
                    number: {
                        equals: itemId
                    }
                },
            });
            const propaties = data.results[0].properties;
            return propaties;
        } catch (err) {
            console.error(err);
        }
    };

    // Update Method

    // Delete Method
}
