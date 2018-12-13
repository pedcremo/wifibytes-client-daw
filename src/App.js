import React, { Component } from 'react';
import AppRoutes from './routes';
import { BrowserRouter } from 'react-router-dom';
import Navbar from './components/navbar';
import Footer from './components/footer';

class App extends Component {
 render() {
   return (
     <div className="App">
        <nav className="navbar navbar-expand-lg bg-white navbar-light">
            <Navbar />
        </nav>
        <BrowserRouter>
            <div id="main" className="container-fluid pl-0 pr-0"> 
                <AppRoutes />
            </div> 
        </BrowserRouter>    
        <footer className="page-footer font-small bg-light pt-4">
            <Footer />
        </footer> 
     </div>
   );
 }
}

export default App;