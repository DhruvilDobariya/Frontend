$(document).ready(function(){
    const promiseOfGetData = getData();
    promiseOfGetData.done(function(data){
        console.log(data);
    })
    .fail(function(e){
        console.log(e);
    })
    .always(function(){
        console.log("always")
    })
});

function getData(){
    return $.ajax({
        type: "GET",
        url: "https://jsonplaceholder.typicode.com/users",
        data: {},
        datatype: "json",
        header: {

        }
    })
}