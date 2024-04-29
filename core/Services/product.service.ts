import { axiosInstance } from "@/core/utilities/header";
import { Product } from "@/core/Types/product";
import { Review } from "@/core/Types/review";
import { paginatedData } from "@/core/Types/paginatedData";
import { BaseService } from "@/core/utilities/baseService";
import { environment } from "@/environment/environment";

class ProductService extends BaseService {
    private baseUrl = environment.apiUrl + '/product';

    getProducts(page: number, pageSize: number): Promise<paginatedData> {

        return axiosInstance.post<paginatedData>(`${this.baseUrl}/get`, {
            page,
            pageSize,
        }).then((response: { data: paginatedData; }) => response.data)
            .catch((error: paginatedData) => {
                console.error('Error getting Products:', error);
                throw error;
            });
    }

    getAllProducts(): Promise<Product[]> {
        return axiosInstance.get<Product[]>(`${this.baseUrl}/get`)
            .then(response => response.data)
            .catch((error: any) => {
                console.error('Error getting Products:', error);
                throw error;
            });
    }

    getProductById(id: string) {
        return axiosInstance.post<Product>(`${this.baseUrl}/getById`, { id })
            .then(response => response.data)
            .catch((error: any) => {
                console.error('Error getting Product By Id:', error);
                throw error;
            });
    }

    getProductByCategory(category: string) {
        return axiosInstance.post<Product[]>(`${this.baseUrl}/getByCategory`, { category })
            .then(response => response.data)
            .catch((error: any) => {
                console.error('Error getting Product By Category:', error);
                throw error;
            });
    }


    updateProduct(updatedData: Product, id: string) {
        return axiosInstance.put<void>(`${this.baseUrl}/update`, { "id": id, "data": updatedData })
            .catch((error: any) => {
                console.error('Error updating Product:', error);
                throw error;
            });
    }

    getProductByName(name: string) {
        return axiosInstance.post<Product>(`${this.baseUrl}/getByName`, { name })
            .then(response => response.data)
            .catch((error: any) => {
                console.error('Error getting product by name:', error);
                throw error;
            });
    }


    createProduct(newData: Product) {
        return axiosInstance.post<void>(`${this.baseUrl}/create`, newData)
            .catch((error: any) => {
                console.error('Error creating Product:', error);
                throw error;
            });
    }

    deleteProduct(id: string) {
        return axiosInstance.post<void>(`${this.baseUrl}/delete`, { id })
            .catch((error: any) => {
                console.error('Error deleting Product:', error);
                throw error;
            });
    }
    getSize(): Promise<any> {
        return axiosInstance.get<Product[]>(`${this.baseUrl}/getSize`)
            .then(response =>response.data)
            .catch((error: any) => {
                console.error('Error getting Product:', error);
                throw error;
            });
    }
    restoreProduct(id: string) {
        return axiosInstance.post<void>(`${this.baseUrl}/restore`, { id })
            .catch((error: any) => {
                console.error('Error restoring product:', error);
                throw error;
            });
    }
    Productreviews(id: string) {
        return axiosInstance.post<{ product: Product, reviews: Review[] }[]>(`${this.baseUrl}/Productreviews`, { id })
            .catch((error: any) => {
                console.error('Error showing product:', error);
                throw error;
            });
    }
    allProductWithreviews() {
        return axiosInstance.get<{ product: Product, reviews: Review[] }[]>(`${this.baseUrl}/allProductWithreviews`,)
            .catch((error: any) => {
                console.error('Error showing product:', error);
                throw error;
            });
    }
    recentReviews() {
        return axiosInstance.get<{ product: Product; recentReview: Review | null }[]>(`${this.baseUrl}/recentReviews`,)
            .catch((error: any) => {
                console.error('Error showing product:', error);
                throw error;
            });
    }
    reviewsWithAvgRating() {
        return axiosInstance.get<{ product: Product; recentReview: Review | null }[]>(`${this.baseUrl}/reviewsWithAvgRating`,)
            .catch((error: any) => {
                console.error('Error showing product:', error);
                throw error;
            });
    }
}

export default ProductService;