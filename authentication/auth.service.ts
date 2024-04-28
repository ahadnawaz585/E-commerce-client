import axios from "axios";
import Cookies from "js-cookie";
import { environment } from "../environment/environment";
import { User } from "@/core/Types/user";

class AuthService {
  private cookieKey = "auth_token";
  private baseUrl = environment.apiUrl + "/user";

  async login(credentials: User): Promise<any> {
    try {
      const response = await axios.post<any>(
        `${this.baseUrl}/login`,
        credentials
      );
      return response.data.message;
    } catch (error) {
      console.error("Login error:", error); // Add error handling
      throw error;
    }
  }

  async verifyOTP(credentials: User) {
    try {
      const response = await axios.post<any>(
        `${this.baseUrl}/veriyOTP`,
        credentials
      );
      if (response.data.token) {
        this.setToken(response.data.token);
      }
      return response;
    } catch (error) {
      console.error("Login error:", error); // Add error handling
      throw error;
    }
  }

  async signUp(credentials: User): Promise<void> {
    try {
      await axios.post<any>(`${this.baseUrl}/signUp`, credentials);
      return;
    } catch (error) {
      console.error("Login error:", error); // Add error handling
      throw error;
    }
  }

  async logout(): Promise<any> {
    const token = this.getToken();
    try {
      await axios.get(`${this.baseUrl}/logout`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });
      this.clearToken();
    } catch (error) {
      console.error("Logout error:", error); // Add error handling
      throw error;
    }
  }

  setToken(token: string): void {
    // Set the token as an HTTP-only cookie
    Cookies.set(this.cookieKey, token); // Ensure secure cookies
  }

  getToken(): string | undefined {
    return Cookies.get(this.cookieKey);
  }

  clearToken(): void {
    Cookies.remove(this.cookieKey);
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    return token !== null && token !== undefined;
  }
}

export default AuthService;
