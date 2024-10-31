import React, { useEffect, useState } from "react";
import "./NewCollections.css";
// import new_collection from "../Assets/Frontend_Assets/new_collections";
import Item from "../Item/Item";
import { Link } from "react-router-dom";

const NewCollections = () => {
  const [new_collection, setNew_collection] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_URL}newcollections`)
      .then((response) => response.json())
      .then((data) => setNew_collection(data));
  }, []);

  return (
    <div className="new-collections">
      <h1>
        <Link to="/tshirt" style={{ textDecoration: "none" }}>
          NEW COLLECTIONS
        </Link>
      </h1>
      <hr />
      <div className="collections">
        {new_collection.map((item, i) => {
          return (
            <Item
              key={i}
              id={item.id}
              name={item.name}
              image={item.image}
              new_price={item.new_price}
              old_price={item.old_price}
            />
          );
        })}
      </div>
    </div>
  );
};

export default NewCollections;
