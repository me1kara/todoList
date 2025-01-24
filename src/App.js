import React, { useState } from 'react';
import Todo from './todo/Todo';
import Header from './layout/Header';
import Login from './login/Login'
import Register from './login/Register'

import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';

function App() {
  return (
    <Router>
      <Header></Header>
      <Routes>
        <Route path="/todo" element={<Todo />}>
        </Route>
        <Route path="/" element={<Login />}>
        </Route>
        <Route path="/register" element={<Register />}>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
