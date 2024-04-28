import { axiosInstance } from "@/core/utilities/header";
import { Order } from "@/core/Types/order";
import { OrderStatus } from "@/core/enums/orderStatus";
import { paginatedData } from "@/core/Types/paginatedData";
import { BaseService } from "@/core/utilities/baseService";
import { environment } from "@/environment/environment";

class OrderService extends BaseService {
    private baseUrl = environment.apiUrl + '/Order';

    getOrders(page: number, pageSize: number): Promise<paginatedData> {

        return axiosInstance.post<paginatedData>(`${this.baseUrl}/get`, {
            page,
            pageSize,
        }).then((response: { data: paginatedData; }) => response.data)
            .catch((error: paginatedData) => {
                console.error('Error getting Order:', error);
                throw error;
            });
    }

    getSize(): Promise<number[]> {
        return axiosInstance.get<Order[]>(`${this.baseUrl}/getSize`)
            .then((response: { data: number; }) => response.data)
            .catch((error: any) => {
                console.error('Error getting Order:', error);
                throw error;
            });
    }
    getAllOrders(): Promise<Order[]> {
        return axiosInstance.get<Order[]>(`${this.baseUrl}/get`)
            .then((response: { data: Order; }) => response.data)
            .catch((error: any) => {
                console.error('Error getting Order:', error);
                throw error;
            });
    }

    getOrderById(id: string) {
        return axiosInstance.get<Order>(`${this.baseUrl}/getById`, { id })
            .then((response: { data: Order; }) => response.data)
            .catch((error: any) => {
                console.error('Error getting Order By Id:', error);
                throw error;
            });
    }

    getPendingOrder(value: OrderStatus) {
        return axiosInstance.get<Order>(`${this.baseUrl}/getPending`, { value })
            .then((response: { data: Order; }) => response.data)
            .catch((error: any) => {
                console.error('Error getting Order By Id:', error);
                throw error;
            });
    }


    updateOrder(updatedData: Order, id: string) {
        return axiosInstance.put<void>(`${this.baseUrl}/update`, { "id": id, "data": updatedData })
            .catch((error: any) => {
                console.error('Error updating Product:', error);
                throw error;
            });
    }


    createOrder(newData: Order) {
        return axiosInstance.post<void>(`${this.baseUrl}/create`, newData)
            .catch((error: any) => {
                console.error('Error creating Product:', error);
                throw error;
            });
    }

    deleteOrder(id: string) {
        return axiosInstance.post<void>(`${this.baseUrl}/delete`, { id })
            .catch((error: any) => {
                console.error('Error deleting Product:', error);
                throw error;
            });
    }

    restoreOrder(id: string) {
        return axiosInstance.post<void>(`${this.baseUrl}/restore`, { id })
            .catch((error: any) => {
                console.error('Error restoring product:', error);
                throw error;
            });
    }
}

export default OrderService;