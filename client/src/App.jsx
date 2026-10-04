import './App.css';
import { useState } from 'react';

function App() {

  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [showCart, setShowCart] = useState(false);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [registerUsername, setRegisterUsername] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');

  const [cart, setCart] = useState([]);

  // JCE Cafe menu items
  const menuItems = [
    {
      id: 1,
      name: 'Veg Sandwich',
      price: 40,
      image: '/sandwich.jpg'
    },
    {
      id: 2,
      name: 'Samosa',
      price: 20,
      image: '/samosa.jpg'
    },
    {
      id: 3,
      name: 'French Fries',
      price: 50,
      image: '/fries.jpg'
    },
    {
      id: 4,
      name: 'Coffee',
      price: 30,
      image: '/coffee.jpg'
    },
    {
      id: 5,
      name: 'Fresh Juice',
      price: 40,
      image: '/juice.jpg'
    },
    {
      id: 6,
      name: 'Veg Burger',
      price: 60,
      image: '/burger.jpg'
    }
  ];

  // LOGIN
  const handleLogin = async () => {

    if (username === '' || password === '') {
      alert('Please enter username and password');
      return;
    }

    try {

      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: username,
          password: password
        })
      });

      const data = await response.json();

      alert(data.message);

      if (data.message === 'Login successful') {
        setShowLogin(false);
        setShowMenu(true);
      }

    } catch (error) {

      alert('Cannot connect to server');

    }
  };


  // REGISTER
  const handleRegister = async () => {

    if (registerUsername === '' || registerPassword === '') {
      alert('Please enter username and password');
      return;
    }

    try {

      const response = await fetch('http://localhost:5000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: registerUsername,
          password: registerPassword
        })
      });

      const data = await response.json();

      alert(data.message);

      if (data.message === 'User registered successfully') {

        setShowRegister(false);
        setShowLogin(true);

        setRegisterUsername('');
        setRegisterPassword('');
      }

    } catch (error) {

      alert('Cannot connect to server');

    }
  };


  // ADD TO CART
  const addToCart = (item) => {

    setCart([...cart, item]);

    alert(item.name + ' added to cart');
  };


  // REMOVE FROM CART
  const removeFromCart = (index) => {

    const newCart = [...cart];

    newCart.splice(index, 1);

    setCart(newCart);
  };


  // CALCULATE TOTAL
  const getTotal = () => {

    let total = 0;

    cart.forEach((item) => {
      total = total + item.price;
    });

    return total;
  };


  // LOGOUT
  const handleLogout = () => {

    setShowMenu(false);
    setShowCart(false);
    setShowLogin(false);
    setShowRegister(false);

    setUsername('');
    setPassword('');

    setCart([]);
  };


  // HOME PAGE
  if (
    !showLogin &&
    !showRegister &&
    !showMenu &&
    !showCart
  ) {

    return (
      <div className="home-page">

        <div className="home-content">

          {/* COLLEGE LOGO */}

          <div className="cafe-logo">

            <img
              src="/jce-logo.jfif"
              alt="JCE College Logo"
            />

          </div>


          <h1>JCE Cafe</h1>

          <h2>Hungry?</h2>

          <h3>
            Your campus food, just a click away.
          </h3>

          <p>
            Order your favourite snacks and meals
            from the JCE Cafe.
          </p>


          <button
            className="start-button"
            onClick={() => setShowLogin(true)}
          >
            Get Started
          </button>

        </div>

      </div>
    );
  }


  // REGISTER PAGE
  if (showRegister) {

    return (
      <div className="login-container">

        <div className="login-box">

          <div className="form-icon">
            <img
              src="/jce-logo.jfif"
              alt="JCE College Logo"
            />
          </div>

          <h2>Create Account</h2>

          <p>
            Register for JCE Cafe
          </p>


          <input
            type="text"
            placeholder="Username"
            value={registerUsername}
            onChange={(e) =>
              setRegisterUsername(e.target.value)
            }
          />


          <input
            type="password"
            placeholder="Password"
            value={registerPassword}
            onChange={(e) =>
              setRegisterPassword(e.target.value)
            }
          />


          <button onClick={handleRegister}>
            Register
          </button>


          <button
            className="back-button"
            onClick={() => setShowRegister(false)}
          >
            Back to Login
          </button>

        </div>

      </div>
    );
  }


  // LOGIN PAGE
  if (showLogin) {

    return (
      <div className="login-container">

        <div className="login-box">

          <div className="form-icon">
            <img
              src="/jce-logo.jfif"
              alt="JCE College Logo"
            />
          </div>


          <h2>Welcome Back!</h2>

          <p>
            Login to continue ordering food
          </p>


          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) =>
              setUsername(e.target.value)
            }
          />


          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
          />


          <button onClick={handleLogin}>
            Login
          </button>


          <button
            className="register-button"
            onClick={() => {
              setShowLogin(false);
              setShowRegister(true);
            }}
          >
            Create New Account
          </button>


          <button
            className="back-button"
            onClick={() => setShowLogin(false)}
          >
            Back
          </button>

        </div>

      </div>
    );
  }


  // CART PAGE
  if (showCart) {

    return (
      <div className="cart-page">

        <div className="cart-box">

          <h1>
            <span className="cart-title-icon">🛍</span>
            Your Cart
          </h1>


          {cart.length === 0 ? (

            <p className="empty-cart">
              Your cart is empty.
            </p>

          ) : (

            <div>

              {cart.map((item, index) => (

                <div
                  className="cart-item"
                  key={index}
                >

                  <div className="cart-item-details">

                    <img
                      src={item.image}
                      alt={item.name}
                    />

                    <div>

                      <strong>
                        {item.name}
                      </strong>

                      <p>
                        ₹{item.price}
                      </p>

                    </div>

                  </div>


                  <button
                    className="remove-button"
                    onClick={() =>
                      removeFromCart(index)
                    }
                  >
                    Remove
                  </button>

                </div>

              ))}


              <div className="total-box">

                <h2>
                  Total: ₹{getTotal()}
                </h2>

              </div>


              <button
                className="place-order-button"
                onClick={() =>
                  alert('Order placed successfully!')
                }
              >
                Place Order
              </button>

            </div>

          )}


          <button
            className="back-button"
            onClick={() => {
              setShowCart(false);
              setShowMenu(true);
            }}
          >
            Back to Menu
          </button>

        </div>

      </div>
    );
  }


  // MENU PAGE
  if (showMenu) {

    return (
      <div className="menu-page">

        {/* HEADER */}

        <header className="menu-header">

          <div className="header-logo">


            {/* COLLEGE LOGO */}

            <div className="small-logo">

              <img
                src="/jce-logo.jfif"
                alt="JCE College Logo"
              />

            </div>


            <div>

              <h1>
                JCE Cafe
              </h1>

              <p>
                Campus food made easy
              </p>

            </div>

          </div>


          <div className="header-buttons">

            <button
              className="cart-button"
              onClick={() => {
                setShowMenu(false);
                setShowCart(true);
              }}
            >
              <span className="cart-icon">
                <span className="cart-wheel wheel-one"></span>
                <span className="cart-wheel wheel-two"></span>
              </span>

              Cart ({cart.length})
            </button>


            <button
              className="logout-button"
              onClick={handleLogout}
            >
              Logout
            </button>

          </div>

        </header>


        {/* MENU CONTENT */}

        <div className="menu-content">

          <h2>
            Welcome, {username}!
          </h2>


          <p className="menu-description">
            Choose your favourite food from our cafe.
          </p>


          <div className="food-grid">

            {menuItems.map((item) => (

              <div
                className="food-card"
                key={item.id}
              >

                <div className="food-image">

                  <img
                    src={item.image}
                    alt={item.name}
                  />

                </div>


                <h3>
                  {item.name}
                </h3>


                <p className="food-price">
                  ₹{item.price}
                </p>


                <button
                  className="add-button"
                  onClick={() =>
                    addToCart(item)
                  }
                >
                  Add to Cart
                </button>

              </div>

            ))}

          </div>

        </div>

      </div>
    );
  }


  return null;
}

export default App;