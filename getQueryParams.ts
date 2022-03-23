export const getQueryParam = (key: string): string => {
    const urlParams = new URLSearchParams(window.location.search);
    const searchParam = urlParams.get(key);
    return searchParam || "";
}
