$(document).ready(function () {
    $("#table").jtable({
        title: "Students", // set title of table

        selecting: true,
        multiselect: true,

        fields: {
            Id: {
                title: "Id",
                key: true,
                edit: false,
                create: false,
                delete: true,
            },
            Name: {
                title: "Name",
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
            Edit: {
                title: "Edit",
                width: "7%",
                create: false,
                display: function (data) {
                    var $editButton = $("<button class='btn btn-sm btn-success'>Edit</button>");
                    $editButton.click(function () {
                        $.ajax({
                            url: "https://localhost:44319/api/Students/" + data.record.Id,
                            type: "GET",
                            success: function (data) {
                                let obj = JSON.parse(data);
                                let $form = $("<form></form>");
                                $form.append("<label>Name:</label><br/><input type='text' name='Name' value='" + obj.Name + "' /><br/>");
                                $form.append("<label>RollNo:</label><br/><input type='number' name='RollNo' value='" + obj.RollNo + "' /><br/>");
                                $form.append("<label>Email:</label><br/><input type='email' name='Email' value='" + obj.Email + "' /><br/>");
                                $form.append("<label>ContactNo:</label><br/><input type='text' name='ContactNo' value='" + obj.ContactNo + "' /><br/>");

                                $form.dialog({
                                    title: "Edit Recored",
                                    model: true,
                                    buttons: {
                                        Save: function () {
                                            let formData = $form.serializeArray();
                                            let obj = {
                                                Id: JSON.parse(data).Id,
                                            };

                                            for (let a of formData) {
                                                obj[a.name] = a.value;
                                            }

                                            $.ajax({
                                                url: "https://localhost:44319/api/Students/",
                                                type: "PUT",
                                                data: JSON.stringify(obj),
                                                headers: {
                                                    accept: "text/plain",
                                                    "Content-Type": "application/json",
                                                },
                                                success: function (data) {
                                                    $("#table").jtable("reload");
                                                    console.log(data);
                                                },
                                                error: function (e) {
                                                    console.log(e);
                                                },
                                            });

                                            $(this).dialog("close");
                                        },
                                        Cancel: function () {
                                            $(this).dialog("close");
                                        },
                                    },
                                });
                            },
                            error: function (e) {
                                console.log(e);
                            },
                        });
                    });
                    return $editButton;
                },
            },
            Delete: {
                title: "Delete",
                width: "7%",
                create: false,
                display: function (data) {
                    var $deleteButton = $("<button class='btn btn-sm btn-danger'>Delete</button>");
                    $deleteButton.click(function () {
                        $.ajax({
                            url: "https://localhost:44319/api/Students/" + data.record.Id,
                            type: "DELETE",
                            success: function (data) {
                                $("#table").jtable("reload");
                                console.log(data);
                            },
                            error: function (e) {
                                console.log(e);
                            },
                        });
                    });
                    return $deleteButton;
                },
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
            // listAction: "https://localhost:44319/api/Students",
            createAction: function (postData) {
                let data = postData.split("&");
                let obj = {};
                for (let a of data) {
                    obj[a.split("=")[0]] = a.split("=")[1];
                }
                console.log(obj);
                return $.ajax({
                    url: "https://localhost:44319/api/Students",
                    type: "POST",
                    data: JSON.stringify(obj),
                    headers: {
                        accept: "text/plain",
                        "Content-Type": "application/json",
                    },
                    success: function (data) {
                        // alert("data");
                        $("#table").jtable("reload");
                        console.log(data);
                    },
                    error: function (e) {
                        console.log(e);
                    },
                });
            },
        },

        closeRequested: function () {
            $("#table").jtable("destroy");
        },
    });

    // methods

    // addRecord()
    // It is used to add new recored in table programmaticaly
    // options:
    // record: the object of record which we want to add
    // clientOnly: default: false, if it is true then record only add in client side not afftect on server
    // animationsEnable: default: true, if true then show animation while deleting row
    // url: specify url for createAction
    // success: it is callback function which is execute when ajax call success
    // error: it is callback function which is execute when ajax call give something error
    $("#table").jtable("addRecord", {
        record: JSON.stringify({
            name: "string",
            rollNo: 102,
            email: "user@example.com",
            contactNo: "8582582546",
        }),
        clientOnly: true,
        animationsEnable: true,
        url: "https://localhost:44319/api/Students",
        success: function (data) {
            console.log("message: " + data);
        },
        error: function (e) {
            console.log("message: " + e);
        },
    });

    // changeColumnVisibility()
    // it is used to change column visibility
    // we have three diffrent behaviour of visibility
    // hidden, visible, fixed
    $("#table").jtable("changeColumnVisibility", "Id", "fixed");

    // selectedRows()
    // it is used to get all selected rows from table
    let $selectedRows = $("#table").jtable("selectedRows");
    console.log($selectedRows);

    // getRowByKey()
    // it is used to retieve recored by key
    let $getRowByKey = $("#table").jtable("getRowByKey", 4);
    // let $getRowByKey = $("#table").jtable("getRowByKey", {
    //     key: 4,
    // });
    console.log($getRowByKey);

    // deleteRows()
    // it will delete rows fron server and client both side
    // $("#table").jtable("deleteRows", 10);

    // updateRocord()
    // it is used to delete row by key
    // options:
    // record: the object of record which we want to add
    // clientOnly: default: false, if it is true then record only add in client side not afftect on server
    // url: specify url for createAction
    // animationsEnable: default: true, if true then show animation while deleting row
    // success: it is callback function which is execute when ajax call success
    // error: it is callback function which is execute when ajax call give something error
    $("#table").jtable("updateRecord", {
        record: JSON.stringify({
            id: 21,
            name: "string",
            rollNo: 102,
            email: "user@example.com",
            contactNo: "8582582546",
        }),
        clientOnly: true,
        animationsEnable: true,
        url: "https://localhost:44319/api/Students",
        success: function (data) {
            console.log("message: " + data);
        },
        error: function (e) {
            console.log("message: " + e);
        },
    });

    // deleteRecord()
    // it is used to delete row by key
    // options:
    // record: the object of record which we want to add
    // clientOnly: default: false, if it is true then record only add in client side not afftect on server
    // url: specify url for createAction
    // animationsEnable: default: true, if true then show animation while deleting row
    // success: it is callback function which is execute when ajax call success
    // error: it is callback function which is execute when ajax call give something error
    $("#table").jtable("deleteRecord", {
        key: 4,
        clientOnly: true,
        animationsEnable: true,
        url: "https://localhost:44319/api/Students",
        success: function (data) {
            console.log("message: " + data);
        },
        error: function (e) {
            console.log("message: " + e);
        },
    });

    // load()
    // load a data into table
    $("#table").jtable("load", { id: 2 }, function () {
        console.log("table loaded successfully");
    });
    // give those recored which is id equals to 2, we also can handle request on server side

    // reload()
    // it will reload table and execute callback function
    $("#table").jtable("reload", function () {
        console.log("table reloaded successfully");
    });

    // destroy()
    // it will destory table
    // $("#table").jtable("destroy");

    // selectRows()
    // it is used to select rows
    // $("#table").jtable("selectRows", 10);

    // showCreateForm()
    // it will show create form
    // $("#table").jtable("showCreateForm");

    // child table methods
    // openChildRow()
    // it is used to open child rows
    $("#table").jtable("oprnChildRow", 10);

    // closeChildRow()
    // it is used to close child rows
    $("#table").jtable("closeChildRow", 10);

    // openChildTable()
    // it is used to create and open child table
    // options:
    // row: data of the table
    // tableOptions: options of table
    // opened: callback function which is execute after table is opend
    $("#table").jtable("openChildTable", 10, {}, function (data) {
        data.childTable.reload();
    });

    // closeChildTable()
    // it is used to create and close child table
    // options:
    // row: data of the table
    // closed: callback function which is execute after table is closed
    $("#table").jtable("openChildTable", 10, function () {
        console.log("table is closed");
    });
});
