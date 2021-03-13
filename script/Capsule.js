class Capsule {
    constructor() {
        this.students = [];
    }

    async create() {
        // Local storge is filled
        if(localStorage.getItem('myCapsule')){
            const data = getCapsuleLocalStorge();
            data.forEach(student => {
                const { id, firstName, lastName, capsule, age, city, gender, hobby, weather } = student;
                this.students.push(new Student(id, firstName, lastName, capsule, age, city, gender, hobby, weather));
            });
        }
        // Local storge is empty
        else {
            const dataOuter = await fetch('https://appleseed-wa.herokuapp.com/api/users/');
            const jsonOuter = await dataOuter.json();


            for(let i = 0; i < jsonOuter.length; i++){
                const dataInner = await fetch(`https://appleseed-wa.herokuapp.com/api/users/${jsonOuter[i].id}`);
                const jsonInner = await dataInner.json();

                // weather API
                const city = `${jsonInner.city}`;
                const country = 'israel';
                let weather;


                const weatherApi = 'http://api.openweathermap.org/data/2.5/weather?q='
                const endweatherApi = '&APPID=bc409db8acb7809321a860fe233a82e4'
                try {
                    const response = await fetch(`${weatherApi}${city},${country}${endweatherApi}`);
                    const data = await response.json();
                    weather = (parseInt(data.main.temp) - 273.15).toFixed(2);
                }
                catch(err){
                    weather = 'not found';
                }
                
                
                // creating students one by one 
                const newStudent = new Student(jsonOuter[i].id, jsonOuter[i].firstName, jsonOuter[i].lastName, jsonOuter[i].capsule, jsonInner.age, jsonInner.city, jsonInner.gender, jsonInner.hobby, weather);
                this.students.push(newStudent);
            };
        }
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

    deleteAll() {
        this.students = [];
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

    search(searchText, attribute) {
        return this.students.filter(student => student[attribute]
                                                .toString()
                                                .toLowerCase()
                                                .includes(searchText.toLowerCase()));
    }

    sort(arrow, attribute) {
        if(arrow === 'up'){
            if(attribute === 'id' || attribute === 'capsule' || attribute === 'age')
                this.students.sort((a,b) => a[attribute] - b[attribute]);
            else    
                this.students.sort((a,b) => a[attribute].toLowerCase() >= b[attribute].toLowerCase() ? 1 : -1)
        } 
        else {
            if(attribute === 'id' || attribute === 'capsule' || attribute === 'age')
                this.students.sort((a,b) => b[attribute] - a[attribute]);
            else    
                this.students.sort((a,b) => a[attribute].toLowerCase() < b[attribute].toLowerCase() ? 1 : -1)
        }
    }

    getAllData() { 
        const result = [];
        for(let i = 0; i < this.students.length; i++){
            const student = this.students[i];
            result.push({
                id: student.getId(),
                firstName: student.getFirstName(),
                lastName: student.getLastName(),
                capsule: student.getCapsule(),
                age: student.getAge(),
                city: student.getCity(),
                gender: student.getGender(),
                hobby: student.getHobby(),
                weather: student.getWeather(),
            })
        }
        return result;
    }
}

const capsule = new Capsule();



