import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import ComicBackground from './components/ComicBackground';
import ProductsSection from './components/ProductsSection';
import CategoriesSection from './components/CategoriesSection';
import FloatingAnimeText from './components/FloatingAnimeText';
import Shop from './components/Shop';
import MyList from './components/MyList';
import PageTransition from './components/PageTransition';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        <PageTransition />
        <Navbar />
        <Routes>
          <Route path="/" element={
            <>
              <div className="main-content">
                <div className="center-text-container">
                  <h1 className="main-title">#PzninjaClothes</h1>
                  <h2 className="sub-title">#goRED</h2>
                  <FloatingAnimeText />
                </div>
              </div>
              <ComicBackground />
              <div className="second-page">
                <ProductsSection />
                <CategoriesSection />
              </div>
            </>
          } />
          <Route path="/shop" element={<Shop />} />
          <Route path="/services" element={<MyList />} />
          <Route path="/contact" element={<div className="main-content"><h1>Contact Page</h1></div>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
