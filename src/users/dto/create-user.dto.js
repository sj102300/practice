export class CreateUserDTO{

    name;
    age;
    phoneNumber;

    constructor(user){
        this.name = user.name;
        this.age = user.age;
        this.phoneNumber = user.phoneNumber;
    }

}