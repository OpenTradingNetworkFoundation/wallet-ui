import { generateKeys, validateKeys } from 'services/keyService';
import localStorage from 'utils/localStorage';

const AUTH_NAME_KEY = 'account_name';

class AuthService {
  authenticate(account, password) {
    const { publicKey, privateKey } = generateKeys(account.name, password);
    const expectedKey = account.active.key_auths[0][0];

    return validateKeys(publicKey, expectedKey) ? privateKey : null;
  }

  getAuthName() {
    return localStorage.get(AUTH_NAME_KEY);
  }

  setAuthName(name) {
    localStorage.set(AUTH_NAME_KEY, name);
  }

  removeAuthName() {
    localStorage.remove(AUTH_NAME_KEY);
  }
}

const authService = new AuthService();

export default authService;
