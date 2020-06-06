import React from 'react';
import { Link, Outlet } from 'react-router-dom';

export default function index() {
  return (
    <div>
      vip pp
      <nav>
        <Link to="super">super Me</Link>
      </nav>
      <Outlet />
    </div>
  );
}
