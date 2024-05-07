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
  static async createPageFromCsv(filePath) {
    try {
      const csvObject = await Preprocessing.parseCSV(filePath);

      // とりあえずで Validation しただけ
      if (csvObject.length === 0 || 1 < csvObject.length) {
        return;
      }
      const notionProperty = await GenerateContents.notionProperty(databaseId, csvObject[0]);
      const res = await notion.pages.create(notionProperty);
      return res;
    } catch (err) {
      console.error(err);
    }
  }

  // 複数のページを一括で作成
  static async createPagesFromCsv(filePath) {
    try {
      const csvObjects = await Preprocessing.parseCSV(filePath);

      if (csvObjects.length === 0) {
        return;
      }

      let result = [];
      for (let i = 0; i < csvObjects.length; i++) {
        let csvObject = csvObjects[i];
        const notionProperty = await GenerateContents.notionProperty(databaseId, csvObject);
        let res = await notion.pages.create(notionProperty);
        result.push(res)
      }
      return result;
    } catch (err) {
      console.error(err);
    }
  }

  // Read Method
  static async getPageById(pageId) {
    try {
      const data = await notion.databases.query({
        database_id: databaseId,
        filter: {
          property: 'ID',
          number: {
            equals: pageId,
          },
        },
      });
      const properties = data.results[0].properties;
      return properties;
    } catch (err) {
      console.error(err);
    }
  }

  static async getLatestData() {
    try {
      const data = await notion.databases.query({
        database_id: databaseId,
        sorts: [{
          property: "ID",
          direction: "descending"
        }],
        page_size: 1
      })

      // DBにはデータが入っていて最新一件をとるので必ず[0]で取得可能
      return data.results[0].properties;
    } catch (err) {
      console.error(err);
    }
  }

  static async getDataBySpecifyingNumber(num) {
    try {
      const data = await notion.databases.query({
        database_id: databaseId,
        sorts: [{
          property: "ID",
          direction: "descending"
        }],
        page_size: num
      })

      let pages = [];
      for (let i = 0; i < data.results.length; i++) {
        pages.push(data.results[i].properties);
      }

      return pages;
    } catch (err) {
      console.error(err);
    }
  }

  //TODO: Update Method

  //TODO: Delete Method
}
