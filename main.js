import NotionAccess from "./src/NotionAccess.js"

const res = await NotionAccess.getDataById(1)
console.log(res);