import config from "../conf/index.js";

//Implementation to extract adventure ID from query params
function getAdventureIdFromURL(search) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Get the Adventure Id from the URL
  let params = new URLSearchParams(search);
  let getId = params.get("adventure");

  // Place holder for functionality to work in the Stubs
  return getId
}
//Implementation of fetch call with a paramterized input based on adventure ID
async function fetchAdventureDetails(adventureId) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Fetch the details of the adventure by making an API call

  try{

    let fetchUrl = await fetch(config.backendEndpoint + `/adventures/detail?adventure=${adventureId}`);
    let getData = await fetchUrl.json()

    return getData;
  }
  catch(err){
    return null;
  }

 


  // Place holder for functionality to work in the Stubs
  
}

//Implementation of DOM manipulation to add adventure details to DOM
function addAdventureDetailsToDOM(adventure) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the details of the adventure to the HTML DOM

  document.getElementById("adventure-name").innerHTML = `${adventure.name}`;
  document.getElementById("adventure-subtitle").innerHTML = `${adventure.subtitle}`;


  adventure.images.map((image) =>{
    const divEle = document.createElement("div");
    divEle.innerHTML = `<img src="${image} alt="${image}" class="activity-card-image">`

    document.getElementById("photo-gallery").append(divEle);
  })

  document.getElementById("adventure-content").innerHTML = `<p>${adventure.content}</p>`




}

//Implementation of bootstrap gallery component
function addBootstrapPhotoGallery(images) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the bootstrap carousel to show the Adventure images
  document.getElementById("photo-gallery").innerHTML = `

 <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">   
 <div class="carousel-indicators">
     <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
     <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
     <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
   </div>
   <div class="carousel-inner" id="carousel-main">
   </div>
   <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
     <span class="carousel-control-prev-icon" aria-hidden="true"></span>
     <span class="visually-hidden">Previous</span>
   </button>
   <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
     <span class="carousel-control-next-icon" aria-hidden="true"></span>
     <span class="visually-hidden">Next</span>
   </button>
 </div> `

  
// images.forEach((imgItem)=>{      
//   const getElem=document.getElementById('carousel-main');
//   const divElem =document.createElement("div")
//   divElem.innerHTML = `
//   <div class="carousel-item active">
//     <img src="${imgItem}" class="d-block w-100" alt="...">
//   </div>
//   `
//   getElem.append(divElem);
// })  

images.map((imgItem, idx) => {
  let divEle = document.createElement("div");
  divEle.className = `carousel-item ${idx === 0 ? "active" : ""}`;
  divEle.innerHTML = `
  <img
      src=${imgItem}
      class="activity-card-image pb-3 pb-md-0 "
    />
        `;

document.getElementById("carousel-main").append(divEle);
});



}

//Implementation of conditional rendering of DOM based on availability
function conditionalRenderingOfReservationPanel(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If the adventure is already reserved, display the sold-out message.
  if(adventure.available === true){
    document.getElementById("reservation-panel-sold-out").style.display = "none";
    document.getElementById("reservation-panel-available").style.display = "block";
    const pareEle = document.getElementById("reservation-person-cost");
    pareEle.innerHTML = `${adventure.costPerHead}`;
  }
  else{
    document.getElementById("reservation-panel-available").style.display = "none";
    document.getElementById("reservation-panel-sold-out").style.display = "block";
  }

}

//Implementation of reservation cost calculation based on persons
function calculateReservationCostAndUpdateDOM(adventure, persons) {
  // TODO: MODULE_RESERVATIONS
  // 1. Calculate the cost based on number of persons and update the reservation-cost field
  document.getElementById("reservation-cost").innerHTML = parseInt(adventure.costPerHead)*persons;
  
}

//Implementation of reservation form submission
function captureFormSubmit(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. Capture the query details and make a POST API call using fetch() to make the reservation
  // 2. If the reservation is successful, show an alert with "Success!" and refresh the page. If the reservation fails, just show an alert with "Failed!".
  const formEle = document.getElementById("myForm");
  formEle.addEventListener("submit", async (e) => {
    e.preventDefault();
    const data = {
      name:formEle.elements["name"].value,
      date:formEle.elements["date"].value,
      person:formEle.elements["person"].value,
      adventure:adventure.id, 
    }
    try{
      const getData = await fetch(`${config.backendEndpoint}/reservations/new`,{
        method:"POST",
        body:JSON.stringify(data),
        headers:{"Content-Type":"application/json"},
      });
      if(getData.ok){
        alert("Success!");
        window.location.reload();
      }
      else{
        let x = await getData.json();
        alert(`Failed - ${x.message}`)
      }
    }
    catch(err){
      alert("Failed!")
    }
  })
}

//Implementation of success banner after reservation
function showBannerIfAlreadyReserved(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If user has already reserved this adventure, show the reserved-banner, else don't
  if(adventure.reserved === true){
    document.getElementById("reserved-banner").style.display = "block";
  }
  else{
    document.getElementById("reserved-banner").style.display = "none";
  }

}

export {
  getAdventureIdFromURL,
  fetchAdventureDetails,
  addAdventureDetailsToDOM,
  addBootstrapPhotoGallery,
  conditionalRenderingOfReservationPanel,
  captureFormSubmit,
  calculateReservationCostAndUpdateDOM,
  showBannerIfAlreadyReserved,
};
