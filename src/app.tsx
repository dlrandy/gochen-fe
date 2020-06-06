import React from 'react';
import { BrowserRouter, Routes, Route, useRoutes } from 'react-router-dom';
import ChristmasTree from '@Components/chrismast_tree/index';
import Home from '@Containers/Home';
import Users from '@Containers/Users';
import VipUsers from '@Containers/Users/Vip';
import Posts from '@Containers/Posts';

import PostsIndex from '@Components/PostsIndex';
import NotFound from '@Components/NotFound';
import PostDetail from '@Components/PostDetail';
import OwnerPost from '@Components/OwnerPost';
import UsersVip from '@Components/UsersVip';
import UsersIndex from '@Components/UsersIndex';
import UserProfile from '@Components/UserProfile';
import OwnerProfile from '@Components/OwnerProfile';
import Login from '@Components/Login';
import RouteGuard from '@Components/RouteGuard';

export const Appbkp = () => (
  <div>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="users/*" element={<Users />} />
        <Route path="/users/vip" element={<VipUsers />}>
          <Route path="/" element={<UsersVip />} />
          <Route path="super" element={<div>supper</div>} />
        </Route>
        <Route path="posts" element={<Posts />}>
          <Route path="/" element={<PostsIndex />} />
          <Route path=":id" element={<PostDetail />} />
          <Route path="post" element={<OwnerPost />} />
        </Route>
      </Routes>
    </BrowserRouter>
    <ChristmasTree />
  </div>
);

export const App = () => {
  return (
    <div>
      {useRoutes([
        { path: '/', element: <Home /> },
        {
          path: 'users/*',
          element: <Users />,
          children: [
            {
              path: '/',
              element: <UsersIndex />,
            },
            // {
            //   // TODO 這種嵌套好像不好使呢
            //   path: 'vip/*',
            //   element: <VipUsers />,
            //   children: [
            //     { path: '/', element: <UsersVip /> },
            //     { path: 'super', element: <div>supper</div> },
            //   ],
            // },
            { path: ':id', element: <UserProfile /> },
            { path: 'me', element: <OwnerProfile /> },
          ],
        },
        {
          path: 'vip',
          element: <VipUsers />,
          children: [
            {
              path: '/',
              element: (
                <RouteGuard>
                  <UsersVip />
                </RouteGuard>
              ),
            },
            { path: 'super', element: <div>supper</div> },
          ],
        },
        {
          path: 'posts/*',
          element: <Posts />,
          children: [
            {
              path: '/',
              element: <PostsIndex />,
            },
            { path: ':id', element: <PostDetail /> },
            { path: 'post', element: <OwnerPost /> },
          ],
        },
        { path: 'login', element: <Login /> },
        { path: '*', element: <NotFound /> },
      ])}
      <ChristmasTree />
    </div>
  );
};
