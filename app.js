let notes = [];
let editingNoteId = null
function loadNotes() {
  const savedNotes = localStorage.getItem('quickNotes');
  return savedNotes ? JSON.parse(savedNotes) : [];
}

function saveNote(event) {
  event.preventDefault();
  const title = document.getElementById('noteTitle').value.trim();
  const content = document.getElementById('noteContent').value.trim();
  if (editingNoteId)
{
const noteIndex = notes.findIndex(note => note.id === editingNoteId)
notes[noteIndex] = {
  ...notes[noteIndex],
  title: title,
  content: content
}

}
else
{
 notes.unshift({
    id: generateId(),
    title: title,
    content: content,
  });
  
}
 

  saveNotes();
  renderNotes();
  closeNoteDialog();
  clearNoteInputs();
}

function clearNoteInputs() {
  document.getElementById('noteTitle').value = '';
  document.getElementById('noteContent').value = '';
}

function generateId() {
  return Date.now().toString();
}

function saveNotes() {
  localStorage.setItem('quickNotes', JSON.stringify(notes));
}

function deleteNote(noteId){
  notes = notes.filter(note => note.id != noteId)
  saveNotes()
  renderNotes()
}


function renderNotes() {
  const notesContainer = document.getElementById('noteContainer');
  if (notes.length === 0) {
    notesContainer.innerHTML = `
      <div class="empty-state">
        <h2>No notes yet</h2>
        <p>Create your first note to get started!</p>
        <button class="add-note-btn" onclick="openNoteDialog()">+ Add Your First Note</button>
      </div>`;
    return;
  }

  notesContainer.innerHTML = notes
    .map(
      (note) => `
    <div class="note-card">
      <h3 class="note-title">${note.title || ''}</h3>
      <p class="note-content">${note.content || ''}</p>
    <div class="note-actions">
    <button class="edit-btn" onclick="openNoteDialog('${note.id}')" title="Edit Note">
    <svg xmlns="http://www.w3.org/2000/svg" 
         width="20" height="20" viewBox="0 0 24 24" 
         fill="none" stroke="currentColor" stroke-width="2" 
         stroke-linecap="round" stroke-linejoin="round">
      <path d="M11 4h9a2 2 0 0 1 2 2v9"></path>
      <path d="M16 2l6 6"></path>
      <path d="M2 20h4l10-10-4-4L2 16v4z"></path>
    </svg>
    <button class="delete-btn" onclick="deleteNote('${note.id}')" title="Delete Note ">
<svg xmlns="http://www.w3.org/2000/svg" 
           width="20" height="20" viewBox="0 0 24 24" 
           fill="none" stroke="currentColor" stroke-width="2" 
           stroke-linecap="round" stroke-linejoin="round">
        <polyline points="3 6 5 6 21 6"></polyline>
        <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"></path>
        <path d="M10 11v6"></path>
        <path d="M14 11v6"></path>
        <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"></path>
      </svg>
    </button>
    </div>


    </div>`
    )
    .join('');
}

function openNoteDialog(noteId = null) {
  const dialog = document.getElementById('noteDialog');
  const titleInput = document.getElementById('noteTitle');
  const contentInput = document.getElementById('noteContent');
  if(noteId)
  {
const noteToEdit = notes.find(note => note.id === noteId)
editingNoteId =noteId
document.getElementById('dialogTitle').textContent = 'Edit Note'
titleInput.value = noteToEdit.title
contentInput.value = noteToEdit.content
  }
  else{
editingNoteId = null
document.getElementById('dialogTitle').textContent = 'Add New Note'
titleInput.value = ''
contentInput.value = ''
  }
  editingNoteId;
  dialog.showModal();
  titleInput.focus();
}

function closeNoteDialog() {
  document.getElementById('noteDialog').close();
}
function toggleTheme(){
  const body = document.body;
  const isDark = body.classList.toggle('dark-theme');
  localStorage.setItem('theme',isDark ? 'dark' :'light')
  document.getElementById('themeToggleBtn').textContent = isDark ? '🌙' :'☀️'

}
function applyStoredTheme() {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'dark') {
    document.body.classList.add('dark-theme');
    document.getElementById('themeToggleBtn').textContent = '🌙';
  } else {
    document.getElementById('themeToggleBtn').textContent = '☀️';
  }
}

document.addEventListener('DOMContentLoaded', function () {
  applyStoredTheme()
  notes = loadNotes()
  renderNotes()

  document.getElementById('noteForm').addEventListener('submit', saveNote);
  document.getElementById('themeToggleBtn').addEventListener('click', toggleTheme);

  document.getElementById('noteDialog').addEventListener('click', function (event) {
    if (event.target === this) {
      closeNoteDialog();
    }
  });
});
