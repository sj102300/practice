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
        this.router.get('/detail/:id', this.getUser.bind(this));
        this.router.post('/', this.createUser.bind(this));
    }

    getUsers(req, res) {
        res.status(200).json({ users: this.users });
    }

    getUser(req, res) {
        let id = Number(req.params.id);
        let user = this.users.find((user) => { return user.id === id });
        res.status(200).json({ user });
    }

    createUser(req, res) {
        this.users.push({
            id: new Date().getTime(),
            name: req.body.name,
            age: req.body.age
        })
        res.status(201).json({ users: this.users });
    }
}

const userController = new UserController();
export default userController;