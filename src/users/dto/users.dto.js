export class UsersDTO{
    id;
    name;
    age;
    phoneNumber

    constructor(user){
        this.id = user.id;
        this.name = user.name;
        this.age = user.age;
        this.phoneNumber = user.phoneNumber;
    }

    getFullName(){
        return this.firstName + ' ' + this.lastName;
    }
}