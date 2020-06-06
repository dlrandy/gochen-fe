import React from 'react';
import { Link } from 'react-router-dom';

export default function index() {
  return (
    <div>
      userindex
      <Link to="23">user profile</Link>
      <Link to="me">me</Link>
    </div>
  );
}
