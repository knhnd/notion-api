import { config } from "dotenv";
import { Client } from "@notionhq/client";

config();

const secret = process.env.SECRET;
const databaseId = process.env.DatabaseID;

const notion = new Client({auth: secret})

export default class NotionAccess {

    // Create Method
    static async createData() {
        try {
            // const res = await notion.databases.query({
            //     database_id: databaseId,
            //     propaties: {
            //         "Name": {
            //             "title": [
            //                 {
            //                     "text": {
            //                         "content": "株式会社SAMPLE"
            //                     }
            //                 }
            //             ]
            //         },
            //         "URL": {
            //             "url": "https://sample.jp"
            //         },
            //         "郵便番号": {},
            //         "住所": {},
            //         "担当部署": {},
            //         "担当者": {},
            //         "メールアドレス": {
            //             "email": "staff@sample.com"
            //         },
            //         "電話番号": {},
            //         "コンタクト教員": {},
            //         "担当教員": {},
            //         "参加可否": {},
            //         "実習参加": {},
            //         "備考": {},
            //     }
            // })
          
        } catch(err) {
            console.error(err);
        }
    }

    // Read Method
    static async getItemById(itemId) {
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
