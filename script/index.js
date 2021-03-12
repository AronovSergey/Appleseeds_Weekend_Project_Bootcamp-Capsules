const tableBody = document.querySelector('tbody');

drawTheTable();

/*--------------------------
~~~~~~~Create Section~~~~~~~ 
--------------------------*/
async function drawTheTable(data = null) {
    if(capsule.getStudents().length === 0)
        await capsule.create();

    let students;
    if(data){
        students = data;
    }
    else {
        students = capsule.getStudents();
    }
    
    tableBody.innerHTML = '';
    
    for(let i = 0; i < students.length; i++){
        if(students[i].getAtEditMode())
            tableBody.innerHTML += `<tr id="${students[i].getId()}">${studentToTableEditableRowString(students[i])}</tr>`;
        else
            tableBody.innerHTML += `<tr id="${students[i].getId()}">${studentToTableRowString(students[i])}</tr>`;
    }

    addEventListenerToAllButtons();
}

function studentToTableRowString(student) {
    return `
        <td class="id-column">${student.getId()}</td>
        <td class="first-name-column">${student.getFirstName()}</td>
        <td class="last-name-column">${student.getLastName()}</td>
        <td class="capsule-column">${student.getCapsule()}</td>
        <td class="age-column">${student.getAge()}</td>
        <td class="city-column">${student.getCity()}</td>
        <td class="gender-column">${student.getGender()}</td>
        <td class="hobby-column">${student.getHobby()}</td>
        <td class="button-column">
            <span class="edit-button"><i class="fas fa-edit"></i></span>
            <span class="delete-button"><i class="fas fa-trash"></i></span>
        </td>`;
}

function studentToTableEditableRowString(student) {
    return `
        <td class="id-column">${student.getId()}</td>
        <td class="first-name-column"><input value="${student.getFirstName()}"></td>
        <td class="last-name-column"><input value="${student.getLastName()}"></td>
        <td class="capsule-column"><input value="${student.getCapsule()}"></td>
        <td class="age-column"><input value="${student.getAge()}"></td>
        <td class="city-column"><input value="${student.getCity()}"></td>
        <td class="gender-column"><input value="${student.getGender()}"></td>
        <td class="hobby-column"><input value="${student.getHobby()}"></td>
        <td class="button-column">
            <span class="save-button"><i class="fas fa-check"></i></span>
            <span class="close-button"><i class="fas fa-times"></i></span>
        </td>`;
}

/*-----------------------------------
~~~~~~~Edit And Delete Section~~~~~~~ 
-----------------------------------*/
function addEventListenerToAllButtons () {
    const editButtonsList = document.querySelectorAll('.edit-button');
    const deleteButtonsList = document.querySelectorAll('.delete-button');
    const closeButtonsList = document.querySelectorAll('.close-button');
    const saveButtonsList = document.querySelectorAll('.save-button');
    

    editButtonsList.forEach(button => {    
        const id = button.parentElement.parentElement.getAttribute('id');
        button.addEventListener('click', (function(id){
            return function(){ openAndCloseEditModeEventHandler(id) }
        })(id));
    });

    closeButtonsList.forEach(button => {    
        const id = button.parentElement.parentElement.getAttribute('id');
        button.addEventListener('click', (function(id){
            return function(){ openAndCloseEditModeEventHandler(id) }
        })(id));
    });

    deleteButtonsList.forEach(button => {    
        const id = button.parentElement.parentElement.getAttribute('id');
        button.addEventListener('click', (function(id){
            return function(){ deleteEventHandler(id) }
        })(id));
    });

    saveButtonsList.forEach(button => {    
        const tableRow = button.parentElement.parentElement;
        button.addEventListener('click', (function(inputs){
            return function(){ saveEventHandler(inputs) }
        })(tableRow.children));
    });
}

function openAndCloseEditModeEventHandler(id) {
    const student = capsule.getStudent(id);
    student.switchEditMode();
    drawTheTable();
}

function deleteEventHandler(id) {
    capsule.delete(id);
    drawTheTable();
}

function saveEventHandler(inputs) {
    capsule.update({
        id: inputs[0].textContent,
        firstName: inputs[1].firstElementChild.value,
        lastName: inputs[2].firstElementChild.value,
        capsule: inputs[3].firstElementChild.value,
        age: inputs[4].firstElementChild.value,
        city: inputs[5].firstElementChild.value,
        gender: inputs[6].firstElementChild.value,
        hobby: inputs[7].firstElementChild.value,
    });
    drawTheTable();
}

/*----------------------------
~~~~~~Searchbox Section~~~~~~~ 
----------------------------*/
const searchBarInput = document.querySelector('.searchbox__input');
const searchBarSelect = document.querySelector('.searchbox__select');

searchBarInput.addEventListener('keyup', () => {
    drawTheTable(capsule.search(searchBarInput.value, searchBarSelect.value));
});

searchBarSelect.addEventListener('change', () => {
    searchBarInput.value = '';
});