import React, { useContext, useState, useMemo, useEffect, useRef } from "react";
import "./CSS/ShopCategory.css";
import { ShopContext } from "../Context/ShopContext";
import Item from "../Components/Item/Item";

const ShopCategory = (props) => {
  const { all_product } = useContext(ShopContext);
  const [search, setSearch] = useState("");
  const scrollPosition = useRef(window.scrollY);

  // Capture scroll position before updating state
  const handleSearchChange = (e) => {
    scrollPosition.current = window.scrollY;
    setSearch(e.target.value);
  };

  // Memoize the filtered products to prevent unnecessary re-renders
  const filteredProducts = useMemo(() => {
    return all_product.filter(
      (item) =>
        item.category === props.category &&
        item.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [all_product, props.category, search]);

  // Restore scroll position after state change
  useEffect(() => {
    window.scrollTo(0, scrollPosition.current);
  }, [filteredProducts]);

  return (
    <div className="shop-category">
      <img className="shopcategory-banner" src={props.banner} alt="" />
      <div className="shopcategory-indexSort">
        <input
          type="text"
          onChange={handleSearchChange}
          className="shopcategory-Search"
          value={search}
          placeholder="Search for items..."
        />
      </div>
      <div className="shopcategory-products">
        {filteredProducts.map((item) => (
          <Item
            key={item.id}
            id={item.id}
            name={item.name}
            image={item.image}
            new_price={item.new_price}
            old_price={item.old_price}
          />
        ))}
      </div>
      {/* <div className="shopcategory-loadmore">Explore More</div> */}
    </div>
  );
};

export default ShopCategory;
