$(document).ready(function () {
    $("#table").jtable({
        title: "Todos",

        defaultDateFormat: "dd-mm-yy",

        fields: {
            DateOfBirth: {
                title: "Date of Birth",
                type: "date",
                displayFormat: "yy-mm-dd",
            },
            CreationDate: {
                title: "Creation Date",
                type: "date",
                displayFormat: "yy-MM-dd",
            },
            ModificationDate: {
                title: "Modification Date",
                type: "date",
            },
        },

        ajaxSetting: {
            type: "GET",
        },

        actions: {
            listAction: function (postData, jtParams) {
                return {
                    Result: "OK",
                    Records: [
                        {
                            DateOfBirth: "2022-11-29",
                            CreationDate: "2022-10-14",
                            ModificationDate: "2022-09-24",
                        },
                        {
                            DateOfBirth: "2023-06-27",
                            CreationDate: "2023-02-08",
                            ModificationDate: "2023-02-14",
                        },
                        {
                            DateOfBirth: "2023-03-28",
                            CreationDate: "2022-08-26",
                            ModificationDate: "2022-11-10",
                        },
                        {
                            DateOfBirth: "2022-11-06",
                            CreationDate: "2023-06-08",
                            ModificationDate: "2022-09-30",
                        },
                        {
                            DateOfBirth: "2022-09-19",
                            CreationDate: "2022-07-07",
                            ModificationDate: "2023-05-03",
                        },
                        {
                            DateOfBirth: "2022-10-17",
                            CreationDate: "2023-01-08",
                            ModificationDate: "2023-02-26",
                        },
                        {
                            DateOfBirth: "2022-10-06",
                            CreationDate: "2022-11-10",
                            ModificationDate: "2022-11-12",
                        },
                        {
                            DateOfBirth: "2022-07-21",
                            CreationDate: "2023-02-01",
                            ModificationDate: "2023-03-14",
                        },
                        {
                            DateOfBirth: "2023-05-04",
                            CreationDate: "2023-06-01",
                            ModificationDate: "2022-10-24",
                        },
                        {
                            DateOfBirth: "2023-01-25",
                            CreationDate: "2023-01-23",
                            ModificationDate: "2022-08-09",
                        },
                    ],
                };
            },
        },
    });

    $("#table").jtable("load");
});
