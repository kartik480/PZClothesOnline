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
  const carouselRef = useRef(null);
  const autoPlayInterval = useRef(null);

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

  // Carousel slide transition
  useEffect(() => {
    if (carouselRef.current) {
      carouselRef.current.style.transform = `translateX(-${currentSlide * 25}%)`;
    }
  }, [currentSlide]);

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

  const renderProductGrid = () => {
    if (selectedSubcategory === 'Animes') {
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
              <h2>Customize Your T-Shirt</h2>
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
                    <div className="dress-outline regular"></div>
                    <h4>Regular Fit</h4>
                    <p>Classic comfortable fit</p>
                  </div>
                  <div 
                    className={`dress-type-card ${selectedDressType === 'slim' ? 'selected' : ''}`}
                    onClick={() => setSelectedDressType('slim')}
                  >
                    <div className="dress-outline slim"></div>
                    <h4>Slim Fit</h4>
                    <p>Modern fitted style</p>
                  </div>
                  <div 
                    className={`dress-type-card ${selectedDressType === 'oversized' ? 'selected' : ''}`}
                    onClick={() => setSelectedDressType('oversized')}
                  >
                    <div className="dress-outline oversized"></div>
                    <h4>Oversized</h4>
                    <p>Relaxed and roomy</p>
                  </div>
                  <div 
                    className={`dress-type-card ${selectedDressType === 'muscle' ? 'selected' : ''}`}
                    onClick={() => setSelectedDressType('muscle')}
                  >
                    <div className="dress-outline muscle"></div>
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
          {showTshirtOutline && (
            <div className="tshirt-preview">
              <div className={`outline-dress ${selectedStyle}`}></div>
            </div>
          )}
          <div className="color-options">
            <div className="color-box" style={{ backgroundColor: '#000000' }}></div>
            <div className="color-box" style={{ backgroundColor: '#FFFFFF', border: '1px solid #ddd' }}></div>
            <div className="color-box" style={{ backgroundColor: '#FF0000' }}></div>
            <div className="color-box" style={{ backgroundColor: '#0000FF' }}></div>
            <div className="color-box" style={{ backgroundColor: '#008000' }}></div>
            <div className="color-box" style={{ backgroundColor: '#FFA500' }}></div>
            <div className="color-box" style={{ backgroundColor: '#800080' }}></div>
            <div className="color-box" style={{ backgroundColor: '#FFC0CB' }}></div>
            <div className="color-box" style={{ backgroundColor: '#A52A2A' }}></div>
            <div className="color-box" style={{ backgroundColor: '#808080' }}></div>
            <div className="color-box" style={{ backgroundColor: '#FFD700' }}></div>
            <div className="color-box" style={{ backgroundColor: '#00FFFF' }}></div>
            <div className="color-box" style={{ backgroundColor: '#FF00FF' }}></div>
            <div className="color-box" style={{ backgroundColor: '#4B0082' }}></div>
            <div className="color-box" style={{ backgroundColor: '#FF4500' }}></div>
          </div>
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
                    src={`https://source.unsplash.com/400x500?tshirt,upcoming,${index}`}
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
          <h2 className="brands-title">Animes</h2>
          <div className="brands-grid">
            {[
              { name: 'Naruto', image: b1, description: 'Believe It!' },
              { name: 'Jujutsu Kaisen', image: b2, description: 'I\'m You' },
              { name: 'One Piece', image: b3, description: 'I\'m Gonna Be King of the Pirates!' },
              { name: 'Solo Leveling', image: b4, description: 'I Alone Level Up' }
            ].map((brand, index) => (
              <div key={index} className="brand-card">
                <div className="brand-image">
                  <img 
                    src={brand.image}
                    alt={brand.name}
                    onError={(e) => {
                      e.target.src = `https://via.placeholder.com/400x500?text=${brand.name}`;
                    }}
                  />
                  <div className="brand-overlay">
                    <h3>{brand.name}</h3>
                    <p>{brand.description}</p>
                    <button 
                      className="view-collection-btn"
                      onClick={() => {
                        setExpandedCategory('brands');
                        setSelectedSubcategory(brand.name);
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

  return (
    <div className="shop-container">
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
              className={`subcategory-btn ${selectedSubcategory === 'Animes' ? 'active' : ''}`}
              onClick={() => handleSubcategoryClick('Animes')}
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
              className={`subcategory-btn ${selectedSubcategory === 'Animes' ? 'active' : ''}`}
              onClick={() => handleSubcategoryClick('Animes')}
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
        {renderProductGrid()}
      </div>
    </div>
  );
};

export default Shop;