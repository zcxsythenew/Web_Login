'use strict';

function ShowSignUp() {
    $("#login-box").fadeOut(250, function () {
        $("#signup-box").fadeIn();
    });
}

function ShowLogIn() {
    $("#signup-box").fadeOut(250, function () {
        $("#login-box").fadeIn();
    });
}

function LogOut() {
    $("#information-box").fadeOut(250, function () {
        $("#login-box").fadeIn();
    });
}

function FormNoAction() {
    event.preventDefault();
}

function PopupError(str) {
    alert(str);
}

function LogIn() {
    FormNoAction();
    $.post("/users", {
        username: $("#login-username").val(),
        password: $("#login-password").val()
    },
        function (data, textStatus, xhr) {
            if (xhr.status === 200) {
                $("#information-date").text(data);
                $("#login-box").fadeOut(250, function () {
                    $("#information-box").fadeIn();
                });
            }
        });
}

function SignUp() {
    FormNoAction();

    if ($("#signup-username").val() === "") {
        PopupError("用户名不能为空");
        return;
    }

    if ($("#signup-password").val() === "") {
        PopupError("密码不能为空");
        return;
    }

    $.post("/signup", {
        username: $("#signup-username").val(),
        password: $("#signup-password").val(),
        repeat: $("#repeat-password").val()
    },
        function (data, textStatus, xhr) {
            if (xhr.status === 200) {
                var date = new Date();
                var str = date.getFullYear() + "/" + (date.getMonth() + 1).toString() + "/" + date.getDate().toString();
                $("#information-date").text(str);
                $("#signup-box").fadeOut(250, function () {
                    $("#information-box").fadeIn();
                });
            }
        });
}