import React, { Component } from "react";
import Register from "../../components/Account/Register";
import Signin from "../../components/Account/Signin";

class Login extends Component {
  render() {
    return (
      <section id="form">
        <div className="container">
          <div className="row">
            <Signin {...this.props} />
            <div className="col-sm-1">
              <h2 className="or">OR</h2>
            </div>
            <Register />
          </div>
        </div>
      </section>
    );
  }
}

export default Login;
