import {
  CognitoUserPool,
  CognitoUser,
  AuthenticationDetails,
  CognitoUserAttribute
} from 'amazon-cognito-identity-js';

const poolData = {
  UserPoolId: import.meta.env.VITE_COGNITO_USER_POOL_ID,
  ClientId: import.meta.env.VITE_COGNITO_CLIENT_ID,
};

const userPool = new CognitoUserPool(poolData);

function formatDateForCognito(date) {
  const pad = (n) => String(n).padStart(2, '0');
  return `${date.getUTCFullYear()}-${pad(date.getUTCMonth() + 1)}-${pad(date.getUTCDate())} ${pad(date.getUTCHours())}:${pad(date.getUTCMinutes())}:${pad(date.getUTCSeconds())} UTC`;
}

export const authHandler = {
  async register(email, password, attributes = {}) {
    const attributeList = Object.entries(attributes).map(([key, value]) =>
      new CognitoUserAttribute({ Name: key, Value: value })
    );
    return new Promise((resolve, reject) => {
      userPool.signUp(email, password, attributeList, null, (err, result) => {
        if (err) return reject(err);
        resolve(result);
      });
    });
  },

  async confirmSignUp(email, code) {
    const user = new CognitoUser({ Username: email, Pool: userPool });
    return new Promise((resolve, reject) => {
      user.confirmRegistration(code, true, (err, result) => {
        if (err) return reject(err);
        resolve(result);
      });
    });
  },

  async login(email, password) {
    const user = new CognitoUser({ Username: email, Pool: userPool });
    const authDetails = new AuthenticationDetails({ Username: email, Password: password });
    return new Promise((resolve, reject) => {
      user.authenticateUser(authDetails, {
        onSuccess: (result) => {
          const idToken = result.getIdToken().getJwtToken();
          const accessToken = result.getAccessToken().getJwtToken();
          const refreshToken = result.getRefreshToken().getToken();
          const formattedDate = formatDateForCognito(new Date());

          user.updateAttributes([
            new CognitoUserAttribute({ Name: 'custom:lastlogin', Value: formattedDate })
          ], () => {
            resolve({ idToken, accessToken, refreshToken });
          });
        },
        onFailure: reject
      });
    });
  },

  logout() {
    const user = userPool.getCurrentUser();
    if (user) user.signOut();
  },

  async changePassword(currentPassword, newPassword) {
    const user = userPool.getCurrentUser();
    if (!user) return Promise.reject('Not authenticated');
    return new Promise((resolve, reject) => {
      user.getSession((err) => {
        if (err) return reject(err);
        user.changePassword(currentPassword, newPassword, (err, result) => {
          if (err) return reject(err);
          resolve(result);
        });
      });
    });
  },

  async forgotPassword(email) {
    const user = new CognitoUser({ Username: email, Pool: userPool });
    return new Promise((resolve, reject) => {
      user.forgotPassword({ onSuccess: resolve, onFailure: reject });
    });
  },

  async confirmPassword(email, code, newPassword) {
    const user = new CognitoUser({ Username: email, Pool: userPool });
    return new Promise((resolve, reject) => {
      user.confirmPassword(code, newPassword, {
        onSuccess: resolve,
        onFailure: reject,
      });
    });
  },

  updateProfileAttributes(attributes) {
    const user = userPool.getCurrentUser();
    if (!user) return Promise.reject('Not authenticated');

    return new Promise((resolve, reject) => {
      user.getSession((err, session) => {
        if (err || !session.isValid()) return reject(err || 'Invalid session');

        const attrList = Object.entries(attributes).map(
          ([key, value]) => new CognitoUserAttribute({ Name: key, Value: value })
        );

        user.updateAttributes(attrList, (err, result) => {
          if (err) return reject(err);
          resolve(result);
        });
      });
    });
  },

  async restoreSession() {
    const user = userPool.getCurrentUser();
    if (!user) return Promise.reject('No user');

    return new Promise((resolve, reject) => {
      user.getSession((err, session) => {
        if (err || !session.isValid()) return reject(err || 'Invalid session');

        const idToken = session.getIdToken().getJwtToken();
        const accessToken = session.getAccessToken().getJwtToken();
        const refreshToken = session.getRefreshToken().getToken();
        resolve({ idToken, accessToken, refreshToken });
      });
    });
  }
};