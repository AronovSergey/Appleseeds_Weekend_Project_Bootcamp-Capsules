class Student {
    constructor(_id, _firstName, _lastName, _capsule, _age, _city, _gender, _hobby, _weather) {
        this.id = parseInt(_id);
        this.firstName = _firstName;
        this.lastName = _lastName;
        this.capsule = parseInt(_capsule);
        this.age = parseInt(_age);
        this.city = _city;
        this.gender = _gender;
        this.hobby = _hobby;
        this.weather = _weather;
        this.atEditMode = false;
    }

    getId() { return this.id; }
    getFirstName() { return this.firstName; }
    getLastName() { return this.lastName; }
    getCapsule() { return this.capsule; }
    getAge() { return this.age; }
    getCity() { return this.city; }
    getGender() { return this.gender; }
    getHobby() { return this.hobby; }
    getWeather() { return this.weather; }
    getAtEditMode() { return this.atEditMode; }

    setFirstName(_firstName) { this.firstName = _firstName; }
    setLastName(_lastName) { this.lastName = _lastName; }
    setCapsule(_capsule) { this.capsule = parseInt(_capsule); }
    setAge(_age) { this.age = parseInt(_age); }
    setCity(_city) { this.city = _city; }
    setGender(_gender) { this.gender = _gender; }
    setHobby(_hobby) { this.hobby = _hobby; }
    async setWeather(_city) { 
        try {
            const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${_city},israel&APPID=bc409db8acb7809321a860fe233a82e4`);
            const data = await response.json();
            this.weather = (parseInt(data.main.temp) - 273.15).toFixed(2);
        }
        catch(err){
            this.weather = 'not found';
        }
    }

    switchEditMode() { this.atEditMode = !this.atEditMode; }
}