async function sendApiRequest(){
    let loader = `<div id="boxLoading"></div>`;
    document.getElementById('content').innerHTML = loader;
    let apiKey = "ausYefrhnm9ixSnHn7hClnVkv7YfsUDL4yQMhQSL"
    let start = document.getElementById("start").value;
    let end = document.getElementById("end").value;
    let response = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${apiKey}&start_date=${start}&end_date=${end}`);
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
                </div>
                  <div class="row m-auto container-fluid">
                  <button class="col-3 m-auto images likedImage">
                    <i class="far fa-heart"></i>
                  </button>
                  <button class="col-3 m-auto images dislikeImage">
                    <i class="far fa-thumbs-down"></i>
                  </button>
                  </div>                 
            </div>
        `

    }

    document.getElementById("content").innerHTML = card;

    let loved = document.getElementsByClassName("likedImage");
      for (var i = 0 ; i < loved.length; i++) {
        loved[i].addEventListener('click' , function(){
          this.innerHTML = `<i class="fas fa-heart"></i>`;
      });
    }
  
      let dislike = document.getElementsByClassName("dislikeImage");
      for (var i = 0 ; i < dislike.length; i++) {
        dislike[i].addEventListener('click' , function(){
          this.innerHTML = `<i class="fas fa-thumbs-down"></i>`;
        }); 
      }
  
  
}

    // Wanted to add a favourites page but 'cannot define property of null' error kept occuring.
    // let lovedNasaImage = document.getElementsByClassName('card');
    // for (let i = 0; i < loved.length && lovedNasaImage.length; i++){
    //   loved[i].addEventListener("click", function(){
    //       let clone = lovedNasaImage[i]
    //       console.log(clone)
    //       document.getElementById('favouriteContent').innerHTML = clone;
    //   })
    // }





