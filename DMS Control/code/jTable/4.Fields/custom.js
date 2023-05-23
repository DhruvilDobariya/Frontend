$(document).ready(function () {
    $("#table").jtable({
        title: "Todos",

        fields: {
            id: {
                title: "Id", // title of this column in form

                // By default all properties which have boolean value, that is true
                edit: false, // this field don't show when we edit recored
                create: false, // this field don't show when we edit recored
                delete: true, // it could be delete

                columnResizable: true, // it allows us to resize column
                width: "10%", // set width of column
                visibility: "fixed", // set visibility behaviour
                // we have three different option for visibility
                // 1) fixed: this is always visible can't hide by user
                // 2) visible: this is always visible can't hide by user
                // 1) hidden: this is always visible can't hide by user

                sorting: true, // enable sorting
                optionSorting: "text-desc", // set the behaviour of sorting
                // we have four different behaviour for sorting
                // 1) value: sort according to the value in ascending, ex: 1, 2, 3,..., 10, 11, 12,..
                // 2) value-desc: sort according to the value in descending ex: 21 , 20, 19, 18,..., 2, 1
                // 3) text: sort according to the display text in ascending ex: 1, 10, 11, 2, 21, 3, 4, 41
                // 4) text-desc: sort according to the display text in ascending ex: ex: 41,4, 3, 21, 2, 11, 10, 1
            },
            userId: {
                title: "UserId",
                // options: ["Home phone", "Office phone", "Cell phone"],
                options: {
                    // using key-value pair of object
                    1: "Home phone",
                    2: "Office phone",
                    3: "Cell phone",
                },
                // options: [ // using key-value pair of array
                //     { Value: "1", DisplayText: "Home phone" },
                //     { Value: "2", DisplayText: "Office phone" },
                //     { Value: "2", DisplayText: "Cell phone" },
                // ],
                // options: { // using api
                //     Result: "OK",
                //     Options: [
                //         {
                //             DisplayText: "Home phone",
                //             Value: "1",
                //         },
                //         {
                //             DisplayText: "Office phone",
                //             Value: "2",
                //         },
                //         {
                //             DisplayText: "Cell phone",
                //             Value: "3",
                //         },
                //     ],
                // },
                // option propertiy create dropdown in form and if it is in key-value pair then it also replace table list key in value.
            },
            title: {
                title: "Title",
                defaultValue: "Title", // set default value in field of form
                inputTitle: "Title of todo", // set title of field in form
                inputClass: "bg-danger text-success", // set classes in field in form

                list: false, // hide the column on table, but show in form
                // the difference between visibility and list properties is,
                // user have options to change behaviour of when we use visibility
                // but in case of list user don't have chamge behaviour of field
                listClass: "bg-danger text-success", // set classes in particuler field list
            },
            body: {
                title: "Body",
                type: "textarea", // set type of field in form
                // we have different type of field type like,
                // 1) password
                // 2) textarea
                // 3) date: if we use date then field must be in date type in table
                // 4) radiobutton
                // 5) cheackbox
                // 6) hidden: hide in form also hide in table
            },
            radioButton: {
                title: "Radio button",
                list: false,

                type: "radiobutton",
                options: {
                    1: "Male",
                    2: "Female",
                },
            },
            checkBox: {
                title: "Check box",
                list: false,

                type: "checkbox",
                values: { false: "Passive", true: "Active" },
            },
            dependedColumn: {
                title: "Dependend Column",
                dependsOn: "id", // This property use to get the date of the other field inside the current column
                // it also fetch options from the server if required
                // options: function (data) {
                //     // console.log(data);
                //     //This  Will Fetch data from the server and creaet the options
                //     //return 'http://getOptions.com?id='+ data.dependedValues.id;
                // },
            },
            input: {
                title: "Input Demo",
                list: false,
                // create custumized input field
                input: function (data) {
                    // console.log(data);
                    if (data.record) {
                        return '<input type="text" name="Name" style="width:200px" value="' + data.record.Name + '" />';
                    } else {
                        return '<input type="text" name="Name" style="width:200px" value="enter your name here" />';
                    }
                },
            },
            edit: {
                title: "display",
                display: function (data) {
                    // data contains information about records
                    // console.log(data);
                    let $edit = "<button class='btn btn-success'>Edit</button>";
                    return $edit;
                },
            },
        },

        ajaxSetting: {
            type: "GET",
        },

        actions: {
            listAction: function (postData, jtParames) {
                return $.Deferred(function ($dfd) {
                    $.ajax({
                        url: "https://jsonplaceholder.typicode.com/posts",
                        type: "GET",
                        dataType: "json",
                        success: function (data) {
                            $dfd.resolve({
                                Result: "OK",
                                Records: data,
                                TotalRecoredCount: data.length,
                            });
                        },
                        error: function (e) {
                            $dfd.reject();
                        },
                    });
                });
            },
            createAction: "https://jsonplaceholder.typicode.com/posts",
        },
    });

    $("#table").jtable("load");
});
