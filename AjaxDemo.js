let XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
function makeAJAXCall(methodType,  url, callback,  async = true, data = null) {
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function (){
        console.log("State Changed Called. Ready State: " +
            xhr.readyState + " Status" + xhr.status);
    
        if (xhr.status === 4) {
            //Matching all 200 series responses
            if (xhr.status === 200 || xhr.status === 201){
                callback(xhr.responseText);
            } else if (xhr.status >= 400) {
                console.log("Handle 400 client error or 500 server error");
            }
        }
    }

    xhr.open(methodType,  url, async);
    if (data) {
        console.log(JSON.stringify(data));
        xhr.setRequestHeader("Content-Type", "application/json");
        xhr.send(JSON.stringify(data));
    } else xhr.send();
    console.log(methodType + "request sent to the server");
}

//get data from url
const getURL = "http://127.0.0.1:5500/Employee_Payroll_App/pages/homePage.html";
function getUserDetails(data) {
    console.log("Get User Data " +data);
}
makeAJAXCall("GET", getURL, getUserDetails);

//detete user data
const deleteURL = "http://127.0.0.1:5500/Employee_Payroll_App/pages/homePage.html";
function userDeleted(data) {
    console.log("User Deleted " +data);
}
makeAJAXCall("DELETE", deleteURL, userDeleted, false);

//add user data
const postURL = "http://127.0.0.1:5500/Employee_Payroll_App/pages/homePage.html";
const emplData = {"name": "Harry", "salary": "5000"};
function userAdded(data) {
    console.log("User Added: " +data);
}
makeAJAXCall("POST", postURL, userAdded, true, emplData);


