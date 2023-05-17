$(document).ready(function () {
    $("#table").jtable({
        title: "Students", // set title of table

        addRecordButton: "", // configur add button
        // showCloseButton: true, // default: true, when user click on button, closeRequested event reised
        // this is userd to close child table

        ajaxSetting: {
            // configur globl ajax request
            type: "GET",
        },

        // column configuration
        columnResizable: true, // default: true, allow to resize column
        columnSelectable: true, // default: true, user can show and hide column by right click on header

        // sorting configuration
        sorting: true, // default: false, give sorting button in header
        defaultSoting: "Name ASC", // "ColumnnName ASC" or "ColumnName DESC" we can also set multiple column
        multiSorting: true, // default: false, set multiple sorting

        // paging
        paging: true, // default: false, enable paging
        gotoPageArea: "none", // set direct page navigation is enable or not
        pageSizeChangeArea: true, // default: true, set pagination combobox is eable or not
        pageList: "normal", // set behaviour of navigation panel
        // we have two behaviour for navigation panel
        // 1) minimal: Show only first, previous, next and last links.
        // 2) normal: Shows page numbers in addition to 'minimal'.
        pageSizes: [10, 20, 30, 40], // set combobox option

        // select
        selecting: true, // default: false, it enable to select row
        multiselect: true, // default: false, it enable multiple selection of rows
        selectingCheckboxes: true, // default: false, it enable checkbox for select row
        selectOnRowClick: true, // default: false, it enables selection row on clicking

        // delete configuration
        // deleteConfiguration: true, // default: true, it set whether dialog box open or not on delete
        defaultConfiguration: function (data) {
            // we also can configure behaviour of dialog box
            // data have following properties,
            // row: A jQuery selection for deleting row element.
            // record: recored which we are going to be delete/
            // cancel: We can set data.cancel to true to cancel delete process (default value is false).
            // cancelMessage: If we cancelled delete process, we can show a message to user that explains cancellation reason.
            // deleteConfirm: A boolean value indicates whether to show a delete confirmation message or not (default value is true).
            // deleteConfirmMessage: If confirmation enabled, we can set a custom confirmation message.

            deleteConfirm = true;
            data.deleteConfirmMessage = "Are you sure you want to delete this record";
        },

        // animation and theam configuration
        // jqueryuiTheme: "false", // default: false, set whether jqueryui theam use or not
        animationsEnabled: false, // default: true, set whether animation enable or not
        loadingAnimationDelay: "7000", // set loading animation delay
        dialogShowEffect: "bounce", // set dialog show effect
        dialogHideEffect: "drop", // set dialog hide effect
        // we have multiple types of effect like,
        // 'blind', 'bounce', 'clip', 'drop', 'explode', 'fold', 'highlight', 'puff', 'pulsate', 'scale', 'shake', 'size', 'slide'

        openChildAsAccordion: true, // default: false, set child table is open and close in accordion
        defaultDateFormat: "dd-mm-yyyy", // set default format of date

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
