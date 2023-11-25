import React, { Fragment, useEffect, useState } from "react";
import "./Products.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, getProduct } from "../../actions/productAction";
import Loader from "../layout/Loader/Loader";
import ProductCard from "../Home/ProductCard";
import Pagination from "react-js-pagination";
import { toast } from "react-toastify";
import MetaData from "../layout/MetaData";
import { useParams } from "react-router-dom";

const categories = [
  "Laptop",
  "Footwear",
  "Attire",
  "Camera",
  "Phones",
  "Accessories"
];

const Products = ({ match }) => {
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([0, 100000]);
  const [category, setCategory] = useState("");

  const [ratings, setRatings] = useState(0);

  const {
    products,
    loading,
    error,
    productsCount,
    resultPerPage,
    filteredProductsCount,
  } = useSelector((state) => state.products);

  const { keyword } = useParams();

  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };

  const priceHandler = (event) => {
    const newPrice = event.target.value;  
    setPrice([0, newPrice]);  // Update this line to set both values in the price array
  };

  let count = filteredProductsCount;

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    dispatch(getProduct(keyword, currentPage, price, category, ratings));
  }, [dispatch, keyword, currentPage, price, category, ratings, error]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="PRODUCTS -- ECOMMERCE" />
          <h2 className="productsHeading">Products</h2>

          <div className="products">
            {products &&
              products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
          </div>

          <div className="filterBox">
            <label>Price</label>
            <input
              type="range"
              min="0"
              max="100000"
              step="5000" // Set the step to 5000
              value={price[1]}
              onChange={priceHandler}
              list="priceList" // Reference the datalist
            />
            <span style={{ textAlign: "center" }}>{`₹0 - ₹${price[1]}`}</span>
            <br />

            <datalist id="priceList">
              <option value="0" label="₹0" />
              {Array.from({ length: 21 }, (_, index) => index * 5000).map((value) => (
                <option key={value} value={value} label={`₹${value}`} />
              ))}
            </datalist>

            <label>Categories</label>
            <ul className="categoryBox">
              {categories.map((category) => (
                <li
                  className="category-link"
                  key={category}
                  onClick={() => setCategory(category)}
                >
                  {category}
                </li>
              ))}
            </ul>

            <fieldset>
              <label component="legend">Ratings Above</label>
              <input
                type="range"
                min="0"
                max="5"
                step="1"
                value={ratings}
                style={{ width: "90%" }}
                onChange={(e) => setRatings(e.target.value)}
                list="ratingsList"
              />
              <datalist id="ratingsList">
                <option value="0" label="0" />
                <option value="1" label="1" />
                <option value="2" label="2" />
                <option value="3" label="3" />
                <option value="4" label="4" />
                <option value="5" label="5" />
              </datalist>

            </fieldset>
          </div>
          {resultPerPage < count && (
            <div className="paginationBox">
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={resultPerPage}
                totalItemsCount={productsCount}
                onChange={setCurrentPageNo}
                nextPageText="Next"
                prevPageText="Prev"
                firstPageText="1st"
                lastPageText="Last"
                itemClass="page-item"
                linkClass="page-link"
                activeClass="pageItemActive"
                activeLinkClass="pageLinkActive"
              />
            </div>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

export default Products;
