# Notion API
Notion と Notion Database を操作するための機能いろいろ

## 実装
公式が出している JavaScript の SDK を利用して実装。JS 以外の SDK もあるが公式のものではない。

### セットアップ

- Node.js のプロジェクトを初期化
    - `npm init`
    - `package.json` でESモジュールを有効化

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


## Links

- [Notion Developers](https://developers.notion.com/)