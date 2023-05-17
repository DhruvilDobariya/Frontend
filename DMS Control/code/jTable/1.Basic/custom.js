$(document).ready(function () {
    $("#table").jtable({
        // general options
        actions: {
            listAction: function (postData, jtParams) {
                return {
                    Result: "OK",
                    Records: [{ Username: "Dhruvil Dobariya", Email: "dhruvildobariya@gmail.com", Password: "Dhruvil@123" }],
                };
            },
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
