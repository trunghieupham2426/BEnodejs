import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

class WishList extends Component {
  state = {
    wishList: [],
    idPr: [],
  };
  componentDidMount() {
    axios
      .get("http://localhost/laravel/public/api/product/wishlist")
      .then((res) => {
        console.log(res);
        this.setState({
          wishList: res.data.data,
        });
      });
    let idPr = JSON.parse(localStorage.getItem("prIdList"));
    if (idPr) {
      this.setState({
        idPr: idPr,
      });
    }
  }
  removeItem = (prId) => {
    let prIdList = JSON.parse(localStorage.getItem("prIdList"));
    let filterId = prIdList.filter((id) => {
      return id != prId;
    });
    localStorage.setItem("prIdList", JSON.stringify(filterId));
    this.setState({
      idPr: filterId,
    });
  };

  render() {
    let wishListRender = this.state.wishList.map((pr) => {
      return this.state.idPr.map((id) => {
        if (pr.id == id) {
          return (
            <div className="col-sm-4" key={pr.id}>
              <div className="product-image-wrapper">
                <div className="single-products">
                  <div className="productinfo text-center">
                    <img
                      src={`http://localhost/laravel/public/upload/user/product/${
                        pr.id_user
                      }/${JSON.parse(pr.image)[0]}`}
                      alt=""
                    />
                    <h2>${pr.price}</h2>
                    <p>{pr.name}</p>
                  </div>
                </div>
                <div className="choose">
                  <ul className="nav nav-pills nav-justified">
                    <li>
                      <Link
                        to="/product-detail"
                        onClick={() => {
                          localStorage.setItem(
                            "productDetail",
                            JSON.stringify(pr)
                          );
                        }}
                      >
                        <i className="fa fa-plus-square"></i>Product Detail
                      </Link>
                    </li>
                    <li>
                      <Link to="#" onClick={() => this.removeItem(pr.id)}>
                        <i className="fa fa-plus-square"></i>Delete
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          );
        }
      });
    });

    return (
      <>
        <div className="col-sm-9 padding-right">
          <div className="features_items">
            <h2 className="title text-center">Wish List</h2>
            {wishListRender}
          </div>
        </div>
      </>
    );
  }
}

export default WishList;
