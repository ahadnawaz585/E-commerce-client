import { axiosInstance } from "@/core/utilities/header";
import { Review } from "@/core/Types/review";
import { paginatedData } from "@/core/Types/paginatedData";
import { BaseService } from "@/core/utilities/baseService";
import { environment } from "@/environment/environment";

class ReviewService extends BaseService {
    private baseUrl = environment.apiUrl + '/Review'; // Assuming the base URL for review table routes is '/Review'

    getReviews(page: number, pageSize: number): Promise<paginatedData> {
        return axiosInstance.post<paginatedData>(`${this.baseUrl}/get`, {
            page,
            pageSize,
        }).then((response: { data: paginatedData; }) => response.data)
            .catch((error: paginatedData) => {
                console.error('Error getting Review:', error);
                throw error;
            });
    }

    getReviewSize(): Promise<number> {
        return axiosInstance.get<number>(`${this.baseUrl}/getSize`)
            .then((response: { data: number; }) => response.data)
            .catch((error: any) => {
                console.error('Error getting Review count:', error);
                throw error;
            });
    }

    getReviewById(id: string) {
        return axiosInstance.post(`${this.baseUrl}/getById`, { id })
            .then((response: { data: Review; }) => response.data)
            .catch((error: any) => {
                console.error('Error getting Review By Id:', error);
                throw error;
            });
    }

    createReview(newData: Review) {
        return axiosInstance.post<void>(`${this.baseUrl}/create`, newData)
            .catch((error: any) => {
                console.error('Error creating Review:', error);
                throw error;
            });
    }

    updateReview(updatedData: Review, id: string) {
        return axiosInstance.put<void>(`${this.baseUrl}/update`, { "id": id, "data": updatedData })
            .catch((error: any) => {
                console.error('Error updating Review:', error);
                throw error;
            });
    }

    deleteReview(id: string) {
        return axiosInstance.post<void>(`${this.baseUrl}/delete`, { id })
            .catch((error: any) => {
                console.error('Error deleting Review:', error);
                throw error;
            });
    }

    restoreReview(id: string) {
        return axiosInstance.post<void>(`${this.baseUrl}/restore`, { id })
            .catch((error: any) => {
                console.error('Error restoring Review:', error);
                throw error;
            });
    }
}

export default ReviewService;

