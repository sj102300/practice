export class UsersDTO{
    id;
    name;
    age;
    phoneNumber;
    email;

    constructor(user){
        this.id = user.id;
        this.name = user.name;
        this.age = user.age;
        this.phoneNumber = user.phoneNumber;
        this.email = user.email;
    }

}