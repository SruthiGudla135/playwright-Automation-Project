import {test, expect} from "../src/fixtures/pageFixtures.js"

test.beforeEach(async ({loginPage})=>{
    await loginPage.goToLoginPage()
    await loginPage.doLogin(process.env.USER_NAME!, process.env.PASSWORD!)
})

test("Home Page Title Test", async({homePage})=>{
    let title:string = await homePage.getHomePageTitle()
    expect(title).toBe("My Account")
})

test("Home Page Logout Link Test", async({homePage})=>{
    expect(await homePage.isLogoutLinkAvailable()).toBe(true) 
})

test("Home Page Headers Test", async({homePage})=>{
    expect(await homePage.getAllHeaders()).toHaveLength(3)
    expect.soft(await homePage.getAllHeaders()).toEqual(["My Orders", "My Affiliate Account", "Newsletter"])
})
