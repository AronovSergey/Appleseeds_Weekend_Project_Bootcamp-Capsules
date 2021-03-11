class Capsule {
    constructor() {
        this.students = [];
    }

    async create() {
        const dataOuter = await fetch('https://appleseed-wa.herokuapp.com/api/users/');
        const jsonOuter = await dataOuter.json();


        for(let i = 0; i < jsonOuter.length; i++){
            const dataInner = await fetch(`https://appleseed-wa.herokuapp.com/api/users/${jsonOuter[i].id}`);

            const jsonInner = await dataInner.json();

            const newStudent = new Student(jsonOuter[i].id, jsonOuter[i].firstName, jsonOuter[i].lastName, jsonOuter[i].capsule, jsonInner.age, jsonInner.city, jsonInner.gender, jsonInner.hobby);
            this.students.push(newStudent);
        };
    }

    findIndex(id) {
        return this.students.map(student => item.getId()).indexOf(id);
    }

    getStudents() { return this.students; }

    delete(id) {
        const index = findIndex(id);
        if(index > -1){
            this.students.splice(index, 1);
            return true;
        }
        return false;
    }
    
}

const capsule = new Capsule();



