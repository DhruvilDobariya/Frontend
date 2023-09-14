class JTableBase {
    constructor(options) {
        this.options = {
            // Default options here
            actions: {},
            fields: {},
            animationsEnabled: true,
            defaultDateFormat: "yy-mm-dd",
            dialogShowEffect: "fade",
            dialogHideEffect: "fade",
            showCloseButton: false,
            loadingAnimationDelay: 500,
            saveUserPreferences: true,
            jqueryuiTheme: false,
            unAuthorizedRequestRedirectUrl: null,

            ajaxSettings: {
                type: "POST",
                dataType: "json",
            },

            toolbar: {
                hoverAnimation: true,
                hoverAnimationDuration: 60,
                hoverAnimationEasing: undefined,
                items: [],
            },

            messages: {
                serverCommunicationError: "An error occurred while communicating to the server.",
                loadingMessage: "Loading records...",
                noDataAvailable: "No data available!",
                areYouSure: "Are you sure?",
                save: "Save",
                saving: "Saving",
                cancel: "Cancel",
                error: "Error",
                close: "Close",
                cannotLoadOptionsFor: "Can not load options for field {0}",
            },
        };

        this._$mainContainer = null;
        this._$titleDiv = null;
        this._$toolbarDiv = null;
        this._$table = null;
        this._$tableBody = null;
        this._$tableRows = null;
        this._$busyDiv = null;
        this._$busyMessageDiv = null;
        this._$errorDialogDiv = null;
        this._columnList = null;
        this._fieldList = null;
        this._keyField = null;
        this._firstDataColumnOffset = 0;
        this._lastPostData = null;
        this._cache = null;

        this.unloadingPage = false;

        window.addEventListener("beforeunload", () => {
            this.unloadingPage = true;
        });

        window.addEventListener("unload", () => {
            this.unloadingPage = false;
        });
    }

    // Add your widget methods here
    closeRequested(event, data) {}

    formCreated(event, data) {}

    formSubmitting(event, data) {}

    formClosed(event, data) {}

    loadingRecords(event, data) {}

    recordsLoaded(event, data) {}

    rowInserted(event, data) {}

    rowsRemoved(event, data) {}

    _create() {
        // Initialization
        this._normalizeFieldsOptions();
        this._initializeFields();
        this._createFieldAndColumnList();

        // Creating DOM elements
        this._createMainContainer();
        this._createTableTitle();
        this._createToolBar();
        this._createTable();
        this._createBusyPanel();
        this._createErrorDialogDiv();
        this._addNoDataRow();

        this._cookieKeyPrefix = this._generateCookieKeyPrefix();
    }

    _normalizeFieldsOptions() {
        for (const [fieldName, props] of Object.entries(this.options.fields)) {
            this._normalizeFieldOptions(fieldName, props);
        }
    }

    _normalizeFieldOptions(fieldName, props) {
        if (props.listClass === undefined) {
            props.listClass = "";
        }
        if (props.inputClass === undefined) {
            props.inputClass = "";
        }

        // Convert dependsOn to an array if it's a comma-separated list
        if (props.dependsOn && $.type(props.dependsOn) === "string") {
            props.dependsOn = props.dependsOn.split(",").map(item => item.trim());
        }
    }

    _initializeFields() {
        this._lastPostData = {};
        this._$tableRows = [];
        this._columnList = [];
        this._fieldList = [];
        this._cache = [];
    }

    _createFieldAndColumnList() {
        for (const [name, props] of Object.entries(this.options.fields)) {
            // Add field to the field list
            this._fieldList.push(name);

            // Check if this field is the key field
            if (props.key === true) {
                this._keyField = name;
            }

            // Add field to the column list if it is shown in the table
            if (props.list !== false && props.type !== "hidden") {
                this._columnList.push(name);
            }
        }
    }

    _createMainContainer() {
        this._$mainContainer = $("<div />").addClass("jtable-main-container").appendTo(this.element);

        this._jqueryuiThemeAddClass(this._$mainContainer, "ui-widget");
    }

    _createTableTitle() {
        if (!this.options.title) {
            return;
        }

        const $titleDiv = $("<div />").addClass("jtable-title").appendTo(this._$mainContainer);

        this._jqueryuiThemeAddClass($titleDiv, "ui-widget-header");

        $("<div />").addClass("jtable-title-text").appendTo($titleDiv).append(this.options.title);

        if (this.options.showCloseButton) {
            const $textSpan = $("<span />").html(this.options.messages.close);

            $("<button></button>")
                .addClass("jtable-command-button jtable-close-button")
                .attr("title", this.options.messages.close)
                .append($textSpan)
                .appendTo($titleDiv)
                .click(e => {
                    e.preventDefault();
                    e.stopPropagation();
                    this._onCloseRequested();
                });
        }

        this._$titleDiv = $titleDiv;
    }

    _createTable() {
        this._$table = $("<table></table>").addClass("jtable").appendTo(this._$mainContainer);

        if (this.options.tableId) {
            this._$table.attr("id", this.options.tableId);
        }

        this._jqueryuiThemeAddClass(this._$table, "ui-widget-content");

        this._createTableHead();
        this._createTableBody();
    }

    _createTableHead() {
        const $thead = $("<thead></thead>").appendTo(this._$table);

        this._addRowToTableHead($thead);
    }

    _addRowToTableHead($thead) {
        const $tr = $("<tr></tr>").appendTo($thead);
        this._addColumnsToHeaderRow($tr);
    }

    _addColumnsToHeaderRow($tr) {
        for (const fieldName of this._columnList) {
            const $headerCell = this._createHeaderCellForField(fieldName, this.options.fields[fieldName]);
            $headerCell.appendTo($tr);
        }
    }

    _createHeaderCellForField(fieldName, field) {
        field.width = field.width || "10%"; // Default column width: 10%.

        const $headerTextSpan = $("<span />").addClass("jtable-column-header-text").html(field.title);
        const $headerContainerDiv = $("<div />").addClass("jtable-column-header-container").append($headerTextSpan);
        const $th = $("<th></th>").addClass("jtable-column-header").addClass(field.listClass).css("width", field.width).data("fieldName", fieldName).append($headerContainerDiv);

        this._jqueryuiThemeAddClass($th, "ui-state-default");

        return $th;
    }

    _createEmptyCommandHeader() {
        const $th = $("<th></th>").addClass("jtable-command-column-header").css("width", "1%");
        this._jqueryuiThemeAddClass($th, "ui-state-default");
        return $th;
    }

    _createTableBody() {
        this._$tableBody = $("<tbody></tbody>").appendTo(this._$table);
    }

    _createBusyPanel() {
        this._$busyMessageDiv = $("<div />").addClass("jtable-busy-message").prependTo(this._$mainContainer);
        this._$busyDiv = $("<div />").addClass("jtable-busy-panel-background").prependTo(this._$mainContainer);
        this._jqueryuiThemeAddClass(this._$busyMessageDiv, "ui-widget-header");
        this._hideBusy();
    }

    _createErrorDialogDiv() {
        this._$errorDialogDiv = $("<div></div>").appendTo(this._$mainContainer);
        this._$errorDialogDiv.dialog({
            autoOpen: false,
            show: this.options.dialogShowEffect,
            hide: this.options.dialogHideEffect,
            modal: true,
            title: this.options.messages.error,
            buttons: [
                {
                    text: this.options.messages.close,
                    click: () => {
                        this._$errorDialogDiv.dialog("close");
                    },
                },
            ],
        });
    }

    load(postData, completeCallback) {
        this._lastPostData = postData;
        this._reloadTable(completeCallback);
    }

    reload(completeCallback) {
        this._reloadTable(completeCallback);
    }

    getRowByKey(key) {
        return this._$tableRows.find($row => key === this._getKeyValueOfRecord($row.data("record"))) || null;
    }

    destroy() {
        this.element.empty();
        $.Widget.prototype.destroy.call(this);
    }

    _setOption(key, value) {
        // Add your dynamic option change logic here
    }

    _reloadTable(completeCallback) {
        const self = this;

        const completeReload = function (data) {
            self._hideBusy();

            if (data.Result !== "OK") {
                self._showError(data.Message);
                return;
            }

            self._removeAllRows("reloading");
            self._addRecordsToTable(data.Records);
            self._onRecordsLoaded(data);

            if (completeCallback) {
                completeCallback();
            }
        };

        self._showBusy(self.options.messages.loadingMessage, self.options.loadingAnimationDelay);
        self._onLoadingRecords();

        if ($.isFunction(self.options.actions.listAction)) {
            const funcResult = self.options.actions.listAction(self._lastPostData, self._createJtParamsForLoading());

            if (self._isDeferredObject(funcResult)) {
                funcResult
                    .done(function (data) {
                        completeReload(data);
                    })
                    .fail(function () {
                        self._showError(self.options.messages.serverCommunicationError);
                    })
                    .always(function () {
                        self._hideBusy();
                    });
            } else {
                completeReload(funcResult);
            }
        } else {
            const loadUrl = self._createRecordLoadUrl();

            self._ajax({
                url: loadUrl,
                data: self._lastPostData,
                success: function (data) {
                    completeReload(data);
                },
                error: function () {
                    self._hideBusy();
                    self._showError(self.options.messages.serverCommunicationError);
                },
            });
        }
    }

    _createRecordLoadUrl() {
        return this.options.actions.listAction;
    }

    _createJtParamsForLoading() {
        return {};
    }

    _createRowFromRecord(record) {
        const $tr = $("<tr></tr>").addClass("jtable-data-row").attr("data-record-key", this._getKeyValueOfRecord(record)).data("record", record);
        this._addCellsToRowUsingRecord($tr);
        return $tr;
    }

    _addCellsToRowUsingRecord($row) {
        const record = $row.data("record");
        for (const fieldName of this._columnList) {
            this._createCellForRecordField(record, fieldName).appendTo($row);
        }
    }

    _createCellForRecordField(record, fieldName) {
        return $("<td></td>").addClass(this.options.fields[fieldName].listClass).append(this._getDisplayTextForRecordField(record, fieldName));
    }

    _addRecordsToTable(records) {
        records.forEach(record => {
            this._addRow(this._createRowFromRecord(record));
        });

        this._refreshRowStyles();
    }

    _addRowToTable($tableRow, index, isNewRow, animationsEnabled) {
        const options = {
            index: this._normalizeNumber(index, 0, this._$tableRows.length, this._$tableRows.length),
        };

        if (isNewRow === true) {
            options.isNewRow = true;
        }

        if (animationsEnabled === false) {
            options.animationsEnabled = false;
        }

        this._addRow($tableRow, options);
    }

    _addRow($row, options) {
        options = {
            index: this._$tableRows.length,
            isNewRow: false,
            animationsEnabled: true,
            ...options,
        };

        if (this._$tableRows.length <= 0) {
            this._removeNoDataRow();
        }

        options.index = this._normalizeNumber(options.index, 0, this._$tableRows.length, this._$tableRows.length);
        if (options.index === this._$tableRows.length) {
            this._$tableBody.append($row);
            this._$tableRows.push($row);
        } else if (options.index === 0) {
            this._$tableBody.prepend($row);
            this._$tableRows.unshift($row);
        } else {
            this._$tableRows[options.index - 1].after($row);
            this._$tableRows.splice(options.index, 0, $row);
        }

        this._onRowInserted($row, options.isNewRow);

        if (options.isNewRow) {
            this._refreshRowStyles();
            if (this.options.animationsEnabled && options.animationsEnabled) {
                this._showNewRowAnimation($row);
            }
        }
    }

    _showNewRowAnimation($tableRow) {
        let className = "jtable-row-created";
        if (this.options.jqueryuiTheme) {
            className = className + " ui-state-highlight";
        }

        $tableRow.addClass(className, "slow", "", () => {
            $tableRow.removeClass(className, 5000);
        });
    }

    _removeRowsFromTable($rows, reason) {
        if ($rows.length <= 0) {
            return;
        }

        $rows.addClass("jtable-row-removed").remove();

        $rows.each(() => {
            const index = this._findRowIndex($(this));
            if (index >= 0) {
                this._$tableRows.splice(index, 1);
            }
        });

        this._onRowsRemoved($rows, reason);

        if (this._$tableRows.length === 0) {
            this._addNoDataRow();
        }

        this._refreshRowStyles();
    }

    _findRowIndex($row) {
        return this._findIndexInArray($row, this._$tableRows, ($row1, $row2) => $row1.data("record") == $row2.data("record"));
    }

    _removeAllRows(reason) {
        if (this._$tableRows.length <= 0) {
            return;
        }

        const $rows = this._$tableBody.find("tr.jtable-data-row");

        this._$tableBody.empty();
        this._$tableRows = [];

        this._onRowsRemoved($rows, reason);

        this._addNoDataRow();
    }

    _addNoDataRow() {
        if (this._$tableBody.find(">tr.jtable-no-data-row").length > 0) {
            return;
        }

        const $tr = $("<tr></tr>").addClass("jtable-no-data-row").appendTo(this._$tableBody);

        const totalColumnCount = this._$table.find("thead th").length;
        $("<td></td>").attr("colspan", totalColumnCount).html(this.options.messages.noDataAvailable).appendTo($tr);
    }

    _removeNoDataRow() {
        this._$tableBody.find(".jtable-no-data-row").remove();
    }

    _refreshRowStyles() {
        this._$tableRows.forEach(($tableRow, i) => {
            if (i % 2 === 0) {
                $tableRow.addClass("jtable-row-even");
            } else {
                $tableRow.removeClass("jtable-row-even");
            }
        });
    }

    _getDisplayTextForRecordField(record, fieldName) {
        const field = this.options.fields[fieldName];
        const fieldValue = record[fieldName];

        if (field.display) {
            return field.display({ record: record });
        }

        if (field.type === "date") {
            return this._getDisplayTextForDateRecordField(field, fieldValue);
        } else if (field.type === "checkbox") {
            return this._getCheckBoxTextForFieldByValue(fieldName, fieldValue);
        } else if (field.options) {
            const options = this._getOptionsForField(fieldName, {
                record: record,
                value: fieldValue,
                source: "list",
                dependedValues: this._createDependedValuesUsingRecord(record, field.dependsOn),
            });
            return this._findOptionByValue(options, fieldValue).DisplayText;
        } else {
            return fieldValue;
        }
    }

    _createDependedValuesUsingRecord(record, dependsOn) {
        if (!dependsOn) {
            return {};
        }

        const dependedValues = {};
        for (const fieldName of dependsOn) {
            dependedValues[fieldName] = record[fieldName];
        }

        return dependedValues;
    }

    _findOptionByValue(options, value) {
        for (const option of options) {
            if (option.Value == value) {
                return option;
            }
        }

        return {}; //no option found
    }

    _getDisplayTextForDateRecordField(field, fieldValue) {
        if (!fieldValue) {
            return "";
        }

        const displayFormat = field.displayFormat || this.options.defaultDateFormat;
        const date = this._parseDate(fieldValue);
        return $.datepicker.formatDate(displayFormat, date);
    }

    _getOptionsForField(fieldName, funcParams) {
        const field = this.options.fields[fieldName];
        let optionsSource = field.options;

        if ($.isFunction(optionsSource)) {
            funcParams = {
                _cacheCleared: false,
                dependedValues: {},
                clearCache: function () {
                    this._cacheCleared = true;
                },
                ...funcParams,
            };

            optionsSource = optionsSource(funcParams);
        }

        let options;

        if (typeof optionsSource == "string") {
            const cacheKey = "options_" + fieldName + "_" + optionsSource;
            if (funcParams._cacheCleared || !this._cache[cacheKey]) {
                this._cache[cacheKey] = this._buildOptionsFromArray(this._downloadOptions(fieldName, optionsSource));
                this._sortFieldOptions(this._cache[cacheKey], field.optionsSorting);
            } else {
                if (funcParams.value != undefined) {
                    const optionForValue = this._findOptionByValue(this._cache[cacheKey], funcParams.value);
                    if (optionForValue.DisplayText == undefined) {
                        this._cache[cacheKey] = this._buildOptionsFromArray(this._downloadOptions(fieldName, optionsSource));
                        this._sortFieldOptions(this._cache[cacheKey], field.optionsSorting);
                    }
                }
            }

            options = this._cache[cacheKey];
        } else if (jQuery.isArray(optionsSource)) {
            options = this._buildOptionsFromArray(optionsSource);
            this._sortFieldOptions(options, field.optionsSorting);
        } else {
            options = this._buildOptionsArrayFromObject(optionsSource);
            this._sortFieldOptions(options, field.optionsSorting);
        }

        return options;
    }

    _downloadOptions(fieldName, url) {
        let options = [];

        this._ajax({
            url: url,
            async: false,
            success: data => {
                if (data.Result != "OK") {
                    this._showError(data.Message);
                    return;
                }

                options = data.Options;
            },
            error: () => {
                const errMessage = this._formatString(this.options.messages.cannotLoadOptionsFor, fieldName);
                this._showError(errMessage);
            },
        });

        return options;
    }

    _sortFieldOptions(options, sorting) {
        if (!options || !options.length || !sorting) {
            return;
        }

        const dataSelector = sorting.indexOf("value") === 0 ? option => option.Value : option => option.DisplayText;

        const compareFunc = $.type(dataSelector(options[0])) === "string" ? (option1, option2) => dataSelector(option1).localeCompare(dataSelector(option2)) : (option1, option2) => dataSelector(option1) - dataSelector(option2);

        if (sorting.indexOf("desc") > 0) {
            options.sort((a, b) => compareFunc(b, a));
        } else {
            options.sort((a, b) => compareFunc(a, b));
        }
    }

    _buildOptionsArrayFromObject(options) {
        const list = [];

        $.each(options, (propName, propValue) => {
            list.push({
                Value: propName,
                DisplayText: propValue,
            });
        });

        return list;
    }

    _buildOptionsFromArray(optionsArray) {
        const list = [];

        for (const optionValue of optionsArray) {
            if ($.isPlainObject(optionValue)) {
                list.push(optionValue);
            } else {
                list.push({
                    Value: optionValue,
                    DisplayText: optionValue,
                });
            }
        }

        return list;
    }

    _parseDate(dateString) {
        if (dateString.indexOf("Date") >= 0) {
            return new Date(parseInt(dateString.substr(6), 10));
        } else if (dateString.length == 10) {
            return new Date(parseInt(dateString.substr(0, 4), 10), parseInt(dateString.substr(5, 2), 10) - 1, parseInt(dateString.substr(8, 2), 10));
        } else if (dateString.length == 19) {
            return new Date(parseInt(dateString.substr(0, 4), 10), parseInt(dateString.substr(5, 2), 10) - 1, parseInt(dateString.substr(8, 2, 10)), parseInt(dateString.substr(11, 2), 10), parseInt(dateString.substr(14, 2), 10), parseInt(dateString.substr(17, 2), 10));
        } else {
            this._logWarn("Given date is not properly formatted: " + dateString);
            return "format error!";
        }
    }

    _createToolBar() {
        this._$toolbarDiv = $("<div />").addClass("jtable-toolbar").appendTo(this._$titleDiv);

        for (let i = 0; i < this.options.toolbar.items.length; i++) {
            this._addToolBarItem(this.options.toolbar.items[i]);
        }
    }

    _addToolBarItem(item) {
        if (item == undefined || (item.text == undefined && item.icon == undefined)) {
            this._logWarn("Can not add tool bar item since it is not valid!");
            this._logWarn(item);
            return null;
        }

        const $toolBarItem = $("<span></span>").addClass("jtable-toolbar-item").appendTo(this._$toolbarDiv);

        this._jqueryuiThemeAddClass($toolBarItem, "ui-widget ui-state-default ui-corner-all", "ui-state-hover");

        if (item.cssClass) {
            $toolBarItem.addClass(item.cssClass);
        }

        if (item.tooltip) {
            $toolBarItem.attr("title", item.tooltip);
        }

        if (item.icon) {
            const $icon = $('<span class="jtable-toolbar-item-icon"></span>').appendTo($toolBarItem);
            if (item.icon === true) {
                //do nothing
            } else if ($.type(item.icon === "string")) {
                $icon.css("background", 'url("' + item.icon + '")');
            }
        }

        if (item.text) {
            $('<span class=""></span>').html(item.text).addClass("jtable-toolbar-item-text").appendTo($toolBarItem);
        }

        if (item.click) {
            $toolBarItem.click(() => {
                item.click();
            });
        }

        const hoverAnimationDuration = undefined;
        const hoverAnimationEasing = undefined;
        if (this.options.toolbar.hoverAnimation) {
            hoverAnimationDuration = this.options.toolbar.hoverAnimationDuration;
            hoverAnimationEasing = this.options.toolbar.hoverAnimationEasing;
        }

        $toolBarItem.hover(
            () => {
                $toolBarItem.addClass("jtable-toolbar-item-hover", hoverAnimationDuration, hoverAnimationEasing);
            },
            () => {
                $toolBarItem.removeClass("jtable-toolbar-item-hover", hoverAnimationDuration, hoverAnimationEasing);
            }
        );

        return $toolBarItem;
    }

    _showError(message) {
        this._$errorDialogDiv.html(message).dialog("open");
    }

    _setBusyTimer = null;

    _showBusy(message, delay) {
        const self = this;

        self._$busyDiv.width(self._$mainContainer.width()).height(self._$mainContainer.height()).addClass("jtable-busy-panel-background-invisible").show();

        const makeVisible = () => {
            self._$busyDiv.removeClass("jtable-busy-panel-background-invisible");
            self._$busyMessageDiv.html(message).show();
        };

        if (delay) {
            if (self._setBusyTimer) {
                return;
            }

            self._setBusyTimer = setTimeout(makeVisible, delay);
        } else {
            makeVisible();
        }
    }

    _hideBusy() {
        clearTimeout(this._setBusyTimer);
        this._setBusyTimer = null;
        this._$busyDiv.hide();
        this._$busyMessageDiv.html("").hide();
    }

    _isBusy() {
        return this._$busyMessageDiv.is(":visible");
    }

    _jqueryuiThemeAddClass($elm, className, hoverClassName) {
        if (!this.options.jqueryuiTheme) {
            return;
        }

        $elm.addClass(className);

        if (hoverClassName) {
            $elm.hover(
                () => {
                    $elm.addClass(hoverClassName);
                },
                () => {
                    $elm.removeClass(hoverClassName);
                }
            );
        }
    }

    _performAjaxCall(url, postData, async, success, error) {
        this._ajax({
            url: url,
            data: postData,
            async: async,
            success: success,
            error: error,
        });
    }

    _unAuthorizedRequestHandler() {
        if (this.options.unAuthorizedRequestRedirectUrl) {
            location.href = this.options.unAuthorizedRequestRedirectUrl;
        } else {
            location.reload(true);
        }
    }

    _ajax(options) {
        const self = this;

        const opts = {
            statusCode: {
                401: () => {
                    self._unAuthorizedRequestHandler();
                },
            },
        };

        Object.assign(opts, this.options.ajaxSettings, options);

        opts.success = data => {
            if (data && data.UnAuthorizedRequest == true) {
                self._unAuthorizedRequestHandler();
            }

            if (options.success) {
                options.success(data);
            }
        };

        opts.error = (jqXHR, textStatus, errorThrown) => {
            if (unloadingPage) {
                jqXHR.abort();
                return;
            }

            if (options.error) {
                options.error(arguments);
            }
        };

        opts.complete = () => {
            if (options.complete) {
                options.complete();
            }
        };

        $.ajax(opts);
    }

    _getKeyValueOfRecord(record) {
        return record[this._keyField];
    }

    _setCookie(key, value) {
        key = this._cookieKeyPrefix + key;

        const expireDate = new Date();
        expireDate.setDate(expireDate.getDate() + 30);
        document.cookie = encodeURIComponent(key) + "=" + encodeURIComponent(value) + "; expires=" + expireDate.toUTCString();
    }

    _getCookie(key) {
        key = this._cookieKeyPrefix + key;

        const equalities = document.cookie.split("; ");
        for (let i = 0; i < equalities.length; i++) {
            if (!equalities[i]) {
                continue;
            }

            const splitted = equalities[i].split("=");
            if (splitted.length != 2) {
                continue;
            }

            if (decodeURIComponent(splitted[0]) === key) {
                return decodeURIComponent(splitted[1] || "");
            }
        }

        return null;
    }

    _generateCookieKeyPrefix() {
        const simpleHash = value => {
            let hash = 0;
            if (value.length == 0) {
                return hash;
            }

            for (let i = 0; i < value.length; i++) {
                const ch = value.charCodeAt(i);
                hash = (hash << 5) - hash + ch;
                hash = hash & hash;
            }

            return hash;
        };

        let strToHash = "";
        if (this.options.tableId) {
            strToHash = strToHash + this.options.tableId + "#";
        }

        strToHash = strToHash + this._columnList.join("$") + "#c" + this._$table.find("thead th").length;
        return "jtable#" + simpleHash(strToHash);
    }

    _onLoadingRecords() {
        this._trigger("loadingRecords", null, {});
    }

    _onRecordsLoaded(data) {
        this._trigger("recordsLoaded", null, { records: data.Records, serverResponse: data });
    }

    _onRowInserted($row, isNewRow) {
        this._trigger("rowInserted", null, { row: $row, record: $row.data("record"), isNewRow: isNewRow });
    }

    _onRowsRemoved($rows, reason) {
        this._trigger("rowsRemoved", null, { rows: $rows, reason: reason });
    }

    _onCloseRequested() {
        this._trigger("closeRequested", null, {});
    }
    _onLoadingRecords() {
        this._trigger("loadingRecords", null, {});
    }

    _onRecordsLoaded(data) {
        this._trigger("recordsLoaded", null, { records: data.Records, serverResponse: data });
    }

    _onRowInserted($row, isNewRow) {
        this._trigger("rowInserted", null, { row: $row, record: $row.data("record"), isNewRow: isNewRow });
    }

    _onRowsRemoved($rows, reason) {
        this._trigger("rowsRemoved", null, { rows: $rows, reason: reason });
    }

    _onCloseRequested() {
        this._trigger("closeRequested", null, {});
    }
}

