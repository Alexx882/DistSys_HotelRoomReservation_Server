/**
 * http://usejsdoc.org/
 */

// The root URL for the RESTful services
var rootURL = "http://localhost:8080/DistSys_HotelRoom_war_exploded/";

//listRooms() ++++++  GET /hotelrooms - list of all hotelrooms 

//getRoom(id) ++++++  GET /hotelrooms/{id} - hotelroom with ID

//listRoomTypes() ++  GET /roomtypes - list of all roomtypes

//getRoomType(id) ++  GET /roomtypes/{id} - roomtype with ID

//setRoomType()   ++  POST /roomtypes - create/update a roomtype uses communication.AdminRequest (password is currently "admin"), eg:
//book() 	  ++++++  POST /roomtypes/booking

//TODO: success ?

function listRooms() {
    $.ajax({
        type: 'GET',
        url: rootURL + 'hotelrooms',
        dataType: "json", // data type of response
        success: function(result){
            console.log(result);
           // alert('Success: ' + renderList);
        },
        error: function(result){
            console.log(result);
           // alert('Error: ' + result);
        }
    });
   // alert(" Result: "+result);
}

function getRoom(id) {
    id = document.getElementById('id').value;


    $.ajax({
        type: 'GET',
        url: rootURL + '/hotelrooms/'+id,
        dataType: "json",
        success: renderList
    });
}

function listRoomTypes() {
    $.ajax({
        type: 'GET',
        url: rootURL + 'roomtypes',
        dataType: "json",
        success: renderList
    });
}

function getRoomType(id) {
    id = document.getElementById('id2').value;
    $.ajax({
        type: 'GET',
        url: rootURL+ '/roomtypes'+ id,
        dataType: "json",
        success: renderList
    });
}


function setRoomType() {
    $.ajax({
        type: 'POST',
        contentType: 'application/json',
        url: rootURL+ '/roomtypes',
        dataType: "json",
        data: getRoomTypeData(),
        success: function(result){
            console.log(result);
           // alert('Success: ' + result);
        },
        error: function(result){
            console.log(result);
         //   alert('An Error occured: ' + result);
        }
    });
}

function book() {
    $.ajax({
        type: 'POST',
        contentType: 'application/json',
        url: rootURL+ '/roomtypes/booking',
        dataType: "json",
        data: getBookData(),
        success: function(result){
            console.log(result);
           // alert('Success: ' + result);
        },
        error: function(result){
            console.log(result);
           // alert('An Error occured: ' + result);
        }
    });
}


// Helper function to serialize all the form fields into a JSON string
function getRoomTypeData() {
    /*
    {
        "password": "admin",
        "typeId": 2,
        "numberOfRooms": 2,
        "prize": 5.7
    }*/

    return JSON.stringify({
        "password": "admin",
        "typeId": 2,
        "numberOfRooms": 2,
        "prize": 5.7
    });


    /*return JSON.stringify({
        "id": $('#id').val(),
        "name": $('#name').val(),
        "grapes": $('#grapes').val(),
        "country": $('#country').val(),
        "region": $('#region').val(),
        "year": $('#year').val(),
        "description": $('#description').val()
        }); */
}

function getBookData() {


    return JSON.stringify({
        "typeId": 2,
        "startDate": "2018-06-05T13:27",
        "endDate": "2018-06-05T13:27",
        "firstName": "Peter",
        "lastName": "Bauer"
    });
}




function renderList(data) {
    // JAX-RS serializes an empty list as null, and a 'collection of one' as an object (not an 'array of one')
    var list = data == null ? [] : (data instanceof Array ? data : [data]);


    $.each(list, function(index, id) {
        $('#result').append('<li><p>'+id.value+'</p></li>');
    });
}
