"use client"
import React, { useState, useEffect, Suspense } from 'react';
import Loader from '@/components/shared/loader/loader';
import { Product } from '@/core/Types/product';
import ProductService from '@/core/Services/product.service';
import Link from 'next/link';
const ProductList = React.lazy(() => import('@/components/shared/productCard/productCard'));

const Products = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalProducts, setTotalProducts] = useState(0);
    const [deleteProductId, setDeleteProductId] = useState<string | null>(null); // State to store the ID of the product to be deleted
    const pageSize = 10; // Number of products per page
    const productService: ProductService = new ProductService();

    useEffect(() => {
        fetchData();
    }, [currentPage]); // Fetch data whenever the currentPage changes

    const fetchData = async () => {
        try {
            const data = await productService.getProducts(currentPage, pageSize);
            setProducts(data.data);
            setTotalProducts(data.totalSize);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const handleDelete = async (productId: string) => {
        // Set the ID of the product to be deleted in the state
        setDeleteProductId(productId);
    };

    const confirmDelete = (productId: string) => {
        return (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                <div className="bg-white p-8 rounded-lg">
                    <p className="text-xl mb-4">Are you sure you want to delete this product?</p>
                    <div className="flex justify-end">
                        <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-4" onClick={() => handleConfirmDelete(productId)}>Confirm</button>
                        <button className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={() => setDeleteProductId(null)}>Cancel</button>
                    </div>
                </div>
            </div>
        );
    };

    const handleConfirmDelete = async (productId: string) => {
        try {
            await productService.deleteProduct(productId);
            setDeleteProductId(null); // Clear the deleteProductId state
            fetchData();
        } catch (error) {
            console.error(error);
        }
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    return (
        <div className="container mx-auto px-4">
            <h1 className="text-3xl font-semibold mb-4 mt-8">Product </h1>
            <div className="mb-4"> {/* Add margin-bottom for spacing */}
                <Link href="/product/addProduct"> {/* Link to the "/addProduct" route */}
                    <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded shadow-lg focus:outline-none focus:shadow-outline">
                        Add Product
                    </button>
                </Link>
            </div>
            {deleteProductId && confirmDelete(deleteProductId)}
            <Suspense fallback={<Loader />}>
                <ProductList products={products} onDelete={handleDelete} />
            </Suspense>
            <Paginator currentPage={currentPage} totalPages={Math.ceil(totalProducts / pageSize)} onPageChange={handlePageChange} />
        </div>
    );
};

const Paginator: React.FC<{ currentPage: number; totalPages: number; onPageChange: (page: number) => void }> = ({
    currentPage,
    totalPages,
    onPageChange,
}) => {
    const getPageNumbers = () => {
        const pageNumbers = [];
        for (let i = 1; i <= totalPages; i++) {
            pageNumbers.push(i);
        }
        return pageNumbers;
    };

    return (
        <div className="flex justify-center mt-8">
            {getPageNumbers().map((page) => (
                <button
                    key={page}
                    className={`mx-1 px-3 py-1 rounded-md ${
                        currentPage === page ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
                    }`}
                    onClick={() => onPageChange(page)}
                >
                    {page}
                </button>
            ))}
        </div>
    );
};

export default Products;
