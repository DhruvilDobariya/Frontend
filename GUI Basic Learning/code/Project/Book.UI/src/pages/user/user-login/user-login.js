import { UserService } from "../../../Services/user-service.js";

$(document).ready(function(){
    $("form").validate({
        rules:{
            email:{
                required: true,
                email: true
            },
            password:{
                required: true
            }
        },
        messages:{
            email:{
                required: "Please eneter email",
                email: "Please eneter valid email"
            },
            password:{
                required: "Please enter password"
            }
        },
        errorElement: "div", // element which contains floting input and lable
        errorPlacement: function ( error, element ) {
            error.insertAfter( element );
        },
        highlight:function(element){
            $(element).removeClass("is-valid");
            $(element).addClass("is-invalid");
        },
        unhighlight:function(element){
            $(element).removeClass("is-invalid");
            $(element).addClass("is-valid");
        },
        submitHandler:function(form){
            var data = $("form").serializeArray();
            var login = {};
            for(var element of data)
            {
                login[element.name] = element.value
            }
            userLogin(login);
        }
    });
});

function userLogin(login){
    let userService = new UserService();
    const userValidate = userService.validateUser(login);
    userValidate.done(function(data){
        toastr.success(data.Name + " logged in successfully");
        sessionStorage.setItem("id", data.Id);
        sessionStorage.setItem("name", data.Name);
        sessionStorage.setItem("email", data.email);
        sessionStorage.setItem("password", data.Password);
        setTimeout(()=>{
            window.location.href = "../../home/home.html"
        },2000)
    });
    userValidate.fail(function(e){
        $("span").text(e.responseText)
        toastr.error(e.responseText);
    })
}