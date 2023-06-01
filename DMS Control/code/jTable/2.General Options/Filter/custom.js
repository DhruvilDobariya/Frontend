$(document).ready(function () {
    $("#table").jtable({
        title: "Posts",

        fields: {
            id: {
                title: "Id",
                key: true,
                edit: false,
                create: false,
                delete: true,
            },
            userId: {
                title: "User Id",
            },
            title: {
                title: "Title",
            },
            body: {
                title: "Body",
            },
        },
        actions: {
            listAction: function (postData, jtParams) {
                // console.log(postData);
                return $.Deferred(function ($dfd) {
                    let baseUrl = "https://jsonplaceholder.typicode.com/posts";
                    if (postData.userId != "") {
                        baseUrl = `https://jsonplaceholder.typicode.com/posts?userId=${postData.userId}`;
                    }
                    $.ajax({
                        url: baseUrl,
                        type: "GET",
                        dataType: "json",
                        success: function (data) {
                            console.log(data);
                            $dfd.resolve({
                                Result: "OK",
                                Records: data,
                                TotalRecordCount: data.length,
                            });
                        },
                        error: function () {
                            $dfd.reject();
                        },
                    });
                });
            },
        },
    });

    // event
    // $("#table").jtable("load");

    $("#UserId").on("input", function (e) {
        $("#table").jtable("load", { userId: e.target.value });
    });

    $("#UserId").trigger("input");
});
