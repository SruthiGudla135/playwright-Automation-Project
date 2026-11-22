import {test, expect} from "@playwright/test"

let AUTH_TOKEN = {Authorization: "Bearer gorest_UwQ1DzFy2j0ZaaXzAI5cKJ5ZrLnmSYhFOEdgZ2jYKAt0Z6MtV"}


test("Fetch a Single User", async({request})=>{
    let response = await request.get("https://gorest.co.in/public/v2/users/871873", {headers: AUTH_TOKEN})
    // console.log(response)
    let jsonResponse = await response.json()
    console.log(jsonResponse)
    console.log("Response code: " + response.status())
    console.log("Response: " +response.statusText())
    // expect(response.status()).toBe(200)
})

test("Fetch All Users", async({request})=>{
    let response = await request.get("https://gorest.co.in/public/v2/users", {headers: AUTH_TOKEN})
    // console.log(response)
    let jsonResponse = await response.json()
    console.log(jsonResponse)
    console.log("Response code: " + response.status())
    console.log("Response: " +response.statusText())
    expect(response.status()).toBe(200)
})

test("Create A User", async({request})=>{
    let userData = {
        name: 'Sruthi Gudla',
        email: `sruthi${Date.now()}@gmail.com`,
        gender: 'female',
        status: 'active'
    }
    let response = await request.post("https://gorest.co.in/public/v2/users", {headers: AUTH_TOKEN, data: userData})
    let jsonResponse = await response.json()
    console.log(jsonResponse)
    console.log("Response code: " + response.status())
    console.log("Response: " +response.statusText())
    console.log("Response: " + await response.text())
    expect(response.status()).toBe(201)
})

test("Update A User", async({request})=>{
    let userData = {
        name: 'Sruthi Tester',
        email: `sruthi${Date.now()}@gmail.com`,
        gender: 'female',
        status: 'inactive'
    }
    let response = await request.put("https://gorest.co.in/public/v2/users/8718734", {headers: AUTH_TOKEN, data: userData})
    let jsonResponse = await response.json()
    console.log(jsonResponse)
    console.log("Response code: " + response.status())
    console.log("Response: " +response.statusText())
    console.log("Response: " + await response.text())
    expect(response.status()).toBe(200)
})

test("Delete A User", async({request})=>{
    let response = await request.delete("https://gorest.co.in/public/v2/users/8718739", {headers: AUTH_TOKEN})
    // let jsonResponse = await response.json()
    // console.log(jsonResponse)
    console.log("Response code: " + response.status())
    console.log("Response: " +response.statusText())
    console.log("Response: " + await response.text())
    expect(response.status()).toBe(204)
})