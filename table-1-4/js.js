﻿async function DataTable(config, data = null) {
    let divElem = document.querySelector(config.parent);
    divElem.innerHTML = "<button id='addElement' onclick='addElement()'>Добавить</button>";
    let table = "<table class='rounded'><thead><tr><th class='number'>№</th>";
    config.columns.forEach(element => table += "<th class=" + element.value + ">" + element.title + "</th>");
    table += "<th>Действия</th></th></tr></thead><tbody id='tableBody'>";
    if (data != null) {
        data.forEach(function (row, index) {
            table += "<tr><td>" + (index + 1) + "</td>";
            config.columns.forEach(function (cell) {
                table += "<td>" + row[cell.value] + "</td>";
            })
            table += "</tr>";
        })
    } else {
        await fetch(config.apiUrl)
            .then((response) => {
                return response.json();
            }).then((data) => {
                Object.entries(data.data).forEach(function (row) {
                    table += "<tr><td>" + (row[0]) + "</td>";
                    config.columns.forEach(function (cell) {
                        table += "<td>" + row[1][cell.value] + "</td>";
                    })
                    table += "<td><button class='delete' data-id=" + row[0] + ">Удалить</button></td></tr>";
                })
            });
    }

    table += "</tbody></table>";
    divElem.innerHTML += table;
}


const config1 = {
    parent: '#usersTable',
    columns: [
        {title: 'Имя', value: 'name'},
        {title: 'Фамилия', value: 'surname'},
        {title: 'Дата создания', value: 'birthday'},
        {title: 'Аватар', value: 'avatar'},
    ],
    apiUrl: "https://mock-api.shpp.me/arasputnyjtest/users"
};


const users = [
    {id: 30050, name: 'Вася', surname: 'Петров', age: 12},
    {id: 30051, name: 'Вася', surname: 'Васечкин', age: 15},
];

async function deleteUser(idToDelete) {
    const url = "https://mock-api.shpp.me/arasputnyjtest/users/";
    const response = await fetch(url+idToDelete,{
        method:"DELETE"
    });
    if(response.ok){
        alert("Удалено строку № "+idToDelete);

        DataTable(config1)
            .then(() => {
                addClickDeleteListenersToButtons();
            });
    }
}

function addClickDeleteListenersToButtons() {
    let button = document.querySelectorAll("button.delete");
    button.forEach(function (currentButton) {
        currentButton.addEventListener("click", function (event) {
            let idToDelete = event.target.attributes["data-id"].value;
            deleteUser(idToDelete);
        });
    });
}
function addElement(){
    let table = document.getElementById('tableBody');
    let newRow = "<tr><td></td>";
    config1.columns.forEach(function (column) {
        newRow += "<td><input class='addElement' name='"+column.value+"'/></td>";
    });
    newRow += "<td></td></tr>";
    table.innerHTML = newRow + table.innerHTML;
    let inputs = document.querySelectorAll('.addElement');
    inputs.forEach(function (currentInput) {
        currentInput.addEventListener('keydown', function (k) {
            if(k.keyCode === 13){
                console.dir(this.name);
            }
        });

    })


}
window.onload = function () {
    DataTable(config1)
        .then(() => {
            addClickDeleteListenersToButtons();
        });
};


