import {addBook, editBook, getBookById} from "../../../Services/book-service.js"

$(document).ready(function () {
    if(sessionStorage.getItem("id") == null){
        window.location.href = "../../user/user-login/user-login.html";
    }
    else{
        if(getQueryString().id != 0){
            fillData(getQueryString().id);
            $("#btnSubmit").text("Edit");
        }
        validate();

        $("button[type=reset]").click(function(){
            resetForm();
        });

        $(document).ready(function(){
            $("#btnLogOut").click(function(){
                toastr.success(sessionStorage.getItem("name") + " logged out successfully");
                sessionStorage.clear();
                setTimeout(()=>{
                    window.location.href = "../../user/user-login/user-login.html";
                },2000);
            });
        });
    }
});

function getQueryString(){
    var queryString = {};
    var rowQueryString = window.location.toString().split("?")[1].split("&");
    rowQueryString.forEach((element) => {
        queryString[element.split("=")[0]] = element.split("=")[1];
    });
    return queryString;
}

function validate(){
    $("#form").validate({
        rules:{
            title:{
                required: true,
                minlength: 2
            },
            author:{
                required: true,
                minlength: 2
            },
            "rating[]":{
                required : true,
                range: [0,5]
            },
            price:{
                required: true,
                number: true
            },
            publishDate:{
                required: true,
                date: true
            },
            url:{
                url: true
            },
            discription:{
                maxlength: 500
            }
        },
        messages:{
            title:{
                required: "Please eneter title",
                minlength: "Title must contains at least two character"
            },
            author:{
                required: "Please eneter author",
                minlength: "Author must contains at least two character"
            },
            "rating[]":{
                required: "Please give rating",
                range: "Rate must be between 0 to 5"
            },
            price:{
                required: "Please eneter price",
                number: "Please enter valid currency"
            },
            publishDate:{
                required: "Please give publish date",
                date: "Please enter valid publish date"
            },
            url:{
                url: "Please enter valid URL"
            },
            discription:{
                maxlength: "Decription must contains less then 500 characters"
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
        submitHandler:function(form){
            var data = $("form").serializeArray();
            var book = {};
            for(var element of data)
            {
                book[element.name] = element.value
            }
            book["rating"] = book["rating[]"];
            delete book["rating[]"];
            
            if(getQueryString().id == 0){
                insertBook(book);
                
            }
            else{
                book.id = getQueryString().id;
                updateBook(book);
            }
        }
    });
}

async function insertBook(book){
    try{
        const data = await addBook(book);
        $("button[type=reset]").trigger("click");
        toastr.success(data);
    }
    catch(e){
        toastr.error(e.responseText);
    }
}

async function updateBook(book){
    try{
        const data = await editBook(book);
        $("button[type=reset]").trigger("click");
        toastr.success(data);
        setTimeout(()=>{
            window.location.href = "../book-list/book-list.html";
        },2000);
    }
    catch(e){
        toastr.error(e.responseText);
    }
}

async function fillData(id){
    try{
        const data = await getBookById(id);
        $("#Id").val(data["Id"]);
        $("#Title").val(data["Title"]);
        $("#Author").val(data["Author"]);
        $("#Price").val(data["Price"]);
        $("#URL").val(data["URL"]);
        $("#Description").val(data["Description"]);
        
        var date = new Date(data["PublishDate"])
        $("#PublishDate").val(date.getFullYear() + "-" +((date.getMonth()+1).length != 2 ? "0" + (date.getMonth() + 1) : (date.getMonth()+1)) + "-" + (date.getDate().toString().length != 2 ? "0" + date.getDate() : date.getDate()));
        
        $("[name='rating[]']").each(function(i, element){
            if(element.value == data["Rating"]){
                $(element).attr("checked","checked")
            }
        });
    }
    catch(e){
        toastr.error(e.responseText);
    }
}

function resetForm(){
    $("#form").validate().resetForm();
    $("#form input").each(function (i, element) {
        $(element).removeClass("is-valid");
    });
    $("#Discription").removeClass("is-valid");
}