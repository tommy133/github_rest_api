function processQ1() {
    var org = 
        document.getElementById("org_name").value;
        requestNreposByOrg(org);
}

function processQ2() {
    var org = 
        document.getElementById("org_name").value;
        requestBiggestRepo(org);
}

function requestNreposByOrg(org){
    if (org != ""){
        // Create a request variable and assign a new XMLHttpRequest object to it.
        var request = new XMLHttpRequest();

        // Open a new connection, using the GET request on the URL endpoint
        var path = "https://api.github.com/users/"+org+"/repos";
        request.open('GET', path, true);
        console.log(path);

        request.onload = function () {
        // Begin accessing JSON data here
        var data = JSON.parse(this.response);
        var size = Object.keys(data).length;

        var statusHTML = size+" repositories";

        $('#repos').html(statusHTML);
        }

        // Send request
        request.send();
    } else {
        $('#repos').html("No repository specified");
    }
    
}

function requestBiggestRepo(org){
    if (org != ""){
        var request = new XMLHttpRequest();
        
        var path = "https://api.github.com/users/"+org+"/repos";
        request.open('GET', path, true);
        console.log(path);

        request.onload = function () {
        var data = JSON.parse(this.response);
        var biggest = Maximum(data);

        var statusHTML = "The biggest repository of "+org+ " is: "+biggest.name+" with size of "+biggest.size+" bytes";

        $('#biggest_repo').html(statusHTML);
        }

        request.send();
        
    } else {
        $('#biggest_repo').html("No repository specified");
    }


    
    
}

$(function () {
    $('#modal_q3').click(function () {
        var request = new XMLHttpRequest();

        var path = "https://api.github.com/search/users?q=type:org";
        request.open('GET', path, true);
        console.log(path);

        request.onload = function () {
        var data = JSON.parse(this.response);
        var js_alert = "The number of organizations that are currently on Github is: "+data.total_count;

        alert(js_alert);
        }

        request.send();
        
        return false;
    });
});  

/*Classic maximum algorithm aplicated to our array of objects
 will return the name and size of the object with maximum size*/
function Maximum(array){ 
    var max = array[0].size;
    var imax;

    for (let i = 1 ; i < array.length; i++){
        if (array[i].size > max){
            max = array[i].size;
            imax = i;
        }
    }

    const max_struct = {
        name: array[imax].name,
        size: array[imax].size,
    };


    return max_struct;
}

