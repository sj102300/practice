import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
import database from "../database";
dotenv.config();

export const jwtAuth = async(req,res,next) => {
    try{
        const headers = req.headers;
        const authorization = headers["Authorization"] || headers["authorization"];

        if(authorization?.includes("bearer") || authorization?.includes("Bearer")){
            if(typeof authorization === "string") {
                const bearers = authorization.split(" ");
                //bearers = ["Bearer", "token~~~~"]
                if(bearers.length === 2 && typeof bearers[1] === "string" ){   
                    const accessToken = bearers[1];
                    
                    const decodedToken = jwt.verify(accessToken, process.env.JWT_KEY);
                    
                    const user = await database.user.findUnique({
                        where:{
                            id: decodedToken.id
                        }
                    })

                    if(user){
                        req.user = user;
                        next();
                    }
                    else throw {status: 404, message: "유저를 찾을 수 업습니다."}

                }
                else throw { status: 400, message: "token이 잘못되었습니다."}
            }
            else throw { status: 400, message: "token이 잘못되었습니다."}
        }
        else next(err);

    }catch(err){
        next({...err, status: 403});
        //인가 관련된 에러는 403
    }
}