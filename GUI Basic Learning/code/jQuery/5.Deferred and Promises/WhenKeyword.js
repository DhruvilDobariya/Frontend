$(document).ready(function(){
    const promiseOfGetUsers = getUsers();
    const promiseOfGetPosts = getPosts();

    promiseOfGetUsers.done((data) => {
        console.log(data);
    });

    promiseOfGetPosts.done((data) => {
        console.log(data);
    });

    const bothPromiseDone = $.when(promiseOfGetUsers, promiseOfGetPosts); // called when both promise done.
    bothPromiseDone.done(function(){
        console.log("both promise done");
    });

});

function getUsers(){
    return $.ajax({
        type: "GET",
        url: "https://jsonplaceholder.typicode.com/users",
        data: {},
        datatype: "json",
        header: {

        }
    })
}

function getPosts(){
    return $.ajax({
        type: "GET",
        url: "https://jsonplaceholder.typicode.com/posts",
        data: {},
        datatype: "json",
        header: {

        }
    })
}