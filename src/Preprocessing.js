import fs from 'fs';
import { parse } from 'csv-parse';

export default class Preprocessing {
  // csvをオブジェクトに変換
  static async parseCSV(filePath) {
    const csvObjects = [];
    const parser = fs.createReadStream(filePath, { encoding: 'utf8' }).pipe(
      parse({
        columns: true,
        skip_empty_lines: true,
      })
    );
    for await (const record of parser) {
      csvObjects.push(record);
    }
    return csvObjects;
  }
}
