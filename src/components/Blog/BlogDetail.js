import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useParams } from 'react-router-dom';

import ListComment from './ListComment';
import Rating from './Rating';
import Comment from './Comment';
import StarRating from 'react-star-ratings';

const BlogDetail = () => {
  const [posts, setPosts] = useState([]);
  const [listComments, setListComments] = useState([]);
  const [idSubComment, setIdSubComment] = useState(0);
  const [rating, setRating] = useState(0);
  const [ratingQty, setRatingQty] = useState(0);
  const { id } = useParams();
  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/api/v1/blogs/${id}`)
      .then((res) => {
        // console.log(res.data.data.blog);
        const posts = [];
        posts.push(res.data.data.blog);
        setPosts(posts);
        setListComments(posts[0].comments);
        const ratingsAverage =
          res.data.data.blog.rating.reduce((sum, rating) => {
            return sum + rating.rating;
          }, 0) / res.data.data.blog.rating.length;
        if (ratingsAverage) {
          setRating(ratingsAverage);
          setRatingQty(res.data.data.blog.rating.length);
        }

        // console.log(posts);
      })
      .catch((err) => console.log(err));
  }, []);
  function mergeArr(arr, data) {
    let mainId = data.parentId;
    if (!mainId) return arr.concat(data);
    arr.map((el) => {
      if (el._id === mainId) {
        return el.replies.push(data);
      }
      if (el.replies.length > 0) {
        mergeArr(el.replies, data);
      }
      return el;
    });
    return arr;
  }
  const addComment = (data) => {
    let copyCMT = [...listComments];
    copyCMT = mergeArr(copyCMT, data);
    setListComments((preState) => (preState = [...copyCMT]));
  };

  const getIdComment = (id) => {
    setIdSubComment(id);
  };

  const post = posts.map((post) => {
    return (
      <div className="single-blog-post" key={post._id}>
        <h3>{post.title}</h3>
        <div className="post-meta">
          <ul>
            <li>
              <i className="fa fa-user"></i> {post.user.name}
            </li>
            <li>
              <i className="fa fa-user"></i>{' '}
              {post.createdAt.split('T')[1].split('.')[0]}
            </li>
            <li>
              <i className="fa fa-calendar"></i> {post.createdAt.split('T')[0]}
            </li>
          </ul>

          <span>
            <StarRating
              starRatedColor="#fe980f"
              numberOfStars={5}
              rating={rating}
            />
          </span>
        </div>
        <Link to="">
          <img src={`/images/blog/${post.photo}`} alt="" />
        </Link>
        <p>{post.description}</p> <br />
        <div className="pager-area">
          <ul className="pager pull-right">
            <li>
              <Link to="#">Pre</Link>
            </li>
            <li>
              <Link to="#">Next</Link>
            </li>
          </ul>
        </div>
      </div>
    );
  });
  return (
    <>
      <div className="col-sm-9">
        <div className="blog-post-area">
          <h2 className="title text-center">Latest From our Blog</h2>
          {post}
        </div>
        <Rating idBlog={id} ratingAvr={rating} ratingQty={ratingQty} />

        <div className="socials-share">
          <Link to="">
            <img src="/images/blog/socials.png" alt="" />
          </Link>
        </div>
        <ListComment
          postComments={listComments}
          getSubIdComment={getIdComment}
        />
        <Comment
          idBlog={id}
          addComment={addComment}
          idSubComment={idSubComment}
          setIdSubComment={setIdSubComment}
        />
      </div>
    </>
  );
};

export default BlogDetail;
