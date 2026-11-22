import {test, expect} from "../src/fixtures/pageFixtures.js"
import {CsvHelper} from "../src/utils/csvUtils.js"
import {ExcelHelper} from "../src/utils/excelUtil.js"
import {JsonHelper} from "../src/utils/jsonUtil.js"

test.beforeEach(async({loginPage})=>{
    await loginPage.goToLoginPage()
})

test("Login Page Title Test @sanity", async({loginPage})=>{
    let title = await loginPage.getLoginPageTitle()
    expect(title).toBe("Account Login")
})

test("Forgot Password Link Exist Test", async({loginPage})=>{
    expect(await loginPage.isforgotPwdLnkVisible()).toBe(true)
})

test("Do the Actual Login Test @sanity", async({loginPage, homePage})=>{
    await loginPage.doLogin(process.env.USER_NAME!, process.env.PASSWORD!)
    expect(await homePage.isLogoutLinkAvailable()).toBeTruthy()
})

let loginCreds:Record<string, string>[] = CsvHelper.readCsv("src/testData/loginData.csv")

for(let creds of loginCreds)
{
    test(`Login with Negative Credentials ${creds.username} and ${creds.password} Test`, async({loginPage})=>{
        await loginPage.doLogin(creds.username, creds.password)
        let errorMessage = await loginPage.getErrorMsg()
        expect(errorMessage).toContain("No match")
    })    
}

let ELoginCreds:Record<string, string>[] = ExcelHelper.readExcel("src/testData/loginData.xlsx")

for(let creds of ELoginCreds)
{
    test(`Login with Negative Credentials with Excel Data ${creds.username} and ${creds.password} Test`, async({loginPage})=>{
        await loginPage.doLogin(creds.username, creds.password)
        let errorMessage = await loginPage.getErrorMsg()
        expect(errorMessage).toContain("No match")
    })    
}

let JLoginCreds:Record<string, string>[] = JsonHelper.readJson("src/testData/loginData.json")

for(let creds of JLoginCreds)
{
    test(`Login with Negative Credentials with Json Data ${creds.username} and ${creds.password} Test`, async({loginPage})=>{
        await loginPage.doLogin(creds.username, creds.password)
        let errorMessage = await loginPage.getErrorMsg()
        expect(errorMessage).toContain("No match")
    })    
}
