var baseUrl = "https://localhost:44327/";
export function getBooks() {
    return Promise.resolve(
        $.get({
            url: baseUrl + "api/Book",
            data: {},
            headers: {
                Authorization: "Bearer " + sessionStorage.getItem("token"),
            },
            // type: "json"
            // success: function(data){
            //     rowdata = JSON.parse(data);
            // }
        })
    );
}

// export function getBooks(){
//     $.get({
//         url: baseUrl + "api/Book",
//         data: {},
//         success: callback
//     })
//     function callback(responce){
//         console.log(responce);
//     }
// }

// export async function getBooks(){
//     const data = await $.get({
//         url: baseUrl + "api/Book",
//         data: {}
//     });
//     return data;
// }

export async function getBookById(id) {
    const data = await $.getJSON({
        type: "GET",
        url: baseUrl + "api/Book/" + id,
        headers: {
            Authorization: "Bearer " + sessionStorage.getItem("token"),
        },
    });
    return data;
}

export async function addBook(book) {
    const data = await $.ajax({
        type: "POST",
        url: baseUrl + "api/Book",
        data: JSON.stringify(book),
        dataType: "json",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + sessionStorage.getItem("token"),
        },
    });
    return data;
}

export async function editBook(book) {
    const data = await $.ajax({
        type: "PUT",
        url: baseUrl + "api/Book",
        data: JSON.stringify(book),
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: "Bearer " + sessionStorage.getItem("token"),
        },
    });
    return data;
}

export function deleteBook(id) {
    return $.ajax({
        type: "DELETE",
        url: baseUrl + "api/Book/" + id,
        data: {},
        headers: {
            Authorization: "Bearer " + sessionStorage.getItem("token"),
        },
    });
}

{
    author: "J.K.Rowling";
    date: "2, Nov, 2019";
    detail: "Harry Potter awakens from a nightmare wherein a man named Frank Bryce is killed after overhearing Lord Voldemort conspiring with Peter Pettigrew";
    id: "001";
    price: 30000;
    rating: 2;
    title: "Harry Potter and the Goblet of Fire";
    url: "https://covers.openlibrary.org/w/id/7984916-M.jpg";
}
