"use client"
import React, { useState } from 'react';
import ProductService from '@/core/Services/product.service';
import { Product } from '@/core/Types/product';

const ProductForm: React.FC = () => {
    const productService: ProductService = new ProductService();
    const [formData, setFormData] = useState<Product>({
        name: '',
        description: '',
        price: 0,
        category: '',
        stock_quantity: 0,
        image: ''
    });
    const [error, setError] = useState<string>('');
    const [success, setSuccess] = useState<boolean>(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files && e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64 = reader.result?.toString() || '';
                setFormData(prevState => ({
                    ...prevState,
                    image: base64
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const price = Number(formData.price);
        const stockQuantity = Number(formData.stock_quantity);

        if (!isNaN(price) && !isNaN(stockQuantity)) {
            try {
                const formDataWithNumbers: Product = {
                    ...formData,
                    price,
                    stock_quantity: stockQuantity
                };
                console.log('Form submitted with data:', formDataWithNumbers);
                await productService.createProduct(formDataWithNumbers);
                setSuccess(true);
                setError('');
                setFormData({
                    name: '',
                    description: '',
                    price: 0,
                    category: '',
                    stock_quantity: 0,
                    image: ''
                });
            } catch (error) {
                console.error(error);
                setError('An error occurred while adding the product.');
                setSuccess(false);
            }
        } else {
            setError('Price or stock quantity is not a valid number.');
            setSuccess(false);
        }
    };

    return (
        <div className="max-w-xl mx-auto">
            <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="image">
                        Product Image
                    </label>
                    <div className="flex items-center justify-center mb-4">
                        <img
                            src={formData.image || '/images/logo.png'}
                            alt="Product Preview"
                            className="h-40 w-auto object-contain border border-gray-300"
                        />
                    </div>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="image"
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        required
                    />
                </div>
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                            Product Name
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="name"
                            type="text"
                            placeholder="Enter product name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="w-full md:w-1/2 px-3">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="price">
                            Price (Rs)
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="price"
                            type="text"
                            placeholder="Enter product price"
                            name="price"
                            min={0}
                            value={formData.price}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full px-3">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                            Product Description
                        </label>
                        <textarea
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="description"
                            placeholder="Enter product description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>
                <div className="flex flex-wrap -mx-3 mb-6">
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="category">
                            Category
                        </label>
                        <select
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="category"
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select a category</option>
                            <option value="Electronics">Electronics</option>
                            <option value="Clothing">Clothing</option>
                            <option value="Books">Books</option>
                            {/* Add more options as needed */}
                        </select>
                    </div>
                    <div className="w-full md:w-1/2 px-3">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="stock_quantity">
                            Stock Quantity
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="stock_quantity"
                            type="text"
                            min={0}
                            placeholder="Enter stock quantity"
                            name="stock_quantity"
                            value={formData.stock_quantity}
                            onChange={handleChange}
                            required
                        />
                    </div>
                </div>
                {error && <div className="text-red-500">{error}</div>}
                {success && <div className="text-green-700">Product added successfully!</div>}
                <div className="flex items-center justify-between">
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="submit"
                    >
                        Add Product
                    </button>
                </div>


            </form>
        </div>
    );
};

export default ProductForm;
