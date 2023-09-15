import { Router } from 'express';

//Router
class UserController {
    router;
    path = '/users';
    users = [
        {
            id: 1,
            name: 'sj',
            age: 21
        }
    ];
    constructor() {
        this.router = Router();
        this.init();
    }

    init() {
        this.router.get('/', this.getUsers.bind(this));
        this.router.get('/:id', this.getUser.bind(this));
        this.router.post('/', this.createUser.bind(this));
        this.router.patch('/:id', this.updateUser.bind(this));
        this.router.patch('/:id', this.updateUser.bind(this));
    }

    getUsers(req, res, next) {
        try {
            res.status(200).json({ users: this.users });
        }
        catch (err) {
            next(err);
        }
    }

    getUser(req, res, next) {
        try {
            let id = Number(req.params.id);
            let user = this.users.find((user) => { return user.id === id });
            if (user === undefined) {
                throw { status: 404, message: '유저를 찾을 수 없습니다' };
            }
            res.status(200).json({ user });
        }
        catch (err) {
            next(err);
        }
    }

    createUser(req, res, next) {
        try {
            if (req.body.name === undefined) {
                throw { status: 400, message: '이름이 없습니다.' };
            }
            if (req.body.age === undefined) {
                throw { status: 400, message: '나이가 없습니다.' };
            }
            this.users.push({
                id: new Date().getTime(),
                name: req.body.name,
                age: req.body.age
            })
            res.status(201).json({ users: this.users });
        }
        catch (err) {
            next(err);
        }
    }

    updateUser(req, res, next) {
        try {
            let id = Number(req.params.id);
            let targetUserIdx = users.findIndex((user) => user.id === id);
            //없는 유저 정보를 수정하는 경우
            if (targetUserIdx === -1) {
                throw { status: 404, message: '유저를 찾을 수 없습니다.' };
            }
            if (req.body.name === undefined) {
                throw { status: 400, message: '이름이 없습니다' }
            }
            if (req.body.age === undefined) {
                throw { status: 400, message: '나이가 없습니다.' };
            }
            users[targetUserIdx].name = req.body.name;
            users[targetUserIdx].age = req.body.age;
            res.status(204).json({});
        }
        catch (err) {
            next(err);
        }
    }

    deleteUser(req, res, next) {
        try {
            let id = Number(req.params.id);
            let targetUserIdx = users.findIndex((user) => user.id === id);
            //없는 유저 정보를 삭제하는 경우
            if (targetUserIdx === -1) {
                throw { status: 404, message: '유저를 찾을 수 없습니다.' };
            }
            users = users.filter((user) => {
                return user.id !== id;
            })
            res.status(204).json({});
        }
        catch (err) {
            next(err);
        }
    }
}

const userController = new UserController();
export default userController;