let tableConfig = {};
let $table = $("#table");
let isTableLoaded = false;

$(document).ready(function () {
    getDDLData().then(data => {
        for (let item of data) {
            $("#ddlOptions").append($(`<option value="${item.TABLE_NAME}">${item.TABLE_NAME}</option>`));
        }
    });
    $("#ddlOptions").on("change", async function (e) {
        if (e.target.value !== "-1") {
            tableConfig = {
                tableName: e.target.value,
            };
            await refreshTable();
        }
    });
});

async function refreshTable() {
    await getData().then(data => processData(data));
    if (isTableLoaded) {
        await $table.jtable("destroy");
    }
    loadTable();
}

function processData(response) {
    tableConfig.fields = {};
    for (key in response.Data[0]) {
        tableConfig.fields[key] = { title: key };
    }
}

function loadTable() {
    $table.jtable({
        title: tableConfig.tableName,
        sorting: true,
        defaultSorting: "Name ASC",
        multiSorting: true,
        paging: true,
        pageSize: 10,
        pageSizeChangeArea: true,
        pageList: "normal",
        pageSizes: [10, 20, 30, 40],

        fields: tableConfig.fields,
        actions: {
            listAction: function (postData, jtParams) {
                return $.Deferred(function ($dfd) {
                    $.ajax({
                        url: "https://localhost:44334/api/Log/GetLogData",
                        type: "POST",
                        dataType: "json",
                        data: JSON.stringify({
                            tableName: tableConfig.tableName,
                            keyword: postData.search,
                            sort: jtParams.jtSorting || "",
                            skip: jtParams.jtStartIndex,
                            take: jtParams.jtPageSize,
                        }),
                        headers: {
                            accept: "text/plain",
                            "Content-Type": "application/json",
                        },
                        success: function (response) {
                            $dfd.resolve({
                                Result: "OK",
                                Records: response.Data,
                                TotalRecordCount: response.Count,
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

    // $table.jtable("load");
    $("#txtSearch").on("input", function (e) {
        $("#table").jtable("load", { search: e.target.value });
    });

    $("#txtSearch").trigger("input");
    isTableLoaded = true;
}

function getData() {
    return $.ajax({
        url: "https://localhost:44334/api/Log/GetLogData",
        type: "POST",
        dataType: "json",
        data: JSON.stringify({
            tableName: tableConfig.tableName,
            keyword: "",
            sort: "",
            skip: 0,
            take: 1,
        }),
        headers: {
            accept: "text/plain",
            "Content-Type": "application/json",
        },
    });
}

function getDDLData() {
    return $.ajax({
        url: "https://localhost:44334/api/Log/GetLogTable",
        type: "GET",
        dataType: "json",
    });
}
