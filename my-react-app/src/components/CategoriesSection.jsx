import React from 'react';
import './CategoriesSection.css';

const CategoriesSection = () => {
  const categories = [
    {
      title: "Dresses",
      subOptions: ["T-Shirts", "Hoodies", "Sweatshirts", "Streetwears", "Cosplay Dress"]
    },
    {
      title: "Themes",
      subOptions: ["Action", "Romance", "Fantasy", "Sci-Fi", "Horror", "Comedy"]
    },
    {
      title: "Brands",
      subOptions: ["Naruto", "Dragon Ball", "One Piece", "Attack on Titan", "My Hero Academia"]
    },
    {
      title: "Accessories",
      subOptions: ["Bags", "Anime Frames", "Laptop", "Phone Custom"]
    }
  ];

  return (
    <section className="categories-section">
      <div className="categories-container">
        <h2 className="categories-title">Browse by Category</h2>
        <div className="categories-grid">
          {categories.map((category, index) => (
            <div key={index} className="category-box">
              <h3 className="category-title">{category.title}</h3>
              <ul className="sub-options-list">
                {category.subOptions.map((option, idx) => (
                  <li key={idx} className="sub-option">
                    <a href={`#${option.toLowerCase().replace(/\s+/g, '-')}`}>
                      {option}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection; 