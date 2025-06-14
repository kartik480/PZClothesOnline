import React from 'react';
import './MyList.css';

const MyList = () => {
  const savedItems = [
    {
      id: 1,
      name: "Naruto Uzumaki T-Shirt",
      price: 29.99,
      image: "https://source.unsplash.com/400x500?naruto,tshirt",
      category: "Animes"
    },
    {
      id: 2,
      name: "Dragon Ball Z Hoodie",
      price: 49.99,
      image: "https://source.unsplash.com/400x500?dragonball,hoodie",
      category: "Animes"
    },
    {
      id: 3,
      name: "Pzn Exclusive T-Shirt",
      price: 34.99,
      image: "https://source.unsplash.com/400x500?pzn,tshirt",
      category: "Pzn"
    },
    {
      id: 4,
      name: "Cartoon Collection T-Shirt",
      price: 27.99,
      image: "https://source.unsplash.com/400x500?cartoon,tshirt",
      category: "Cartoons"
    }
  ];

  return (
    <div className="mylist-container">
      <div className="mylist-header">
        <h1>My List</h1>
        <p>Your saved items and favorites</p>
      </div>

      <div className="mylist-content">
        <div className="mylist-filters">
          <button className="filter-btn active">All Items</button>
          <button className="filter-btn">Animes</button>
          <button className="filter-btn">Pzn</button>
          <button className="filter-btn">Cartoons</button>
        </div>

        <div className="mylist-grid">
          {savedItems.map((item) => (
            <div key={item.id} className="mylist-item">
              <div className="item-image">
                <img 
                  src={item.image} 
                  alt={item.name}
                  onError={(e) => {
                    e.target.src = `https://via.placeholder.com/400x500?text=${item.name}`;
                  }}
                />
                <div className="item-overlay">
                  <button className="remove-btn">Remove</button>
                  <button className="add-to-cart-btn">Add to Cart</button>
                </div>
              </div>
              <div className="item-info">
                <h3>{item.name}</h3>
                <p className="item-category">{item.category}</p>
                <p className="item-price">${item.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyList; 