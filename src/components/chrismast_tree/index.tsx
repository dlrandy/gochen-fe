import React from 'react';
import NakeTree from '@Components/chrismast_tree/tree';

export default function ChristmasTree({ rows = 5 }) {
  return <NakeTree rowCount={rows} />;
}
