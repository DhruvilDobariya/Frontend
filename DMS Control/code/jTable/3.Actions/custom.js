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
                                                    alert(data);
                                                },
                                                error: function (e) {
                                                    alert(e);
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
                        if (confirm("Are you sure you want to delete this record?")) {
                            $.ajax({
                                url: "https://localhost:44319/api/Students/" + data.record.Id,
                                type: "DELETE",
                                success: function (data) {
                                    $("#table").jtable("reload");
                                    alert(data);
                                },
                                error: function (e) {
                                    alert(e);
                                },
                            });
                        }
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
    });

    // event
    $("#table").jtable("load");
});
