import { getBooks, deleteBook } from "../../../Services/book-service.js";

$(document).ready(function(){
    if(sessionStorage.getItem("id") == null){
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
                toastr.success(sessionStorage.getItem("name") + " logged out successfully");
                sessionStorage.clear();
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
        })
    })
    .catch(e => console.log(e));
}

function romoveBook(id){
    let deleteBookPromise = deleteBook(id);
    deleteBookPromise.done((data) => {
        $("tbody").empty();
        fillData();
        toastr.success(data);
    })
    .fail((e) => {
        toastr.error(e.responseText);
    });
}