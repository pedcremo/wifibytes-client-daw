import React, { Component } from 'react';
import { connect } from "react-redux";
import AppRoutes from './routes';
import { HashRouter } from 'react-router-dom';
import Navbar from './components/navbar';
import Footer from './components/footer';
import { getItems } from './actions/cartActions';

/**
 * @class
 * It defines the webpage structure.
 */
class App extends Component {
 /** render  
  * It renders the app view which loads the Navbar and Footer components and the AppRoutes component which has all the routes.
 */
 componentDidMount(){
    this.props.dispatch(getItems());
 }
 render() {
   return (
     <div className="App">
        <nav className="navbar navbar-expand-lg bg-white navbar-light">
            <Navbar cartItems={this.props.cartItems}/>
        </nav>
        <HashRouter>
            <div id="main" className="container-fluid pl-0 pr-0"> 
                <AppRoutes />
            </div> 
        </HashRouter>    
        <footer className="page-footer font-small bg-light pt-4">
            <Footer />
        </footer> 
     </div>
   );
 }
}

const mapStateToProps = state => ({
    cartItems: state.cartReducer
});

export default connect(mapStateToProps)(App);