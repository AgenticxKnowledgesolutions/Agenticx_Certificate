const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://api.agenticx.co.in';

export interface Certificate {
  id: string;
  candidate_name?: string;
  name?: string; // Fallback field names
  course_name?: string;
  course?: string; // Fallback field names
  completion_date?: string;
  completion_date_formatted?: string;
  certificate_url?: string;
  status?: 'Valid' | 'Revoked' | string;
}

export const apiService = {
  /**
   * Fetches certificate details using email and date of birth
   */
  async fetchCertificate(email: string, dob: string): Promise<Certificate> {
    const url = `${API_BASE_URL}/api/v1/certificates/fetch`;
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, dob }),
    });

    if (response.status === 404) {
      throw new Error('No certificate found');
    }

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.detail || errorData.message || 'Failed to fetch certificate');
    }

    return await response.json();
  },

  /**
   * Verifies certificate authenticity using its unique ID
   */
  async verifyCertificate(certificateId: string): Promise<Certificate> {
    const url = `${API_BASE_URL}/api/v1/certificates/verify/${certificateId}`;
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    });

    if (response.status === 404) {
      throw new Error('Certificate not found or invalid');
    }

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.detail || errorData.message || 'Verification failed');
    }

    return await response.json();
  }
};
