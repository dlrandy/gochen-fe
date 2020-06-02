import React from 'react';

const NEEDLE_CLASS = 'needle';

function keyTag(strings: TemplateStringsArray, index: number, key: number) {
  console.log(strings, 'strings');
  return `${index}${key}`;
}

export default function NakedTree({ rowCount = 3 }) {
  const tree = [];
  for (let i = 1; i <= rowCount; i++) {
    let key = 0;
    for (let j = 0; j <= rowCount - i; j++) {
      tree.push(<span key={keyTag`${i}${key}`}>&nbsp;&nbsp;</span>);
      key += 1;
    }
    for (let k = 1; k < 2 * i; k++) {
      tree.push(
        <span key={keyTag`${i}${key}`} className={NEEDLE_CLASS}>
          1
        </span>
      );
      key += 1;
    }
    tree.push(<br />);
  }

  return <div>{tree}</div>;
}
