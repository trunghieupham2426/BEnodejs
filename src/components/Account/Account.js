import React, { Component } from 'react';
import { Link, Route, Switch } from 'react-router-dom';
import axios from 'axios';
import AddProduct from '../Product/AddProduct';
import UserUpdate from './UserUpdate';
import MyProduct from '../Product/MyProduct';
import EditProduct from '../Product/EditProduct';

class Account extends Component {
  render() {
    return (
      <>
        <div className="col-sm-3">
          <div className="left-sidebar">
            <h2>ACCOUNT</h2>
            <div className="panel-group account" id="account">
              <div className="panel panel-default">
                <div className="panel-heading">
                  <h4 className="panel-title">
                    <Link data-toggle="collapse" to="/account">
                      <span className="badge pull-right">
                        <i className="fa fa-plus"></i>
                      </span>
                      ACCOUNT
                    </Link>
                  </h4>
                </div>
                <div className="panel-heading">
                  <h4 className="panel-title">
                    <Link data-toggle="collapse" to="/account/my-product">
                      <span className="badge pull-right">
                        <i className="fa fa-plus"></i>
                      </span>
                      MY PRODUCT
                    </Link>
                  </h4>
                </div>
                <div className="panel-heading">
                  <h4 className="panel-title">
                    <Link data-toggle="collapse" to="/account/add-product">
                      <span className="badge pull-right">
                        <i className="fa fa-plus"></i>
                      </span>
                      ADD PRODUCT
                    </Link>
                  </h4>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Switch>
          <Route path="/account" component={UserUpdate} exact />
          <Route path="/account/add-product" component={AddProduct} exact />
          <Route path="/account/my-product" component={MyProduct} exact />
          <Route
            path="/account/edit-product/:id"
            component={EditProduct}
            exact
          />
        </Switch>
      </>
    );
  }
}

export default Account;
