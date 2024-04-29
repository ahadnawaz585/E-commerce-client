import { axiosInstance } from "@/core/utilities/header";
import { ShoppingCart } from "@/core/Types/shoppingCart";
import { paginatedData } from "@/core/Types/paginatedData";
import { BaseService } from "@/core/utilities/baseService";
import { environment } from "@/environment/environment";

class ShoppingCartService extends BaseService {
    private baseUrl = environment.apiUrl + '/shoppingcart';

    getShoppingCart(page: number, pageSize: number): Promise<paginatedData> {

        return axiosInstance.post<paginatedData>(`${this.baseUrl}/get`, {
            page,
            pageSize,
        }).then((response: { data: paginatedData; }) => response.data)
            .catch((error: paginatedData) => {
                console.error('Error getting ShoppingCart:', error);
                throw error;
            });
    }

    getAllShoppingCarts(): Promise<ShoppingCart[]> {
        return axiosInstance.get<ShoppingCart[]>(`${this.baseUrl}/get`)
            .then(response => response.data)
            .catch((error: any) => {
                console.error('Error getting ShoppingCart:', error);
                throw error;
            });
    }

    getShoppingCartById(id: string) {
        return axiosInstance.post<ShoppingCart>(`${this.baseUrl}/getById`, { id })
            .then(response => response.data)
            .catch((error: any) => {
                console.error('Error getting ShoppingCart By Id:', error);
                throw error;
            });
    }
    updateShoppingCart(updatedData: ShoppingCart, id: string) {
        return axiosInstance.put<void>(`${this.baseUrl}/update`, { "id": id, "data": updatedData })
            .catch((error: any) => {
                console.error('Error updating ShoppingCart:', error);
                throw error;
            });
    }

    getShoppingCartByName(name: string) {
        return axiosInstance.post<ShoppingCart>(`${this.baseUrl}/getByName`, { name })
            .then(response => response.data)
            .catch((error: any) => {
                console.error('Error getting ShoppingCart by name:', error);
                throw error;
            });
    }


    createShoppingCart(newData: ShoppingCart) {
        return axiosInstance.post<void>(`${this.baseUrl}/create`, newData)
            .catch((error: any) => {
                console.error('Error creating ShoppingCart:', error);
                throw error;
            });
    }

    deleteShoppingCart(id: string) {
        return axiosInstance.post<void>(`${this.baseUrl}/delete`, { id })
            .catch((error: any) => {
                console.error('Error deleting ShoppingCart:', error);
                throw error;
            });
    }
    getSize(): Promise<any> {
        return axiosInstance.get<ShoppingCart[]>(`${this.baseUrl}/getSize`)
            .then(response =>  response.data)
            .catch((error: any) => {
                console.error('Error getting ShoppingCart:', error);
                throw error;
            });
    }
    restoreShoppingCart(id: string) {
        return axiosInstance.post<void>(`${this.baseUrl}/restore`, { id })
            .catch((error: any) => {
                console.error('Error restoring ShoppingCart:', error);
                throw error;
            });
    }
}

export default ShoppingCartService;