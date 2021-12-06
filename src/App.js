import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import MenuLeft from './components/Layout/MenuLeft';
import { AppContext } from './AppContext';
import './App.css';

class App extends Component {
  state = {
    totalQty: 0,
  };

  setTotalQty = (qty) => {
    this.setState({
      totalQty: qty,
    });
    localStorage.setItem('totalQty', qty);
  };

  render() {
    let pathname = this.props.location.pathname;
    return (
      <div>
        <AppContext.Provider
          value={{ totalQty: this.state.totalQty, setQty: this.setTotalQty }}
        >
          <Header {...this.props} />
          <section>
            <div className="container">
              <div className="row">
                {pathname.includes('/login') ||
                pathname.includes('/account') ||
                pathname.includes('/cart') ? (
                  ''
                ) : (
                  <MenuLeft />
                )}
                {this.props.children}
              </div>
            </div>
          </section>

          <Footer />
        </AppContext.Provider>
      </div>
    );
  }
}

export default withRouter(App);
