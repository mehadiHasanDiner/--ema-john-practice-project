import React, { useEffect, useState } from "react";
import Product from "../Product/Product";
import Cart from "../Cart/Cart";
import { addToDB, getShoppingCartData } from "../../utilities/fakedb2";

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [addCart, setAddCart] = useState([]);

  // Original way:
  // const handleAddToCart = (product) => {
  //   const newCart = [...addCart, product];
  //   setAddCart(newCart);
  //   addToDB(product.id);
  // };

  // optional/alternative way
  const handleAddToCart = (product) => {
    let newCart = [];
    // if product does not exist in the cart, then set quantity = 1;
    // if exist update quantity by 1;

    const exists = addCart.find((pd) => pd.id === product.id); //[এড টু কাট বাটনে ক্লিক করার পর লোকাল স্টোরেজে থাকা আইডির সাথে প্রোডাক্টের আইডি ম্যাচ করে পুরো প্রোডাক্টটাকে exists ভেরিয়াবেলে নিয়ে আসলাম]

    // প্রোডাক্ট যদি লোকাল স্টোরেজে exist না করে প্রোডাক্টের quantity 0 কে 1 সেট করে newCart সেট করলাম।
    if (!exists) {
      product.quantity = 1; //[এখানে মেইন প্রোডাক্টের quantity 1 সেট করছি।]
      newCart = [...addCart, product];
    } else {
      exists.quantity = exists.quantity + 1; //[এখানে exists ভেরিয়াবেলে পাওয়া quantity 1 এর সাথে 1 যোগ করে exists ভেরিয়াবেলে quantity কে বাড়াচ্ছি]
      const remaining = addCart.filter((pd) => pd.id !== product.id);

      // এখানে addCart Array-এর রিপ্রেজেনটিটিভ হচ্ছে savedCart Array
      // [savedCart Array-এর id-এর সাথে পুরো product Array এর  id-এর find, filter করছি]
      newCart = [...remaining, exists];
    }
    setAddCart(newCart);
    addToDB(product.id);
  };

  useEffect(() => {
    const storedCart = getShoppingCartData();
    const savedCart = [];
    // step 1: get id.
    for (const id in storedCart) {
      // step 2: get the product by using the id.
      const addedProduct = products.find((product) => product.id === id);
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
  }, [products]);

  useEffect(() => {
    fetch("products.json")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  return (
    <div className="flex justify-between px-16 relative">
      {/* <h3>Total Products: {products.length}</h3> */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-3/4">
        {products.map((product) => (
          <Product
            product={product}
            key={product.id}
            handleAddToCart={handleAddToCart}
          ></Product>
        ))}
      </div>

      <div className="px-4 bg-fuchsia-900 mx-4 w-1/4 leading-normal fixed top-0 right-0 mt-16">
        <h3 className="text-center font-bold text-xl py-4">Cart Container</h3>
        <h4 className="text-center font-bold text-md ">
          Product Added: {addCart.length}
        </h4>
        <Cart addCart={addCart}></Cart>
      </div>
    </div>
  );
};

export default Shop;
