import express from "express";
import NotionAccess from './src/NotionAccess.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// TODO: Web API はまだ実験段階なので全部 GET で関数叩いているだけ

const filePath = "./data/data.csv"

app.get('/', (req, res) => {
    res.json([
        { message: 'It Works' },
    ]);
});

app.get('/createPageFromCsv', async (req, res) => {
    const result = await NotionAccess.createPageFromCsv(filePath);
    res.json([
        { response: result },
    ]);
});

app.get('/createPagesFromCsv', async (req, res) => {
    const result = await NotionAccess.createPagesFromCsv(filePath);
    res.json([
        { response: result },
    ]);
});

app.get('/getPageById', async (req, res) => {
    const pageId = ""
    const result = await NotionAccess.getPageById(pageId);
    res.json([
        { response: result },
    ]);
});

app.get('/getLatestData', async (req, res) => {
    const result = await NotionAccess.getLatestData();
    res.json([
        { response: result },
    ]);
});

app.get('/getDataBySpecifyingNumber', async (req, res) => {
    const num = 50;
    const result = await NotionAccess.getDataBySpecifyingNumber(num);
    res.json([
        { response: result },
    ]);
});

app.listen(3000, () => console.log('Local Server is Running on http://localhost:3000/'));



// const res = await NotionAccess.getDataBySpecifyingNumber(50)
