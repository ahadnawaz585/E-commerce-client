import { axiosInstance } from "@/core/utilities/header";
import { Wishlist } from "@/core/Types/whishlist";
import { paginatedData } from "@/core/Types/paginatedData";
import { BaseService } from "@/core/utilities/baseService";
import { environment } from "@/environment/environment";

class WishlistService extends BaseService {
    private baseUrl = environment.apiUrl + '/Wishlist';

    getWishlists(page: number, pageSize: number): Promise<paginatedData> {
        return axiosInstance.post<paginatedData>(`${this.baseUrl}/get`, {
            page,
            pageSize,
        }).then((response: { data: paginatedData; }) => response.data)
            .catch((error: paginatedData) => {
                console.error('Error getting Wishlist:', error);
                throw error;
            });
    }

    getWishlistSize(): Promise<number> {
        return axiosInstance.get<number>(`${this.baseUrl}/getSize`)
            .then((response: { data: number; }) => response.data)
            .catch((error: any) => {
                console.error('Error getting Wishlist count:', error);
                throw error;
            });
    }

    getWishlistById(id: string) {
        return axiosInstance.post(`${this.baseUrl}/getById`, { id })
            .then((response: { data: Wishlist; }) => response.data)
            .catch((error: any) => {
                console.error('Error getting Wishlist By Id:', error);
                throw error;
            });
    }

    createWishlist(newData: Wishlist) {
        return axiosInstance.post<void>(`${this.baseUrl}/create`, newData)
            .catch((error: any) => {
                console.error('Error creating Wishlist:', error);
                throw error;
            });
    }

    updateWishlist(updatedData: Wishlist, id: string) {
        return axiosInstance.put<void>(`${this.baseUrl}/update`, { "id": id, "data": updatedData })
            .catch((error: any) => {
                console.error('Error updating Wishlist:', error);
                throw error;
            });
    }

    deleteWishlist(id: string) {
        return axiosInstance.post<void>(`${this.baseUrl}/delete`, { id })
            .catch((error: any) => {
                console.error('Error deleting Wishlist:', error);
                throw error;
            });
    }

    restoreWishlist(id: string) {
        return axiosInstance.post<void>(`${this.baseUrl}/restore`, { id })
            .catch((error: any) => {
                console.error('Error restoring Wishlist:', error);
                throw error;
            });
    }
}

export default WishlistService;
