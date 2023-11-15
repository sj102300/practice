import database from "../../../database";
import { UserService } from '../../users/service';
import { CreateUserDTO } from '../../users/dto/create-user.dto';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();



export class AuthService {

    userService

    constructor(){
        this.userService = new UserService();
    }
    
    //여기서 props는 registerDTO
    async register(props){
        const isExist = await this.userService.checkUserByEmail(props.email);

        if(isExist) throw { status: 400, message: "이미 존재하는 이메일입니다"};

        const newUserId = await this.userService.createUser(
            new CreateUserDTO({
                ...props,
                password: await props.hashPassword(),
            })
        )
        
        const accessToken = jwt.sign({ id: newUserId }, process.env.JWT_KEY, {
            expiresIn: "1h"
        });
        const refreshToken = jwt.sign({ id: newUserId }, process.env.JWT_KEY, {
            expiresIn: "7d"
        });
        console.log(accessToken, refreshToken);

        return { accessToken, refreshToken };

    }

    //여기 props에는 login.dto가 들어옴
    async login(props){
        const isExist = await this.userService.checkUserByEmail(props.email);
        
        if(!isExist) throw { status: 404, message: "존재하지 않는 이메일입니다."};
        
        const user = isExist;

        const isCorrect = await props.comparePassword(user.password);

        if(!isCorrect) throw { status: 400, message: "비밀번호가 틀렸습니다."};

        
        const accessToken = jwt.sign({ id: user.id }, process.env.JWT_KEY, {
            expiresIn: "1h"
        });
        const refreshToken = jwt.sign({ id: user.id }, process.env.JWT_KEY, {
            expiresIn: "7d"
        });
        console.log(accessToken, refreshToken);

        return { accessToken, refreshToken };
    }

    async refresh(props){
        const accessTokenPayload = jwt.verify(props.accessToken, process.env.JWT_KEY, {
            ignoreExpiration: true
        });
        const refreshTokenPayload = jwt.verify(props.refreshToken, process.env.JWT_KEY)

        if(accessTokenPayload.id !== refreshTokenPayload.id) throw {status: 403, message:"권한이 없습니다."};

        const user = await this.userService.findUserById(accessTokenPayload.id);

        const accessToken = jwt.sign({ id: user.id }, process.env.JWT_KEY, {
            expiresIn: "1h"
        });
        const refreshToken = jwt.sign({ id: user.id }, process.env.JWT_KEY, {
            expiresIn: "7d"
        });

        return { accessToken, refreshToken };

    }

}