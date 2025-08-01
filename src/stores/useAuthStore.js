import { defineStore } from 'pinia';
import { jwtDecode } from 'jwt-decode';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    idToken: null,
    currentUser: null,
    simulate: null
  }),

  actions: {
    setTokenAndDecode(idToken) {
      this.idToken = idToken;
      const decoded = jwtDecode(idToken);

      this.currentUser = {
        email: decoded.email,
        role: decoded['custom:role'],
        kycPassed: decoded['custom:kycPassed'] === 'true',
        onboardingPassed: decoded['custom:onboardingPassed'] === 'true',
        awsDataCheck: decoded['custom:awsDataCheck'] === 'true',
        raw: decoded
      };
    },
    startTokenRefreshLoop() {
        clearInterval(this._refreshInterval);
        this._refreshInterval = setInterval(async () => {
            const exp = this.currentUser?.raw?.exp;
            if (!exp) return;
            const expiresIn = exp * 1000 - Date.now();
            if(expiresIn < 5 * 60 * 1000) {
                try {
                    const {idToken } = await authHandler.restoreSession();
                this.setTokenAndDecode(idToken);
                } catch (error) {
                    this.logout();
                }
             }
        }, 60 * 1000); // Check every minute
    },
    refreshFromStorage() {
      const token = localStorage.getItem('idToken');
      if (token) this.setTokenAndDecode(token);
    },

    simulateRole(role, overrides = {}) {
      this.simulate = { role, ...overrides };
    },

    updateUserAttributesLocally(updates) {
      this.currentUser = { ...this.currentUser, ...updates };
    },

    logout() {
      localStorage.clear();
      this.$reset();
    }
  },

  persist: true
});