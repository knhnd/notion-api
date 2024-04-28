import { config } from 'dotenv';
import { Client } from '@notionhq/client';
import Preprocessing from './Preprocessing.js';
import GenerateContents from './GenerateContents.js';

config();

const secret = process.env.SECRET;
const databaseId = process.env.DatabaseID;

const notion = new Client({ auth: secret });

export default class NotionAccess {
  // Create Method
  static async createData() {
    try {
      const csvObjects = await Preprocessing.parseCSV('./data/data.csv');
      if (csvObjects.length === 0) {
        return;
      }
      const notionProperty = GenerateContents.notionProperty(databaseId, csvObjects);
      console.log('notionProperty: ', notionProperty);

      // const res = await notion.databases.query({});
    } catch (err) {
      console.error(err);
    }
  }

  // Read Method
  static async getItemById(itemId) {
    try {
      const data = await notion.databases.query({
        database_id: databaseId,
        filter: {
          property: 'ID',
          number: {
            equals: itemId,
          },
        },
      });
      const properties = data.results[0].properties;
      return properties;
    } catch (err) {
      console.error(err);
    }
  }

  // Update Method

  // Delete Method
}
