import React, { useState } from "react";

const User = ({ name, location, email }) => {
  const [count, setCount] = useState(0);
  //const [count1] = useState(1);
  return (
    <div className="user-card">
      <h1>Count : {count}</h1>
      <button className="count-btn " onClick={() => setCount(count + 1)}>
         Increase count
      </button>
 
      <h2>Name: {name}</h2>
      <h3>Location: {location} </h3>
      <h3>Email Id: {email} </h3>
    </div>
  );
};

export default User;
