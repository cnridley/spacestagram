async function sendApiRequest(){
    let api_key = "ausYefrhnm9ixSnHn7hClnVkv7YfsUDL4yQMhQSL"
    let response = await fetch("https://images-api.nasa.gov/search?q=apollo%2011...");
    console.log(response)
    let data = await response.json()
    console.log(data)
    useApiData(data)
}

sendApiRequest();

function useApiData(data){
    document.querySelector("#content").innerHTML += data.collection.items[3].data[0].description
    
}

