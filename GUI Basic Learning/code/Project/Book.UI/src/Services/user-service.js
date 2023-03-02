export class UserService{
    #baseURL = "https://localhost:44327/"
    
    validateUser(login){
        return $.ajax({
            type: "POST",
            url: this.#baseURL + "api/User/ValidateUser",
            data: JSON.stringify(login),
            dataType: "json",
            headers:{
                'accept': 'text/plain',
                'Content-Type': 'application/json'
            }
        });
    }
    getUserById(id){
        return $.ajax({
            type: "GET",
            url: this.#baseURL + "api/User/" + id,
            data: {},
            dataType: "json",
            headers:{
                'accept': 'text/plain'
            }
        });
    }
    registerUser(user){
        return $.ajax({
            type: "POST",
            url: this.#baseURL + "api/User/RegisterUser",
            data: JSON.stringify(user),
            headers:{
                'accept': 'text/plain',
                'Content-Type': 'application/json'
            }
        });
    }
    updateUser(user){
        // $.ajax({
        //     type: "PUT",
        //     url: this.#baseURL + "api/User/UpdateUser",
        //     data: JSON.stringify(user),
        //     dataType: "json",
        //     headers:{
        //         'accept': 'text/plain',
        //         'Content-Type': 'application/json'
        //     }
        // }).done(function(data){
        //     console.log(data)
        // }).fail(function(e){
        //     console.log(e.status)
        // })
        return $.ajax({
            type: "PUT",
            url: this.#baseURL + "api/User/UpdateUser",
            data: JSON.stringify(user),
            headers:{
                'accept': 'text/plain',
                'Content-Type': 'application/json'
            }
        })
    }
}

// {
//     id: "";
//     name: ""
//     email: ""
//     password: "";
//     confirmPassword: "";
// }
