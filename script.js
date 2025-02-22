const btn=document.getElementById('first')
const list=document.getElementById('list')
const modal = document.getElementById("noteModal");
const exitbtn = document.getElementById('close');
const delbtn = document.getElementsByClassName("fa-solid fa-trash")

const viewContent = document.getElementById("viewContent")
const viewModel = document.getElementById("viewModel")

const form = document.getElementById('noteForm')
const sbmtBtn = document.getElementById('btn-submit')
const titleInput=document.getElementById("title")
const descriptionInput = document.getElementById("description")
const dueDateInput = document.getElementById('dueDate')
const modelTitle = document.getElementById('hTitle')
btn.addEventListener('click', () => {
    editIndex =null;
    form.reset();
    sbmtBtn.textContent = "Create"
    modal.style.display = "flex"; // Display the modal when New button is clicked
});

exitbtn.addEventListener('click', () => {
    modal.style.display = "none"; 
});


function Note(id,title, description, dueDate, completed) {
    this.id = id;
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
    console.log(editIndex)
    
    if(editIndex === null){
        const newNote = new Note(Date.now(),title, description, dueDate, completed);    
        console.log("Test")
        notes.push(newNote);

    }else{
        notes[editIndex].title = title
        notes[editIndex].description = description
        notes[editIndex].dueDate = dueDate
        
    }
    
    
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
                        <li><i class="fa-solid fa-eye" onclick="viewNote(${index})"></i></li>
                        <li><i class="fa-solid fa-pen" onclick="editNote(${index})"></i></li>
                        <li><i class="fa-solid fa-trash" onclick="deleteNote(${index})"></i></li>
                    </ul></div>
        `
        list.appendChild(newItem)
    });
}

function viewNote(index){
    const note = notes[index]
    viewContent.innerHTML=`<h3>${note.title}</h3><p>${note.description}</p><p>Due: ${note.dueDate}</p><button id="viewClose">Close</button>`;
    viewModel.style.display ="flex"
    document.getElementById('viewClose').addEventListener('click',function(){
        viewModel.style.display = "none"
    });
}

function editNote(index){
    editIndex = index;
    const note= notes[index]
    titleInput.value = note.title
    descriptionInput.value = note.description
    dueDateInput.value = note.dueDate
    modelTitle.textContent = "Edit a Note"
    sbmtBtn.textContent = "Update"
    modal.style.display="flex"

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
