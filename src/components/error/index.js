import React from 'react';

export default function ErrorMessage(props) {
  return <div>{JSON.stringify(props.error)}</div>;
}
