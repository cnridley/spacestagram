async function sendApiRequest(){
    let apiKey = "ausYefrhnm9ixSnHn7hClnVkv7YfsUDL4yQMhQSL"
    let response = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${apiKey}&count=10`);
    console.log(response)
    let data = await response.json()
    console.log(data)
    useApiData(data)
}

sendApiRequest();

function useApiData(data){
    let card = "";

    for (let d of data){
        card += `
        
            <div class="card col-md-6">
                <img class="card-img-top" src="${d.url}" alt="Nasa Image">
                <div class="card-body">
                  <h5 class="card-title">${d.title}</h5>
                  <p class="card-text">${d.explanation}</p>
                  <div class="row m-auto container-fluid">
                  <div class="col-3 m-auto">
                    <i class="far fa-heart images"></i>
                  </div>
                  <div class="col-3 m-auto">
                    <i class="far fa-thumbs-up images"></i>
                  </div>
                  <div class="col-3 m-auto">
                    <i class="far fa-thumbs-down images"></i>
                  </div>
                  </div>                  
                </div>
              </div>
        `
    }
  
    document.getElementById("content").innerHTML = card;
}



