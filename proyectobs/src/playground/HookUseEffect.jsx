import React, { useState, useEffect } from 'react';

function PageTitleChanger() {
  const [title, setTitle] = useState('Página inicial');

  useEffect(() => {
    document.title = title;
  });

  return (
    <input
      type="text"
      value={title}
      onChange={(e) => setTitle(e.target.value)}
    />
  );
}