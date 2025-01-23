// server.js (Express 서버 설정)

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 5000;

// MongoDB 연결
mongoose.connect('mongodb://localhost:27017/react', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', (err) => {
  console.error('MongoDB 연결 오류:', err);
});
db.once('open', () => {
  console.log('MongoDB 연결 성공!');
});

// 미들웨어 설정
app.use(cors());  // CORS 설정 (다른 포트에서 요청 허용)
app.use(bodyParser.json());  // JSON 요청 본문 파싱

// User 스키마 및 모델 설정
const userSchema = new mongoose.Schema({
  userId: String,
  userPassword: String,  // 실제 서비스에서는 비밀번호를 해시화하여 저장해야 합니다.
}, { collection: 'user' });

// todo 스키마 및 모델 설정
const todoSchema = new mongoose.Schema({
  userId: String,
  insertDate: String,
  content: String
}, { collection: 'todos' });


const User = mongoose.model('user', userSchema); // db.collection('user')
const Todo = mongoose.model('todos', todoSchema); // db.collection('user')

// 로그인 API 엔드포인트 설정
app.post('/login', async (req, res) => {
  const { userId, userPassword } = req.body;
  // DB에서 사용자 찾기
  const user = await User.findOne({ userId: userId });

  if (!user) {
    return res.status(400).json({ message: '사용자를 찾을 수 없습니다.' });
  }

  if (user.userPassword === userPassword) {
    // 비밀번호가 맞으면 성공 응답
    return res.status(200).json({ message: '로그인 성공' });
  } else {
    // 비밀번호가 틀리면 오류 응답
    return res.status(400).json({ message: '비밀번호가 틀립니다.' });
  }
});

// todo 목록 Api 엔드포인트 설정
app.post('/todo/list', async (req, res) => {
  const { userId } = req.body;
  try {
    // DB에서 사용자별 투두 목록을 찾습니다.
    const todos = await Todo.find({ userId: userId });

    // 클라이언트에게 투두 목록을 JSON 형태로 응답합니다.
    return res.json(todos);
  } catch (error) {
    // 오류 발생 시 클라이언트에게 500 상태 코드와 오류 메시지를 보냅니다.
    return res.status(500).json({ error: '서버 오류가 발생했습니다.' });
  }
});

// todo 등록 Api 엔드포인트 설정
app.post('/todo/insert', async (req, res) => {
  const { userId, insertDate, content } = req.body;
  try {
    const newTodo = new Todo({ userId: userId, insertDate : insertDate, content : content});
    await newTodo.save();

    res.status(200).json({ status: 'S' });
  } catch (error) {
    // 오류 발생 시 클라이언트에게 500 상태 코드와 오류 메시지를 보냅니다.
    res.status(500).json({ error: '서버 오류가 발생했습니다.' });
  }
});

// todo 삭제 Api 엔드포인트 설정
app.post('/todo/delete', async (req, res) => {
  const { _id } = req.body;
  try {
    const result = await Todo.deleteOne({ _id: _id }); // _id로 todo 삭제
    if (result.deletedCount > 0) {
      res.status(200).json({ message: 'Todo 삭제 성공' });
    } else {
      res.status(404).json({ message: '해당 Todo를 찾을 수 없습니다.' });
    }
  } catch (error) {
    res.status(500).json({ error: '삭제 중 오류가 발생했습니다.' });
  }
});

// todo 여러건 삭제 Api 엔드포인트 설정
app.post('/todo/deleteMany', async (req, res) => {
  const { _ids } = req.body; // 요청에서 삭제할 ID 목록 받기

  try {
    // deleteMany 요청 처리
    await Todo.deleteMany({ _id: { $in: _ids } });
    res.status(200).json({ message: 'Todos 삭제 성공' });
  } catch (error) {
    console.error('삭제 중 오류 발생:', error);
    res.status(500).json({ error: '삭제 중 오류가 발생했습니다.' });
  } 
});


app.listen(PORT, () => {
  console.log(`서버가 ${PORT}번 포트에서 실행 중...`);
});
