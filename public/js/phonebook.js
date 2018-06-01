function loadContacts() {
    $.ajax({
        url: '/phonebook',
        method: "GET"
    }).done(function (persons) {
        display(persons);

    });
}


function getRow(person) {
    return '<tr>' +
        '<td>' + person.firstName + '</td>' +
        '<td>' + person.lastName + '</td>' +
        '<td>' + person.phone + '</td>' +
        `<td>`
        + `<a href="#" data-id='${person.id}' class="delete">&#10008;</a>`
        + "  " + `<a href="#" data-id="${person.id}" class="edit">&#9998;</a></td>` +
        '</tr>'
}

function editContact(id) {
    var editPerson = persons.find(function (person) {
        console.log(person.firstName);
        return person.id == id;
    });
    console.warn('edit', editPerson);

    $('input[name=firstName]').val(editPerson.firstName);
    $('input[name=lastName]').val(editPerson.lastName);
    $('input[name=phone]').val(editPerson.phone);

    $('.add-form').submit(function (event) {
        event.preventDefault();
        const person = {
            id: id,
            firstName: $('input[name=firstName]').val(),
            lastName: $('input[name=lastName]').val(),
            phone: $('input[name=phone]').val()

        };
        saveContact(person);

    });
}


function deleteContact(id) {
    $.ajax({
        url: '/phonebook/delete',
        method: "POST",
        data: {
            id: id
        }
    }).done(function (persons) {
        display(persons);
        console.warn("done", persons);
    });

}

function saveContact(person) {
    $.ajax({
        url: '/phonebook/update',
        method: "POST",
        data: person
    }).done(function (persons) {
        display(persons);
        console.warn("done", persons);
    });

}

function getActionRow() {
    return '<tr>' +
        '<td><input type="text" name="firstName" required placeholder="Enter first name"></td>' +
        '<td><input type="text" name="lastName" placeholder="Enter last name"></td>' +
        '<td><input type="text" name="phone" required placeholder="Enter phone"></td>' +
        '<td><button type="submit" id="buton">Add</button></td>' +
        '</tr>';
}

function bindEvents(persons) {
    $("#phone-book tbody ").delegate('a.edit', "click", function () {
        var id = this.attributes["data-id"].value;
        // var id = $(this).attr("data-id");
        // var id = $(this).data('id');
        console.info("click on", this, id);

        editContact(id);
        document.getElementById("buton").innerText = "Save";
    });

    $("#phone-book tbody ").delegate("a.delete", "click", function () {
        var id = this.attributes["data-id"].value;
        // var id = $(this).attr("data-id");
        // var id = $(this).data('id');
        console.info("click on", this, id);

        deleteContact(id);
    });
}

function display(persons) {
    window.persons = persons;
    var rows = '';

    function createRows(person) {
        rows += getRow(person);
    };
    persons.forEach(createRows);
    rows += getActionRow();


    $('#phone-book tbody').html(rows);
}

var persons = [];
loadContacts();
bindEvents();