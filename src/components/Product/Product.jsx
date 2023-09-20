import React from 'react';

const fakePhoto = "https://source.unsplash.com/user/c_v_r";

const Product = (props) => {
    const {name, img, price, seller} = props.product;
    // console.log(props.product)
    const handleAddToCart = props.handleAddToCart

    return (
        <div className="card card-compact w-full bg-base-100 shadow-2xl bg-fuchsia-900 relative h-[420px]">
            <figure><img src={img?img:fakePhoto} alt="Shoes" /></figure>
                <div className="card-body flex-grow-0">
                    <h3 className="card-title text-sm">{name}</h3>
                    <p>Price: {price}</p>
                    <p>Seller: {seller}</p>
                    <div className="card-actions justify-end">
                    <button onClick={()=>handleAddToCart(props.product)} className=" btn bg-accent w-full absolute bottom-0 left-0 rounded-tr-none rounded-tl-none rounded-br-xl rounded-bl-xl">Add to cart 
                   <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" /></svg>
                    </button>
                </div>
                
            </div>
        </div>
    );
};

export default Product;