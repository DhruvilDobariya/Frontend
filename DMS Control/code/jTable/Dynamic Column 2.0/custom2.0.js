let tableConfig = {
    keyword: "",
    sort: "",
    skip: 0,
    take: 10,
};
let $table = $("#table");
let isTableLoaded = false;
let isFieldExist = true;
let responseData = {};

$(document).ready(function () {
    getDDLData().then(data => {
        for (let item of data) {
            $("#ddlOptions").append($(`<option value="${item.TABLE_NAME}">${item.TABLE_NAME}</option>`));
        }
    });
    $("#btnLoad").on("click", function () {
        if ($("#ddlOptions").val() !== "-1") {
            tableConfig.tableName = $("#ddlOptions").val();
            isFieldExist = false;
            getData().then(response => {
                responseData = response;
                processData(responseData.Data);
                refreshTable();
            });
        }
    });
    $("#txtSearch").on("keyup", function (e) {
        keyCode = e.keyCode || e.which;
        if (keyCode === 13) {
            $table.jtable("load", { search: e.target.value });
        }
    });
});

async function refreshTable() {
    if (isTableLoaded) {
        await $table.jtable("destroy");
    }
    loadTable();
    $table.jtable("load", { search: "" });
}

function processData(data) {
    tableConfig.fields = {};
    for (key in data[0]) {
        tableConfig.fields[key] = { title: key };
    }
}

function loadTable() {
    $table.jtable({
        title: tableConfig.tableName,
        sorting: true,
        multiSorting: true,
        paging: true,
        pageSize: 10,
        pageSizeChangeArea: true,
        pageList: "normal",
        pageSizes: [10, 20, 30, 40],
        saveUserPreferences: false,

        fields: tableConfig.fields,
        actions: {
            listAction: function (postData, jtParams) {
                tableConfig.keyword = postData.search;
                tableConfig.sort = jtParams.jtSorting || "";
                tableConfig.skip = jtParams.jtStartIndex;
                tableConfig.take = parseInt(jtParams.jtPageSize);
                let $dfd = $.Deferred();
                loadData().then(data => {
                    $dfd.resolve(data);
                });
                return $dfd;
            },
        },
    });

    isTableLoaded = true;
}

function loadData() {
    let $dfd = $.Deferred();
    if (!isFieldExist) {
        $dfd.resolve({
            Result: "OK",
            Records: responseData.Data,
            TotalRecordCount: responseData.Count,
        });
        isFieldExist = true;
    } else {
        getData().then(response => {
            // processData(response.Data);
            $dfd.resolve({
                Result: "OK",
                Records: response.Data,
                TotalRecordCount: response.Count,
            });
        });
    }
    return $dfd;
}
function getData() {
    return $.ajax({
        url: "https://localhost:44334/api/Log/GetLogData",
        type: "POST",
        dataType: "json",
        data: JSON.stringify({
            tableName: tableConfig.tableName,
            keyword: tableConfig.keyword,
            sort: tableConfig.sort,
            skip: tableConfig.skip,
            take: tableConfig.take,
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
