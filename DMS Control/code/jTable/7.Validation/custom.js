$(document).ready(function () {
    $("#table").jtable({
        title: "Students", // set title of table

        showCloseButton: true,

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
                inputClass: "form-control input-sm",
            },
            RollNo: {
                title: "Roll No",
                inputClass: "form-control input-sm",
            },
            Email: {
                title: "Email",
                inputClass: "form-control input-sm",
            },
            ContactNo: {
                title: "Contact No",
                inputClass: "form-control input-sm",
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

        formCreated: function (event, data) {
            data.form.find("input[name='Name']").addClass("validate[required]");
            data.form.find("input[name='RollNo']").addClass("validate[required]");
            data.form.find("input[name='Email']").addClass("validate[required, custom[email]]");
            data.form.find("input[name='ContactNo']").addClass("validate[required]");
            data.form.validationEngine();
        },

        formSubmitting: function (event, data) {
            return data.form.validationEngine("validate");
        },

        formClosed: function (event, data) {
            data.form.validationEngine("hide");
            data.form.validationEngine("detach");
        },

        closeRequested: function (event, data) {
            $("#table").jtable("destroy");
        },
    });

    $("#table").jtable("load");
});
