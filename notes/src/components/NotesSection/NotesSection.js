import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './NotesSection.css';

function NotesSection() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/notes');
      setNotes(response.data);
    } catch (error) {
      console.error('Error fetching notes:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (title && content) {
      try {
        const response = await axios.post('http://localhost:5000/api/notes', {
          title,
          content
        });
        setNotes([...notes, response.data]);
        setTitle('');
        setContent('');
        alert('Note saved successfully!');
      } catch (error) {
        console.error('Error saving note:', error);
        alert('Failed to save note. Please try again.');
      }
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/notes/${id}`);
      setNotes(notes.filter(note => note._id !== id));
    } catch (error) {
      console.error('Error deleting note:', error);
    }
  };

  return (
    <div className="notes-section">
      <h2>Upload Notes</h2>
      
      <form onSubmit={handleSubmit} className="notes-form">
        <input
          type="text"
          placeholder="Note Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="input-field"
          required
        />
        <textarea
          placeholder="Note Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="textarea-field"
          required
        />
        <button type="submit" className="submit-button">
          Add Notes
        </button>
      </form>

      <div className="notes-list">
        <h3>Uploaded Notes</h3>
        {notes.map(note => (
          <div key={note._id} className="note-item">
            <div className="note-header">
              <h4>{note.title}</h4>
              <button
                onClick={() => handleDelete(note._id)}
                className="delete-button"
              >
                ✕
              </button>
            </div>
            <p>{note.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default NotesSection;