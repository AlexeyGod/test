import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [items, setItems] = useState([]);

  // Загрузка данных из localStorage при монтировании компонента
  useEffect(() => {
    const savedItems = localStorage.getItem('shoppingList');
    if (savedItems) {
      setItems(JSON.parse(savedItems));
    } else {
      // Пример начальных данных
      setItems([
        { id: 1, name: 'Яблоки', quantity: 5, unit: 'шт.' },
        { id: 2, name: 'Молоко', quantity: 1, unit: 'л.' },
        { id: 3, name: 'Хлеб', quantity: 2, unit: 'шт.' },
      ]);
    }
  }, []);

  // Сохранение данных в localStorage при изменении
  useEffect(() => {
    localStorage.setItem('shoppingList', JSON.stringify(items));
  }, [items]);

  const addItem = () => {
    const newName = prompt('Введите название товара:');
    if (newName) {
      const newId = items.length > 0 ? Math.max(...items.map(item => item.id)) + 1 : 1;
      setItems([...items, { id: newId, name: newName, quantity: 1, unit: 'шт.' }]);
    }
  };

  const removeItem = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  const increaseQuantity = (id) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    ));
  };

  const decreaseQuantity = (id) => {
    setItems(items.map(item => 
      item.id === id && item.quantity > 1 
        ? { ...item, quantity: item.quantity - 1 } 
        : item
    ));
  };

  const clearAll = () => {
    if (window.confirm('Вы уверены, что хотите очистить весь список?')) {
      setItems([]);
    }
  };

  return (
    <div className="app">
      <div className="container">
        <h1>Список покупок</h1>
        
        <div className="controls">
          <button onClick={addItem} className="btn btn-add">Добавить товар</button>
          <button onClick={clearAll} className="btn btn-clear">Очистить все</button>
        </div>
        
        <ul className="shopping-list">
          {items.map((item) => (
            <li key={item.id} className="list-item">
              <div className="item-info">
                <span className="item-name">{item.name}</span>
                <div className="quantity-control">
                  <button onClick={() => decreaseQuantity(item.id)} className="btn-quantity">-</button>
                  <span className="item-quantity">{item.quantity} {item.unit}</span>
                  <button onClick={() => increaseQuantity(item.id)} className="btn-quantity">+</button>
                </div>
              </div>
              <button onClick={() => removeItem(item.id)} className="btn-remove">Удалить</button>
            </li>
          ))}
        </ul>
        
        {items.length === 0 && (
          <p className="empty-message">Список покупок пуст. Добавьте первый товар!</p>
        )}
      </div>
    </div>
  );
};

export default App;