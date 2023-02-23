window.onload = () => {
    
    var validationFlags = {
        Name : false,
        Number : false,
        Email : false,
        Region : false,
        Password : false,
        ConfirmPassword : false
    }
    
    let validateName = (event)=>{
        
        if(event.target.value === ""){
            event.target.classList.remove("is-valid");
            event.target.classList.add("is-invalid");
            document.getElementById("NameValidation").innerHTML = "Please Eneter Name";
            validationFlags.Name = false;
        }
        else if(event.target.value.length < 2){
            event.target.classList.remove("is-valid");
            event.target.classList.add("is-invalid");
            document.getElementById("NameValidation").innerHTML = "Name must be contain minimum two character";
            validationFlags.Name = false;
        }
        else{
            event.target.classList.remove("is-invalid");
            event.target.classList.add("is-valid");
            document.getElementById("NameValidation").innerHTML = "";
            validationFlags.Name = true;
            
        }
    };
    
    let validateNumber = (event)=>{
        
        let regExp = new RegExp("^([1-9]{1})([234789]{1})([0-9]{8})$")
        if(!regExp.test(event.target.value)){
            event.target.classList.remove("is-valid");
            event.target.classList.add("is-invalid");
            document.getElementById("NumberValidation").innerHTML = "Please Eneter Valid Number";
            validationFlags.Number = false;
        }
        else{
            event.target.classList.remove("is-invalid");
            event.target.classList.add("is-valid");
            document.getElementById("NumberValidation").innerHTML = "";
            validationFlags.Number = true;
            
        }
    };
    
    let validateEmail = (event)=>{
        
        let regExp = new RegExp("^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$")
        if(!regExp.test(event.target.value)){
            event.target.classList.remove("is-valid");
            event.target.classList.add("is-invalid");
            document.getElementById("EmailValidation").innerHTML = "Please Eneter Valid Email";
            validationFlags.Email = false;
        }
        else{
            event.target.classList.remove("is-invalid");
            event.target.classList.add("is-valid");
            document.getElementById("EmailValidation").innerHTML = "";
            validationFlags.Email = true;
            
        }
    };
    
    let validateRegion = (event)=>{
        if(event.target.children[event.target.selectedIndex].value == -1){
            event.target.classList.remove("is-valid");
            event.target.classList.add("is-invalid");
            document.getElementById("RegionValidation").innerHTML = "Please Select Region";
            validationFlags.Region = false;
        }
        else{
            event.target.classList.remove("is-invalid");
            event.target.classList.add("is-valid");
            document.getElementById("RegionValidation").innerHTML = "";
            validationFlags.Region = true;
        }
    };
    
    let validatePassword = (event)=>{
        
        let regExp = new RegExp("^(?=.{8,32}$)(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).*");
        if(!regExp.test(event.target.value)){
            event.target.classList.remove("is-valid");
            event.target.classList.add("is-invalid");
            document.getElementById("PasswordValidation").innerHTML = "Password must be like this, <ul><li>Length between 8 and 32 characters</li><li> One or more uppercase letters</li><li> One or more lowercase letters </li><li> One or more numbers</li></ul>";
            validationFlags.Password = false;
        }
        else{
            event.target.classList.remove("is-invalid");
            event.target.classList.add("is-valid");
            document.getElementById("PasswordValidation").innerHTML = "";
            validationFlags.Password = true;
            
        }
    };
    
    let validateConfirmPassword = (event)=>{
        if(event.target.value === ""){
            event.target.classList.remove("is-valid");
            event.target.classList.add("is-invalid");
            document.getElementById("ConfirmPasswordValidation").innerHTML = "Please Eneter Password and Confirm Password";
            validationFlags.ConfirmPassword = false;
        }
        else if(event.target.value != document.getElementById("Password").value){
            event.target.classList.remove("is-valid");
            event.target.classList.add("is-invalid");
            document.getElementById("ConfirmPasswordValidation").innerHTML = "Password and Confirm Password doesn't match!";
            validationFlags.ConfirmPassword = false;
        }
        else{
            event.target.classList.remove("is-invalid");
            event.target.classList.add("is-valid");
            document.getElementById("ConfirmPasswordValidation").innerHTML = "";
            validationFlags.ConfirmPassword = true;
            
        }
    };
    
    document.getElementById("btnSubmit").addEventListener("click", ()=>{
        if(validationFlags.Name && validationFlags.Number && validationFlags.Email && validationFlags.Region && validationFlags.Password && validationFlags.ConfirmPassword){
            document.getElementById("myForm").reset();
            document.getElementById("Name").classList.remove("is-valid");
            document.getElementById("Number").classList.remove("is-valid");
            document.getElementById("Email").classList.remove("is-valid");
            document.getElementById("Region").classList.remove("is-valid");
            document.getElementById("Password").classList.remove("is-valid");
            document.getElementById("ConfirmPassword").classList.remove("is-valid");
            alert("User created successfully.");
        }else{
            if(!validationFlags.Name){
                document.getElementById("Name").classList.remove("is-valid");
                document.getElementById("Name").classList.add("is-invalid");
                document.getElementById("NameValidation").innerHTML = "Please Eneter Name";
            }
            if(!validationFlags.Number){
                document.getElementById("Number").classList.remove("is-valid");
                document.getElementById("Number").classList.add("is-invalid");
                document.getElementById("NumberValidation").innerHTML = "Please Eneter Valid Number";
            }
            if(!validationFlags.Email){
                document.getElementById("Email").classList.remove("is-valid");
                document.getElementById("Email").classList.add("is-invalid");
                document.getElementById("EmailValidation").innerHTML = "Please Eneter Valid Email";
            }
            if(!validationFlags.Region){
                document.getElementById("Region").classList.remove("is-valid");
                document.getElementById("Region").classList.add("is-invalid");
                document.getElementById("RegionValidation").innerHTML = "Please Select Region";
            }
            if(!validationFlags.Password){
                document.getElementById("Password").classList.remove("is-valid");
                document.getElementById("Password").classList.add("is-invalid");
                document.getElementById("PasswordValidation").innerHTML = "Password must be like this, <ul><li>Length between 8 and 32 characters</li><li> One or more uppercase letters</li><li> One or more lowercase letters </li><li> One or more numbers</li></ul>";
            }
            if(!validationFlags.ConfirmPassword){
                document.getElementById("ConfirmPassword").classList.remove("is-valid");
                document.getElementById("ConfirmPassword").classList.add("is-invalid");
                document.getElementById("ConfirmPasswordValidation").innerHTML = "Please Eneter Password and Confirm Password";
            }
        }
    });
    
    document.getElementById("Name").addEventListener("blur", validateName);
    document.getElementById("Name").addEventListener("keyup", validateName);
    
    document.getElementById("Number").addEventListener("blur", validateNumber);
    document.getElementById("Number").addEventListener("keyup", validateNumber);
    
    document.getElementById("Email").addEventListener("blur", validateEmail);
    document.getElementById("Email").addEventListener("keyup", validateEmail);
    
    document.getElementById("Region").addEventListener("change", validateRegion);
    document.getElementById("Region").addEventListener("blur", validateRegion);
    
    document.getElementById("Password").addEventListener("blur", validatePassword);
    document.getElementById("Password").addEventListener("keyup", validatePassword);
    
    document.getElementById("ConfirmPassword").addEventListener("blur", validateConfirmPassword);
    document.getElementById("ConfirmPassword").addEventListener("keyup", validateConfirmPassword);
}