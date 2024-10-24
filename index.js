const express = require('express')
const app = express()
const port = 3000
const cors = require('cors')
require('dotenv').config(); // .env 파일에서 환경 변수 로드
const { MongoClient } = require('mongodb');

app.use(cors())
const uri = process.env.MONGO_URI;

const client = new MongoClient(uri);

async function run() {
    try {
        // MongoDB 클라이언트를 연결
        await client.connect();

        // 데이터베이스 및 컬렉션 선택
        const database = client.db("sample_mflix");
        const collection = database.collection("movies");

        // 간단한 문서 삽입
        const doc = { name: "MongoDB", type: "Database" };
        const result = await collection.insertOne(doc);
        console.log(`New document inserted with _id: ${result.insertedId}`);

    } finally {
        // 클라이언트 연결 종료
        await client.close();
    }
}

run().catch(console.dir);

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/sound/:name', (req, res) => {
  const {name}=req.params;
  let sound='';
  console.log(name);
  if(name==='dog'){
    sound = '멍멍';
  }else if(name==='cat'){
    sound ='야옹';
  }
  res.json({
    'sound': sound
  });
})
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})