import {BrowserRouter as Router,Switch,Route} from "react-router-dom";
import Home from './pages/Home';
import {CartProvider} from './CartContext'
import { ToastContainer } from 'react-toastify';
import Cart from './components/Cart';
import Profile from './components/Profile'
import CreateAccount from './components/CreateAccount'
import Login from './components/Login'


function App() {
  return (
    <>
      <CartProvider>
      <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <Router>
    
          <Switch>
              <Route exact path="/" component={Home}></Route>
              <Route exact path="/cart" component={Cart}></Route>
              <Route exact path="/profile" component={Profile}></Route>
              <Route exact path="/login" component={Login}></Route>
              <Route exact path="/createAccount" component={CreateAccount}></Route>
              {/* <Route exact path="/reservations" component={Reservations}></Route> */}
            </Switch>
        </Router>
      </CartProvider>
    </>
  );
}

export default App;
