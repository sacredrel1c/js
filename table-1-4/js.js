/**
 * This function render a page with data from backend or input from array data. In render process we wait to response from server and then create
 * structure of body with elements.
 * Elements have a button with delete function from DB.
 * @param config - structure of table and api url
 * @param data - alternative data source.
 * @returns {Promise<void>} - promise return a data from DB.
 * @constructor
 */
async function DataTable(config, data = null) {
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

/**
 * Structure of table.
 * @type {{parent: string, apiUrl: string, columns: [{title: string, value: string},
 * {title: string, value: string}, {title: string, value: string}, {title: string, value: string}]}}
 */
const config1 = {
    parent: '#usersTable',
    columns: [
        {title: 'Имя', value: 'name'},
        {title: 'Фамилия', value: 'surname'},
        {title: 'Дата создания', value: 'birthday'},
        {title: 'Аватар', value: 'avatar'},
    ],
    apiUrl: "https://mock-api.shpp.me/arasputnyj/users/"
};

/**
 * Some test data to use as input parameter in DataTable function
 * @type {[{surname: string, name: string, id: number, age: number}, {surname: string, name: string, id: number, age: number}]}
 */
const users = [
    {id: 30050, name: 'Вася', surname: 'Петров', age: 12},
    {id: 30051, name: 'Вася', surname: 'Васечкин', age: 15},
];

/**
 * Function to delete User from backend.
 * @param idToDelete - id number of deletion user.
 * @returns {Promise<void>} - rerender data table without deleted user.
 */
async function deleteUser(idToDelete) {
    const response = await fetch(config1.apiUrl + idToDelete, {
        method: "DELETE"
    });
    if (response.ok) {
        alert("Удалено строку № " + idToDelete);

        DataTable(config1)
            .then(() => {
                addClickDeleteListenersToButtons();
            });
    }
}

/**
 * function add event listeners to all delete buttons.
 */
function addClickDeleteListenersToButtons() {
    let button = document.querySelectorAll("button.delete");
    button.forEach(function (currentButton) {
        currentButton.addEventListener("click", function (event) {
            let idToDelete = event.target.attributes["data-id"].value;
            deleteUser(idToDelete);
        });
    });
}

/**
 * Simple validator without logic of validation, have one validation rule - required.
 * @param inputs - input elements to validate.
 * @returns {boolean} - if validation failed in one more input return false.
 */
function checkInputs(inputs) {
    let valid = true;
    inputs.forEach(function (currentInput) {
        if (currentInput.validity.valueMissing) {
            currentInput.classList.add("invalid");
            valid = false;
        } else {
            currentInput.classList.remove("invalid");
        }
    });
    return valid;
}

/**
 * Function sending data to backend, after create an object to send.
 * @param checkedData - array of validated data to send
 * @returns {Promise<void>} - rerender data table on the page
 */
async function sendData(checkedData) {
    let dataToSend = {};
    checkedData.forEach(function (currentInput) {
        dataToSend[currentInput.name] = currentInput.value;
    })
    const response = await fetch(config1.apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(dataToSend)
    });
    if (response.ok) {
        DataTable(config1)
            .then(() => {
                addClickDeleteListenersToButtons();
            });
    }
}

/**
 * Function add input elements on web-page if not exists and button "add" has been clicked
 */
function addElement() {
    if (!document.querySelector('.addElement')) {
        let table = document.getElementById('tableBody');
        let newRow = "<tr><td></td>";
        config1.columns.forEach(function (column) {
            newRow += "<td><input class='addElement' name='" + column.value + "' required/></td>";
        });
        newRow += "<td></td></tr>";
        table.innerHTML = newRow + table.innerHTML;
        let inputs = document.querySelectorAll('.addElement');
        inputs.forEach(function (currentInput) {
            currentInput.addEventListener('keydown', function (k) {
                if (k.keyCode === 13) {

                    if (checkInputs(inputs)) {
                        sendData(inputs);
                    }

                }
            });

        })
    }

}

window.onload = function () {
    DataTable(config1)
        .then(() => {
            addClickDeleteListenersToButtons();
        });
};


