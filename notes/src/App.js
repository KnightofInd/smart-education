// src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import NotesSection from './components/NotesSection/NotesSection';
import VideosSection from './components/VideoSection/VideosSection copy';
import StudentView from './components/StudentView/StudentView';
import axios from 'axios';
import './App.css';


function App() {
  const [notes, setNotes] = useState([]);
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    fetchNotes();
    fetchVideos();
  }, []);

  const fetchNotes = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/notes');
      setNotes(response.data);
      console.log('Notes fetched:', response.data);
    } catch (error) {
      console.error('Error fetching notes:', error);
    }
  };

  const fetchVideos = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/videos');
      setVideos(response.data);
      console.log('Videos fetched:', response.data);
    } catch (error) {
      console.error('Error fetching videos:', error);
    }
  };

  const addNote = async (note) => {
    try {
      const response = await axios.post('http://localhost:5000/api/notes', note);
      setNotes([...notes, response.data]);
    } catch (error) {
      console.error('Error adding note:', error);
    }
  };

  const addVideo = async (video) => {
    try {
      const response = await axios.post('http://localhost:5000/api/videos', video);
      setVideos([...videos, response.data]);
    } catch (error) {
      console.error('Error adding video:', error);
    }
  };

  const deleteNote = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/notes/${id}`);
      setNotes(notes.filter(note => note._id !== id));
    } catch (error) {
      console.error('Error deleting note:', error);
    }
  };

  const deleteVideo = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/videos/${id}`);
      setVideos(videos.filter(video => video._id !== id));
    } catch (error) {
      console.error('Error deleting video:', error);
    }
  };

  return (
    <Router>
      <div className="app">
        <nav className="nav-menu">
          <Link to="/" className="nav-link">Teacher Portal</Link>
          <Link to="/student" className="nav-link">Student View</Link>
        </nav>

        <Routes>
          <Route path="/" element={
            <div className="content-grid">
              <NotesSection 
                notes={notes} 
                onAddNote={addNote} 
                onDeleteNote={deleteNote}
              />
              <VideosSection 
                videos={videos} 
                onAddVideo={addVideo} 
                onDeleteVideo={deleteVideo}
              />
            </div>
          } />
          <Route path="/student" element={
            <StudentView notes={notes} videos={videos} />
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;