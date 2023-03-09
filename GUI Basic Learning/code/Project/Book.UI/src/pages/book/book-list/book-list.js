import { getBooks, deleteBook } from "../../../Services/book-service.js";

$(document).ready(function(){
    if(sessionStorage.getItem("id") == null && localStorage.getItem("id") == null){
        window.location.href = "../../user/user-login/user-login.html";
    }
    else{
        fillData();

        $("tbody").on("click", ".delete", function(){
            // console.log($(this).parent().siblings().eq(0).text())
            if(confirm("are you sure tou want to delete " + $(this).parent().siblings().eq(2).text() + " book")){
                romoveBook($(this).parent().siblings().eq(0).text());
            }
        });

        $(document).ready(function(){
            $("#btnLogOut").click(function(){
                if(localStorage.getItem("id") != null){
                    toastr.success(localStorage.getItem("name") + " logged out successfully");
                    localStorage.clear();
                }
                else{
                    toastr.success(sessionStorage.getItem("name") + " logged out successfully");
                    sessionStorage.clear();
                }
                setTimeout(()=>{
                    window.location.href = "../../user/user-login/user-login.html";
                },2000);
            });
        });
    }
})

function fillData(){
    let books = getBooks();

    books.then((data) => {
        $(JSON.parse(data)).each(function(i,book){
            $("tbody").append(`
            <tr>
                <td hidden>`+ book.Id +`</td>
                <th>`+ ++i +`</th>
                <td>`+ book.Title +`</td>
                <td>`+ book.Author +`</td>
                <td>`+ book.Rating +`</td>
                <td>`+ book.Price +`</td>
                <td class="text-center">
                    <a class="btn btn-gradient" href="`+ book.URL +`">
                        <i class="fa-sharp fa-solid fa-eye"></i>
                    </a>
                </td>
                <td class="text-center">
                    <a class="btn btn-gradient" href="../book-add-edit/book-add-edit.html?id=`+ book.Id +`">
                        <i class="fa-solid fa-pen-to-square"></i>
                    </a>
                </td>
                <td class="text-center">
                    <button class="btn btn-danger delete">
                        <i class="fa-solid fa-trash-can"></i>
                    </button>
                </td>
            </tr>
            `);
        });
        $("#table").DataTable();
        $("#table_filter").addClass("d-flex justify-content-end mb-2");
        $("#table_paginate").addClass("d-flex justify-content-end");
        $("#table_length").parent().addClass("d-flex align-items-end mb-2");
        $("#table_length > label").html($("#table_length > label").children()[0]);
        $("#spinner").hide();
    })
    .catch(e => console.log(e));
}

function romoveBook(id){
    let deleteBookPromise = deleteBook(id);
    deleteBookPromise.done((data) => {
        toastr.success(data, ()=>{
            $("tbody").empty();
            fillData();
        });
    })
    .fail((e) => {
        toastr.error(e.responseText);
    });
}