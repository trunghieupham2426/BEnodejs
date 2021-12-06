import React, { Component } from 'react';
import { Link } from 'react-router-dom';
const Comment = (props) => {
  const nestedComments = (props.replies || []).map((comment) => {
    return (
      <Comment
        key={comment._id}
        id={comment._id}
        class="media second-media"
        photo={comment.author.photo}
        name={comment.author.name}
        comment={comment.comment}
        date={comment.createdAt.split('T')[0]}
        time={comment.createdAt.split('T')[1].split('.')[0]}
        replies={comment.replies}
        getSubIdComment={props.getSubIdComment}
      />
    );
  });
  return (
    <>
      <li className={props.class}>
        <Link className="pull-left" to="#">
          <img
            className="media-object"
            src={`/images/userphoto/${props.photo}`}
            alt=""
            style={{ width: '100px', height: '100px' }}
          />
        </Link>
        <div className="media-body">
          <ul className="sinlge-post-meta">
            <li>
              <i className="fa fa-user"></i>
              {props.name}
            </li>
            <li>
              <i className="fa fa-user"></i> {props.time}
            </li>
            <li>
              <i className="fa fa-calendar"></i>
              {props.date}
            </li>
          </ul>
          <p>{props.comment}</p>
          <Link
            className="btn btn-primary"
            to="#repComment"
            onClick={() => props.getSubIdComment(props.id)}
          >
            <i className="fa fa-reply"></i>Replay
          </Link>
        </div>
      </li>
      {nestedComments}
    </>
  );
};
const ListComment = ({ postComments, getSubIdComment }) => {
  let showComment = postComments.map((comment) => {
    return (
      <>
        <Comment
          key={comment._id}
          id={comment._id}
          class={comment.class ? comment.class : 'media'}
          photo={comment.author.photo}
          name={comment.author.name}
          comment={comment.comment}
          date={comment.createdAt.split('T')[0]}
          time={comment.createdAt.split('T')[1].split('.')[0]}
          getSubIdComment={getSubIdComment}
          replies={comment.replies}
        />
      </>
    );
  });
  return (
    <div className="response-area">
      <h2>{showComment.length} RESPONSES</h2>
      <ul className="media-list">{showComment}</ul>
    </div>
  );
};

export default ListComment;
