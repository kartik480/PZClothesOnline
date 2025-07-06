import React, { useState, useEffect, useRef } from 'react';
import './Shop.css';
import heading1 from '../assets/heading1.png';
import heading2 from '../assets/heading2.png';
import heading3 from '../assets/heading3.jpg';
import heading4 from '../assets/heading4.jpg';
import b1 from '../assets/b1.jpg';
import b2 from '../assets/b2.jpg';
import b3 from '../assets/b3.jpg';
import b4 from '../assets/b4.jpg';
import solo from '../assets/solo.png';
import cs1 from '../assets/cs1.png';
import cs2 from '../assets/cs2.jpg';
import cs3 from '../assets/cs3.jpg';
import cs4 from '../assets/cs4.jpg';
import dr1 from '../assets/dr1.png';
import dr2 from '../assets/dr2.png';
import dr3 from '../assets/dr3.png';
import dr4 from '../assets/dr4.png';
import download from '../assets/download.png';

const Shop = () => {
  const [expandedCategory, setExpandedCategory] = useState(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  const [cart, setCart] = useState([]);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [selectedSize, setSelectedSize] = useState('M');
  const [selectedDressType, setSelectedDressType] = useState('regular');
  const [selectedShirtType, setSelectedShirtType] = useState('regular');
  const [selectedUnit, setSelectedUnit] = useState('cm');
  const [selectedStyle, setSelectedStyle] = useState('regular');
  const [showTshirtOutline, setShowTshirtOutline] = useState(false);
  const [currentPage, setCurrentPage] = useState('size');
  const [selectedColor, setSelectedColor] = useState('#FFFFFF');
  const [rotationAngle, setRotationAngle] = useState(0);
  const [isRotating, setIsRotating] = useState(false);
  const [autoRotate, setAutoRotate] = useState(false);
  const carouselRef = useRef(null);
  const autoPlayInterval = useRef(null);
  const rotationInterval = useRef(null);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [filterBarVisible, setFilterBarVisible] = useState(true);
  const [selectedFilterDressType, setSelectedFilterDressType] = useState('T-Shirt');

  // Size measurements in inches
  const sizeMeasurements = {
    'S': { shoulder: 16, chest: 38, waist: 34, length: 26 },
    'M': { shoulder: 17, chest: 40, waist: 36, length: 27 },
    'L': { shoulder: 18, chest: 42, waist: 38, length: 28 },
    'XL': { shoulder: 19, chest: 44, waist: 40, length: 29 },
    'XXL': { shoulder: 20, chest: 46, waist: 42, length: 30 },
    'XXXL': { shoulder: 21, chest: 48, waist: 44, length: 31 }
  };

  const dressTypes = [
    { id: 'regular', name: 'Regular Fit', description: 'Classic comfortable fit' },
    { id: 'slim', name: 'Slim Fit', description: 'Modern fitted style' },
    { id: 'oversized', name: 'Oversized', description: 'Relaxed and roomy' },
    { id: 'muscle', name: 'Muscle Fit', description: 'Athletic cut with wider shoulders' }
  ];

  const shirtTypes = [
    { id: 'regular', name: 'Regular Fit', description: 'Classic comfortable fit' },
    { id: 'slim', name: 'Slim Fit', description: 'Modern fitted style' },
    { id: 'oversized', name: 'Oversized', description: 'Relaxed and roomy' },
    { id: 'muscle', name: 'Muscle Fit', description: 'Athletic cut with wider shoulders' },
    { id: 'vneck', name: 'V-Neck', description: 'Classic V-neck style' },
    { id: 'crew', name: 'Crew Neck', description: 'Traditional round neck' }
  ];

  const handleSizeChange = (size) => {
    setSelectedSize(size);
  };

  const handleDressTypeChange = (type) => {
    setSelectedDressType(type);
  };

  const handleShirtTypeChange = (type) => {
    setSelectedShirtType(type);
  };

  // Auto-play functionality
  useEffect(() => {
    if (isAutoPlaying && !selectedSubcategory) {
      autoPlayInterval.current = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % 4);
      }, 5000);
    }

    return () => {
      if (autoPlayInterval.current) {
        clearInterval(autoPlayInterval.current);
      }
    };
  }, [isAutoPlaying, selectedSubcategory]);

  // Cleanup rotation interval on unmount
  useEffect(() => {
    return () => {
      if (rotationInterval.current) {
        clearInterval(rotationInterval.current);
      }
    };
  }, []);

  // Carousel slide transition
  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.style.transform = `translateX(-${currentSlide * 25}%)`;
    }
  }, [currentSlide]);

  // Add scroll event handler
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > lastScrollY) {
        // Scrolling down
        setFilterBarVisible(false);
      } else {
        // Scrolling up
        setFilterBarVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);

  const handleCategoryClick = (category) => {
    if (expandedCategory === category) {
      setExpandedCategory(null);
      setSelectedSubcategory(null);
    } else {
      setExpandedCategory(category);
      setSelectedSubcategory(null);
    }
  };

  const handleSubcategoryClick = (subcategory) => {
    setSelectedSubcategory(subcategory);
    if (subcategory === 'Color') {
      setCurrentPage('color');
      setShowTshirtOutline(true);
    }
  };

  const handleAddToCart = (product) => {
    setCart([...cart, product]);
    // Show a more sophisticated notification
    const notification = document.createElement('div');
    notification.className = 'cart-notification';
    notification.textContent = 'Product added to cart!';
    document.body.appendChild(notification);
    setTimeout(() => {
      notification.remove();
    }, 2000);
  };

  const togglePanel = () => {
    setIsPanelOpen(!isPanelOpen);
  };

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + 4) % 4);
    setIsAutoPlaying(false);
  };

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % 4);
    setIsAutoPlaying(false);
  };

  const handleSlideClick = (index) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
  };

  const handleSearch = () => {
    // Implementation of search functionality
  };

  const handleReset = () => {
    // Implementation of reset functionality
  };

  const handleSubmit = () => {
    // Set the style based on selected dress type
    switch (selectedDressType) {
      case 'regular':
        setSelectedStyle('regular');
        break;
      case 'slim':
        setSelectedStyle('slim');
        break;
      case 'oversized':
        setSelectedStyle('oversized');
        break;
      case 'muscle':
        setSelectedStyle('muscle');
        break;
      default:
        setSelectedStyle('regular');
    }
    setShowTshirtOutline(true);
    setCurrentPage('color');
    setSelectedSubcategory('Color');
  };

  const handleColorSelect = (color) => {
    setSelectedColor(color);
  };

  const handleFilterDressTypeChange = (dressType) => {
    setSelectedFilterDressType(dressType);
  };

  // 360-degree view functions
  const startRotation = () => {
    setIsRotating(true);
    setAutoRotate(true);
    rotationInterval.current = setInterval(() => {
      setRotationAngle(prev => (prev + 2) % 360);
    }, 50);
  };

  const stopRotation = () => {
    setIsRotating(false);
    setAutoRotate(false);
    if (rotationInterval.current) {
      clearInterval(rotationInterval.current);
    }
  };

  const handleRotationChange = (e) => {
    const newAngle = parseInt(e.target.value);
    setRotationAngle(newAngle);
  };

  const resetRotation = () => {
    setRotationAngle(0);
    stopRotation();
  };

  const renderProductGrid = () => {
    if (selectedSubcategory === 'Men\'s Sleeveless T-Shirt') {
      return (
        <div className="product-grid">
          {[...Array(12)].map((_, index) => (
            <div key={index} className="product-card">
              <div className="product-image">
                <img 
                  src={`https://source.unsplash.com/300x400?anime,tshirt,${index}`} 
                  alt={`Anime T-Shirt ${index + 1}`}
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/300x400?text=Anime+T-Shirt';
                  }}
                />
              </div>
              <div className="product-info">
                <h3>Anime T-Shirt {index + 1}</h3>
                <p className="price">$29.99</p>
                <button 
                  className="add-to-cart-btn"
                  onClick={() => handleAddToCart({ id: index, name: `Anime T-Shirt ${index + 1}`, price: 29.99 })}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      );
    }
    if (selectedSubcategory === 'Pzn') {
      return (
        <div className="product-grid">
          {[...Array(12)].map((_, index) => (
            <div key={index} className="product-card">
              <div className="product-image">
                <img 
                  src={`https://source.unsplash.com/300x400?pzn,tshirt,${index}`} 
                  alt={`Pzn T-Shirt ${index + 1}`}
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/300x400?text=Pzn+T-Shirt';
                  }}
                />
              </div>
              <div className="product-info">
                <h3>Pzn T-Shirt {index + 1}</h3>
                <p className="price">$29.99</p>
                <button 
                  className="add-to-cart-btn"
                  onClick={() => handleAddToCart({ id: index, name: `Pzn T-Shirt ${index + 1}`, price: 29.99 })}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      );
    }
    if (selectedSubcategory === 'Cartoons') {
      return (
        <div className="product-grid">
          {[...Array(12)].map((_, index) => (
            <div key={index} className="product-card">
              <div className="product-image">
                <img 
                  src={`https://source.unsplash.com/300x400?cartoon,tshirt,${index}`} 
                  alt={`Cartoon T-Shirt ${index + 1}`}
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/300x400?text=Cartoon+T-Shirt';
                  }}
                />
              </div>
              <div className="product-info">
                <h3>Cartoon T-Shirt {index + 1}</h3>
                <p className="price">$29.99</p>
                <button 
                  className="add-to-cart-btn"
                  onClick={() => handleAddToCart({ id: index, name: `Cartoon T-Shirt ${index + 1}`, price: 29.99 })}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      );
    }
    if (selectedSubcategory === 'Graphic Tees') {
      return (
        <div className="product-grid">
          {[...Array(12)].map((_, index) => (
            <div key={index} className="product-card">
              <div className="product-image">
                <img 
                  src={`https://source.unsplash.com/300x400?tshirt,graphic,${index}`} 
                  alt={`Graphic Tee ${index + 1}`}
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/300x400?text=Graphic+Tee';
                  }}
                />
              </div>
              <div className="product-info">
                <h3>Graphic Tee {index + 1}</h3>
                <p className="price">$29.99</p>
                <button 
                  className="add-to-cart-btn"
                  onClick={() => handleAddToCart({ id: index, name: `Graphic Tee ${index + 1}`, price: 29.99 })}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      );
    }
    if (selectedSubcategory === 'Sized') {
      const currentMeasurements = selectedSize ? sizeMeasurements[selectedSize] : sizeMeasurements['M'];
      
      return (
        <div className="size-calculator-section">
          <div className="size-calculator-container">
            <div className="size-calculator-header">
              <h2>Customize Your {selectedFilterDressType}</h2>
              <p>Select your preferred style and size</p>
            </div>
            
            <div className="size-calculator-content">
              <div className="style-selection-section">
                <h3>Step 1: Choose Your Style</h3>
                <div className="dress-types-grid">
                  <div 
                    className={`dress-type-card ${selectedDressType === 'regular' ? 'selected' : ''}`}
                    onClick={() => setSelectedDressType('regular')}
                  >
                    <div className={`dress-outline ${selectedFilterDressType === 'Hoodie' ? 'hoodie-regular' : 'regular'}`}>
                      {selectedFilterDressType === 'Hoodie' && <div className="hood"></div>}
                    </div>
                    <h4>Regular Fit</h4>
                    <p>Classic comfortable fit</p>
                  </div>
                  <div 
                    className={`dress-type-card ${selectedDressType === 'slim' ? 'selected' : ''}`}
                    onClick={() => setSelectedDressType('slim')}
                  >
                    <div className={`dress-outline ${selectedFilterDressType === 'Hoodie' ? 'hoodie-slim' : 'slim'}`}>
                      {selectedFilterDressType === 'Hoodie' && <div className="hood"></div>}
                    </div>
                    <h4>Slim Fit</h4>
                    <p>Modern fitted style</p>
                  </div>
                  <div 
                    className={`dress-type-card ${selectedDressType === 'oversized' ? 'selected' : ''}`}
                    onClick={() => setSelectedDressType('oversized')}
                  >
                    <div className={`dress-outline ${selectedFilterDressType === 'Hoodie' ? 'hoodie-oversized' : 'oversized'}`}>
                      {selectedFilterDressType === 'Hoodie' && <div className="hood"></div>}
                    </div>
                    <h4>Oversized</h4>
                    <p>Relaxed and roomy</p>
                  </div>
                  <div 
                    className={`dress-type-card ${selectedDressType === 'muscle' ? 'selected' : ''}`}
                    onClick={() => setSelectedDressType('muscle')}
                  >
                    <div className={`dress-outline ${selectedFilterDressType === 'Hoodie' ? 'hoodie-muscle' : 'muscle'}`}>
                      {selectedFilterDressType === 'Hoodie' && <div className="hood"></div>}
                    </div>
                    <h4>Muscle Fit</h4>
                    <p>Athletic cut with wider shoulders</p>
                  </div>
                </div>
              </div>

              <div className="size-selection-section">
                <h3>Step 2: Select Your Size</h3>
                <div className="calculator-container">
                  <div className="unit-selector">
                    <button 
                      className={selectedUnit === 'cm' ? 'active' : ''} 
                      onClick={() => setSelectedUnit('cm')}
                    >
                      Centimeters
                    </button>
                    <button 
                      className={selectedUnit === 'inches' ? 'active' : ''} 
                      onClick={() => setSelectedUnit('inches')}
                    >
                      Inches
                    </button>
                  </div>
                  
                  <div className="measurements-grid">
                    <div className="measurement-item">
                      <span>Shoulder:</span>
                      <div className="measurement-values">
                        <span>
                          {selectedUnit === 'cm' 
                            ? `${currentMeasurements.shoulder} cm`
                            : `${(currentMeasurements.shoulder / 2.54).toFixed(1)}"`
                          }
                        </span>
                      </div>
                    </div>
                    <div className="measurement-item">
                      <span>Chest:</span>
                      <div className="measurement-values">
                        <span>
                          {selectedUnit === 'cm' 
                            ? `${currentMeasurements.chest} cm`
                            : `${(currentMeasurements.chest / 2.54).toFixed(1)}"`
                          }
                        </span>
                      </div>
                    </div>
                    <div className="measurement-item">
                      <span>Waist:</span>
                      <div className="measurement-values">
                        <span>
                          {selectedUnit === 'cm' 
                            ? `${currentMeasurements.waist} cm`
                            : `${(currentMeasurements.waist / 2.54).toFixed(1)}"`
                          }
                        </span>
                      </div>
                    </div>
                    <div className="measurement-item">
                      <span>Length:</span>
                      <div className="measurement-values">
                        <span>
                          {selectedUnit === 'cm' 
                            ? `${currentMeasurements.length} cm`
                            : `${(currentMeasurements.length / 2.54).toFixed(1)}"`
                          }
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="size-options">
                    <button 
                      className={`size-option ${selectedSize === 'S' ? 'active' : ''}`}
                      onClick={() => setSelectedSize('S')}
                    >
                      S
                    </button>
                    <button 
                      className={`size-option ${selectedSize === 'M' ? 'active' : ''}`}
                      onClick={() => setSelectedSize('M')}
                    >
                      M
                    </button>
                    <button 
                      className={`size-option ${selectedSize === 'L' ? 'active' : ''}`}
                      onClick={() => setSelectedSize('L')}
                    >
                      L
                    </button>
                    <button 
                      className={`size-option ${selectedSize === 'XL' ? 'active' : ''}`}
                      onClick={() => setSelectedSize('XL')}
                    >
                      XL
                    </button>
                    <button 
                      className={`size-option ${selectedSize === 'XXL' ? 'active' : ''}`}
                      onClick={() => setSelectedSize('XXL')}
                    >
                      XXL
                    </button>
                    <button 
                      className={`size-option ${selectedSize === 'XXXL' ? 'active' : ''}`}
                      onClick={() => setSelectedSize('XXXL')}
                    >
                      XXXL
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="size-calculator-footer">
              <button className="submit-button" onClick={handleSubmit}>
                Continue to Color Selection
              </button>
            </div>
          </div>
        </div>
      );
    }
    if (selectedSubcategory === 'Color' && currentPage === 'color') {
      return (
        <div className="color-section">
          <h2>Select Color</h2>
          
          {!selectedStyle && (
            <div className="style-selection-message">
              <p>Please select your T-shirt style first before choosing a color.</p>
              <button 
                className="go-back-button"
                onClick={() => {
                  setCurrentPage('size');
                  setSelectedSubcategory('Size Calculator');
                }}
              >
                Go to Style Selection
              </button>
            </div>
          )}
          
          {selectedStyle && (
            <div className="color-page-content">
              {/* 360-Degree View Diagram Box */}
              <div className="view-360-container">
                <h3>360° View - {selectedFilterDressType} ({selectedStyle} fit)</h3>
                <div className="view-360-diagram-box">
                  <div className="view-360-controls">
                    <button 
                      className={`rotation-btn ${autoRotate ? 'active' : ''}`}
                      onClick={autoRotate ? stopRotation : startRotation}
                    >
                      {autoRotate ? '⏸️ Stop' : '▶️ Auto Rotate'}
                    </button>
                    <button className="rotation-btn" onClick={resetRotation}>
                      🔄 Reset
                    </button>
                    <div className="rotation-slider-container">
                      <label>Manual Rotation: {rotationAngle}°</label>
                      <input
                        type="range"
                        min="0"
                        max="360"
                        value={rotationAngle}
                        onChange={handleRotationChange}
                        className="rotation-slider"
                      />
                    </div>
                  </div>
                  
                  <div className="view-360-display">
                    <div 
                      className="view-360-item"
                      style={{
                        transform: `rotateY(${rotationAngle}deg)`,
                        backgroundColor: selectedColor,
                        borderColor: selectedColor === '#FFFFFF' ? '#333' : selectedColor
                      }}
                    >
                      <div 
                        className={`outline-dress-360 ${selectedFilterDressType === 'Hoodie' ? `hoodie-${selectedStyle}` : selectedStyle}`}
                      >
                        {selectedFilterDressType === 'Hoodie' && <div className="hood-360"></div>}
                      </div>
                    </div>
                  </div>
                  
                  <div className="view-360-info">
                    <p><strong>Style:</strong> {selectedStyle} fit</p>
                    <p><strong>Size:</strong> {selectedSize}</p>
                    <p><strong>Color:</strong> {selectedColor}</p>
                  </div>
                </div>
              </div>

              {/* Color Selection */}
              <div className="color-selection-section">
                <h3>Choose Your Color</h3>
                <div className="color-list-box">
                  <div className="list-item">Classic Black</div>
                  <div className="list-item">Pure White</div>
                  <div className="list-item">Navy Blue</div>
                  <div className="list-item">Burgundy Red</div>
                  <div className="list-item">Forest Green</div>
                  <div className="list-item">Royal Purple</div>
                  <div className="list-item">Sunset Orange</div>
                  <div className="list-item">Sky Blue</div>
                  <div className="list-item">Charcoal Gray</div>
                  <div className="list-item">Crimson Red</div>
                  <div className="list-item">Emerald Green</div>
                  <div className="list-item">Deep Teal</div>
                </div>
                
                <div className="color-options">
                  <div 
                    className={`color-box ${selectedColor === '#000000' ? 'selected' : ''}`} 
                    style={{ backgroundColor: '#000000' }}
                    onClick={() => handleColorSelect('#000000')}
                  ></div>
                  <div 
                    className={`color-box ${selectedColor === '#FFFFFF' ? 'selected' : ''}`} 
                    style={{ backgroundColor: '#FFFFFF', border: '1px solid #ddd' }}
                    onClick={() => handleColorSelect('#FFFFFF')}
                  ></div>
                  <div 
                    className={`color-box ${selectedColor === '#FF0000' ? 'selected' : ''}`} 
                    style={{ backgroundColor: '#FF0000' }}
                    onClick={() => handleColorSelect('#FF0000')}
                  ></div>
                  <div 
                    className={`color-box ${selectedColor === '#0000FF' ? 'selected' : ''}`} 
                    style={{ backgroundColor: '#0000FF' }}
                    onClick={() => handleColorSelect('#0000FF')}
                  ></div>
                  <div 
                    className={`color-box ${selectedColor === '#008000' ? 'selected' : ''}`} 
                    style={{ backgroundColor: '#008000' }}
                    onClick={() => handleColorSelect('#008000')}
                  ></div>
                  <div 
                    className={`color-box ${selectedColor === '#FFA500' ? 'selected' : ''}`} 
                    style={{ backgroundColor: '#FFA500' }}
                    onClick={() => handleColorSelect('#FFA500')}
                  ></div>
                  <div 
                    className={`color-box ${selectedColor === '#800080' ? 'selected' : ''}`} 
                    style={{ backgroundColor: '#800080' }}
                    onClick={() => handleColorSelect('#800080')}
                  ></div>
                  <div 
                    className={`color-box ${selectedColor === '#FFC0CB' ? 'selected' : ''}`} 
                    style={{ backgroundColor: '#FFC0CB' }}
                    onClick={() => handleColorSelect('#FFC0CB')}
                  ></div>
                  <div 
                    className={`color-box ${selectedColor === '#A52A2A' ? 'selected' : ''}`} 
                    style={{ backgroundColor: '#A52A2A' }}
                    onClick={() => handleColorSelect('#A52A2A')}
                  ></div>
                  <div 
                    className={`color-box ${selectedColor === '#808080' ? 'selected' : ''}`} 
                    style={{ backgroundColor: '#808080' }}
                    onClick={() => handleColorSelect('#808080')}
                  ></div>
                  <div 
                    className={`color-box ${selectedColor === '#FFD700' ? 'selected' : ''}`} 
                    style={{ backgroundColor: '#FFD700' }}
                    onClick={() => handleColorSelect('#FFD700')}
                  ></div>
                  <div 
                    className={`color-box ${selectedColor === '#00FFFF' ? 'selected' : ''}`} 
                    style={{ backgroundColor: '#00FFFF' }}
                    onClick={() => handleColorSelect('#00FFFF')}
                  ></div>
                  <div 
                    className={`color-box ${selectedColor === '#FF00FF' ? 'selected' : ''}`} 
                    style={{ backgroundColor: '#FF00FF' }}
                    onClick={() => handleColorSelect('#FF00FF')}
                  ></div>
                  <div 
                    className={`color-box ${selectedColor === '#4B0082' ? 'selected' : ''}`} 
                    style={{ backgroundColor: '#4B0082' }}
                    onClick={() => handleColorSelect('#4B0082')}
                  ></div>
                  <div 
                    className={`color-box ${selectedColor === '#FF4500' ? 'selected' : ''}`} 
                    style={{ backgroundColor: '#FF4500' }}
                    onClick={() => handleColorSelect('#FF4500')}
                  ></div>
                </div>
              </div>

              {/* Drag and Drop Section */}
              <div className="drag-drop-section">
                <h3>Drag and Drop</h3>
                <div className="drag-drop-boxes">
                  <div className="drag-box"></div>
                  <div className="drag-box"></div>
                  <div className="drag-box"></div>
                  <div className="drag-box"></div>
                  <div className="drag-box"></div>
                  <div className="drag-box"></div>
                  <div className="drag-box"></div>
                  <div className="drag-box"></div>
                  <div className="drag-box"></div>
                  <div className="drag-box"></div>
                  <div className="drag-box"></div>
                  <div className="drag-box"></div>
                </div>
              </div>
            </div>
          )}
        </div>
      );
    }
    return null;
  };

  const renderCarousel = () => {
    if (!selectedSubcategory) {
      return (
        <div className="carousel-container">
          <div className="carousel">
            <div className="carousel-track" ref={carouselRef}>
              <div className="carousel-slide">
                <img 
                  src={heading1}
                  alt="Summer Wear"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/800x400?text=Summer+Wear';
                  }}
                />
                <div className="carousel-content">
                  <h2>Summer Wear</h2>
                  <p>Discover our latest summer collection</p>
                  <button className="shop-now-btn">Shop Now</button>
                </div>
              </div>
              <div className="carousel-slide">
                <img 
                  src={heading2}
                  alt="Anime Collection"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/800x400?text=Anime+Collection';
                  }}
                />
                <div className="carousel-content">
                  <h2>Anime</h2>
                  <p>Explore our exclusive anime merchandise</p>
                  <button className="shop-now-btn">Shop Now</button>
                </div>
              </div>
              <div className="carousel-slide">
                <img 
                  src={heading3}
                  alt="Games Collection"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/800x400?text=Games+Collection';
                  }}
                />
                <div className="carousel-content">
                  <h2>Games</h2>
                  <p>Check out our gaming collection</p>
                  <button className="shop-now-btn">Shop Now</button>
                </div>
              </div>
              <div className="carousel-slide">
                <img 
                  src={heading4}
                  alt="PZN Brands"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/800x400?text=PZN+Brands';
                  }}
                />
                <div className="carousel-content">
                  <h2>#PZN Brands</h2>
                  <p>Discover our exclusive brand collections</p>
                  <button className="shop-now-btn-alt">Shop Now</button>
                </div>
              </div>
            </div>
            <button className="carousel-btn prev" onClick={handlePrevSlide}>❮</button>
            <button className="carousel-btn next" onClick={handleNextSlide}>❯</button>
            <div className="carousel-indicators">
              {[...Array(4)].map((_, index) => (
                <button
                  key={index}
                  className={`indicator ${currentSlide === index ? 'active' : ''}`}
                  onClick={() => handleSlideClick(index)}
                />
              ))}
            </div>
          </div>
        </div>
      );
    }
    return null;
  };

  const renderComingSoon = () => {
    if (!selectedSubcategory) {
      return (
        <div className="coming-soon-section">
          <h2 className="coming-soon-title">Coming Soon</h2>
          <div className="coming-soon-grid">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="coming-soon-card">
                <div className="coming-soon-image">
                  <img 
                    src={index === 0 ? dr1 : index === 1 ? dr2 : index === 2 ? dr3 : dr4}
                    alt={`Upcoming Design ${index + 1}`}
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/400x500?text=Coming+Soon';
                    }}
                  />
                  <div className="coming-soon-overlay">
                    <span>Coming Soon</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }
    return null;
  };

  const renderCategories = () => {
    if (!selectedSubcategory) {
      return (
        <div className="categories-section">
          <div className="section-header">
            <h2>#PZN Brands</h2>
            <p>Discover our exclusive brand collections</p>
          </div>
          <div className="categories-grid">
            {[
              { title: 'T-Shirts', image: 'tshirt', description: 'Explore our t-shirt collection' },
              { title: 'Hoodies', image: 'hoodie', description: 'Check out our cozy hoodies' },
              { title: 'Oversized', image: 'oversized', description: 'Discover oversized fashion' },
              { title: 'Summer Wear', image: 'summer', description: 'Summer collection' }
            ].map((category, index) => (
              <div key={index} className="category-card">
                <div className="category-image">
                  <img 
                    src={`https://source.unsplash.com/400x500?${category.image},fashion`}
                    alt={category.title}
                    onError={(e) => {
                      e.target.src = `https://via.placeholder.com/400x500?text=${category.title}`;
                    }}
                  />
                  <div className="category-overlay">
                    <h3>{category.title}</h3>
                    <p>{category.description}</p>
                    <button 
                      className="explore-btn"
                      onClick={() => {
                        setExpandedCategory(category.title.toLowerCase().replace(' ', ''));
                        setSelectedSubcategory('');
                      }}
                    >
                      Explore
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }
    return null;
  };

  const renderBrands = () => {
    if (!selectedSubcategory) {
      return (
        <div className="brands-section">
          <h2 className="brands-title">Men's Sleeveless T-Shirt</h2>
          <div className="brands-grid">
            {[
              { name: 'Classic Sleeveless', image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=400&h=500&fit=crop', description: 'Timeless comfort and style' },
              { name: 'Athletic Fit', image: 'https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=400&h=500&fit=crop', description: 'Perfect for workouts and sports' },
              { name: 'Fashion Forward', image: 'https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=400&h=500&fit=crop', description: 'Trendy and modern design' },
              { name: 'Premium Collection', image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=500&fit=crop', description: 'High-quality materials and craftsmanship' }
            ].map((item, index) => (
              <div key={index} className="brand-card photoframe-card">
                <div className="brand-image photoframe-image">
                  <img 
                    src={item.image}
                    alt={item.name}
                    onError={(e) => {
                      e.target.src = `https://via.placeholder.com/400x500?text=${item.name}`;
                    }}
                  />
                  <div className="photoframe-border"></div>
                  <div className="brand-overlay">
                    <h3>{item.name}</h3>
                    <p>{item.description}</p>
                    <button 
                      className="view-collection-btn"
                      onClick={() => {
                        setExpandedCategory('brands');
                        setSelectedSubcategory(item.name);
                      }}
                    >
                      View Collection
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }
    return null;
  };

  const renderJoggers = () => {
    if (!selectedSubcategory) {
      return (
        <div className="brands-section">
          <h2 className="brands-title">Joggers</h2>
          <div className="brands-grid">
            {[
              { name: 'Classic Joggers', image: 'https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=400&h=500&fit=crop', description: 'Comfortable and stylish everyday wear' },
              { name: 'Athletic Joggers', image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&h=500&fit=crop', description: 'Perfect for workouts and training' },
              { name: 'Fashion Joggers', image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=400&h=500&fit=crop', description: 'Trendy design for street style' },
              { name: 'Premium Joggers', image: 'https://images.unsplash.com/photo-1506629904890-49c2e2c0c0e8?w=400&h=500&fit=crop', description: 'High-quality materials for ultimate comfort' }
            ].map((item, index) => (
              <div key={index} className="brand-card photoframe-card">
                <div className="brand-image photoframe-image">
                  <img 
                    src={item.image}
                    alt={item.name}
                    onError={(e) => {
                      e.target.src = `https://via.placeholder.com/400x500?text=${item.name}`;
                    }}
                  />
                  <div className="photoframe-border"></div>
                  <div className="brand-overlay">
                    <h3>{item.name}</h3>
                    <p>{item.description}</p>
                    <button 
                      className="view-collection-btn"
                      onClick={() => {
                        setExpandedCategory('brands');
                        setSelectedSubcategory(item.name);
                      }}
                    >
                      View Collection
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }
    return null;
  };

  const renderShirts = () => {
    if (!selectedSubcategory) {
      return (
        <div className="brands-section">
          <h2 className="brands-title">Shirts</h2>
          <div className="brands-grid">
            {[
              { name: 'Classic Shirts', image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=500&fit=crop', description: 'Timeless elegance and comfort' },
              { name: 'Casual Shirts', image: 'https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=400&h=500&fit=crop', description: 'Relaxed fit for everyday style' },
              { name: 'Formal Shirts', image: 'https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=400&h=500&fit=crop', description: 'Professional look for any occasion' },
              { name: 'Designer Shirts', image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=400&h=500&fit=crop', description: 'Premium quality with unique designs' }
            ].map((item, index) => (
              <div key={index} className="brand-card photoframe-card">
                <div className="brand-image photoframe-image">
                  <img 
                    src={item.image}
                    alt={item.name}
                    onError={(e) => {
                      e.target.src = `https://via.placeholder.com/400x500?text=${item.name}`;
                    }}
                  />
                  <div className="photoframe-border"></div>
                  <div className="brand-overlay">
                    <h3>{item.name}</h3>
                    <p>{item.description}</p>
                    <button 
                      className="view-collection-btn"
                      onClick={() => {
                        setExpandedCategory('brands');
                        setSelectedSubcategory(item.name);
                      }}
                    >
                      View Collection
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    }
    return null;
  };

  const renderPanel = () => {
    return (
      <div className={`panel ${isPanelOpen ? 'open' : ''}`}>
        <div className="panel-section">
          <h3>Men's Sleeveless T-Shirt</h3>
          <div className="panel-grid">
            {[
              { name: 'Classic Sleeveless', image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=300&h=300&fit=crop' },
              { name: 'Athletic Fit', image: 'https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=300&h=300&fit=crop' },
              { name: 'Fashion Forward', image: 'https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=300&h=300&fit=crop' },
              { name: 'Premium Collection', image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&h=300&fit=crop' }
            ].map((item, index) => (
              <div key={index} className="panel-item photoframe-panel">
                <div className="photoframe-container">
                  <img src={item.image} alt={item.name} />
                  <div className="photoframe-border-panel"></div>
                </div>
                <span>{item.name}</span>
              </div>
            ))}
          </div>
        </div>
        {/* ... rest of the panel sections ... */}
      </div>
    );
  };

  return (
    <div className="shop-container">
      <div className="top-navbar">
        {/* ... existing navbar content ... */}
      </div>

      {selectedSubcategory === 'Sized' && (
        <div className={`filter-bar ${filterBarVisible ? 'show' : 'hide'}`}>
          <div className="filter-group">
            <label>Gender:</label>
            <div className="filter-options">
              <button className="filter-btn active">Male</button>
              <button className="filter-btn">Female</button>
            </div>
          </div>
          <div className="filter-group">
            <label>Dress Type:</label>
            <div className="filter-options">
              <button 
                className={`filter-btn ${selectedFilterDressType === 'T-Shirt' ? 'active' : ''}`}
                onClick={() => handleFilterDressTypeChange('T-Shirt')}
              >
                T-Shirt
              </button>
              <button 
                className={`filter-btn ${selectedFilterDressType === 'Hoodie' ? 'active' : ''}`}
                onClick={() => handleFilterDressTypeChange('Hoodie')}
              >
                Hoodie
              </button>
            </div>
          </div>
        </div>
      )}

      {selectedSubcategory === 'Size Calculator' && currentPage === 'size' && (
        <div className="size-calculator-section">
          <div className="size-calculator-container">
            <div className="size-calculator-header">
              <h2>Customize Your {selectedFilterDressType}</h2>
              <p>Select your preferred style and size</p>
            </div>
            
            <div className="size-calculator-content">
              <div className="style-selection-section">
                <h3>Step 1: Choose Your Style</h3>
                <div className="dress-types-grid">
                  <div 
                    className={`dress-type-card ${selectedDressType === 'regular' ? 'selected' : ''}`}
                    onClick={() => setSelectedDressType('regular')}
                  >
                    <div className={`dress-outline ${selectedFilterDressType === 'Hoodie' ? 'hoodie-regular' : 'regular'}`}>
                      {selectedFilterDressType === 'Hoodie' && <div className="hood"></div>}
                    </div>
                    <h4>Regular Fit</h4>
                    <p>Classic comfortable fit</p>
                  </div>
                  <div 
                    className={`dress-type-card ${selectedDressType === 'slim' ? 'selected' : ''}`}
                    onClick={() => setSelectedDressType('slim')}
                  >
                    <div className={`dress-outline ${selectedFilterDressType === 'Hoodie' ? 'hoodie-slim' : 'slim'}`}>
                      {selectedFilterDressType === 'Hoodie' && <div className="hood"></div>}
                    </div>
                    <h4>Slim Fit</h4>
                    <p>Modern fitted style</p>
                  </div>
                  <div 
                    className={`dress-type-card ${selectedDressType === 'oversized' ? 'selected' : ''}`}
                    onClick={() => setSelectedDressType('oversized')}
                  >
                    <div className={`dress-outline ${selectedFilterDressType === 'Hoodie' ? 'hoodie-oversized' : 'oversized'}`}>
                      {selectedFilterDressType === 'Hoodie' && <div className="hood"></div>}
                    </div>
                    <h4>Oversized</h4>
                    <p>Relaxed and roomy</p>
                  </div>
                  <div 
                    className={`dress-type-card ${selectedDressType === 'muscle' ? 'selected' : ''}`}
                    onClick={() => setSelectedDressType('muscle')}
                  >
                    <div className={`dress-outline ${selectedFilterDressType === 'Hoodie' ? 'hoodie-muscle' : 'muscle'}`}>
                      {selectedFilterDressType === 'Hoodie' && <div className="hood"></div>}
                    </div>
                    <h4>Muscle Fit</h4>
                    <p>Athletic cut with wider shoulders</p>
                  </div>
                </div>
              </div>

              <div className="size-selection-section">
                <h3>Step 2: Select Your Size</h3>
                <div className="calculator-container">
                  <div className="unit-selector">
                    <button 
                      className={selectedUnit === 'cm' ? 'active' : ''} 
                      onClick={() => setSelectedUnit('cm')}
                    >
                      Centimeters
                    </button>
                    <button 
                      className={selectedUnit === 'inches' ? 'active' : ''} 
                      onClick={() => setSelectedUnit('inches')}
                    >
                      Inches
                    </button>
                  </div>
                  
                  <div className="measurements-grid">
                    <div className="measurement-item">
                      <span>Shoulder:</span>
                      <div className="measurement-values">
                        <span>
                          {selectedUnit === 'cm' 
                            ? `${sizeMeasurements[selectedSize].shoulder} cm`
                            : `${(sizeMeasurements[selectedSize].shoulder / 2.54).toFixed(1)}"`
                          }
                        </span>
                      </div>
                    </div>
                    <div className="measurement-item">
                      <span>Chest:</span>
                      <div className="measurement-values">
                        <span>
                          {selectedUnit === 'cm' 
                            ? `${sizeMeasurements[selectedSize].chest} cm`
                            : `${(sizeMeasurements[selectedSize].chest / 2.54).toFixed(1)}"`
                          }
                        </span>
                      </div>
                    </div>
                    <div className="measurement-item">
                      <span>Waist:</span>
                      <div className="measurement-values">
                        <span>
                          {selectedUnit === 'cm' 
                            ? `${sizeMeasurements[selectedSize].waist} cm`
                            : `${(sizeMeasurements[selectedSize].waist / 2.54).toFixed(1)}"`
                          }
                        </span>
                      </div>
                    </div>
                    <div className="measurement-item">
                      <span>Length:</span>
                      <div className="measurement-values">
                        <span>
                          {selectedUnit === 'cm' 
                            ? `${sizeMeasurements[selectedSize].length} cm`
                            : `${(sizeMeasurements[selectedSize].length / 2.54).toFixed(1)}"`
                          }
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="size-options">
                    <button 
                      className={`size-option ${selectedSize === 'S' ? 'active' : ''}`}
                      onClick={() => setSelectedSize('S')}
                    >
                      S
                    </button>
                    <button 
                      className={`size-option ${selectedSize === 'M' ? 'active' : ''}`}
                      onClick={() => setSelectedSize('M')}
                    >
                      M
                    </button>
                    <button 
                      className={`size-option ${selectedSize === 'L' ? 'active' : ''}`}
                      onClick={() => setSelectedSize('L')}
                    >
                      L
                    </button>
                    <button 
                      className={`size-option ${selectedSize === 'XL' ? 'active' : ''}`}
                      onClick={() => setSelectedSize('XL')}
                    >
                      XL
                    </button>
                    <button 
                      className={`size-option ${selectedSize === 'XXL' ? 'active' : ''}`}
                      onClick={() => setSelectedSize('XXL')}
                    >
                      XXL
                    </button>
                    <button 
                      className={`size-option ${selectedSize === 'XXXL' ? 'active' : ''}`}
                      onClick={() => setSelectedSize('XXXL')}
                    >
                      XXXL
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="size-calculator-footer">
              <button className="submit-button" onClick={handleSubmit}>
                Continue to Color Selection
              </button>
            </div>
          </div>
        </div>
      )}

      <button className="panel-toggle" onClick={togglePanel}>
        <span className={`hamburger ${isPanelOpen ? 'open' : ''}`}></span>
      </button>

      <div className={`shop-sidebar ${isPanelOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <h2>Categories</h2>
          <div className="header-decoration"></div>
        </div>
        <div className="category-list">
          <button 
            className={`category-btn ${expandedCategory === 'tshirts' ? 'active' : ''}`}
            onClick={() => handleCategoryClick('tshirts')}
          >
            T-Shirts
            <span className="dot-indicator"></span>
          </button>
          <div className={`subcategory-list ${expandedCategory === 'tshirts' ? 'expanded' : ''}`}>
            <button 
              className={`subcategory-btn ${selectedSubcategory === 'Men\'s Sleeveless T-Shirt' ? 'active' : ''}`}
              onClick={() => handleSubcategoryClick('Men\'s Sleeveless T-Shirt')}
            >
              Animes
            </button>
            <button 
              className={`subcategory-btn ${selectedSubcategory === 'Pzn' ? 'active' : ''}`}
              onClick={() => handleSubcategoryClick('Pzn')}
            >
              Pzn
            </button>
            <button 
              className={`subcategory-btn ${selectedSubcategory === 'Cartoons' ? 'active' : ''}`}
              onClick={() => handleSubcategoryClick('Cartoons')}
            >
              Cartoons
            </button>
          </div>

          <button 
            className={`category-btn ${expandedCategory === 'hoodies' ? 'active' : ''}`}
            onClick={() => handleCategoryClick('hoodies')}
          >
            Hoodies
            <span className="dot-indicator"></span>
          </button>
          <div className={`subcategory-list ${expandedCategory === 'hoodies' ? 'expanded' : ''}`}>
            <button 
              className={`subcategory-btn ${selectedSubcategory === 'Pullover' ? 'active' : ''}`}
              onClick={() => handleSubcategoryClick('Pullover')}
            >
              Pullover
            </button>
            <button 
              className={`subcategory-btn ${selectedSubcategory === 'Zip-Up' ? 'active' : ''}`}
              onClick={() => handleSubcategoryClick('Zip-Up')}
            >
              Zip-Up
            </button>
          </div>

          <button 
            className={`category-btn ${expandedCategory === 'oversized' ? 'active' : ''}`}
            onClick={() => handleCategoryClick('oversized')}
          >
            Oversized
            <span className="dot-indicator"></span>
          </button>
          <div className={`subcategory-list ${expandedCategory === 'oversized' ? 'expanded' : ''}`}>
            <button 
              className={`subcategory-btn ${selectedSubcategory === 'T-Shirts' ? 'active' : ''}`}
              onClick={() => handleSubcategoryClick('T-Shirts')}
            >
              T-Shirts
            </button>
            <button 
              className={`subcategory-btn ${selectedSubcategory === 'Hoodies' ? 'active' : ''}`}
              onClick={() => handleSubcategoryClick('Hoodies')}
            >
              Hoodies
            </button>
          </div>

          <button 
            className={`category-btn ${expandedCategory === 'summer' ? 'active' : ''}`}
            onClick={() => handleCategoryClick('summer')}
          >
            Summer Wear
            <span className="dot-indicator"></span>
          </button>
          <div className={`subcategory-list ${expandedCategory === 'summer' ? 'expanded' : ''}`}>
            <button 
              className={`subcategory-btn ${selectedSubcategory === 'Tank Tops' ? 'active' : ''}`}
              onClick={() => handleSubcategoryClick('Tank Tops')}
            >
              Tank Tops
            </button>
            <button 
              className={`subcategory-btn ${selectedSubcategory === 'Shorts' ? 'active' : ''}`}
              onClick={() => handleSubcategoryClick('Shorts')}
            >
              Shorts
            </button>
          </div>

          <button 
            className={`category-btn ${expandedCategory === 'brands' ? 'active' : ''}`}
            onClick={() => handleCategoryClick('brands')}
          >
            Brands
            <span className="dot-indicator"></span>
          </button>
          <div className={`subcategory-list ${expandedCategory === 'brands' ? 'expanded' : ''}`}>
            <button 
              className={`subcategory-btn ${selectedSubcategory === 'Men\'s Sleeveless T-Shirt' ? 'active' : ''}`}
              onClick={() => handleSubcategoryClick('Men\'s Sleeveless T-Shirt')}
            >
              Animes
            </button>
            <button 
              className={`subcategory-btn ${selectedSubcategory === 'Jujutsu Kaisen' ? 'active' : ''}`}
              onClick={() => handleSubcategoryClick('Jujutsu Kaisen')}
            >
              Jujutsu Kaisen
            </button>
            <button 
              className={`subcategory-btn ${selectedSubcategory === 'One Piece' ? 'active' : ''}`}
              onClick={() => handleSubcategoryClick('One Piece')}
            >
              One Piece
            </button>
            <button 
              className={`subcategory-btn ${selectedSubcategory === 'Solo Leveling' ? 'active' : ''}`}
              onClick={() => handleSubcategoryClick('Solo Leveling')}
            >
              Solo Leveling
            </button>
          </div>

          <button 
            className={`category-btn ${expandedCategory === 'custom' ? 'active' : ''}`}
            onClick={() => handleCategoryClick('custom')}
          >
            Custom
            <span className="dot-indicator"></span>
          </button>
          <div className={`subcategory-list ${expandedCategory === 'custom' ? 'expanded' : ''}`}>
            <button 
              className={`subcategory-btn ${selectedSubcategory === 'Sized' ? 'active' : ''}`}
              onClick={() => handleSubcategoryClick('Sized')}
            >
              Sized
            </button>
            <button 
              className={`subcategory-btn ${selectedSubcategory === 'Color' ? 'active' : ''}`}
              onClick={() => handleSubcategoryClick('Color')}
            >
              Color
            </button>
          </div>
        </div>
      </div>

      <div className="shop-content">
        {renderCarousel()}
        {renderComingSoon()}
        {renderCategories()}
        {renderBrands()}
        {renderJoggers()}
        {renderShirts()}
        {renderProductGrid()}
      </div>
    </div>
  );
};

export default Shop;