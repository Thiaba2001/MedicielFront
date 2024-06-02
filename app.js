var form = document.getElementById("myForm"),
    imgInput = document.querySelector(".img"),
    file = document.getElementById("imgInput"),
    matricule = document.getElementById("matricule"),
    passwordHash = document.getElementById("password"),
    submitBtn = document.querySelector(".submit"),
    medecinInfo = document.getElementById("data"),
    modal = document.getElementById("userForm"),
    modalTitle = document.querySelector("#userForm .modal-title"),
    newUserBtn = document.querySelector(".newUser");

let getData = localStorage.getItem('medecinProfile') ? JSON.parse(localStorage.getItem('medecinProfile')) : [];
let isEdit = false, editId;

file.onchange = function () {
    if (file.files[0].size < 1000000) {  // 1MB = 1000000
        var fileReader = new FileReader();
        fileReader.onload = function (e) {
            imgUrl = e.target.result;
            imgInput.src = imgUrl;
        };
        fileReader.readAsDataURL(file.files[0]);
    }
    else {
        alert("c'est trop grand!");
    }
};

function showInfo() {
    medecinInfo.innerHTML = ''; // Clear previous entries
    getData.forEach((element, index) => {
        let createElement = `
            <tr class="medecinDetails">
                <td>${index + 1}</td>
                <td><img src="${element.picture}" alt="" width="50" height="50"></td>
                <td>${element.medecinMatricule}</td>
                <td>${element.medecinPassword}</td>
                <td>
                    <button class="btn btn-success" onclick="readInfo('${element.picture}', '${element.medecinMatricule}', '${element.medecinPassword}')" data-bs-toggle="modal" data-bs-target="#readData">
                        <i class="bi bi-eye"></i>
                    </button>
                    <button class="btn btn-primary" onclick="editInfo(${index}, '${element.picture}', '${element.medecinMatricule}', '${element.medecinPassword}')" data-bs-toggle="modal" data-bs-target="#userForm">
                        <i class="bi bi-pencil-square"></i>
                    </button>
                    <button class="btn btn-danger" onclick="deleteInfo(${index})">
                        <i class="bi bi-trash"></i>
                    </button>
                </td>
            </tr>`;
        medecinInfo.innerHTML += createElement;
    });
}

showInfo();

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const information = {
        picture: imgInput.src == undefined ? "./image/medecin1.jpeg" : imgInput.src,
        medecinMatricule: matricule.value,
        medecinPassword: passwordHash.value
    };

    if (!isEdit) {
        getData.push(information);
    }
    else {
        isEdit = false;
        getData[editId] = information;
    }
    localStorage.setItem('medecinProfile', JSON.stringify(getData));

    submitBtn.innerText = "Submit";
    modalTitle.innerHTML = "Remplir Formulaire";
    showInfo();

    form.reset();

    imgInput.src = "./image/profileIcone.png";
    modal.style.display = "none";
    document.querySelector(".modal-backdrop").remove();
});

function readInfo(picture, medecinMatricule, medecinPassword) {
    document.querySelector("#readData .img").src = picture;
    document.getElementById("readMatricule").value = medecinMatricule;
    document.getElementById("readPassword").value = medecinPassword;
}

function editInfo(index, picture, medecinMatricule, medecinPassword) {
    isEdit = true;
    editId = index;
    modalTitle.innerHTML = "Editer le formulaire";
    submitBtn.innerText = "Mettre à jour";

    imgInput.src = picture;
    matricule.value = medecinMatricule;
    passwordHash.value = medecinPassword;
}

function deleteInfo(index) {
    getData.splice(index, 1);
    localStorage.setItem('medecinProfile', JSON.stringify(getData));
    showInfo();
}
