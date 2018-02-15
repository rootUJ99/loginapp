
$.ajax({
    type: "GET",
    url: "http://localhost:3000/",
    error: function (error) {
        if (error.responseText == 'showAlert')
            alert("Please enter correct user name and password.")
    }
});