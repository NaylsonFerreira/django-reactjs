import { apiUrl } from './dataProvider';

const authProvider = {
    login: async ({ username, password }) => {
        const request = new Request(`${apiUrl}/login/`, {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            headers: new Headers({ 'Content-Type': 'application/json' }),
        });
        const response = await fetch(request);
        if (response.status < 200 || response.status >= 300) {
            throw new Error(response.statusText);
        }
        console.log(response);
        const { token } = await response.json();
        localStorage.setItem('token', `Token ${token}`);
        return Promise.resolve();
    },
    logout: async () => {
        return localStorage.removeItem('token');
    },
    checkError: async (error) => {
        const { status } = error;
        if (status === 401 || status === 403) {
            localStorage.removeItem('token');
            return true;
        }
        return false;
    },
    checkAuth: async () => {
        const result = !!localStorage.getItem('token');
        if (!result) {
            throw new TypeError();
        }
    },
    getPermissions: () => {
        const role = localStorage.getItem('permissions');
        return role ? Promise.resolve(role) : Promise.reject();
    },
};
export default authProvider;