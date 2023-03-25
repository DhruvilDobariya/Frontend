export class Student{
    baseURL = "https://localhost:44319/api/students/";

    getStudents(){
        const xhttp = new XMLHttpRequest();
        xhttp.open("GET", this.baseURL, true);
        xhttp.send();
        return xhttp;
    }

    getStudent(id){
        const xhttp = new XMLHttpRequest();
        xhttp.open("GET", this.baseURL + id, true);
        xhttp.send();
        return xhttp;
    }

    addStudent(data){
        const xhttp = new XMLHttpRequest();
        xhttp.open("POST", this.baseURL, true);
        xhttp.setRequestHeader("Content-Type", "application/json");
        xhttp.send(data);
        return xhttp;
    }

    updateStudent(data){
        const xhttp = new XMLHttpRequest();
        xhttp.open("PUT", this.baseURL, true);
        xhttp.setRequestHeader("Content-Type", "application/json");
        xhttp.send(data);
        return xhttp;
    }

    deleteStudent(id){
        const xhttp = new XMLHttpRequest();
        xhttp.open("DELETE", this.baseURL + id, true);
        xhttp.send();
        return xhttp;
    }
}