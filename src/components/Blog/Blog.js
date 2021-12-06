import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Blog = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios
      .get('http://127.0.0.1:8000/api/v1/blogs')
      .then((res) => {
        console.log(res);
        const blogData = res.data.data;
        console.log(res.data.data);
        setPosts(blogData.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const post = posts.map((post) => {
    return (
      <div className="single-blog-post" key={post.id}>
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
        </div>
        <Link to="">
          <img src={`/images/blog/${post.photo}`} alt="" />
        </Link>
        <p>{post.description}</p>
        <Link className="btn btn-primary" to={`/blog/detail/${post._id}`}>
          Read More
        </Link>
      </div>
    );
  });
  return (
    <>
      <div className="col-sm-9">
        <div className="blog-post-area">
          <h2 className="title text-center">Latest From our Blog</h2>
          {post}
          <div className="pagination-area">
            <ul className="pagination">
              <li>
                <Link to="" className="active">
                  1
                </Link>
              </li>
              <li>
                <Link to="">2</Link>
              </li>
              <li>
                <Link to="">3</Link>
              </li>
              <li>
                <Link to="">
                  <i className="fa fa-angle-double-right"></i>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Blog;
