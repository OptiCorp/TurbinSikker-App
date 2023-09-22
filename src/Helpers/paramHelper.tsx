export function paramsToQueryString(params: any, delta = {}) {
    const updatedParams = { ...params, ...delta }
    return new URLSearchParams(updatedParams).toString()
}
