import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import axios from 'axios';
import StarRating from 'react-star-ratings';
class Rating extends Component {
  state = {
    rating: 0,
  };
  changeRating = (newRating) => {
    let userData = localStorage.getItem('appState');
    userData = JSON.parse(userData);
    if (!userData) {
      alert('vui long login');
      return;
    }

    let url = `http://127.0.0.1:8000/api/v1/blogs/${this.props.idBlog}/rating`;
    let accessToken = userData.user.auth_token;
    let config = {
      headers: {
        Authorization: 'Bearer ' + accessToken,
        // 'Content-Type': 'application/x-www-form-urlencoded',
        // Accept: 'application/json',
      },
    };

    let currentRating = {
      rating: newRating,
      blog: this.props.idBlog,
      author: userData.user.auth.data.id,
    };
    axios
      .post(url, currentRating, config)
      .then((res) => {
        // console.log(res);
      })
      .catch((err) => console.log(err.response));
    this.setState({
      rating: newRating,
    });
    // console.log(this.state.rating);
  };

  render() {
    return (
      <div className="rating-area">
        <ul className="ratings">
          <li className="rate-this">Rate this item:</li>
          <li>
            <StarRating
              starRatedColor="#fe980f"
              numberOfStars={5}
              name="rating"
              rating={this.state.rating || this.props.ratingAvr}
              changeRating={this.changeRating}
            />
          </li>
          <li className="color">({this.props.ratingQty} votes)</li>
        </ul>
        <ul className="tag">
          <li>TAG:</li>
          <li>
            <Link className="color" to="">
              Pink <span>/</span>
            </Link>
          </li>
          <li>
            <Link className="color" to="">
              T-Shirt <span>/</span>
            </Link>
          </li>
          <li>
            <Link className="color" to="">
              Girls
            </Link>
          </li>
        </ul>
      </div>
    );
  }
}

export default withRouter(Rating);
