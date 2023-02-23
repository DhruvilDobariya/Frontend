async function getUsers(){
    try{
        const response = await fetch("https://jsonplaceholder.typicode.com/users",{
            method: "GET", // GET, POST, PUT, DELETE
            // body: {}, // GET doesn't have body
            headers: {
                'Content-Type': 'application/json'
            }
        });
        console.log(response);
        return response.json();
    }
    catch(e){
        return e;
    }
}

const getUsersPromise = getUsers();

getUsersPromise.then(data => console.log(data)).catch(e => console.log(e));