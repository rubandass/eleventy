
$(document).ready(function () {
    let items;

    // Loading json file
    $.getJSON("/assets/js/data.json", function (data) {
        processJson(data);
    });

    // Processing json data and store it to global variable called "items"
    function processJson(jsonData) {
        items = jsonData;
        populateData();

        $("#add").click(function () {
            let inputFirstName = $("#inputFirstName").val();
            let inputLastName = $("#inputLastName").val();
            let inputEmail = $("#inputEmail").val();
            if (inputFirstName != "") {
                items.push({ 'id': (items.length + 1), 'firstName': inputFirstName, 'lastName': inputLastName, 'email': inputEmail });
            } else {
                alert("First Name field is blank!")
            }
            $('#person').empty();
            // Clear the input fields
            $("#inputFirstName").val("");
            $("#inputLastName").val("");
            $("#inputEmail").val("");
            populateData();
        });
    }

    function populateData() {
        items.forEach(item => {
            $("#person").append('<a href="#" class="person" data-id="' + item.id + '">' + '<li>' + item.firstName + '</li></a>');
        });

        $(".person").click(function () {
            let id = $(this).data('id');
            let resultArray = items[id - 1];    // 'id' gives values from '1', but index starts from '0'
            $("#firstName").html(resultArray.firstName);
            $("#lastName").html(resultArray.lastName);
            $("#email").html(resultArray.email);
        });
    }


});