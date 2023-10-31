import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import dayjs from 'dayjs'
import Controllers from './controllers';
import { swaggerDocs, options } from './swagger';
import swaggerUI from 'swagger-ui-express';
// import dotenv from 'dotenv';
// const config = dotenv.config();
// config.parsed();
import database from "./database"


(async () => {
    await database.$connect(); // db연동
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
    Controllers.forEach((controller) => {
        app.use(controller.path, controller.router);
    })

    //스웨거 ui 만들기 
    app.get("/swagger.json", (req, res) => {
        res.status(200).json(swaggerDocs);
    });
    app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(undefined, options));


    //error middleware 달기
    app.use((err, req, res, next) => {
        console.log(err);
        res.status(err.status || 500).json({ message: err.message || '서버에서 에러가 발생했습니다.' });
    })

    const today = new Date();
    const todayTodayjs = dayjs(today).format('YYYY-MM-DD');
    console.log(todayTodayjs);



})()