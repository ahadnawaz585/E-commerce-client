import axios from "axios";
import Cookies from "js-cookie";
import { environment } from "../environment/environment";
import { User } from "next-auth";

class AuthService {
  private cookieKey = "auth_token";
  private baseUrl = environment.apiUrl + "/user";

  async login(credentials: User): Promise<any> {
    try {
      const response = await axios.post<any>(
        `${this.baseUrl}/login`,
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