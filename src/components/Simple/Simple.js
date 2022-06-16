import React, { useEffect, useRef } from 'react'

export default function Simple({ id, children }) {
  const refSimple = useRef(null);

  useEffect(() => {
    refSimple.current.focus();
  }, []);

  return (
    <h1
      ref={refSimple}
      id={id}
      className="blue"
      contentEditable
      suppressContentEditableWarning
    >
      {children}
    </h1>
  );
}
