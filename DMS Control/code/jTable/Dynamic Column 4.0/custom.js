class GUI {
    constructor() {
        this.oParent = new Process();
        this.oPHolder = this.oParent.oPHolder;
        this.GetControls();
    }

    processConfig() {
        this.controIns = {};
        this.controIns.jtable = $("#table").jtable("instance");
        console.log(this.controIns.jtable);
    }

    async GetControls() {
        let oGui = this;

        $("#txtSearch").on("keyup", function (e) {
            let keyCode = e.keyCode || e.which;
            if (keyCode === 13) {
                oGui.controIns.jtable.load({ search: e.target.value });
            }
        });

        await oGui.oParent.GetDDLData();
        for (let item of oGui.oPHolder.ddlData) {
            $("#ddlOptions").append($(`<option value="${item.TABLE_NAME}">${item.TABLE_NAME}</option>`));
        }

        $("#btnLoad").on("click", async function () {
            if ($("#ddlOptions").val() !== "-1") {
                oGui.oPHolder.tableName = $("#ddlOptions").val();
                await oGui.ClearTableOptions();
                oGui.oPHolder.isSelectionChange = true;
                await oGui.oParent.GetData();
                await oGui.ChangeTableConfig();
                oGui.controIns.jtable.load({ search: "" });
                oGui.oPHolder.isSelectionChange = false;
            }
        });

        $("#table").jtable({
            title: this.oPHolder.tableName,
            sorting: true,
            multiSorting: true,
            paging: true,
            pageSize: 10,
            pageSizeChangeArea: true,
            pageList: "normal",
            pageSizes: [10, 20, 30, 200],
            saveUserPreferences: false,
            selecting: true,
            multiselect: true,
            selectingCheckboxes: true,
            selectOnRowClick: true,

            fields: {},
            actions: {
                listAction: function (postData, jtParams) {
                    oGui.oPHolder.keyword = postData.search;
                    oGui.oPHolder.sort = jtParams.jtSorting || "";
                    oGui.oPHolder.skip = jtParams.jtStartIndex;
                    oGui.oPHolder.take = parseInt(jtParams.jtPageSize);
                    let $dfd = $.Deferred();
                    oGui.GetData().then(data => {
                        // debugger;
                        $dfd.resolve(data);
                    });
                    return $dfd;
                },
                createAction: function (postData) {
                    console.log(postData);
                },
                updateAction: function (postData) {
                    console.log(postData);
                },
                deleteAction: function (postData) {
                    console.log(postData);
                },
            },
        });

        oGui.processConfig();
    }

    async GetData() {
        let oGui = this;
        let $dfd = $.Deferred();
        if (!oGui.oPHolder.isSelectionChange) {
            await oGui.oParent.GetData();
        }
        $dfd.resolve({
            Result: "OK",
            Records: oGui.oPHolder.responseData.Data,
            TotalRecordCount: oGui.oPHolder.responseData.Count,
        });
        return $dfd;
    }

    async ChangeTableConfig() {
        let oGui = this;
        oGui.controIns.jtable.options.title = oGui.oPHolder.tableName;
        $(".jtable-title-text").text(oGui.oPHolder.tableName);

        oGui.controIns.jtable.options.fields = {};
        oGui.controIns.jtable._columnList = [];
        oGui.controIns.jtable._fieldList = [];

        $(".jtable thead").empty();
        for (let element in oGui.oPHolder.responseData.Data[0]) {
            let field = {
                title: element,
                listClass: "",
                inputClass: "form-control",
                sorting: true,
                columnResizable: true,
                visibility: "visible",
                width: "10%",
            };
            oGui.controIns.jtable._columnList.push(element);
            oGui.controIns.jtable._fieldList.push(element);
            oGui.controIns.jtable.options.fields[element] = field;
        }
        oGui.controIns.jtable._addRowToTableHead($(".jtable thead"));
        oGui.controIns.jtable._removeNoDataRow();
        oGui.controIns.jtable._addNoDataRow();
    }

    async ClearTableOptions() {
        this.oPHolder.skip = 0;
        this.oPHolder.take = 10;
        this.oPHolder.sort = "";
        this.oPHolder.keyword = "";
        $("#txtSearch").val("");
    }
}
class Process {
    constructor() {
        this.oPHolder = new PropHolder();
        this.oPHolder.GetURLs();
    }

    async GetData() {
        this.oPHolder.responseData = [];
        let body = JSON.stringify({
            tableName: this.oPHolder.tableName,
            keyword: this.oPHolder.keyword,
            sort: this.oPHolder.sort,
            skip: this.oPHolder.skip,
            take: this.oPHolder.take,
        });

        const data = await Extension.GetServerResponse("POST", this.oPHolder.dataURL, body);
        this.oPHolder.responseData = data;
        console.log(this.oPHolder.responseData);
    }

    async GetDDLData() {
        this.oPHolder.ddlData = [];
        const data = await Extension.GetServerResponse("GET", this.oPHolder.ddlURL);
        this.oPHolder.ddlData = data;
        console.log(this.oPHolder.ddlData);
    }
}
class PropHolder {
    constructor() {
        this.take = 10;
        this.skip = 0;
        this.sort = "";
        this.keyword = "";
        this.isSelectionChange = false;
        this.tableName = "Table";
        this.responseData = [];
        this.ddlData = [];
    }

    GetURLs() {
        this.dataURL = "https://localhost:44334/api/Log/GetLogData";
        this.ddlURL = "https://localhost:44334/api/Log/GetLogTable";
    }
}

window.Extension = {
    GetServerResponse: (method, URL, data) => {
        return $.ajax({
            type: method,
            dataType: "json",
            url: URL,
            data: data,
            headers: {
                accept: "text/plain",
                "Content-Type": "application/json",
            },
        });
    },
};

// let process = new Process();
// process.GetData();
// process.GetDDLData();

let gui = new GUI();
