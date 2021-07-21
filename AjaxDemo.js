/**
 * @author Sanobar Mujawar
 * @since 21.07.21
 * 
 * Purpose: To learn ajax http request on data
 * 
 */


let XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

function makePromiseCall(methodType, url, callback, async = true, data = null) {
    return new Promise(function (resolve, reject) {
        let xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            console.log("State Changed Called. Ready State: " +
                xhr.readyState + " Status" + xhr.status);

            if (xhr.status.toString().match('^[2][0-9]{2}')) {
                resolve(xhr.responseText);
            } else if (xhr.status.toString().match('^[4-5][0-9]{2}')) {
                reject({
                    status: xhr.status,
                    statusText: xhr.statusText
                });
                console.log("XHR failed");
            }
        }

        xhr.open(methodType, url, async);
        if (data) {
            console.log(JSON.stringify(data));
            xhr.setRequestHeader("Content-Type", "application/json");
            xhr.send(JSON.stringify(data));
        } else xhr.send();
        console.log(methodType + "request sent to the server");

    });
}

//get data from url
const getURL = "http://127.0.0.1:5500/Employee_Payroll_App/pages/homePage.html";
makePromiseCall("GET", getURL, true).then(responseText => {
    console.log("Get User Data: " +responseText)
})
.catch(error => console.log("GET error status: " + JSON.stringify(error)));


//detete user data
const deleteURL = "http://127.0.0.1:5500/Employee_Payroll_App/pages/homePage.html";
makePromiseCall("DELETE", deleteURL, true).then(responseText => {
    console.log("DELETE User Data: " +responseText)
})
.catch(error => console.log("DELETE error status: " + JSON.stringify(error)));

//add user data
const postURL = "http://127.0.0.1:5500/Employee_Payroll_App/pages/homePage.html";
const emplData = {
    "name": "Harry",
    "salary": "5000"
};
makePromiseCall("POST", postURL, true, emplData).then(responseText => {
    console.log("User Added: " +responseText)
})
.catch(error => console.log("POST error status: " + JSON.stringify(error)));