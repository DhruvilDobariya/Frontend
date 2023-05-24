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

        // event
        // closeRequest
        // it triggered when we click on close button of table
        closeRequested: function (event, data) {
            $("#table").jtable("destroy");
            console.log("table closed");
        },

        // formClose
        // it triggered when we form is close
        formClosed: function (event, data) {
            // data.form: it give form as a jQuery selector
            // data.formType: it give type of form like create or edit
            // data.row: it give us edited row if form is in edit mode
            console.log("form closed");
        },

        // formCreated
        // it triggered when we form is create
        formCreated: function (event, data) {
            // data.form: it give form as a jQuery selector
            // data.formType: it give type of form like create or edit
            // data.record: it give us edited record if form is in edit mode
            // data.row: it give us edited row if form is in edit mode
            console.log("form created");
        },

        // formSubmitting
        // it triggered when we form is submit
        formSubmitting: function (event, data) {
            // data.form: it give form as a jQuery selector
            // data.formType: it give type of form like create or edit
            // data.row: it give us edited row if form is in edit mode
            console.log("form is submiting...");
        },

        // loadingRecords
        // it triggered when loading recored in table
        loadingRecords: function (event, data) {
            console.log("record is loading...");
        },

        // recordsLoaded
        // it triggered when recored load successfully
        recordsLoaded: function (event, data) {
            // data.record: it give us all the record which is loaded
            // data.serverResponse: it give use server response
            console.log("recored loaded successfully");
        },

        // recordAdded
        // it triggered when record is add
        recordAdded: function (event, data) {
            // data.record: it give us object of added recored
            // data.serverResponse: it give use server response
            console.log("recored added successfully");
        },

        // recordAdded
        // it triggered when record is add
        recordUpdated: function (event, data) {
            // data.record: it give us object of added recored
            // data.row: it give us edited row
            // data.serverResponse: it give use server response
            console.log("recored updated successfully");
        },

        // recordAdded
        // it triggered when record is add
        recordDeleted: function (event, data) {
            // data.record: it give us object of added recored
            // data.row: it give us deleted row
            // data.serverResponse: it give use server response
            console.log("recored deleted successfully");
        },

        // rowInserted
        // it triggered when row insert in table
        rowInserted: function (event, data) {
            // data.record: it give us record
            // data.row: it give us row
            // data.isNewRow: it gives true if it is new row
            console.log("row inserted successfully");
        },

        // rowUpdated
        // it triggered when row update in table
        rowUpdated: function (event, data) {
            // data.record: it give us updated record
            // data.row: it give us updated row
            console.log("row updated successfully");
        },

        // rowRemoved
        // it triggered when row insert in table
        rowRemoved: function (event, data) {
            // data.row: it give us deleted row
            // data.reason: it give us reason
            console.log("row removed successfully");
        },

        // selectionChanged
        // it triggered when select any row or unselect any row
        selectionChanged: function (event, data) {
            console.log("selection is changed");
        },
    });

    $("#table").jtable("load");
    
});
