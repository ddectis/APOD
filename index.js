//documentation for the apod API can be found here: https://api.nasa.gov/

const apodBaseURL = "https://api.nasa.gov/planetary/apod"; //Astronony Picture Of the Day
const imageryBaseURL = "https://api.nasa.gov/planetary/earth/imagery"; //Landsat 8 Imagery
const epicBaseURL = "https://epic.gsfc.nasa.gov/api/enhanced/date/2015-10-31"

const apiKey = "api_key=JuRL14u2u8LdPMYZ9fbUQ1tD8q2ehGAbBecZO88k";

let requestDate = "2023-06-23";

let dateRequestNode = `&date=${requestDate}`
let includeDateRequestNode = false; //set to true when you want to include it in the API requests
if (!includeDateRequestNode) {
    dateRequestNode = "";
}
let count = 1; //amount of pics to request when the countRequestNode is enabled.
let countRequestNode = `&count=${count}`;
let includeCountRequestNode = true;
if (!includeCountRequestNode) {
    countRequestNode = ``;
}

const pending = document.querySelector("#pending"); //a place to put the text that goes on screen when the fetch starts

//combined components to form the full request URL for the APOD method
const apodRequestURL = `${apodBaseURL}?${apiKey}${dateRequestNode}${countRequestNode}`;

//combined components to form the full request URL for the Imagery method
let imageryRequestURL = `${imageryBaseURL}?${apiKey}&lon=-122.331297&lat=37.773972&date=2021-04-01&dim=0.15`

const epicRequestURL = `${epicBaseURL}?${apiKey}`

//Latitude: 37.761777 / N 37° 45' 42.398''
//Longitude: -122.478457 / W 122° 28' 42.443''

let responseHolder = document.querySelector("#response-holder");

const retryAPODFetchButton = document.querySelector("#retry-button");

const pendingString = `
        <div class="pending" id="pending">        
            <h1>
                Fetching a random 
                <br/>
                Astronomy Picture of the Day
                <br /><br /><br />
                Waiting for response from NASA
            </h1>
        </div>    
        `;


//a method to get a random Astronomy picture of the day
const GetAPOD = () => {
    
    //indicate to the user that the picture fetch is pending
    responseHolder.innerHTML = pendingString; 

    fetch(apodRequestURL) //call the request URL
        .then(response => {
            responseHolder.innerHTML = pendingString;
            return response.json();
        })
        .then(data => {
            console.log(data);
            if (data[0].media_type !== "image") { //this API is only configured to handle an image
                console.error("returned media not an image, trying again");
                GetAPOD();
                return;
            }
            
            console.log(responseHolder);
            responseHolder.innerHTML = `
                    <h1>NASA APOD from ${data[0].date}</h1>
                    <a href="${data[0].hdurl}" target"_blank">
                        <img src="${data[0].url}">
                    </a>
                    <div class="explanation"><p>${data[0].explanation}<p></div>
                `;
            console.log(responseHolder.innerHTML);

            return responseHolder;
        })
}

const GetImagery = () => {
    fetch(imageryRequestURL)
        .then(response => {
            console.log(response);
            return response.url;
        })
        .then(data => {
            console.log(data);
            responseHolder.innerHTML = `
                    <img src="${data}">
                `
        })
}

const GetEpic = () => {
    fetch(epicRequestURL)
        .then(response => {
            console.log(response)
            return response.json();
        })
        .then(data => {
            console.log(data);
            responseHolder.innerHTML = `
                    <img src="https://epic.gsfc.nasa.gov/archive/aersol/2015/10/31${data[0].image}.jpg">
                `
        })
}




//get a random Astronomy Picture of the Day and display the explanation as well
GetAPOD();

retryAPODFetchButton.addEventListener("click", () => {
    console.log("retry button clicked");
    responseHolder.innerHTML = pendingString;
    
    GetAPOD(); //call the APOD method again
});

//work with the imagery API endpoint
//GetImagery();

//work with the epic NASA API
//GetEpic();