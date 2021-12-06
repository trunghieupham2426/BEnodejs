import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { config } from '../Config/Config';

const Comment = ({ idBlog, addComment, idSubComment, setIdSubComment }) => {
  const [comment, setComment] = useState('');
  let checkLogin = useSelector((state) => state.isLoggedIn);

  const onChangeHandler = (e) => {
    let value = e.target.value;
    setComment(value);
  };
  const postCommentHandler = (e) => {
    e.preventDefault();
    let userData = localStorage.getItem('appState');
    userData = JSON.parse(userData);
    if (!checkLogin) {
      alert('vui long login');
    }

    let url = `http://127.0.0.1:8000/api/v1/blogs/${idBlog}/comment`;

    if (comment) {
      let cmt = {
        comment: comment,
        blog: idBlog,
        author: userData.user.auth.data._id,
        parentId: idSubComment ? idSubComment : null,
      };
      console.log(cmt);

      axios
        .post(url, cmt, config())
        .then((res) => {
          // console.log(res.data.data.comment);
          let data = res.data.data.comment;
          data.class = 'media';
          if (res.data.data.comment.parentId) {
            data.class = 'media second-media';
          }
          // console.log(data);
          addComment(data);
        })
        .catch((err) => {
          console.log(err.response);
        });
      setComment('');
      setIdSubComment(null);
    } else {
      alert('vui long nhap binh luan');
    }
  };

  return (
    <React.Fragment>
      <div className="replay-box">
        <div className="row">
          <div className="col-sm-12">
            <h2>Leave a replay</h2>
            <form onSubmit={postCommentHandler}>
              <div className="text-area">
                <div className="blank-arrow">
                  <label>Your Name</label>
                </div>
                <span>*</span>
                <textarea
                  id="repComment"
                  name="message"
                  rows="11"
                  onChange={onChangeHandler}
                  value={comment}
                ></textarea>
                <button className="btn btn-primary" type="submit">
                  post comment
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default withRouter(Comment);
// export default Comment;
