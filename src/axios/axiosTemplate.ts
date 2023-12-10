import axios, { AxiosRequestConfig } from "axios";

const axiosBase = (
    apiUrl: string,
    url : string,
    opts?: AxiosRequestConfig<any>
) => {
    const options = opts || {};


    return axios({
        baseURL : apiUrl,
        ...options,
        url
    })
}

export const axiosTemplate = (url : string, opts? : AxiosRequestConfig<any>) => {
    return axiosBase(process.env.VUE_APP_API_URL, url, opts)
}