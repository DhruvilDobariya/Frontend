let tableConfig = {};
let $table = $("#table");
let isTableLoaded = false;
let isFirstTime = false;
let responseData = {};

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
            isFirstTime = true;
        }
    });
});

async function refreshTable() {
    // await getData().then(data => processData(data));
    if (isTableLoaded) {
        await $table.jtable("destroy");
        isFirstTime = false;
    }
    loadTable();
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

        fields: tableConfig.fields,
        actions: {
            listAction: function (postData, jtParams) {
                tableConfig.keyword = postData.search;
                tableConfig.sort = jtParams.jtSorting || "";
                tableConfig.skip = jtParams.jtStartIndex;
                tableConfig.take = jtParams.jtPageSize;
                let $dfd = $.Deferred();
                loadData().then(data => {
                    $dfd.resolve(data);
                });
                return $dfd;
            },
        },

        loadingRecords: function (event, data) {
            tableConfig.fields = { CityId: { title: "CityId" }, CityName: { title: "CityName" } };
            $table.jtable("load");
        },
    });

    // $table.jtable("load");
    $("#txtSearch").on("input", function (e) {
        // tableConfig.fields = { cityId: { title: "CityId" }, cityName: { title: "CityName" } };
        $table.jtable("load", { search: e.target.value });
    });

    $("#txtSearch").trigger("input");
    isTableLoaded = true;
}

function loadData() {
    let $dfd = $.Deferred();
    getData().then(response => {
        processData(response.Data);
        $dfd.resolve({
            Result: "OK",
            Records: response.Data,
            TotalRecordCount: response.Count,
        });
    });
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
