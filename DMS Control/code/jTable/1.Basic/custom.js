$(document).ready(function () {
    $("#table").jtable({
        // general options
        title: "User",

        actions: {
            listAction: function (postData, jtParams) {
                return {
                    Result: "OK",
                    Records: [{ Username: "Dhruvil Dobariya", Email: "dhruvildobariya@gmail.com", Password: "Dhruvil@123" }],
                };
            },
            createAction: function () {},
            updateAction: function () {},
            deleteAction: function () {},
        },
        fields: {
            Username: {
                title: "Username",
            },
            Email: {
                title: "Email",
            },
            Password: {
                title: "Password",
            },
        },

        // Event handlers
    });
    $("#table").jtable("load");
});
