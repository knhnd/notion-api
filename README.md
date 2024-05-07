# Notion API

Notion と Notion Database を操作するための機能いろいろ

## 実装

公式が出している JavaScript の SDK を利用して実装。
JavaScript 以外の言語の SDK は公式ではないので注意。

### セットアップ

- Node.js のプロジェクトを作成
- `npm init` - `package.json` で ES モジュールを有効化

  ```json
  {
      "type": "module"
  }
  ```

- SDK と必要なパッケージをインストール
  - `npm install @notionhq/client`
  - `npm i --save dotenv`
- `.env` に `SECRET` と `DatabaseID` を記述
  - `.env` は `.gitignore` に入れるのを忘れない

## Notion API

- [Working with databases](https://developers.notion.com/docs/working-with-databases)

### Notion Client
初めに Notion Client のインスタンスを生成

```js
import { config } from 'dotenv';
import { Client } from '@notionhq/client';

config();

const secret = process.env.SECRET;
const databaseId = process.env.DatabaseID;

const notion = new Client({ auth: secret });  // インスタンス
```

### データの作成
Notion Database では一行に格納されるデータはすべて新規の「ページ」として作成される。
Notion Database で扱う属性（propaty）については後述の「プロパティ」参照。

`const res = await notion.pages.create({propaty_object})`

### データの読み込み
Notion Database ではクエリも Object として扱う。
以下は ID の一致するデータで絞り込みを行うための例

```js
const res = await notion.database.query({
  database_id: databaseId,
        filter: {
          property: 'ID',
          number: {
            equals: itemId,
          },
        },
})
```

### データの更新
データの更新では更新対象のページのページIDを用いてプロパティを指定することで更新可能

`const res = await notion.pages.update(dataForArchive);`

プロパティのオブジェクトには更新するものだけを詰めればOK

### データの削除
Notion API ではデータを完全削除することはできない。その代わりアーカイブすることでゴミ箱に移すことができる。
データの更新と同じ方法で `notion.pages.update(object)` の中に `archive: true` とするだけ

```js
const updateObject = {
  page_id: pageId,
  archived: true,
}
```

### プロパティ

Notion のプロパティを JavaScript から操作する場合、Object として扱う。
設定できる値と書式の例（一部のみ）は以下の通り。

```js
const notionProperty = {
  database_id: databaseId,
  properties: {
    
    Name: {
      title: [
        {
        text: {
          content: '',
          },
        },
      ],
    },
    URL: {
      url: '',
    },
    テキスト: {
      rich_text: [
        {
          text: {
            content: '',
            },
        },
      ],
    },
    メールアドレス: {
      email: '',
      },
    マルチセレクト: {
      multi_select: [
        {
          name: '',
        },
      ],
    },
  },
};

```

## Links

- [Notion Developers](https://developers.notion.com/)
- [Notion Database Propaties](https://developers.notion.com/reference/property-object)
- [Notion APIからDBアイテムを追加するときのプロパティごとの書き方](https://www.6666666.jp/blog/post/20210617/)
