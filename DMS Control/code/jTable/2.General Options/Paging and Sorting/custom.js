$(document).ready(function () {
    $("#table").jtable({
        title: "Students", // set title of table

        // sorting configuration
        sorting: true, // default: false, give sorting button in header
        defaultSorting: "Name ASC", // "ColumnnName ASC" or "ColumnName DESC" we can also set multiple column
        multiSorting: true, // default: false, set multiple sorting

        // paging
        paging: true, // default: false, enable paging
        pageSize: 10, // default: 10, set page size
        gotoPageArea: "none", // set direct page navigation is enable or not
        pageSizeChangeArea: true, // default: true, set pagination combobox is eable or not
        pageList: "normal", // set behaviour of navigation panel
        // we have two behaviour for navigation panel
        // 1) minimal: Show only first, previous, next and last links.
        // 2) normal: Shows page numbers in addition to 'minimal'.
        pageSizes: [10, 20, 30, 40], // set combobox option

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
        },
        actions: {
            listAction: function (postData, jtParams) {
                console.log(jtParams);
                return $.Deferred(function ($dfd) {
                    $.ajax({
                        url: `https://localhost:44319/api/Students?startIndex=${jtParams.jtStartIndex}&pageSize=${jtParams.jtPageSize}&sorting=${jtParams.jtSorting}`,
                        type: "GET",
                        dataType: "json",
                        // data: jtParams,
                        success: function (data) {
                            console.log(data);
                            $dfd.resolve({
                                Result: "OK",
                                Records: data.Students,
                                TotalRecordCount: data.Count,
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
    $("#table").jtable("load");
    // $("#table").jtable("option", "pageSize", 5);
});
