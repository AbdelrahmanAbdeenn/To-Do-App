const btn=document.getElementById('first')
const list=document.getElementById('list')
const modal = document.getElementById("noteModal");
const exitbtn = document.getElementById('close');
const delbtn = document.getElementsByClassName("fa-solid fa-trash")
btn.addEventListener('click', () => {
    modal.style.display = "flex"; // Display the modal when New button is clicked
});

exitbtn.addEventListener('click', () => {
    modal.style.display = "none"; 
});


function Note(title, description, dueDate, completed) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.completed = completed;
}

let notes = [];

function loadNotes() {
    const savedNotes = localStorage.getItem('notes'); 
    if (savedNotes) {
        notes = JSON.parse(savedNotes); 
    } else {
        notes = [];
    }
    displayNotes(); 
}

document.getElementById('noteForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent the form from submitting and reloading the page
    
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const dueDate = document.getElementById('dueDate').value;
    const completed = false; 
    

    const newNote = new Note(title, description, dueDate, completed);
    
    notes.push(newNote);
    
    localStorage.setItem('notes', JSON.stringify(notes));

    displayNotes();

    document.getElementById('noteForm').reset();
    
    modal.style.display = "none";
});

function displayNotes() {
    // const notesList = document.getElementById('notesList');
    // notesList.innerHTML = ''; // Clear the list before adding updated notes
    list.innerHTML = ''; // This clears the list before re-rendering it
    notes.forEach((note,index) => {
        console.log(note)
        const newItem = document.createElement('div')
        newItem.id="toDoItem"
        newItem.innerHTML= `
        <div id="ckbox"><input type="checkbox"></div>
        <div id="text"><p>${note.title}</p></div>
        <div id="icons"><ul id="inlineIcons">
                        <li><i class="fa-solid fa-eye"></i></li>
                        <li><i class="fa-solid fa-pen"></i></li>
                        <li><i class="fa-solid fa-trash"></i></li>
                    </ul></div>
        `
        list.appendChild(newItem)
    });
}

function toggleCompletion(index) {
    notes[index].completed = !notes[index].completed;

    localStorage.setItem('notes', JSON.stringify(notes));

    displayNotes();
}


function deleteNote(index) {
    notes.splice(index, 1); // Remove the note from the array
    localStorage.setItem('notes', JSON.stringify(notes)); // Update localStorage
    displayNotes(); // Re-render the notes to reflect the changes
}

window.onload = loadNotes;