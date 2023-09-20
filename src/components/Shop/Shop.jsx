import React, { useEffect, useState } from 'react';
import Product from '../Product/Product';
import Cart from '../Cart/Cart';

const Shop = () => {
    const [products, setProducts] = useState([]);
    const [addCart, setAddCart] = useState([]);

    const handleAddToCart = (item) => {
        const newCart = [...addCart, item];
        setAddCart(newCart);
        console.log(addCart);
    }

    useEffect(() =>{
        fetch('products.json')
        .then(res=>res.json())
        .then(data => setProducts(data))
    }, [])

    return (
        <div className='flex justify-between px-16 relative'>
            {/* <h3>Total Products: {products.length}</h3> */}
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-3/4'>
                {
                products.map(product =><Product product={product} key={product.id} handleAddToCart={handleAddToCart}></Product>)
            }
            </div>

            <div className='px-4 bg-fuchsia-900 mx-4 w-1/4 leading-normal fixed top-0 right-0 mt-16'>
                <h3 className='text-center font-bold text-xl py-4'>Cart Container</h3>
                <Cart addCart={addCart}>
                </Cart>
            </div>
        </div>
    );
};

export default Shop;