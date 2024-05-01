# Notion API

Notion と Notion Database を操作するための機能いろいろ

## 実装

公式が出している JavaScript の SDK を利用して実装。

### セットアップ

- Node.js のプロジェクトを作成
- `npm init` - `package.json` で ES モジュールを有効化

  ```package.json
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

### プロパティ

## Links

- [Notion Developers](https://developers.notion.com/)
