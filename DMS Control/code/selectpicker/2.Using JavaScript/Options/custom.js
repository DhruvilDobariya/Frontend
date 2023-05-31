$(document).ready(function () {
    $("#select").selectpicker({
        actionsBox: true, // default:false, set selectAll and deselectAll button
        countSelectedText: "count", // set format of count
        deselectAllText: "Deselect All", // default: "Deselect All", deselect all selected item when dropdown rendered

        dropdownAlignRight: true, // default: false, set all the option align right side, we also have one more option which is "auto"
        dropupAuto: false, // default: true, first it check upper or lower side have enough space or not, if have then it open normally else it open in dropup

        header: "Cities", // default: false, set header of dropdown
        hideDisabled: true, // default: false, remove all element which is disable, also remove disable groups
        iconBase: "tickIcon", // default: "glyphicon", set icon base

        liveSearch: true, // default: false, set live search
        liveSearchNormalize: true, // default: false, set accent-insensitive search
        liveSearchPlaceholder: "Search City", // set placeholder in search box
        liveSearchStyle: "startWith", // default: contains, When set to 'contains', searching will reveal options that contain the searched text. For example, searching for pl with return both Apple, Plum, and Plantain. When set to 'startsWith', searching for pl will return only Plum and Plantain.

        maxOptions: 4, // default: false, set max number of selection
        // mobile: true, // default: false, set mobile view
        multipleSeparator: "; ", // default: ", ", set seperator between multiple
        noneSelectedText: "Nothing selected", // The text that is displayed when a multiple select has no selected options, it show it's output when we don't give title to dropdown
        selectAllText: "Select All", // show text when we select all the option of dropdown
        // selectedTextFormat: "count", // default: values, set display format
        // we have many options like,
        // value: give comma seperated value
        // count: give count of selected value
        // count > 2: give value until condition become true, after it give count
        // static: always so placeholder
        selectOnTab: true, // default: false, treat tab like enter or space character in dropdown

        showContent: true, // default: true, enable render content inside dropdown elements
        showIcon: true, // default: true, enable to render icon in dropdown options
        showSubtext: true, // default: false, enable to render subtext in dropdown options
        showTick: true, // default: false, enable to render tick on selected options

        size: 4, // default: "auto", set how many element show in window when window is open, if dropdown have more window then it enable scrollbar in window
        style: "btn-danger", // set style
        styleBase: "btn", // set base style
        tickIcon: "glyphicon-ok", // set which icon we want to use as tick
        title: "Select City", // set title of dropdown
        width: "75%", // set width, we have different option like, auto, fit, 100%, 100px
        // virtualScoll: 10,
        windowPadding: 10, // set padding in widow, we also can pass array like [10, 20, 20, 40] which represent [top, right, bottom, left]

        sanitize: true, // set sanitize, which sanitize data-content of options
        // whiteList: {}, // set whishList, it take object which contains allow attributes and tags
        // sanitizeFn: function () {} // set sanitize function, it is used for dedicated library which use to parform sanitization.
    });
});
