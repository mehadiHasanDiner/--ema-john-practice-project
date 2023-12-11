import React, { useEffect, useState } from "react";
import Product from "../Product/Product";
import Cart from "../Cart/Cart";
import { ArrowRightCircleIcon } from "@heroicons/react/24/solid";

import {
  addToDB,
  deleteShoppingCart,
  getShoppingCartData,
} from "../../utilities/fakedb2";
import { Link, useLoaderData } from "react-router-dom";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [addCart, setAddCart] = useState([]);
  const { totalProducts } = useLoaderData();
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const totalPages = Math.ceil(totalProducts / itemsPerPage);

  console.log(totalPages);

  /**
   * Done: 1. Determine the total number of products
   * Done: 2. Decide on the number of items per page.
   * Done: 3. calculate the total number of pages.
   * Done: 4. Determine the current page:
   * */

  const pageNumbers = [...Array(totalPages).keys()]; //taking index (key not value) number of items per page
  const options = [8, 12, 15, 20];
  console.log(pageNumbers);

  const handleSelectChange = (event) => {
    setItemsPerPage(parseInt(event.target.value));
    setCurrentPage(0);
  };

  const handleClearCartFromDb = () => {
    setAddCart([]);
    deleteShoppingCart();
  };

  // Original way:
  // const handleAddToCart = (product) => {
  //   const newCart = [...addCart, product];
  //   setAddCart(newCart);
  //   addToDB(product._id);
  // };

  // optional/alternative way
  const handleAddToCart = (product) => {
    let newCart = [];
    // if product does not exist in the cart, then set quantity = 1;
    // if exist update quantity by 1;

    const exists = addCart.find((pd) => pd._id === product._id); //[এড টু কাট বাটনে ক্লিক করার পর লোকাল স্টোরেজে থাকা আইডির সাথে প্রোডাক্টের আইডি ম্যাচ করে পুরো প্রোডাক্টটাকে exists ভেরিয়াবেলে নিয়ে আসলাম]

    // প্রোডাক্ট যদি লোকাল স্টোরেজে exist না করে প্রোডাক্টের quantity 0 কে 1 সেট করে newCart সেট করলাম।
    if (!exists) {
      product.quantity = 1; //[এখানে মেইন প্রোডাক্টের quantity 1 সেট করছি।]
      newCart = [...addCart, product];
    } else {
      exists.quantity = exists.quantity + 1; //[এখানে exists ভেরিয়াবেলে পাওয়া quantity 1 এর সাথে 1 যোগ করে exists ভেরিয়াবেলে quantity কে বাড়াচ্ছি]
      const remaining = addCart.filter((pd) => pd._id !== product._id);

      // এখানে addCart Array-এর রিপ্রেজেনটিটিভ হচ্ছে savedCart Array
      // [savedCart Array-এর id-এর সাথে পুরো product Array এর  id-এর find, filter করছি]
      newCart = [...remaining, exists];
    }
    setAddCart(newCart);
    addToDB(product._id);
  };

  useEffect(() => {
    const storedCart = getShoppingCartData();
    const ids = Object.keys(storedCart);

    fetch(`http://localhost:5000/productsByIds?page=0&limit=1000000`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(ids),
    })
      .then((res) => res.json())
      .then((cartProducts) => {
        const savedCart = [];
        // step 1: get id.
        for (const id in storedCart) {
          // step 2: get the product by using the id.
          const addedProduct = cartProducts.find(
            (product) => product._id === id
          );
          // step 3: get the quantity of the product.
          if (addedProduct) {
            const quantity = storedCart[id];
            addedProduct.quantity = quantity;
            // step 4: add the added product to the saved cart.
            savedCart.push(addedProduct);
          }
        }
        // step 5: set the cart.
        setAddCart(savedCart);
      });
  }, []);

  // useEffect(() => {
  //   fetch("http://localhost:5000/products")
  //     .then((res) => res.json())
  //     .then((data) => setProducts(data));
  // }, []);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(
        `http://localhost:5000/products?page=${currentPage}&limit=${itemsPerPage}`
      );
      const data = await response.json();
      setProducts(data);
    }
    fetchData();
  }, [currentPage, itemsPerPage]);

  return (
    <>
      <div className="flex justify-between px-16 relative">
        {/* <h3>Total Products: {products.length}</h3> */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-3/4">
          {products.map((product) => (
            <Product
              product={product}
              key={product._id}
              handleAddToCart={handleAddToCart}
            ></Product>
          ))}
        </div>

        <div className="px-4 bg-fuchsia-900 mx-4 w-1/4 leading-normal fixed top-0 right-0 mt-16">
          <h3 className="text-center font-bold text-xl py-4">Cart Container</h3>
          <h4 className="text-center font-bold text-md ">
            Product Added: {addCart.length}
          </h4>
          <Cart addCart={addCart} handleClearCartFromDb={handleClearCartFromDb}>
            <div className="pb-4">
              <Link to="/orders">
                <button className="w-full btn btn-success">
                  Review Orders{" "}
                  <span className="">
                    <ArrowRightCircleIcon className="h-6 w-6 text-white" />
                  </span>
                </button>
              </Link>
            </div>
          </Cart>
        </div>
      </div>
      {/* {pagination} */}
      <div className="pagination text-center mt-10">
        <p>
          Current page: {currentPage} and items per page: {itemsPerPage}
        </p>
        {pageNumbers.map((number) => (
          <button
            className={
              currentPage === number ? "btn btn-neutral" : "btn btn-primary"
            }
            key={number}
            onClick={() => setCurrentPage(number)}
          >
            {number + 1}
          </button>
        ))}
        <select value={itemsPerPage} onChange={handleSelectChange}>
          {options.map((option) => (
            <option key={option} value={option}>
              {" "}
              {option}
            </option>
          ))}
        </select>
      </div>
    </>
  );
};

export default Shop;
