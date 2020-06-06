import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import UsersIndex from '@Components/UsersIndex';
import UserProfile from '@Components/UserProfile';
import OwnerProfile from '@Components/OwnerProfile';

export default function index() {
  return (
    <div>
      <nav>
        <Link to="me">About Me</Link>
      </nav>
      <Routes>
        <Route path="/" element={<UsersIndex />} />
        <Route path=":id" element={<UserProfile />} />
        <Route path="me" element={<OwnerProfile />} />
      </Routes>
    </div>
  );
}
