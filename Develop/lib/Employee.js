// TODO: Write code to define and export the Employee class
class Employee {
    constructor(name, id){
        this.name = name
        this.id = id
        this.role = "Employee"
    }

    getName(){
        return this.name
    }
}

module.exports = Employee;

