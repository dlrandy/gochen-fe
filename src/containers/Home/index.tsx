import React from 'react';
import { Link } from 'react-router-dom';

export default function index(props: unknown) {
  console.log(props);

  return (
    <div>
      Home
      <Link to="/users">users</Link>
      <Link to="/posts">posts</Link>
      <Link to="/posts/post">thePost</Link>
      <Link to="/posts/">index post</Link>
      <Link to="/posts/1">id1</Link>
    </div>
  );
}
