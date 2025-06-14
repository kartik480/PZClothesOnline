import React from 'react';
import './ProductsSection.css';
import frameImage from '../assets/pic1.png';
import frameImage2 from '../assets/pic2.png';
import frameImage3 from '../assets/pic3.png';
import figurinesImage from '../assets/m74403848873_1.png';

const ProductsSection = () => {
  return (
    <div className="products-section">
      <div className="products-container">
        <h2 className="section-title">Our Collection</h2>
        <div className="products-grid">
          <div className="photo-frame">
            <div className="frame-content">
              <img 
                src={frameImage} 
                alt="Anime Collection" 
                className="frame-image"
              />
            </div>
          </div>
          <div className="products-content">
            <div className="product-list">
              <div className="product-item">
                <h3>Anime T-Shirts</h3>
                <p>Stylish cotton tees with prints from Naruto, One Piece, Demon Slayer, etc.</p>
              </div>
              <div className="product-item">
                <h3>Hoodies & Sweatshirts</h3>
                <p>Cozy hoodies with your favorite anime characters and logos.</p>
              </div>
              <div className="product-item">
                <h3>Gaming</h3>
                <p>Exclusive gaming merchandise featuring popular game titles and characters.</p>
              </div>
              <div className="product-item">
                <h3>Cosplay Outfits</h3>
                <p>High-quality cosplay sets for conventions and fans.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="section-spacer"></div>

        <h2 className="section-title">Bags & Backpacks</h2>
        <div className="products-grid">
          <div className="photo-frame medium-frame">
            <div className="frame-content">
              <img 
                src={frameImage2} 
                alt="Anime Bags" 
                className="frame-image"
              />
            </div>
          </div>
          <div className="products-content">
            <div className="product-list">
              <div className="product-item">
                <h3>Anime-Themed Backpacks</h3>
                <p>School and travel bags with unique anime prints.</p>
              </div>
              <div className="product-item">
                <h3>Laptops</h3>
                <p>Stylish laptop sleeves and cases featuring your favorite anime designs.</p>
              </div>
              <div className="product-item">
                <h3>Phone Covers Anime</h3>
                <p>Custom anime-themed phone cases for all major smartphone models.</p>
              </div>
            </div>
          </div>
          <div className="photo-frame medium-frame">
            <div className="frame-content">
              <img 
                src={frameImage3} 
                alt="Anime Accessories" 
                className="frame-image"
              />
            </div>
          </div>
        </div>

        {/* Anime Frames Section */}
        <div className="products-section">
          <div className="products-grid">
            <div className="photo-frame">
              <div className="frame-content">
                <img src={figurinesImage} alt="Anime Frames" className="frame-image" />
              </div>
            </div>
            <div className="products-content">
              <h2>Anime Frames</h2>
              <p style={{ color: '#000000' }}>Transform your space with our exclusive collection of anime-themed frames. From elegant wall art prints to dynamic LED light frames, each piece is crafted to bring your favorite anime moments to life. Our premium canvas prints feature iconic scenes and characters, while custom frames allow you to showcase your personal anime style. Perfect for both home and office decor, these frames combine high-quality materials with stunning anime artwork to create a unique and vibrant atmosphere in any room.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsSection; 