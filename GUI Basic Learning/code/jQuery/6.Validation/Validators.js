$(document).ready(function(){

    // Create custom method for custome validation
    $.validator.addMethod("StrongPassword", function(value){
        return /(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/.test(value);
        // wrap regular expression inside "/.../".

    }, "Please enter strong password");

    $("#form").validate({
        rules:{
            name:{
                required: true,
                minlength: 3,
                maxlength: 50,
                lettersonly: true
            },
            email:{
                required: true,
                email: true
            },
            username:{
                required: true,
                nowhitespace: true,
                alphanumeric: true
            },
            password:{
                required : true,
                StrongPassword: true
            },
            confirmPassword:{
                required: true,
                equalTo: "#Password"
            },
            address:{
                letterswithbasicpunc: true
            },
            url:{
                url: true
            },
            age:{
                // greaterThanEqual : "#AgeLimite"
                // lessThanEqual : "#AgeLimite"
                // greaterThan : "#AgeLimite"
                // lessThan : "#AgeLimite"
                // range: [10,101]
                min: 5,
                max: 10
            },
            "gender[]":{
                required: true
            },
            "termsConditions":{
                required: true
            },
            step:{
                step: 10
            },
            number:{
                number: true // It can tack point number
            },
            digits:{
                digits: true // It only get digits
            },
            date:{
                date: true // Date in yyyy-mm-dd
            }
        },
        messages:{
            name:{
                required: "Please enter name",
                lettersonly: "Name can only contain letter"
            },
            email: {
                required: "Please enter email"
            },
            username:{
                required: "Please enter email",
                nowhitespace: "Username can't contain white space" // nowhitespace is not include in jQuery validation, it is in additional validation.
            },
            password:{
                required : "Please enter password"
            },
            confirmPassword:{
                required: "Please enter confirm password",
                equalTo : "Password and confirm password must be match"
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
        invalidHandler:function(element){
            var validator = $("#form").validate();
            $("#summary").text("number of invalid : " + validator.numberOfInvalids());
        }
    })
});