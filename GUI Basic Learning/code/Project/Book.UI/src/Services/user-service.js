export class UserService {
    #baseURL = "https://localhost:44327/";

    validateUser(login) {
        return $.ajax({
            type: "POST",
            url: this.#baseURL + "api/User/Authenticate",
            data: JSON.stringify(login),
            dataType: "json",
            headers: {
                accept: "text/plain",
                "Content-Type": "application/json",
                Authorization: "Bearer " + sessionStorage.getItem("token"),
            },
        });
    }
    getUserById(id) {
        return $.ajax({
            type: "GET",
            url: this.#baseURL + "api/User/" + id,
            data: {},
            dataType: "json",
            headers: {
                accept: "text/plain",
                Authorization: "Bearer " + sessionStorage.getItem("token"),
            },
        });
    }
    registerUser(user) {
        return $.ajax({
            type: "POST",
            url: this.#baseURL + "api/User/RegisterUser",
            data: JSON.stringify(user),
            headers: {
                accept: "text/plain",
                "Content-Type": "application/json",
                Authorization: "Bearer " + sessionStorage.getItem("token"),
            },
        });
    }
    updateUser(user) {
        return $.ajax({
            type: "PUT",
            url: this.#baseURL + "api/User/UpdateUser",
            data: JSON.stringify(user),
            headers: {
                accept: "text/plain",
                "Content-Type": "application/json",
                Authorization: "Bearer " + sessionStorage.getItem("token"),
            },
        });
    }
}

// {
//     id: "";
//     name: ""
//     email: ""
//     password: "";
//     confirmPassword: "";
// }
