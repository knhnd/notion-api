import NotionAccess from "./NotionAccess.js"

export default class Preprocessing {
  // Notionのデータベースプロパティを作る
  static async notionProperty(databaseId, csvObject) {
    try {
      /* TODO: 原因調査
      企業名だけキーを指定しても取れないため、すべてのキーを配列にしてインデックス指定することで取得
      文字コードのせい？（不可視文字とか）
      */
      const keys = Object.keys(csvObject);
      const companyName = keys[0];

      /* TODO: FIX
      データのIDを自動で採番する方法はないので最新1件のデータを取得して1加算
      ちゃんとしたエラーハンドリングしていないので処理の競合などに注意
      */
      const latestData = await NotionAccess.getLatestData();
      const id = latestData.ID.number + 1;

      const notionProperty = {
        "parent": {
          "type": "database_id",
          "database_id": databaseId
        },
        "properties": {
          ID: {
            number: id,
          },
          企業名: {
            title: [
              {
                text: {
                  content: csvObject[companyName] ? csvObject[companyName] : '無題',
                },
              },
            ],
          },
          URL: {
            url: csvObject.URL ? csvObject.URL : ' ',
          },
          郵便番号: {
            rich_text: [
              {
                text: {
                  content: csvObject.郵便番号 ? csvObject.郵便番号 : ' ',
                },
              },
            ],
          },
          住所: {
            rich_text: [
              {
                text: {
                  content: csvObject.住所 ? csvObject.住所 : ' ',
                },
              },
            ],
          },
          担当部署: {
            rich_text: [
              {
                text: {
                  content: csvObject.担当部署 ? csvObject.担当部署 : ' ',
                },
              },
            ],
          },
          担当者: {
            rich_text: [
              {
                text: {
                  content: csvObject.担当者 ? csvObject.担当者 : ' ',
                },
              },
            ],
          },
          メールアドレス: {
            email: csvObject.メールアドレス ? csvObject.メールアドレス : ' ',
          },
          電話番号: {
            rich_text: [
              {
                text: {
                  content: csvObject.電話番号 ? csvObject.電話番号 : ' ',
                },
              },
            ],
          },
          コンタクト教員: {
            multi_select: [
              {
                name: csvObject.コンタクト教員 ? csvObject.コンタクト教員 : ' ',
              },
            ],
          },
          担当教員: {
            multi_select: [
              {
                name: csvObject.担当教員 ? csvObject.担当教員 : ' ',
              },
            ],
          },
          参加可否: {
            multi_select: [
              {
                name: csvObject.参加可否 ? csvObject.参加可否 : ' ',
              },
            ],
          },
          実習参加: {
            multi_select: [
              {
                name: csvObject.実習参加 ? csvObject.実習参加 : ' ',
              },
            ],
          },
          備考: {
            rich_text: [
              {
                text: {
                  content: csvObject.備考 ? csvObject.備考 : ' ',
                },
              },
            ],
          },
        },
      };
      return notionProperty;
    } catch (err) {
      console.error(err)
    }
  }
}
