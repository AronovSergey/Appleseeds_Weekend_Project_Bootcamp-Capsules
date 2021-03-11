const tableBody = document.querySelector('tbody');

drawTheTable();

/*--------------------------
~~~~~~~Create Section~~~~~~~ 
--------------------------*/
async function drawTheTable() {
    await capsule.create();

    const students = capsule.getStudents();

    tableBody.innerHTML = '';
    
    for(let i = 0; i < students.length; i++){
        tableBody.innerHTML += `<tr>
            <td class="column1">${students[i].id}<td>
            <td class="column2">${students[i].firstName}<td>
            <td class="column3">${students[i].lastName}<td>
            <td class="column4">${students[i].capsule}<td>
            <td class="column5">${students[i].age}<td>
            <td class="column6">${students[i].city}<td>
            <td class="column7">${students[i].gender}<td>
            <td class="column8">${students[i].hobby}<td>
            <td class="column9">
                <span class="edit-button"><i class="fas fa-edit"></i></span>
                <span class="delete-button"><i class="fas fa-trash"></i></span>
            <td>
        </tr>`;
    }

    addEventListenerToAllButtons();
}

/*-----------------------------------
~~~~~~~Edit And Delete Section~~~~~~~ 
-----------------------------------*/
function addEventListenerToAllButtons () {
    const editButtonsList = document.querySelectorAll('.edit-button');
    const deleteButtonsList = document.querySelectorAll('.delete-button');
    const firstColumnList = document.querySelectorAll('.column1');

    editButtonsList.forEach((button, index) => {    
        const id = firstColumnList[index + 1].textContent;
        button.addEventListener('click', (function(id){
            return function(){ editEventHandler(id) }
        })(id));
    });

    deleteButtonsList.forEach((button, index) => {    
        const id = firstColumnList[index + 1].textContent;
        button.addEventListener('click', (function(id){
            return function(){ deleteEventHandler(id) }
        })(id));
    });
}
function editEventHandler (id) {
    console.log(`edit ${id}`);
}function deleteEventHandler (id) {
    console.log(`delete ${id}`);
}