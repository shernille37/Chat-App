import React from 'react';

const Message = ({ variant, children }) => {
  return <div className={variant}>{children}</div>;
};

export default Message;
