// API service layer for admin panel
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

class ApiService {
  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;
    
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Users API
  async getUsers(params?: { page?: number; limit?: number; search?: string }) {
    const searchParams = new URLSearchParams();
    if (params?.page) searchParams.append('page', params.page.toString());
    if (params?.limit) searchParams.append('limit', params.limit.toString());
    if (params?.search) searchParams.append('search', params.search);
    
    return this.request(`/admin/users?${searchParams}`);
  }

  async getUserById(id: string) {
    return this.request(`/admin/users/${id}`);
  }

  async updateUser(id: string, data: any) {
    return this.request(`/admin/users/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteUser(id: string) {
    return this.request(`/admin/users/${id}`, {
      method: 'DELETE',
    });
  }

  // Listings API
  async getListings(params?: { page?: number; limit?: number; category?: string; status?: string }) {
    const searchParams = new URLSearchParams();
    if (params?.page) searchParams.append('page', params.page.toString());
    if (params?.limit) searchParams.append('limit', params.limit.toString());
    if (params?.category) searchParams.append('category', params.category);
    if (params?.status) searchParams.append('status', params.status);
    
    return this.request(`/admin/listings?${searchParams}`);
  }

  async getListingById(id: string) {
    return this.request(`/admin/listings/${id}`);
  }

  async updateListing(id: string, data: any) {
    return this.request(`/admin/listings/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteListing(id: string) {
    return this.request(`/admin/listings/${id}`, {
      method: 'DELETE',
    });
  }

  // Analytics API
  async getAnalytics(period?: string) {
    const searchParams = new URLSearchParams();
    if (period) searchParams.append('period', period);
    
    return this.request(`/admin/analytics?${searchParams}`);
  }

  // Reports API
  async getReports(params?: { page?: number; limit?: number; status?: string; priority?: string }) {
    const searchParams = new URLSearchParams();
    if (params?.page) searchParams.append('page', params.page.toString());
    if (params?.limit) searchParams.append('limit', params.limit.toString());
    if (params?.status) searchParams.append('status', params.status);
    if (params?.priority) searchParams.append('priority', params.priority);
    
    return this.request(`/admin/reports?${searchParams}`);
  }

  async updateReport(id: string, data: any) {
    return this.request(`/admin/reports/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  // Categories API
  async getCategories() {
    return this.request('/admin/categories');
  }

  async createCategory(data: any) {
    return this.request('/admin/categories', {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async updateCategory(id: string, data: any) {
    return this.request(`/admin/categories/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async deleteCategory(id: string) {
    return this.request(`/admin/categories/${id}`, {
      method: 'DELETE',
    });
  }

  // Settings API
  async getSettings() {
    return this.request('/admin/settings');
  }

  async updateSettings(data: any) {
    return this.request('/admin/settings', {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }
}

export const apiService = new ApiService();