import { APIRequestContext } from "@playwright/test";

export class APIHelper {
    private readonly request:APIRequestContext
    private readonly baseURL:string

    constructor(request:APIRequestContext, baseURL:string){
        this.request=request
        this.baseURL=baseURL
    }

    async getRequest(endPoint:string, requestHeaders?:Record<string, string>){
        let response = await this.request.get(`${this.baseURL}${endPoint}`, {headers:requestHeaders})
        return {
            responseBody:await response.json(),
            responseCode:response.status()
        }
    }

    async postRequest(endPoint:string, requestData:object, requestHeaders?:Record<string, string>){
        let response = await this.request.post(`${this.baseURL}${endPoint}`, {headers:requestHeaders, data:requestData})
        return {
            responseBody:await response.json(),
            responseCode:response.status()
        }
        
    }

    async putRequest(endPoint:string, requestData:object, requestHeaders?:Record<string, string>){
        let response = await this.request.put(`${this.baseURL}${endPoint}`, {headers:requestHeaders, data:requestData})
        return {
            responseBody:await response.json(),
            responseCode:response.status()
        }
    }

    async deleteRequest(endPoint:string, requestHeaders?:Record<string, string>){
        let response = await this.request.delete(`${this.baseURL}${endPoint}`, {headers:requestHeaders})
        return {
            responseCode:response.status(),
            responseText:response.statusText()
        }
    }
}