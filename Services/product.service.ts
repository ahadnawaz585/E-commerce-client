import { axiosInstance } from "@/core/utilities/header";
import { Product } from "@/core/Types/product";
import { paginatedData } from "@/core/Types/paginatedData";
import { BaseService } from "@/core/utilities/baseService";
import { environment } from "@/environment/environment";

class ProductService extends BaseService {
    private baseUrl = environment.apiUrl + '/Products';

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
            .then((response: { data: Product; }) => response.data)
            .catch((error: any) => {
                console.error('Error getting Products:', error);
                throw error;
            });
    }

    getProductById(id: string) {
        return axiosInstance.get<Product>(`${this.baseUrl}/getById`, { id })
            .then((response: { data: Product; }) => response.data)
            .catch((error: any) => {
                console.error('Error getting Product By Id:', error);
                throw error;
            });
    }

    getProductByCategory(category: string) {
        return axiosInstance.get<Product>(`${this.baseUrl}/getByCategory`, { category })
            .then((response: { data: Product; }) => response.data)
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
        return axiosInstance.post<Product>(`${this.baseUrl}/getByName`, { "Name": name })
            .then((response: { data: Product; }) => response.data)
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

    restoreProduct(id: string) {
        return axiosInstance.post<void>(`${this.baseUrl}/restore`, { id })
            .catch((error: any) => {
                console.error('Error restoring chart of account:', error);
                throw error;
            });
    }
}

export default ProductService;