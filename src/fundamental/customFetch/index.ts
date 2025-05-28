
type CustomFetchOptions = RequestInit;
const customFetch = async <T>(url: string, data?: T, options?: CustomFetchOptions) => {
    const BASE_URL = 'http://localhost:3000/api';
    const response = await fetch(`${BASE_URL}${url}`, {
        method: "GET",
        ...(data ? { body: JSON.stringify(data) } : {}),
        ...options
    })
    const result = await response.json();
    return result;
}
export default customFetch;