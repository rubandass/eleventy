$(document).ready(function () {
    let person = { 'students': [{ 'firstName': 'Ruban', 'lastName': 'Jhondass' }] };
    console.log(person.students);
    person.students.push({ 'firstName': 'Rubandass' })
    person.students.push({ 'firstName': 'dass' })

    // document.getElementById('myData').innerHTML = person.students[1].firstName;

    $("#add").click(function () {
        let name = $("#inputName").val();
        if (name != "") {
            person.students.push({ 'firstName': name });
        }
        $('#person').empty();
        listPerson();
        // alert($('#personId_0').val())
    });

    function listPerson() {
        for (var prop in person.students) {
            console.log(person.students[prop].firstName);
            console.log(prop);
            document.getElementById('person').innerHTML += '<a href="" id="personId_' + prop + '">' + '<li>' + person.students[prop].firstName + '</li></a>';
            console.log($('#personId_0').val());
            $('#firstName').html($('#personId_0').val());
        }
    }
    listPerson();
    console.log($('#personId_1').val());

});