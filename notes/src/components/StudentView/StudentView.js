// src/components/StudentView/StudentView.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './StudentView.css';

function StudentView() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:5000/api/notes');
      setNotes(response.data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching notes:', err);
      setError('Failed to load notes');
      setLoading(false);
    }
  };

  const filteredNotes = notes.filter(note =>
    note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    note.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="student-view">
        <div className="loading">Loading notes...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="student-view">
        <div className="error">
          <p>{error}</p>
          <button onClick={fetchNotes}>Try Again</button>
        </div>
      </div>
    );
  }

  return (
    <div className="student-view">
      <div className="student-header">
        <h1>Class Notes</h1>
        <div className="search-box">
          <input
            type="text"
            placeholder="Search notes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
      </div>

      <div className="notes-container">
        {filteredNotes.length === 0 ? (
          <div className="no-notes">
            {searchTerm ? 'No matching notes found' : 'No notes available'}
          </div>
        ) : (
          <div className="notes-grid">
            {filteredNotes.map(note => (
              <div key={note._id} className="note-card">
                <h3 className="note-title">{note.title}</h3>
                <p className="note-content">{note.content}</p>
                <div className="note-footer">
                  <span className="note-date">
                    Added: {new Date(note.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default StudentView;