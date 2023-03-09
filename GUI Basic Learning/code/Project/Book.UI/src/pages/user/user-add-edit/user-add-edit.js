import { UserService } from "../../../Services/user-service.js";

$(document).ready(function(){  
    $("#btnReset").click(function(){
        $("form").validate().resetForm();
        $("form input").each(function (_i, element) {
            $(element).removeClass("is-valid");
        });
    });
    if(sessionStorage.getItem("id") != null){
        fillData();
    }

    validate();
});

$.validator.addMethod("strongPassword", function(password){
    return /(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/
    .test(password);
}, "Please enter the strong password")

function validate(){
    $("form").validate({
        rules:{
            name:{
                required: true,
                minlength: 2
            },
            email:{
                required: true,
                email: true
            },
            password:{
                required: true,
                strongPassword: true
            },
            confirmPassword:{
                required: true,
                equalTo: "#Password"
            }
        },
        messages:{
            name:{
                required: "Please eneter name",
                minlength: "Name must contains at least two character"
            },
            email:{
                required: "Please eneter email",
                email: "Please eneter valid email"
            },
            password:{
                required: "Please enter password"
            },
            confirmPassword:{
                required: "Please enter confirm password",
                equalTo: "Password and Confirm Password not match"
            }
        },
        highlight:function(element){
            $(element).removeClass("is-valid");
            $(element).addClass("is-invalid");
        },
        unhighlight:function(element){
            $(element).removeClass("is-invalid");
            $(element).addClass("is-valid");
        },
        submitHandler:function(_form){
            var user = {};
            user.Name = $("#Name").val();
            user.Password = $("#Password").val();
            user.Email = $("#Email").val();

            if(sessionStorage.getItem("id") != null){
                user.Id = sessionStorage.getItem("id");
                updateUser(user);
            }
            else{
                addUser(user);
            }
        }
    })
}

function fillData(){
    const userService = new UserService(); 
    const getUserByIdPromise = userService.getUserById(sessionStorage.getItem("id"));

    getUserByIdPromise.done(function(data){
        $("#Name").val(data.Name);
        $("#Email").val(data.Email);
        $("#Password").val(data.Password);
        $("#ConfirmPassword").val(data.Password);
    });
    getUserByIdPromise.fail(function(e){
        console.log(e.status);
        console.log(e.responseText);
    });
}

function updateUser(user){
    const userService = new UserService(); 
    const updateUserPromise = userService.updateUser(user);

    updateUserPromise.done(function(data){
        toastr.success(data);
        sessionStorage.setItem("name", user.Name);
        sessionStorage.setItem("email", user.Email);
        sessionStorage.setItem("password", user.Password);
        setTimeout(()=>{
            window.location.href = "../../home/home.html";
        },2000);
    });
    updateUserPromise.fail(function(e){
        console.log(e.status);
        toastr.error(e.responseText);
    });
}

function addUser(user){
    const userService = new UserService(); 
    const addUserPromise = userService.registerUser(user);

    addUserPromise.done(function(data){
        toastr.success(data);
        setTimeout(()=>{
            window.location.href = "../user-login/user-login.html";
        },2000);
    });
    addUserPromise.fail(function(e){
        console.log(e.status);
        toastr.error(e.responseText);
    });
}

