$(document).ready(function () {
    $("#table").jtable({
        title: "Students", // set title of table

        addRecordButton: "", // configure add button
        // we can give selector to give custom button and when that button clicked our create form is open.
        // Ex: addRecordButton: $("btn-add")

        ajaxSetting: {
            // configur global ajax request
            type: "GET",
        },

        tableId: "table",

        // we also can create custome button using toolbar options.
        // Using this we can custumized behaciour of create from
        toolbar: {
            hoverAnimation: true, // enable/disable small animation of mouse hover on toolbar
            hoverAnumationDuration: 60, // set hover animation duration
            hoverAnimationEasing: "swing", // set hover animation easing

            items: [
                // array of custome toolbar items
                {
                    icon: "",
                    text: "Add Student",
                    cssClass: "btn btn-danger",
                    tooltip: "Create student",
                    click: function () {
                        let $form = $("<form></form>");
                        $form.append("<label>Name:</label><br/><input type='text' name='Name' value='' /><br/>");
                        $form.append("<label>RollNo:</label><br/><input type='number' name='RollNo' value='' /><br/>");
                        $form.append("<label>Email:</label><br/><input type='email' name='Email' value='' /><br/>");
                        $form.append("<label>ContactNo:</label><br/><input type='text' name='ContactNo' value='' /><br/>");
                        $form.dialog({
                            title: "Create Student",
                            model: true,
                            buttons: {
                                Save: function () {
                                    let formData = $form.serializeArray();
                                    let obj = {};

                                    for (let a of formData) {
                                        obj[a.name] = a.value;
                                    }

                                    $.ajax({
                                        url: "https://localhost:44319/api/Students/",
                                        type: "POST",
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
                        return $form;
                    },
                },
            ],
        },

        fields: {
            Id: {
                title: "Id",
                key: true,
                edit: false,
                create: false,
                delete: true,
                // visibility: "hidden",
            },
            Name: {
                title: "Name",
                // sorting: true,
                // optionSorting: "text",
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

    // event
    $("#table").jtable("load");
    // $("#table").jtable("option", "pageSize", 5);
});
