export function hello(){
    return "Hello World!";
}

export class Student{
    id = undefined;
    name = undefined;

    constructor(id, name){
        this.id = id,
        this.name = name;
    }

    getStudent(){
        return {id: this.id, name: this.name};
    }
}