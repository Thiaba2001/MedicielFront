
var form = document.getElementById("myForm"),
    patientName = document.getElementById("patientName"),
    patientDiagnostic = document.getElementById("patientDiagnostic"),
    patientPhone = document.getElementById("patientPhone"),
    creationDate = document.getElementById("sDate"),
    submitBtn = document.querySelector(".submit"),
    patientInfo = document.getElementById("data"),
    modal = document.getElementById("userForm"),
    modalTitle = document.querySelector("#userForm .modal-title"),
    newUserBtn = document.querySelector(".newUser");
let getData = localStorage.getItem('patientProfile') ? JSON.parse(localStorage.getItem('patientProfile')) : [];
let isEdit = false, editId;

function showInfo() {
    patientInfo.innerHTML = ''; // Clear previous entries
    getData.forEach((element, index) => {
        let createElement = `
            <tr class="medecinDetails">
                <td>${index + 1}</td>
                <td>${element.patientName}</td>
                <td>${element.patientDiagnostic}</td>
                <td>${element.patientPhone}</td>
                <td>${element.patientDate}</td>
                
                <td>
                <button class="btn btn-success" onclick="readInfo('${element.patientName}', '${element.patientDiagnostic}', '${element.patientPhone}', '${element.patientDate}')" data-bs-toggle="modal" data-bs-target="#readData">
                <i class="bi bi-eye"></i>
            </button>
            <button class="btn btn-primary" onclick="editInfo(${index}, '${element.patientName}', '${element.patientDiagnostic}', '${element.patientPhone}', '${element.patientDate}')" data-bs-toggle="modal" data-bs-target="#userForm">
            <i class="bi bi-pencil-square"></i>
        </button>
        
                  <button class="btn btn-danger" onclick="deleteInfo(${index})">
                        <i class="bi bi-trash"></i>
                    </button>
                </td>
            </tr>`;
        patientInfo.innerHTML += createElement;
    });
}

showInfo();

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const information = {

        patientName: patientName.value,
        patientDiagnostic: patientDiagnostic.value,
        patientPhone: patientPhone.value,
        patientDate: creationDate.value
    };

    if (!isEdit) {
        getData.push(information);
    }
    else {
        isEdit = false;
        getData[editId] = information;
    }
    localStorage.setItem('patientProfile', JSON.stringify(getData));

    submitBtn.innerText = "Submit";
    modalTitle.innerHTML = "Remplir Formulaire";
    showInfo();

    form.reset();
    modal.style.display = "none";
    document.querySelector(".modal-backdrop").remove();
});

function readInfo(patientName, patientDiagnostic, patientPhone, patientDate) {
    document.getElementById("readName").value = patientName;
    document.getElementById("readDiagnos").value = patientDiagnostic;
    document.getElementById("readPhone").value = patientPhone;
    document.getElementById("readDate").value = patientDate;

    // Mettre à jour les attributs de data pour le bouton de téléchargement
    document.querySelector('.btn-primary').setAttribute('data-name', patientName);
    document.querySelector('.btn-primary').setAttribute('data-diagnostic', patientDiagnostic);
    document.querySelector('.btn-primary').setAttribute('data-phone', patientPhone);
    document.querySelector('.btn-primary').setAttribute('data-date', patientDate);
}

function downloadMedicalRecord() {
    var patientName = document.querySelector('.btn-primary').getAttribute('data-name');
    var patientDiagnostic = document.querySelector('.btn-primary').getAttribute('data-diagnostic');
    var patientPhone = document.querySelector('.btn-primary').getAttribute('data-phone');
    var patientDate = document.querySelector('.btn-primary').getAttribute('data-date');

    var doc = new jsPDF();
    doc.text(`Patient Name: ${patientName}`, 10, 10);
    doc.text(`Patient Diagnostic: ${patientDiagnostic}`, 10, 20);
    doc.text(`Patient Phone: ${patientPhone}`, 10, 30);
    doc.text(`Creation Date: ${patientDate}`, 10, 40);
    doc.save('medical_record.pdf');
}

function editInfo(index, patientName, patientDiagnostic, patientPhone, patientDate) {
    isEdit = true;
    editId = index;
    modalTitle.innerHTML = "Editer le formulaire";
    submitBtn.innerText = "Mettre à jour";

    // Remplir les champs du formulaire avec les valeurs du patient
    document.getElementById("patientName").value = patientName;
    document.getElementById("patientDiagnostic").value = patientDiagnostic;
    document.getElementById("patientPhone").value = patientPhone;
    document.getElementById("sDate").value = patientDate;

    modal.style.display = "block";
}

function deleteInfo(index) {
    getData.splice(index, 1);
    localStorage.setItem('patientProfile', JSON.stringify(getData));
    showInfo();
}

function downloadMedicalRecord(patientName, patientDiagnostic, patientPhone, patientDate) {
    var doc = new jsPDF();
    doc.text(`Patient Name: ${patientName}`, 10, 10);
    doc.text(`Patient Diagnostic: ${patientDiagnostic}`, 10, 20);
    doc.text(`Patient Phone: ${patientPhone}`, 10, 30);
    doc.text(`Creation Date: ${patientDate}`, 10, 40);
    doc.save('medical_record.pdf');
}

