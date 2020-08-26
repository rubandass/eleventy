
$(document).ready(function () {
    let items = [];
    let _editPersonId;
    let addButtonClicked = false;

    // Loading json file
    $.getJSON("/assets/js/data.json", function (data) {
        let _students = localStorage.getItem('students');
        if (_students === null) {
            localStorage.setItem("students", JSON.stringify(data));
        }
        items = JSON.parse(localStorage.getItem('students'));
        clearPersonDetails();
        populateData();

        // Add Person
        /*$("#add").click(function () {
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

        });*/

        $("#add").click(function () {
            $('#personForm')[0].reset();
            $('#personModalLabel').html('Add Person');
            $("#editFirstName").val('');
            $("#editLastName").val('');
            $("#editEmail").val('');
            $("#errors").html("");
            clearPersonDetails();
            addButtonClicked = true;
            $("#personModal").modal();

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
            let resultArray = items.filter(x => x.id == _id);
            let resultIndex = items.findIndex(x => x.id === _id);
            $("#spanPersonName").text(resultArray[0].firstName);
            $("#personDeleteModal").modal();

            $("#submitDelete").click(function () {
                items.splice(resultIndex, 1);    // remove an item from items array.
                localStorage.setItem("students", JSON.stringify(items));

                $('#person').empty();       // clear the table contents
                clearPersonDetails();
                $("#personDeleteModal").modal('hide');
                populateData();
            });

        });

        // Edit person
        $('.editPerson').click(function () {
            addButtonClicked = false;
            $('#personForm')[0].reset();
            $('#personModalLabel').html('Edit Person');
            _editPersonId = $(this).data('id');
            let resultArray = items.filter(x => x.id == _editPersonId);    // Filtering the element from items array

            $("#editFirstName").val(resultArray[0].firstName);
            $("#editLastName").val(resultArray[0].lastName);
            $("#editEmail").val(resultArray[0].email);
            $("#errors").html("");
            clearPersonDetails();
            $("#personModal").modal();

        });

        $("#submitPerson").click(function () {

            let editFirstName = $("#editFirstName").val();
            let editLastName = $("#editLastName").val();
            let editEmail = $("#editEmail").val();
            let resultIndex = items.findIndex(x => x.id === _editPersonId);
            let _id = items.length === 0 ? 1 : (items[items.length - 1].id) + 1;
            if (editFirstName.trim() === "") {
                $("#errors").html('<li>' + 'First Name is required' + '</li>')
            } else {
                if (addButtonClicked) {
                    items.push({ 'id': _id, 'firstName': editFirstName, 'lastName': editLastName, 'email': editEmail });
                } else {
                    items[resultIndex] = { 'id': _editPersonId, 'firstName': editFirstName, 'lastName': editLastName, 'email': editEmail };
                }
                localStorage.setItem("students", JSON.stringify(items));
                $('#person').empty();
                populateData();
                $("#personModal").modal('hide');
            }
            addButtonClicked = false;
        });
    }

    function clearPersonDetails() {
        $("#firstName").html("");
        $("#lastName").html("");
        $("#email").html("");
    }


});