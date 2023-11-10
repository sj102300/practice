export class CreateUserDTO{

    name;
    age;
    phoneNumber;
    email;
    password;

    constructor(user){
        this.name = user.name;
        this.age = user.age;
        this.phoneNumber = user.phoneNumber;
        this.email = user.email;
        this.password = user.password ?? undefined;
    }

}