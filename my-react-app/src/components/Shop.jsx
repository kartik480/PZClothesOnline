import React, { useState, useEffect, useRef } from 'react';
import './Shop.css';
import heading1 from '../assets/heading1.png';
import heading2 from '../assets/heading2.png';
import heading3 from '../assets/heading3.jpg';
import heading4 from '../assets/heading4.jpg';

const Shop = () => {
  const [expandedCategory, setExpandedCategory] = useState('tshirts');
  const [selectedSubcategory, setSelectedSubcategory] = useState('');
  const [cart, setCart] = useState([]);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedDressType, setSelectedDressType] = useState('casual');
  const [selectedShirtType, setSelectedShirtType] = useState('regular');
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
    { id: 'casual', name: 'Casual Dress', description: 'Comfortable everyday wear' },
    { id: 'formal', name: 'Formal Dress', description: 'Elegant and sophisticated' },
    { id: 'party', name: 'Party Dress', description: 'Perfect for special occasions' },
    { id: 'summer', name: 'Summer Dress', description: 'Light and breezy' },
    { id: 'maxi', name: 'Maxi Dress', description: 'Long and flowing' },
    { id: 'mini', name: 'Mini Dress', description: 'Short and stylish' }
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
      setSelectedSubcategory('');
    } else {
      setExpandedCategory(category);
      setSelectedSubcategory('');
    }
  };

  const handleSubcategoryClick = (subcategory) => {
    setSelectedSubcategory(subcategory);
    setIsAutoPlaying(false);
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
        <div className="size-measurement-container">
          <div className="dress-type-selection">
            <h3>Select Dress Type</h3>
            <div className="dress-types-grid">
              {dressTypes.map((type) => (
                <div 
                  key={type.id}
                  className={`dress-type-card ${selectedDressType === type.id ? 'selected' : ''}`}
                  onClick={() => handleDressTypeChange(type.id)}
                >
                  <div className={`dress-outline ${type.id}`}></div>
                  <h4>{type.name}</h4>
                  <p>{type.description}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="size-outline">
            <div className="size-diagram">
              <div className={`outline-dress size-${selectedSize.toLowerCase()} type-${selectedDressType}`}></div>
              <div className="measurement-lines">
                <div className="measurement shoulder">Shoulder: {currentMeasurements.shoulder}"</div>
                <div className="measurement chest">Chest: {currentMeasurements.chest}"</div>
                <div className="measurement waist">Waist: {currentMeasurements.waist}"</div>
                <div className="measurement length">Length: {currentMeasurements.length}"</div>
              </div>
            </div>
            <div className="size-selection">
              <h3>Select Size</h3>
              <div className="size-checkboxes">
                {['S', 'M', 'L', 'XL', 'XXL', 'XXXL'].map((size) => (
                  <label key={size} className={`size-option ${selectedSize === size ? 'selected' : ''}`}>
                    <input 
                      type="radio" 
                      name="size" 
                      value={size}
                      checked={selectedSize === size}
                      onChange={() => handleSizeChange(size)}
                    />
                    <span className="size-label">{size}</span>
                  </label>
                ))}
              </div>
            </div>
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
          <h2 className="brands-title">Brands</h2>
          <div className="brands-grid">
            {[
              { name: 'Naruto', image: 'naruto,anime', description: 'Believe It!' },
              { name: 'Jujutsu Kaisen', image: 'jujutsu,kaisen', description: 'I\'m You' },
              { name: 'One Piece', image: 'onepiece,anime', description: 'I\'m Gonna Be King of the Pirates!' },
              { name: 'Solo Leveling', image: 'sololeveling,anime', description: 'I Alone Level Up' }
            ].map((brand, index) => (
              <div key={index} className="brand-card">
                <div className="brand-image">
                  <img 
                    src={`https://source.unsplash.com/400x500?${brand.image}`}
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
              className={`subcategory-btn ${selectedSubcategory === 'Nike' ? 'active' : ''}`}
              onClick={() => handleSubcategoryClick('Nike')}
            >
              Nike
            </button>
            <button 
              className={`subcategory-btn ${selectedSubcategory === 'Adidas' ? 'active' : ''}`}
              onClick={() => handleSubcategoryClick('Adidas')}
            >
              Adidas
            </button>
            <button 
              className={`subcategory-btn ${selectedSubcategory === 'Puma' ? 'active' : ''}`}
              onClick={() => handleSubcategoryClick('Puma')}
            >
              Puma
            </button>
            <button 
              className={`subcategory-btn ${selectedSubcategory === 'Under Armour' ? 'active' : ''}`}
              onClick={() => handleSubcategoryClick('Under Armour')}
            >
              Under Armour
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