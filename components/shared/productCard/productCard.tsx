"use client"
import React, { useState } from 'react';
import { Product } from '@/core/Types/product';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faDownload, faShoppingCart, faTimes } from '@fortawesome/free-solid-svg-icons';
import ProductService from '@/core/Services/product.service';

const ProductCard: React.FC<{
    product: Product;
    onOpenModal: () => void;
    onAddToCart: (product: Product, quantity: number) => void;
    onDelete: (productId: string) => void; // Add onDelete prop to handle delete action
}> = ({ product, onOpenModal, onAddToCart, onDelete }) => {
    const [quantity, setQuantity] = useState(1); // State to store the quantity of the product

    const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        e.preventDefault();
        onAddToCart(product, quantity); // Call the parent component function to add the product to the cart with the specified quantity
    };

    const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        e.preventDefault();
        onDelete(product?.id || ''); // Pass the product ID to the onDelete function
    };

    return (
        <div className="max-w-sm rounded overflow-hidden shadow-lg cursor-pointer" onClick={onOpenModal}>

            <img className="w-full" src={product.image} alt="Product" />
            <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">{product.name}</div>
                <p className="text-gray-700 text-base">Description: {product.description}</p>
                <p className="text-gray-700 text-base">Price: Rs {product.price}</p>
                <p className="text-gray-700 text-base">Category: {product.category}</p>
                <p className="text-gray-700 text-base">Stock Quantity: {product.stock_quantity}</p>
            </div>
            <div className="px-6 pt-4 pb-2 flex items-center justify-between">
                <div>
                    <input
                        type="number"
                        value={quantity}
                        min={1}
                        onChange={(e) => setQuantity(parseInt(e.target.value))}
                        onClick={(e) => e.stopPropagation()} // Stop propagation of click event
                        className="bg-gray-200 text-center w-16 py-1 rounded-md mr-2"
                    />
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded focus:outline-none focus:shadow-outline text-sm"
                        onClick={handleAddToCart}
                    >
                        <FontAwesomeIcon icon={faShoppingCart} className="mr-1" /> Add to Cart
                    </button>
                    <button className="absolute  px-2 py-1" onClick={handleDelete}>
                        <FontAwesomeIcon icon={faTimes} className="text-red-500" />
                    </button>
                </div>
            </div>
        </div>
    );
};