class JTableUtility {
    constructor() {
        // Constructor code here (if needed)
    }

    getPropertyOfObject(obj, propName) {
        if (propName.indexOf(".") < 0) {
            return obj[propName];
        } else {
            const preDot = propName.substring(0, propName.indexOf("."));
            const postDot = propName.substring(propName.indexOf(".") + 1);
            return this.getPropertyOfObject(obj[preDot], postDot);
        }
    }

    setPropertyOfObject(obj, propName, value) {
        if (propName.indexOf(".") < 0) {
            obj[propName] = value;
        } else {
            const preDot = propName.substring(0, propName.indexOf("."));
            const postDot = propName.substring(propName.indexOf(".") + 1);
            this.setPropertyOfObject(obj[preDot], postDot, value);
        }
    }

    insertToArrayIfDoesNotExists(array, value) {
        if (!array.includes(value)) {
            array.push(value);
        }
    }

    findIndexInArray(value, array, compareFunc) {
        if (!compareFunc) {
            compareFunc = (a, b) => a === b;
        }

        for (let i = 0; i < array.length; i++) {
            if (compareFunc(value, array[i])) {
                return i;
            }
        }

        return -1;
    }

    normalizeNumber(number, min, max, defaultValue) {
        if (number == undefined || number == null || isNaN(number)) {
            return defaultValue;
        }

        if (number < min) {
            return min;
        }

        if (number > max) {
            return max;
        }

        return number;
    }

    formatString() {
        if (arguments.length === 0) {
            return null;
        }

        let str = arguments[0];
        for (let i = 1; i < arguments.length; i++) {
            const placeHolder = "{" + (i - 1) + "}";
            str = str.replace(placeHolder, arguments[i]);
        }

        return str;
    }

    isDeferredObject(obj) {
        return obj.then && obj.done && obj.fail;
    }

    logDebug(text) {
        if (!window.console) {
            return;
        }

        console.log("jTable DEBUG: " + text);
    }

    logInfo(text) {
        if (!window.console) {
            return;
        }

        console.log("jTable INFO: " + text);
    }

    logWarn(text) {
        if (!window.console) {
            return;
        }

        console.log("jTable WARNING: " + text);
    }

    logError(text) {
        if (!window.console) {
            return;
        }

        console.log("jTable ERROR: " + text);
    }
}

// Usage
const jTable = new JTable({
    // Provide custom options here
});
