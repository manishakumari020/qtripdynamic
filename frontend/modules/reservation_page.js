import config from "../conf/index.js";

//Implementation of fetch call to fetch all reservations
async function fetchReservations() {
  // TODO: MODULE_RESERVATIONS
  // 1. Fetch Reservations by invoking the REST API and return them
  try{
    const getPromise = await fetch(config.backendEndpoint + "/reservations");
    const data = await getPromise.json();

    return data;
  }
  catch(err){
    return null;
  }

  // Place holder for functionality to work in the Stubs
}

//Function to add reservations to the table. Also; in case of no reservations, display the no-reservation-banner, else hide it.
function addReservationToTable(reservations) {
  // TODO: MODULE_RESERVATIONS
  // 1. Add the Reservations to the HTML DOM so that they show up in the table

  //Conditionally render the no-reservation-banner and reservation-table-parent

  if(reservations.length === 0){
    document.getElementById("no-reservation-banner").style.display = "block";
    document.getElementById("reservation-table-parent").style.display = "none";
  }
  else{
    document.getElementById("no-reservation-banner").style.display = "none";
    document.getElementById("reservation-table-parent").style.display = "block"
  }
  

  /*
    Iterating over reservations, adding it to table (into div with class "reservation-table") and link it correctly to respective adventure
    The last column of the table should have a "Visit Adventure" button with id=<reservation-id>, class=reservation-visit-button and should link to respective adventure page

    Note:
    1. The date of adventure booking should appear in the format D/MM/YYYY (en-IN format) Example:  4/11/2020 denotes 4th November, 2020
    2. The booking time should appear in a format like 4 November 2020, 9:32:31 pm
  */

  const paraElem = document.getElementById("reservation-table");
  
  reservations.forEach((item) => {
    const {name, date, person, adventure, adventureName, price, id, time} = item;
    let creDate = new Date(date);
    let changeStrDate = creDate.toLocaleDateString("en-In");
    let creTime = new Date(time);
    let changeInStrTime = creTime.toLocaleString("en-In", 
    {day:"numeric", month:"long", year:"numeric" ,  hour:"numeric", minute:"2-digit", second:"2-digit", hourCycle:"h12"});

    changeInStrTime = changeInStrTime.replace(" at", ",")

    let urlAdvButton = "../../adventures/detail/?adventure=" + adventure;
    let rowEle = document.createElement("tr");

    rowEle.innerHTML = `

                        <th>${id}</th>
                        <td>${name}</td>
                        <td>${adventureName}</td>
                        <td>${person}</td>
                        <td>${changeStrDate}</td>
                        <td>${price}</td>
                        <td>${changeInStrTime}</td>
                        <td id=${id}>
                          <a href="${urlAdvButton}" class="reservation-visit-button">Visit Adventure</a>
                        </td>
                       `

    paraElem.appendChild(rowEle);
  })

}

export { fetchReservations, addReservationToTable };
