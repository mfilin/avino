import React from 'react';

interface IOwnProps {
  message: string;
}

const Error: React.FC<IOwnProps> = (props) => {
  const { message } = props;

  return <div>{message}</div>;
};

export default Error;
