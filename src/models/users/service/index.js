import database from "../../../database";

export class UserService {

    async checkUserByEmail(email){
        const user = await database.user.findUnique({
            where:{
                email
            }
        });
        if(!user) return false;
        return user;
    }

    async findUserById(id) {
        const user = await database.user.findUnique({
            where: {
                id
            }
        })
        if (!user) throw { status: 404, message : "유저를 찾을 수 없습니다!" };
        return user
    }

    async findUserWithPosts(id){
        const user = await database.user.findMany({
            where: {
                id
            },
            include: {
                posts: true,
            },
        });
        if (!user) throw { status: 404, message: "유저를 찾을 수 없습니다!'"};
        return user;
    }

    async findUsers({skip, take}) {
        const users = await database.user.findMany({
            skip, take
        });
        const count = await database.user.count();
        return { users, count }
    }

    async createUser(props) {
        const newUser = await database.user.create({
            data: {
                name:props.name,
                age: props.age,
                phoneNumber: props.phoneNumber,
                email: props.email,
                password: props.password,
            }
        })
        return newUser.id;
    }

    async updateUser(id, props) {
        const isExist = await database.user.findUnique({
            where: {
                id,
            }
        });
        if(!isExist) throw { status:404, message: "유저를 찾을 수 없습니다!" }
        await database.user.update({
            where: {
                id: isExist.id,
            },
            data: {
                name:props.name,
                age: undefined, // age에 대해서는 update를 하지않겠다 -> undefined값을 주면 됨
                phoneNumber: props.phoneNumber,
                email: props.email
            }
        })
    }

    async deleteUser(id) {
        const isExist = await database.user.findUnique({
            where: {
                id,
            }
        });
        if(!isExist) throw { status:404, message: "유저를 찾을 수 없습니다!" }
        await database.user.delete({
            where: {
                id: isExist.id,
            },
        })
    }
}