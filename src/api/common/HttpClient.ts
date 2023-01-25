/**
 * @file Http client.
 * @copyright Yury Korotovskikh 2022 <u.korotovskiy@nil.foundation>
 */

import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

/**
 * Http client.
 *
 * @class HttpClient
 */
export class HttpClient {
    protected readonly client: AxiosInstance;

    /**
     * Constructor.
     *
     * @param requestConfig - Config.
     * @param configureClient - Configuration callback.
     */
    constructor(
        requestConfig?: AxiosRequestConfig,
        configureClient?: (client: AxiosInstance) => void,
    ) {
        this.client = axios.create(requestConfig);
        configureClient && configureClient(this.client);
    }

    /**
     * GET.
     *
     * @param url - Url.
     * @param config - Config.
     * @memberof HttpClient
     */
    public async get<TResponse>(url: string, config?: AxiosRequestConfig): Promise<TResponse> {
        const response = await this.client.get<TResponse>(url, config);
        return response.data;
    }

    /**
     * POST.
     *
     * @param url - Url.
     * @param data - Data.
     * @param config - Config.
     * @memberof HttpClient
     */
    public async post<TResponse, TRequest = undefined>(
        url: string,
        data?: TRequest,
        config?: AxiosRequestConfig,
    ): Promise<TResponse> {
        const response = await this.client.post<TResponse>(url, data, config);
        return response.data;
    }

    /**
     * PUT.
     *
     * @param url - Url.
     * @param payload - Payload.
     * @param config - Config.
     * @memberof HttpClient
     */
    public async put<TResponse, TRequest = undefined>(
        url: string,
        payload?: TRequest,
        config?: AxiosRequestConfig,
    ): Promise<TResponse> {
        const response = await this.client.put(url, payload, config);
        return response.data;
    }

    /**
     * DELETE.
     *
     * @param url - Url.
     * @param config - Config.
     * @memberof HttpClient
     */
    public async delete<TResponse>(url: string, config?: AxiosRequestConfig): Promise<TResponse> {
        const response = await this.client.delete(url, config);
        return response.data;
    }

    /**
     * HEAD.
     *
     * @param url - Url.
     * @param config - Config.
     * @memberof HttpClient
     */
    public async head<TResponse>(url: string, config?: AxiosRequestConfig): Promise<TResponse> {
        const response = await this.client.head<TResponse>(url, config);
        return response.data;
    }
}
