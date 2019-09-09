//landing page
$.ajax({
    type: "GET",
    url: "/pages/landing.html",
    async: false,
    success: function (string) {
        response = string;
    }
});
$('#main').append(response);

//login page
$.ajax({
    type: "GET",
    url: "/pages/login.html",
    async: false,
    success: function (string) {
        response = string;
    }
});
$('#main').append(response);

//register page
$.ajax({
    type: "GET",
    url: "/pages/register.html",
    async: false,
    success: function (string) {
        response = string;
    }
});
$('#main').append(response);

//home page
$.ajax({
    type: "GET",
    url: "/pages/home.html",
    async: false,
    success: function (string) {
        response = string;
    }
});
$('#main').append(response);

//home index page
$.ajax({
    type: "GET",
    url: "/pages/todo/index.html",
    async: false,
    success: function (string) {
        response = string;
    }
});
$('#home').append(response);

//home add page
$.ajax({
    type: "GET",
    url: "/pages/todo/add.html",
    async: false,
    success: function (string) {
        response = string;
    }
});
$('#home').append(response);

//home edit page
$.ajax({
    type: "GET",
    url: "/pages/todo/edit.html",
    async: false,
    success: function (string) {
        response = string;
    }
});
$('#home').append(response);