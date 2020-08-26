
$(document).ready(function () {
    let items = [];

    // Loading json file
    $.getJSON("/assets/js/data.json", function (data) {
        let _students = localStorage.getItem('students');
        if (_students === null) {
            localStorage.setItem("students", JSON.stringify(data));
        }
        items = JSON.parse(localStorage.getItem('students'));
        populateData();

        // Add Person
        $("#add").click(function () {
            let inputFirstName = $("#inputFirstName").val();
            let inputLastName = $("#inputLastName").val();
            let inputEmail = $("#inputEmail").val();

            // id => Taking array.length-1 to get the last element index, then find id of that element
            // Checking items array is empty or not
            let _id = items.length === 0 ? 1 : (items[items.length - 1].id) + 1;
            if (inputFirstName != "") {
                items.push({ 'id': _id, 'firstName': inputFirstName, 'lastName': inputLastName, 'email': inputEmail });
                localStorage.setItem("students", JSON.stringify(items));
                $('#person').empty();
                // Clear the input fields
                $("#inputFirstName").val("");
                $("#inputLastName").val("");
                $("#inputEmail").val("");
                populateData();
            } else {
                alert("First Name is required!")
            }

        });


    });


    function populateData() {
        // Displaying data in page
        items.forEach((item, index) => {
            $("#person").append('<tr><th scope="row">' + (index + 1) + '</th>' + '<td>' + '<a href="#" class="person" data-id="' + item.id + '">' + item.firstName + '</a>' + '</td>'
                + '<td>' + '<button type="button" class="btn btn-warning btn-sm editPerson" data-id="' + item.id + '">Edit</button>' + '</td>'
                + '<td>' + '<button type="button" class="btn btn-danger btn-sm deletePerson" data-id="' + item.id + '">Delete</button>' + '</td>'
                + '</tr>'
            );
        });

        // Person details
        $(".person").click(function () {
            let _id = $(this).data('id');
            let resultArray = items.filter(x => x.id == _id);    // Filtering the element from items array
            $("#firstName").html(resultArray[0].firstName);
            $("#lastName").html(resultArray[0].lastName);
            $("#email").html(resultArray[0].email);
        });
        // Delete person
        $(".deletePerson").click(function () {
            let _id = $(this).data('id');
            let resultIndex = items.findIndex(x => x.id === _id);

            items.splice(resultIndex, 1);    // remove an item from items array.
            localStorage.setItem("students", JSON.stringify(items));

            $('#person').empty();       // clear the table contents
            $("#firstName").html("");
            $("#lastName").html("");
            $("#email").html("");
            populateData();
        });

        // Edit person
        $('.editPerson').click(function () {
            let _id = $(this).data('id');
            let resultArray = items.filter(x => x.id == _id);    // Filtering the element from items array

            $("#inputFirstName").val(resultArray[0].firstName);
            $("#inputLastName").val(resultArray[0].lastName);
            $("#inputEmail").val(resultArray[0].email);
            $('#add').text('Update');
        });

    }


});