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

}