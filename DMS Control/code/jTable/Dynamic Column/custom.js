let baseURL = "https://jsonplaceholder.typicode.com/";
let tableConfig = {};
let $table = $("#table");
let isTableLoaded = false;

$(document).ready(function () {
    $("#ddlOptions").on("change", async function (e) {
        if (e.target.value !== "-1") {
            tableConfig = {
                url: `${baseURL}${e.target.value}`,
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

function processData(data) {
    tableConfig.fields = {};
    for (key in data) {
        tableConfig.fields[key] = { title: key };
    }
}

function loadTable() {
    $table.jtable({
        title: tableConfig.tableName,
        fields: tableConfig.fields,
        actions: {
            listAction: function (postData, jtParams) {
                return $.Deferred(function ($dfd) {
                    $.ajax({
                        url: tableConfig.url,
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
        },
    });

    $table.jtable("load");
    isTableLoaded = true;
}

function getData() {
    return $.ajax({
        url: tableConfig.url + "/" + 1,
        type: "GET",
        dataType: "json",
    });
}
