/*Navigate to the login page.
Enter an invalid username.
Enter a valid password: secret_sauce.
Click Login.
Verify that the error message is displayed.
Verify that the user remains on the login page.*/

import {test,expect} from '@playwright/test';
import LoginPageEkart from'../pages/LoginPageEkart';
import{data} from '../testdata/ekartCred';

test('Invalid Login test',async({page})=>{
    const loginPage=new LoginPageEkart(page);

    await loginPage.navigateUrl(data.urlEkart);
    console.info('Navigated to URL');

    await loginPage.login(data.invalidUsername,data.password);
    console.info('User attempted to login with invalid credentials');

    await expect(loginPage.invalidErrorMessage).toBeVisible();
    console.info('Invalid credentials error message is displayed successfully');

    await expect (loginPage.loginPage).toBeVisible();
    console.info('User is still on login page due to invalid credentials');

})