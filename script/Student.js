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

    switchEditMode() { this.atEditMode = !this.atEditMode; }
}