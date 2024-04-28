export default class Preprocessing {
  // Notionのデータベースプロパティを作る
  static notionProperty(databaseId, csvObject) {
    const notionProperty = {
      database_id: databaseId,
      properties: {
        Name: {
          title: [
            {
              text: {
                content: csvObject.企業名 ? csvObject.企業名 : '',
              },
            },
          ],
        },
        URL: {
          url: csvObject.URL ? csvObject.URL : '',
        },
        郵便番号: {
          rich_text: [
            {
              text: {
                content: csvObject.郵便番号 ? csvObject.郵便番号 : '',
              },
            },
          ],
        },
        住所: {
          rich_text: [
            {
              text: {
                content: csvObject.住所 ? csvObject.住所 : '',
              },
            },
          ],
        },
        担当部署: {
          rich_text: [
            {
              text: {
                content: csvObject.担当部署 ? csvObject.担当部署 : '',
              },
            },
          ],
        },
        担当者: {
          rich_text: [
            {
              text: {
                content: csvObject.担当者 ? csvObject.担当者 : '',
              },
            },
          ],
        },
        メールアドレス: {
          email: csvObject.メールアドレス ? csvObject.メールアドレス : '',
        },
        電話番号: {
          phone_number: csvObject.電話番号 ? csvObject.電話番号 : '',
        },
        コンタクト教員: {
          multi_select: [
            {
              name: csvObject.コンタクト教員 ? csvObject.コンタクト教員 : '',
            },
          ],
        },
        担当教員: {
          multi_select: [
            {
              name: csvObject.担当教員 ? csvObject.担当教員 : '',
            },
          ],
        },
        参加可否: {
          multi_select: [
            {
              name: csvObject.参加可否 ? csvObject.参加可否 : '',
            },
          ],
        },
        実習参加: {
          multi_select: [
            {
              name: csvObject.実習参加 ? csvObject.実習参加 : '',
            },
          ],
        },
        備考: {
          rich_text: [
            {
              text: {
                content: csvObject.備考 ? csvObject.備考 : '',
              },
            },
          ],
        },
      },
    };
    return notionProperty;
  }
}
