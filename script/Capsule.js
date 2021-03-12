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

            const proxy = 'https://api.codetabs.com/v1/proxy/?quest';
            const baseEndpoint = 'http://api.openweathermap.org/data/2.5/weather?q=${jsonInner.city}&appid=bc409db8acb7809321a860fe233a82e4';
            
            const weatherData = await fetch(`${proxy}=${baseEndpoint}`);

            console.log(weatherData);

            const newStudent = new Student(jsonOuter[i].id, jsonOuter[i].firstName, jsonOuter[i].lastName, jsonOuter[i].capsule, jsonInner.age, jsonInner.city, jsonInner.gender, jsonInner.hobby);
            this.students.push(newStudent);
        };
    }

    findIndex(id) {
        return this.students.map(student => student.getId()).indexOf(id);
    }

    getStudents() { return this.students; }

    delete(id) {
        const index = this.findIndex(parseInt(id));
        if(index > -1){
            this.students.splice(index, 1);
            return true;
        }
        return false;
    }

    getStudent(id) {
        const index = this.findIndex(parseInt(id));
        if(index > -1){
            return this.students[index];
        }
        return false;
    }
    
    update(object) {
        const index = this.findIndex(parseInt(object.id));
        this.students[index].setFirstName(object.firstName);
        this.students[index].setLastName(object.lastName);
        this.students[index].setCapsule(object.capsule);
        this.students[index].setAge(object.age);
        this.students[index].setCity(object.city);
        this.students[index].setGender(object.gender);
        this.students[index].setHobby(object.hobby);
        this.students[index].switchEditMode();
    }

    search(searchText, attribute){
        return this.students.filter(student => student[attribute]
                                                .toString()
                                                .toLowerCase()
                                                .includes(searchText.toLowerCase()));
    }
}

const capsule = new Capsule();



