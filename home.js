console.log("notes");
showNotes(); // function to display notes to the user

// adding notes written by the user and storing in the user storage

let addbtn = document.getElementById("addbtn"); // getting element button from document(html or dom) using id 'addbtn'
addbtn.addEventListener("click", function (e) {
    // using event lisener 'click'
    let addTxt = document.getElementById("addTxt"); // getting element 'addTxt' from document(html or dom) using id
    let addTitle = document.getElementById("addTitle"); // getting element 'addTxt' from document(html or dom) using id
    let notes = localStorage.getItem("notes"); // getting item named 'notes' from localStorage

    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes); // arranging the the stored notes to the notes array
    }
    let obj = {
        title: addTitle.value,
        text: addTxt.value,
    };
    notesObj.push(obj); // adding the note to the notes array
    localStorage.setItem("notes", JSON.stringify(notesObj)); // storing the notes array in localStorage Or Updating the localStorage
    addTxt.value = ""; // setting it empty for next user
    addTitle.value = ""; // setting it empty for next user
    showNotes(); // function to display notes to the user
});

// function to display notes to the user
function showNotes() {
    let notes = localStorage.getItem("notes"); //again getting item named 'notes' from localStorage.... and fetching the notes data from localStorage
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes); // arranging the the stored notes to the notes array
    }
    let html = ""; // variable to hold the html
    notesObj.forEach(function (element, index) {
        // kind of for loop to loop through the elements in the notes array
        html += `
        <div class="noteCard card my-2 mx-2" style="width: 18rem;">

        <div class="card-body">
        <p>
            <h5 class="card-title">${element.title}</h5>
            <h3 class="card-text">${element.text}</h3>  
        </p>
          <button id='${index}' onclick=deleteNote(this.id) class="btn btn-primary">Delete</button> 
        </div>
      </div>`; // in ' onclick=deleteNote(this.id)' this.id sends the id of the index on clicking the delete button and calls the function deleteNote() with parameter index
    });

    let notesElm = document.getElementById("notes"); // getting element 'notes' from document(html or dom) using id
    if (notesObj.length != 0) {
        // checking if the notes variable is empty or not
        notesElm.innerHTML = html;
    } else {
        notesElm.innerHTML = `<h4> no notes to show </h4>`;
    }
}

// funtion to delete a note from notes in localStorage
function deleteNote(index) {
    console.log("i am deleting", index);

    let notes = localStorage.getItem("notes"); //again getting item named 'notes' from localStorage.... and fetching the notes data from localStorage
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes); // arranging the the stored notes to the notes array
    }
    notesObj.splice(index, 1); //delete the note from the notes array and remove it from the notes object and from the localStorage
    localStorage.setItem("notes", JSON.stringify(notesObj)); // storing the notes array in localStorage Or Updating the localStorage
    showNotes(); // function to display notes to the user
}

// function to search for notes in localStorage

let searchTxt = document.getElementById("searchTxt"); // grabbing the element with id 'searchTxt'

searchTxt.addEventListener("input", function () {
    // whenever the user input in the search bar this function fires
    let input = searchTxt.value.toLowerCase(); // in the input variable values of searchTxt is stored
    console.log("searching for notes in localStorage", input); // showing the search results in console
    let noteCard = document.getElementsByClassName("noteCard"); // grabbing the note card element from Dom or html
    Array.from(noteCard).forEach(function (element) {
        let cardText = element.getElementsByTagName("h5")[0].innerText; //using getElementsByTagName for grabing the whole paragraph (all inputs)
        let cardText2 =element.getElementsByTagName("h3")[0].innerText; //using getElementsByTagName for grabing the whole paragraph (all inputs)
        // console.log(cardText);
        if (cardText.includes(input) || cardText2.includes(input)) {
            // checking if input is in the notes array
            element.style.display = "block"; // setting the display of the searched card note or notes
        } else {
            element.style.display = "none"; // setting the display none if there is no input in the notes array of the searched card note or notes
        }
    });
});
