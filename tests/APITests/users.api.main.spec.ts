import {test, expect} from "../../src/fixtures/APIFixtures.js"

let AUTH_TOKEN = {Authorization: process.env.API_TOKEN!}
let userId:number

test.describe.serial("Run API Test Cases End to End", ()=>{

test("Get All Users Test", async({apiHelper})=>{
    let response = await apiHelper.getRequest("/public/v2/users", AUTH_TOKEN)
    console.log(response.responseBody)
    expect(response.responseCode).toBe(200)
})

test("Create a User Test", async({apiHelper})=>{
    let userData = {
        name: 'Sruthi Gudla',
        email: `sruthi${Date.now()}@gmail.com`,
        gender: 'female',
        status: 'active'
    }
    let response = await apiHelper.postRequest("/public/v2/users", userData, AUTH_TOKEN)
    console.log(response.responseBody)
    expect(response.responseCode).toBe(201)
    expect(response.responseBody.name).toBe(userData.name)
    userId = response.responseBody.id
    console.log("User Id: " +userId)
})

test("Update a User Test", async({apiHelper})=>{
    let userData = {
        name: 'Sruthi Tester',
        email: `sruthi${Date.now()}@gmail.com`,
        gender: 'female',
        status: 'inactive'
    }
    let response = await apiHelper.putRequest(`/public/v2/users/${userId}`, userData, AUTH_TOKEN)
    console.log(response.responseBody)
    expect(response.responseCode).toBe(200)
    expect(response.responseBody.name).toBe(userData.name)
    expect(response.responseBody.status).toBe(userData.status)
    console.log("User Id: " +userId)
})

test("Delete a User Test", async({apiHelper})=>{
    let response = await apiHelper.deleteRequest(`/public/v2/users/${userId}`, AUTH_TOKEN)
    // console.log(response.responseBody)
    expect(response.responseCode).toBe(204)
    expect(response.responseText).toBe("No Content")
})

test("Get the Deleted User  Test", async({apiHelper})=>{
    let response = await apiHelper.getRequest(`/public/v2/users/${userId}`, AUTH_TOKEN)
    // console.log(response.responseBody)
    expect(response.responseCode).toBe(404)
})

})