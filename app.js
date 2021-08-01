(function() {
    var App = {
        htmlElements: {
            studentForm: document.getElementById('student_form'),
            studentsList: document.getElementById('students_list'),
            studentsName: document.getElementById('student_name'),
            studentsAge: document.getElementById('student_age'),
            studentsHobbies: document.getElementById('student_hobbies'),
            studentId: document.getElementById('student_id')
        },

        init: () => {

            App.htmlElements.studentForm.addEventListener('submit', App.events.studentFormOnSubmit);
        },
        events: {
            studentFormOnSubmit: (event) => {
                event.preventDefault();
                const { 
                    student_name: studentNameInput,
                    student_age: studentAgeInput,
                    student_hobbies: studentHobbiesInput
                } = event.target.elements;
                const studentName = studentNameInput.value;
                const studentAge = studentAgeInput.value;
                const studentHobbies = studentHobbiesInput.value;
                App.utils.addStudentToList({ 
                    studentId: App.htmlElements.studentId,
                    tableBody: App.htmlElements.studentsList,
                    studentName,
                    studentAge,
                    studentHobbies,
                });
            },
        

        studentDelete: (event) => {
            event.preventDefault();
            const student_id = event.target.id;
            App.utils.deleteStudent(student_id);

        },

        studentUpdate: (event) => {
            event.preventDefault();
            const student_id = event.target.id.substr(7);
            App.id = student_id;
            App.utils.updateStudent(student_id);
        },

        DataUpdate: (event) => {
            event.preventDefault();
            const student_id = event.target.id.substr(5);
            App.id = student_id;
            App.utils.updateData(student_id);
        },

        },

        utils: {
            addStudentToList: ({ studentId, tableBody, studentName, studentAge, studentHobbies }) => {
                studentId.innerHTML = Number(studentId.innerHTML)+1;
                const newRow = 
                `<tr id="${studentId.innerHTML}">
                <td id="name_${studentId.innerHTML}">${studentName}</td>
                <td id="age_${studentId.innerHTML}">${studentAge}</td>
                <td id="hobbies_${studentId.innerHTML}">${studentHobbies}</td>
                <td><button type="button" id="delete_${studentId.innerHTML}" class='btn btn-danger'>Eliminar</button></td>
                <td><button type="button" id="update_${studentId.innerHTML}" class='btn btn-primary'>Actualizar</button></td>
                </tr>`;

                tableBody.insertAdjacentHTML('beforeend', newRow);
                document.getElementById('delete_'+studentId.innerHTML).addEventListener('click', App.events.studentDelete);
                document.getElementById('update_'+studentId.innerHTML).addEventListener('click', App.events.studentUpdate);
                document.getElementById('student_form').reset(); 
            },

            deleteStudent: (studentId) => {
                parentCell = document.getElementById(studentId).parentElement;
                parentRow = parentCell.parentElement;
                parentRow.remove();
                
            },

            updateStudent: (studentId) => {
                App.utils.getData(studentId);
                
                const rowToUpdate =
                `<tr id="u${studentId}" class="onUpdate">
                <td><input type="text" id="nameU_${studentId}" value="${App.Variables.name}"> </td>
                <td><input type="text" id="ageU_${studentId}"  value="${App.Variables.age}"> </td>
                <td><input type="text" id="hobbiesU_${studentId}" value="${App.Variables.hobbies}"> </td>
                
                <td><button type="button" id="save_${studentId}" class='btn btn-success'>Guardar</button></td>
                </tr>`;

                App.utils.disableAllButtons();
                
                document.getElementById('update_'+studentId).setAttribute('disabled', 'disabled');
                document.getElementById('delete_'+studentId).setAttribute('disabled', 'disabled');
                document.getElementsByTagName('tr')[studentId].insertAdjacentHTML('afterend',rowToUpdate);
                document.getElementById('save_'+studentId).addEventListener('click', App.events.DataUpdate);

            },

            updateData: (studentId) => {
                App.utils.getDataUpdated(studentId);
                
                document.getElementsByTagName('tr')[studentId].remove();
                const newRow = 
                `<tr id="${studentId}">
                <td id="name_${studentId}">${App.Variables.name}</td>
                <td id="age_${studentId}">${App.Variables.age}</td>
                <td id="hobbies_${studentId}">${App.Variables.hobbies}</td>
                <td><button type="button" id="delete_${studentId}" class='btn btn-danger'>Eliminar</button></td>
                <td><button type="button" id="update_${studentId}" class='btn btn-primary'>Actualizar</button></td>
                </tr>`;
                
                document.getElementsByTagName('tr')[studentId].insertAdjacentHTML('beforebegin',newRow);
                document.getElementsByTagName('tr')['u'+studentId].remove();

                document.getElementById('delete_'+studentId).addEventListener('click', App.events.studentDelete);
                document.getElementById('update_'+studentId).addEventListener('click', App.events.studentUpdate);

                App.utils.enableAllButtons();
            },

            getDataUpdated: (id)=>{
                App.Variables.name = document.getElementById('nameU_'+id).value;
                App.Variables.age = document.getElementById('ageU_'+id).value;
                App.Variables.hobbies = document.getElementById('hobbiesU_'+id).value;
            },



            getData: (id)=>{
                App.Variables.name = document.getElementById('name_'+id).innerText;
                App.Variables.age = document.getElementById('age_'+id).innerText;
                App.Variables.hobbies = document.getElementById('hobbies_'+id).innerText;

                
            },

            disableAllButtons: ()=>{
                let Rows = document.getElementById("table_student").rows.length;

                for (i=1; i<Rows;i++){
                    document.getElementById('update_'+i).setAttribute('disabled', 'disabled');
                    document.getElementById('delete_'+i).setAttribute('disabled', 'disabled');

                    console.log("disables");
                }
                console.log(Rows);
            },

            enableAllButtons:()=>{
                let Rows = document.getElementById("table_student").rows.length;

                for (i=1; i<Rows;i++){
                    document.getElementById('update_'+i).removeAttribute('disabled', 'disabled');
                    document.getElementById('delete_'+i).removeAttribute('disabled', 'disabled');

                    console.log("enables");
                }
                console.log(Rows);
            },

           
        },
        Variables: {
            id: '',
            name:'',
            age:'',
            hobbies:'',
        },
        
    }
    App.init();
})();

deleteRow = (Row) => {
    Row.parentElement.parentElement.remove();
}
