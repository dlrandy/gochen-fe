import React from 'react';
import { Link, Outlet } from 'react-router-dom';

export default function index() {
  return (
    <div>
      posts
      <Link to="post">thePost</Link>
      <Outlet />
    </div>
  );
}
