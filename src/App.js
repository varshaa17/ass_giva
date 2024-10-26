import React from 'react';
import logo from './logo.svg';
import './App.css';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ListProductComponent from './ListProductComponent';  // Changed to ListProductComponent
import HeaderComponent from './HeaderComponent';

import CreateProductComponent from './CreateProductComponent'; // Assuming you have this component
import ViewProductComponent from './ViewProductComponent'; // Assuming you have this component

function App() {
  return (
    <div>
      <Router>
        <HeaderComponent />
        <div className="container">
          <Routes>
            <Route exact path="/" element={<ListProductComponent />} />
      
            <Route exact path="/add-product/:id" element={<CreateProductComponent />} />
            <Route exact path="/view-product/:id" element={<ViewProductComponent />} />
            {/* Add more routes as needed */}
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
