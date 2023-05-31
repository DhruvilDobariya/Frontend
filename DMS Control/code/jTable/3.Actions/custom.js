$(document).ready(function () {
    $("#table").jtable({
        title: "Students",

        fields: {
            Id: {
                title: "Id",
                key: true,
                edit: false,
                create: false,
                delete: true,
                visibility: "hidden",
            },
            Name: {
                title: "Name",
                inputTitle: "Name of User",
                inputClass: "bg-danger text-success",
            },
            RollNo: {
                title: "Roll No",
            },
            Email: {
                title: "Email",
            },
            ContactNo: {
                title: "Contact No",
            },
        },
        actions: {
            listAction: function (postData, jtParams) {
                return $.Deferred(function ($dfd) {
                    $.ajax({
                        url: "https://localhost:44319/api/Students",
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
            createAction: function (postData) {
                return $.Deferred(function ($dfd) {
                    let data = postData.split("&");
                    let obj = {};
                    for (let a of data) {
                        obj[a.split("=")[0]] = a.split("=")[1];
                    }
                    console.log(obj);
                    $.ajax({
                        url: "https://localhost:44319/api/Students",
                        type: "POST",
                        data: JSON.stringify(obj),
                        headers: {
                            accept: "text/plain",
                            "Content-Type": "application/json",
                        },
                        success: function (data) {
                            $dfd.resolve({
                                Result: "OK",
                                Records: data,
                                TotalRecordCount: data.length,
                            });
                            // alert("data");
                            $("#table").jtable("reload");
                            console.log(data);
                        },
                        error: function (e) {
                            $dfd.reject();
                            console.log(e);
                        },
                    });
                });
            },
            updateAction: function (postData, jtParams) {
                return $.Deferred(function ($dfd) {
                    let data = postData.split("&");
                    let obj = {};
                    for (let a of data) {
                        obj[a.split("=")[0]] = a.split("=")[1];
                    }
                    console.log(obj);
                    $.ajax({
                        url: "https://localhost:44319/api/Students",
                        type: "PUT",
                        data: JSON.stringify(obj),
                        headers: {
                            accept: "text/plain",
                            "Content-Type": "application/json",
                        },
                        success: function (data) {
                            $dfd.resolve({
                                Result: "OK",
                                Records: data,
                                TotalRecordCount: data.length,
                            });
                            // alert("data");
                            $("#table").jtable("reload");
                            console.log(data);
                        },
                        error: function (e) {
                            $dfd.reject();
                            console.log(e);
                        },
                    });
                });
            },
            deleteAction: function (postData, jtParams) {
                return $.Deferred(function ($dfd) {
                    $.ajax({
                        url: "https://localhost:44319/api/Students/" + postData.Id,
                        type: "DELETE",
                        data: {},
                        headers: {
                            accept: "text/plain",
                            "Content-Type": "application/json",
                        },
                        success: function (data) {
                            $dfd.resolve({
                                Result: "OK",
                                Records: data,
                                TotalRecordCount: data.length,
                            });
                            // alert("data");
                            $("#table").jtable("reload");
                            console.log(data);
                        },
                        error: function (e) {
                            $dfd.reject();
                            console.log(e);
                        },
                    });
                });
            },
        },
    });

    // event
    $("#table").jtable("load");
});
