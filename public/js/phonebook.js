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

var persons = [];

$.ajax({
    url: '/phonebook',
    method: "GET"
}).done(function (persons) {
    display(persons);
});

function deleteContact(id) {
    $.ajax({
        url: '/phonebook/delete',
        method: "POST",
        data : {
            id: id
        }
    }).done(function (persons) {
        display(persons);
        console.warn("done", persons);
    });

}

function display(persons) {
    var rows = '';

    function createRows(person) {
        rows += getRow(person);
    };


    persons.forEach(createRows);

    rows += '<tr>' +
        '<td><input type="text" name="firstName" required placeholder="Enter first name"></td>' +
        '<td><input type="text" name="lastName" placeholder="Enter last name"></td>' +
        '<td><input type="text" name="phone" required placeholder="Enter phone"></td>' +
        '<td><button type="submit" id="buton">Add</button></td>' +
        '</tr>';


    $('#phone-book tbody').html(rows);

    $("#phone-book tbody a.edit").click(function () {
        var id = this.attributes["data-id"].value;
        // var id = $(this).attr("data-id");
        // var id = $(this).data('id');
        console.info("click on", this, id);

        var editPerson = persons.find(function (person) {
            console.log(person.firstName);
            return person.id == id;
        });
        console.warn('edit', editPerson);

        $('input[name=firstName]').val(editPerson.firstName);
        $('input[name=lastName]').val(editPerson.lastName);
        $('input[name=phone]').val(editPerson.phone);
        document.getElementById("buton").innerText = "Save";
    })

    $("#phone-book tbody a.delete").click(function () {
        var id = this.attributes["data-id"].value;
        // var id = $(this).attr("data-id");
        // var id = $(this).data('id');
        console.info("click on", this, id);



        deleteContact(id);
    })

}