const ProductList: React.FC<{ products: Product[] ,onDelete: (productId: string) => void;}> = ({ products ,onDelete}) => {
    const [cartItems, setCartItems] = useState<{ product: Product; quantity: number }[]>([]);
    const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
    const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
    const [orderSuccess, setOrderSuccess] = useState<boolean>(false);
    const prodService: ProductService = new ProductService();
    const openModal = (product: Product) => {
        setSelectedProduct(product);
    };

    const closeModal = () => {
        setSelectedProduct(null);
    };

    const addToCart = (product: Product, quantity: number) => {
        setIsCartOpen(true);
        const existingIndex = cartItems.findIndex((item) => item.product.id === product.id);

        if (existingIndex !== -1) {
            const updatedCartItems = [...cartItems];
            updatedCartItems[existingIndex].quantity += quantity;
            setCartItems(updatedCartItems);
        } else {
            setCartItems([...cartItems, { product, quantity }]);
        }
    };

    const removeFromCart = (index: number) => {
        const updatedCartItems = [...cartItems];
        updatedCartItems.splice(index, 1);
        setCartItems(updatedCartItems);
    };

    const getTotalPrice = () => {
        return cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0);
    };

    const placeOrder = () => {
        setOrderSuccess(true);
        setCartItems([]);
    };

    const generateSlip = (cartItems: { product: Product; quantity: number }[]) => {
        // Generate the printable slip content here
        const slipContent = `
            <html>
                <head>
                    <title>Order Slip</title>
                    <style>
                        /* Add any custom styles for the slip here */
                        body {
                            font-family: Arial, sans-serif;
                        }
                        table {
                            width: 100%;
                            border-collapse: collapse;
                            margin-bottom: 20px;
                        }
                        th, td {
                            border: 1px solid #ddd;
                            padding: 8px;
                            text-align: left;
                        }
                        th {
                            background-color: #f2f2f2;
                        }
                    </style>
                </head>
                <body>
                    <h1>Order Slip</h1>
                    <table>
                        <thead>
                            <tr>
                                <th>Product Name</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th>Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            ${cartItems.map((item, index) => `
                                <tr key=${index}>
                                    <td>${item.product.name}</td>
                                    <td>Rs ${item.product.price}</td>
                                    <td>${item.quantity}</td>
                                    <td>Rs ${item.product.price * item.quantity}</td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                    <p>Total Amount: Rs ${getTotalPrice()}</p>
                </body>
            </html>
        `;

        // Create a new window/tab with the slip content
        const slipWindow = window.open('', '_blank');
        slipWindow?.document.write(slipContent);
    };


    const downloadSlip = () => {
        // Generate the printable slip content here
        const slipContent = `
        <html>
        <head>
            <title>Order Slip</title>
            <style>
                /* Add any custom styles for the slip here */
                body {
                    font-family: Arial, sans-serif;
                }
                table {
                    width: 100%;
                    border-collapse: collapse;
                    margin-bottom: 20px;
                }
                th, td {
                    border: 1px solid #ddd;
                    padding: 8px;
                    text-align: left;
                }
                th {
                    background-color: #f2f2f2;
                }
            </style>
        </head>
        <body>
            <h1>Order Slip</h1>
            <table>
                <thead>
                    <tr>
                        <th>Product Name</th>
                        <th>Price</th>
                        <th>Quantity</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    ${cartItems.map((item, index) => `
                        <tr key=${index}>
                            <td>${item.product.name}</td>
                            <td>Rs ${item.product.price}</td>
                            <td>${item.quantity}</td>
                            <td>Rs ${item.product.price * item.quantity}</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
            <p>Total Amount: Rs ${getTotalPrice()}</p>
        </body>
    </html>
        `;

        // Create a blob with the slip content
        const blob = new Blob([slipContent], { type: 'text/html' });

        // Create a temporary anchor element
        const anchor = document.createElement('a');
        anchor.href = window.URL.createObjectURL(blob);
        anchor.download = 'order_slip.html';

        // Simulate a click on the anchor element to trigger the download
        anchor.click();

        // Cleanup
        window.URL.revokeObjectURL(anchor.href);
    };

   
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {products.map((product, index) => (
                <ProductCard key={index} product={product} onOpenModal={() => openModal(product)}
                    onDelete={onDelete}
                    onAddToCart={addToCart} />
            ))}
            {selectedProduct && (
                <div className="fixed inset-0 flex items-center justify-center z-50">
                    <div className="absolute inset-0 bg-black opacity-50" onClick={closeModal}></div>
                    <div className="bg-white p-8 rounded-lg z-50">
                        <button className="absolute top-0 right-0 px-4 py-2" onClick={closeModal}>
                            <FontAwesomeIcon icon={faTimes} />
                        </button>
                        <h2 className="text-2xl font-bold mb-4">{selectedProduct.name}</h2>
                        <img className="w-full h-64 object-cover mb-4" src={selectedProduct.image} alt="Product" />
                        <p>Description: {selectedProduct.description}</p>
                        <p>Price: Rs {selectedProduct.price}</p>
                        <p>Category: {selectedProduct.category}</p>
                        <p>Stock Quantity: {selectedProduct.stock_quantity}</p>
                    </div>
                </div>
            )}
            {isCartOpen && (
                <div className="fixed inset-y-0 right-0 max-w-xs w-full bg-white p-4 z-50">
                    <div className="flex items-center justify-between mb-4">
                        <h2 className="text-xl font-bold">Cart</h2>
                        <button className="text-gray-700" onClick={() => setIsCartOpen(false)}>
                            <FontAwesomeIcon icon={faTimes} />
                        </button>
                    </div>
                    <ul>
                        {cartItems.map((item, index) => (
                            <li key={index} className="flex items-center mb-2">
                                <img className="w-8 h-8 mr-2" src={item.product.image} alt="Product" />
                                <div>
                                    <p>{item.product.name}</p>
                                    <p className="text-gray-700">
                                        Rs {item.product.price} x {item.quantity}
                                    </p>
                                </div>
                                <button className="ml-auto text-gray-700" onClick={() => removeFromCart(index)}>
                                    <FontAwesomeIcon icon={faTimes} />
                                </button>
                            </li>
                        ))}
                    </ul>
                    <div className="border-t mt-4 pt-4">
                        <p className="font-bold">Total: Rs {getTotalPrice()}</p>
                    </div>
                    <button
                        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full shadow-lg focus:outline-none focus:shadow-outline mt-4"
                        onClick={placeOrder}
                    >
                        Place Order
                    </button>
                    {orderSuccess && (
                        <div className="flex items-center mt-4">
                            <FontAwesomeIcon icon={faCheck} className="text-green-500 mr-2" />
                            <p className="text-green-500 font-bold">Order placed successfully!</p>
                        </div>
                    )}
                    {orderSuccess && (
                        <div className="mt-4">
                            <button
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full shadow-lg focus:outline-none focus:shadow-outline"
                                onClick={() => generateSlip(cartItems)}
                            >
                                View Slip
                            </button>

                            <button
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full shadow-lg focus:outline-none focus:shadow-outline ml-4"
                                onClick={downloadSlip}
                            >
                                <FontAwesomeIcon icon={faDownload} className="mr-2" />
                                Download Slip
                            </button>
                        </div>
                    )}
                </div>
            )}
            <div className="fixed bottom-0 right-0 m-4">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full shadow-lg focus:outline-none focus:shadow-outline" onClick={() => setIsCartOpen(!isCartOpen)}>
                    <FontAwesomeIcon icon={faShoppingCart} />
                </button>
            </div>
        </div>
    );
};

export default ProductList;