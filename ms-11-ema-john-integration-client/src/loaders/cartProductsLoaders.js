import { getShoppingCartData } from "../utilities/fakedb2";

const cartProductsLoaders = async () => {
  const storedCart = getShoppingCartData();
  const ids = Object.keys(storedCart);
  console.log(ids);

  const loadedProducts = await fetch(
    `http://localhost:5000/productsByIds?page=0&limit=1000000`,
    {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(ids),
    }
  );
  const products = await loadedProducts.json();
  // console.log(products);

  // if cart data is in fake-database, you have to use async await
  // কারণ আমি জানি না বাইরের এই ফেক-ডাটাবেজে প্রোডাক্ট আছে কি-না। তাই async await। ডাটা পাওয়া পর্যন্ত সে অপেক্ষা করবে।
  // নরমাল্লি আমরা useEffect ব্যবহার করি কারন আমরা জানি যে প্রোডাক্ট আছে।

  const savedCart = [];
  for (const id in storedCart) {
    const addedProduct = products.find((p) => p._id === id);
    if (addedProduct) {
      const quantity = storedCart[id];
      addedProduct.quantity = quantity;
      savedCart.push(addedProduct);
    }
  }
  return savedCart;
};

/**
 * জাভাস্ক্রিপ্ট কখন দুইটা জিনিস রিটার্ন করে না। দুইটা বা তারবেশি রিটার্ন করার জন্য একটা Array অথবা Object তে রিটার্ন করতে হবে।
 * যেমন return [saveCart, saveProduct]
 * যেমন return {saveCart, saveProduct}
 * যেমন return {saveCart, cart: saveProduct}
 */

export default cartProductsLoaders;
