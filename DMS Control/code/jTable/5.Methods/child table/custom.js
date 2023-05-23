$(document).ready(function () {
    $("#table").jtable({
        title: "User", // set title of table

        ajaxSettings: {
            type: "GET",
        },

        selecting: true,
        multiselect: true,

        fields: {
            id: {
                title: "Id",
                key: true,
                edit: false,
                create: false,
                delete: true,
            },
            name: {
                title: "Name",
            },
            username: {
                title: "Username",
            },
            email: {
                title: "Email",
            },
            phone: {
                title: "Contact No",
            },
            address: {
                title: "Address",
                display: function (data) {
                    return JSON.stringify(data.record.address.street) + ", " + JSON.stringify(data.record.address.suite);
                },
            },
            gov: {
                title: "GOV",
                display: function (data) {
                    return JSON.stringify(data.record.address.geo.lat) + ", " + JSON.stringify(data.record.address.geo.lng);
                },
            },
            childTable: {
                title: "Todo",
                create: false,
                edit: false,

                display: function (data) {
                    let $todo = $("<button class='btn btn-success'>Todo</button>");
                    // console.log("https://jsonplaceholder.typicode.com/todos?userId=" + data.record.id);
                    $todo.click(function () {
                        $("#table").jtable(
                            "openChildTable",
                            $todo.closest("tr"),
                            {
                                title: "Todo",
                                ajaxSettings: {
                                    type: "GET",
                                },

                                fields: {
                                    id: {
                                        title: "Id",
                                        key: true,
                                        create: false,
                                        edit: false,
                                    },
                                    userId: {
                                        title: "User Id",
                                    },

                                    title: {
                                        title: "Title",
                                    },
                                    completed: {
                                        title: "Completed",
                                    },
                                },

                                actions: {
                                    listAction: function (postData, jtParams) {
                                        return $.Deferred(function ($dfd) {
                                            $.ajax({
                                                url: "https://jsonplaceholder.typicode.com/todos?userId=" + data.record.id,
                                                type: "GET",
                                                dataType: "json",
                                                success: function (todo) {
                                                    $dfd.resolve({
                                                        Result: "OK",
                                                        Records: todo,
                                                        TotalRecordCount: todo.length,
                                                    });
                                                },
                                                error: function () {
                                                    $dfd.reject();
                                                },
                                            });
                                        });
                                    },

                                    // listAction: "https://jsonplaceholder.typicode.com/todos?userId=" + data.record.id,
                                },
                            },
                            function (data) {
                                data.childTable.jtable("load");
                            }
                        );
                    });

                    return $todo;
                },
            },
        },
        actions: {
            listAction: function (postData, jtParams) {
                return $.Deferred(function ($dfd) {
                    $.ajax({
                        url: "https://jsonplaceholder.typicode.com/users",
                        type: "GET",
                        dataType: "json",
                        // data: jtParams,
                        success: function (data) {
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

    $("#table").jtable("load");
});
