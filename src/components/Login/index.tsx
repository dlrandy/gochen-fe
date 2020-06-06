import React from 'react';
import { useLocation } from 'react-router';

export default function Index() {
  const location = useLocation();
  console.log(location);

  return <div>login</div>;
}
