export class UpdateUserDTO{
    name;
    age;
    phoneNumber;

    constructor(user){
        this.name = user.name ?? undefined;
        this.age = user.age ?? undefined;
        this.phoneNumber = user.phoneNumber ?? undefined;
    }

}