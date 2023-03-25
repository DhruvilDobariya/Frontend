import {Student} from "./Service.js";

let id = ""
$(document).ready(function(){
    getAllStudent();
    $("#submit").click(function(){
        if($(this).text() == "Submit"){
            postStudent();
        }
        else{
            putStudent(id);
        }
    })
    $("tbody").on("click",".delete",function(){
        deleteStudent($(this).parent().siblings().eq(1).text());
    })
    $("tbody").on("click",".edit",function(){
        id = $(this).parent().siblings().eq(1).text();
        getStudentById(id);
        $("#submit").text("Edit");
    })
})

function getAllStudent(){
    const student = new Student();
    const xhttp = student.getStudents();
    let students = [];
    xhttp.onreadystatechange = ()=>{
        if(xhttp.status === 200 && xhttp.readyState == 4){
            const response = JSON.parse(xhttp.responseText);
            for(let i = 0; i < response.length; i++){
                students[i] = '<tr><th scope="row" class="no">'+(i+1)+'</th><td>'+response[i].Id+'</td><td>'+response[i].Name+'</td><td>'+response[i].RollNo+'</td><td>'+response[i].Email+'</td><td>'+response[i].ContactNo+'</td><td class="d-flex justify-content-center"><button class="btn btn-success mx-2 edit"><i class="fas fa-user-edit"></i></button><button class="btn btn-danger mx-2 delete"><i class="fas fa-trash-alt"></i></i></button></td></tr>';
            }
            $("tbody").html(students.join(""));
        }
    }
}

function getStudentById(id){
    const student = new Student();
    const xhttp = student.getStudent(id);
    xhttp.onreadystatechange = ()=>{
        if(xhttp.status === 200 && xhttp.readyState == 4){
            const response = JSON.parse(xhttp.responseText);
            $("#Name").val(response.Name);
            $("#RollNo").val(response.RollNo);
            $("#Email").val(response.Email);
            $("#ContactNo").val(response.ContactNo);
        }
    }
}

function postStudent(id){
    const student = new Student();
    let data = JSON.stringify({
        Name : $(".input").eq(0).val(),
        RollNo : $(".input").eq(1).val(),
        Email : $(".input").eq(2).val(),
        ContactNo : $(".input").eq(3).val()
    });
    const xhttp = student.addStudent(data);
    xhttp.onreadystatechange = ()=>{
        if(xhttp.status === 200 && xhttp.readyState == 4){
            $("#form").trigger("reset");
            $(".input").eq(0).focus();
            $("tbody").html("");
            getAllStudent();
        }
    }
}

function putStudent(){
    const student = new Student();
    let data = JSON.stringify({
        Id: id,
        Name : $(".input").eq(0).val(),
        RollNo : $(".input").eq(1).val(),
        Email : $(".input").eq(2).val(),
        ContactNo : $(".input").eq(3).val()
    });
    const xhttp = student.updateStudent(data);
    xhttp.onreadystatechange = ()=>{
        if(xhttp.status === 200 && xhttp.readyState == 4){
            $("#form").trigger("reset");
            $(".input").eq(0).focus();
            $("tbody").html("");
            getAllStudent();
            $("#submit").text("Submit");
        }
    }
}

function deleteStudent(id){
    const student = new Student();
    const xhttp = student.updateStudent(id);
    xhttp.onreadystatechange = ()=>{
        if(xhttp.status === 200 && xhttp.readyState == 4){
            $("tbody").html("");
            getAllStudent();
        }
    }
}
