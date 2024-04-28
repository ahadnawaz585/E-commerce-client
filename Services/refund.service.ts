import { axiosInstance } from "@/core/utilities/header";
import { Refund } from "@/core/Types/refund"; // Assuming there's a Refund type defined
import { paginatedData } from "@/core/Types/paginatedData";
import { BaseService } from "@/core/utilities/baseService";
import { environment } from "@/environment/environment";

class RefundService extends BaseService {
    private baseUrl = environment.apiUrl + '/Refund'; // Assuming the base URL for refund routes is '/Refund'

    getAllRefunds(page: number, pageSize: number): Promise<paginatedData> {
        return axiosInstance.post<paginatedData>(`${this.baseUrl}/get`, {
            page,
            pageSize,
        }).then((response: { data: paginatedData; }) => response.data)
            .catch((error: paginatedData) => {
                console.error('Error getting Refunds:', error);
                throw error;
            });
    }

    getRefundSize(): Promise<number> {
        return axiosInstance.get<number>(`${this.baseUrl}/getSize`)
            .then((response: { data: number; }) => response.data)
            .catch((error: any) => {
                console.error('Error getting Refund count:', error);
                throw error;
            });
    }

    getRefundById(id: string) {
        return axiosInstance.post(`${this.baseUrl}/getById`, { id })
            .then((response: { data: Refund; }) => response.data)
            .catch((error: any) => {
                console.error('Error getting Refund By Id:', error);
                throw error;
            });
    }

    createRefund(newData: Refund) {
        return axiosInstance.post<void>(`${this.baseUrl}/create`, newData)
            .catch((error: any) => {
                console.error('Error creating Refund:', error);
                throw error;
            });
    }

    updateRefund(updatedData: Refund, id: string) {
        return axiosInstance.put<void>(`${this.baseUrl}/update`, { "id": id, "data": updatedData })
            .catch((error: any) => {
                console.error('Error updating Refund:', error);
                throw error;
            });
    }

    deleteRefund(id: string) {
        return axiosInstance.post<void>(`${this.baseUrl}/delete`, { id })
            .catch((error: any) => {
                console.error('Error deleting Refund:', error);
                throw error;
            });
    }

    restoreRefund(id: string) {
        return axiosInstance.post<void>(`${this.baseUrl}/restore`, { id })
            .catch((error: any) => {
                console.error('Error restoring Refund:', error);
                throw error;
            });
    }
}

export default RefundService;
