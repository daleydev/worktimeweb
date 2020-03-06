import React from 'react';
import './App.css';
import firebase from './firebase/firebase'
import AppBar from './components/AppBar'
import AuthView from './components/AuthView'

function App() {
  return (
    <div className="App">
      <AppBar></AppBar>

      <AuthView></AuthView>
    </div>
  );
}

export default App;
