let BASE_URL = import.meta.env.VITE_API_URL || 'https://api.agenticx.co.in';

// Robust check to ensure BASE_URL starts with http:// or https:// to prevent treatment as relative path
if (BASE_URL && !BASE_URL.startsWith('http://') && !BASE_URL.startsWith('https://')) {
  BASE_URL = `https://${BASE_URL}`;
}

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
    const url = `${BASE_URL}/api/v1/certificates/fetch`;
    
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
   * Verifies certificate authenticity using its unique ID or a secure JWT token
   */
  async verifyCertificate(certificateIdOrToken: string, isToken: boolean = false): Promise<Certificate> {
    const url = isToken
      ? `${BASE_URL}/api/v1/certificates/verify?token=${encodeURIComponent(certificateIdOrToken)}`
      : `${BASE_URL}/api/v1/certificates/verify/${certificateIdOrToken}`;
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    });

    if (response.status === 404 || response.status === 400) {
      throw new Error('Certificate not found or invalid');
    }

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.detail || errorData.message || 'Verification failed');
    }

    return await response.json();
  }
};
