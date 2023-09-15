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

//controller 달기
Controllers.forEach((controller)=>{
    app.use(controller.path, controller.router);
})


//error middleware 달기
app.use((err, req, res, next)=>{
    console.log(err);
    res.status(err.status || 500 ).json({ message: err.message || '서버에서 에러가 발생했습니다.'});
})

const today = new Date();
const todayTodayjs = dayjs(today).format('YYYY-MM-DD');
console.log(todayTodayjs);


