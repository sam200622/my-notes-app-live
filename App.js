import React, { useState, useEffect } from "react";
import "./styles.css";

// Main App component
function App() {
  // State for storing all notes
  const [notes, setNotes] = useState([]);
  // State for storing the new note being created
  const [newNote, setNewNote] = useState({ title: "", message: "" });
  // State for tracking which note is being edited (if any)
  const [editingNote, setEditingNote] = useState(null);

  // Effect hook to load notes from localStorage on component mount
  useEffect(() => {
    const storedNotes = localStorage.getItem("notes");
    if (storedNotes) {
      setNotes(JSON.parse(storedNotes));
    }
  }, []);

  // Handler for submitting a new note
  const handleSubmit = (e) => {
    e.preventDefault();
    if (newNote.title.trim() !== "" && newNote.message.trim() !== "") {
      // Add new note to the beginning of the array
      const newNotes = [newNote, ...notes];
      setNotes(newNotes);
      // Clear the new note input fields
      setNewNote({ title: "", message: "" });
      // Save updated notes to localStorage
      localStorage.setItem("notes", JSON.stringify(newNotes));
    }
  };

  // Handler for initiating note editing
  const handleEdit = (index) => {
    setEditingNote(index);
  };

  // Handler for saving an edited note
  const handleSave = (index) => {
    const updatedNotes = [...notes];
    // Update the note with edited content
    updatedNotes[index].title = document.getElementById(`title-${index}`).value;
    updatedNotes[index].message = document.getElementById(
      `message-${index}`
    ).value;
    setNotes(updatedNotes);
    // Exit editing mode
    setEditingNote(null);
    // Save updated notes to localStorage
    localStorage.setItem("notes", JSON.stringify(updatedNotes));
  };

  // Handler for deleting a note
  const handleDelete = (index) => {
    const updatedNotes = [...notes];
    // Remove the note at the specified index
    updatedNotes.splice(index, 1);
    setNotes(updatedNotes);
    // Save updated notes to localStorage
    localStorage.setItem("notes", JSON.stringify(updatedNotes));
  };

  return (
    <div className="center">
      <h1 className="all_note_heading">All Notes</h1>
      {/* Form for adding a new note */}
      <form onSubmit={handleSubmit}>
        <h2>Add New Note</h2>
        <input
          type="text"
          value={newNote.title}
          onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
          placeholder="Enter note title"
        />
        <textarea
          value={newNote.message}
          onChange={(e) => setNewNote({ ...newNote, message: e.target.value })}
          placeholder="Enter note content"
        />
        <button type="submit">Add Note</button>
      </form>
      {/* List of existing notes */}
      <ul>
        {notes.map((note, index) => (
          <li key={index} className="note">
            {editingNote === index ? (
              // Editing form for a note
              <form>
                <input
                  type="text"
                  id={`title-${index}`}
                  defaultValue={note.title}
                />
                <textarea id={`message-${index}`} defaultValue={note.message} />
                <button onClick={() => handleSave(index)}>Save</button>
              </form>
            ) : (
              // Display mode for a note
              <div>
                <h2 className="note_title">{note.title}</h2>
                <p className="note_message">{note.message}</p>
                <div className="control-buttons">
                  <button onClick={() => handleEdit(index)}>Edit</button>
                  <button onClick={() => handleDelete(index)}>Delete</button>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
