import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import dayjs from 'dayjs'
import Controllers from './controllers';

//yarn add express
const app = express();

//application level middleware
app.use(express.urlencoded({ extended: true, limit: '700mb' }));
app.use(express.json());
app.use(cors({ origin: '*' }));
app.use(helmet());
app.listen(8000, () => {
    console.log('server is running on port 8000');
})

Controllers.forEach((controller)=>{
    app.use(controller.path, controller.router);
})

//유저 정보 수정
app.patch('/users/:id', (req, res) => {
    let id = Number(req.params.id);
    console.log(id);
    let targetUserIdx = users.findIndex((user) => user.id === id);
    //없는 유저 정보를 수정하는 경우
    if(targetUserIdx === -1){
        return res.status(500).json();
    }
    users[targetUserIdx].name = req.body.name;
    users[targetUserIdx].age = req.body.age;
    res.status(204).json({});
})

//유저 삭제
app.delete('/users/:id', (req, res) => {
    let id = Number(req.params.id);
    users = users.filter((user)=>{
        return user.id !== id;
    })
    res.status(204).json({});
})

const today = new Date();
const todayTodayjs = dayjs(today).format('YYYY-MM-DD');
console.log(todayTodayjs);


