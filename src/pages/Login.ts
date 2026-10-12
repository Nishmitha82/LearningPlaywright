import {test,expect, Page} from '@playwright/test';


//export default nothing but we can share our class with other files
export default class LoginPage{
    //for class using . and for id using #
    private readonly registerButton =".ico-register"
    private readonly genderRadioButton ='(//input[@type="radio"])[2]';
    private readonly userFirstName="//input[@name='FirstName']";
    private readonly userLastName="(//input[@type='text'])[4]";
    private readonly email="(//input[@type='text'])[5]";
    private readonly password="(//input[@type='password'])[1]";
    private readonly confirmPassword="//input[@name='ConfirmPassword']";
    private readonly registerSubmitButton='(//input[@type="submit"])[2]';
    private readonly registerSuccessMessage=".result";
    private readonly alreadyRegisteredMessage="//li[text()='The specified email already exists']";
    private readonly loginButton= "//a[text()='Log in']";
    private readonly loginEmail="//input[@name='Email']";
    private readonly loginPassword="//input[@name='Password']";
    private readonly loginSubmitButton="//input[@value='Log in']";


constructor(private page:Page){} //creating prvate page variable to use in the class

async navigateUrl(){
    await this.page.goto("https://demowebshop.tricentis.com/");
}

async userRegister(){
    await this.page.click(this.registerButton);
    console.info("user registered successfully");
}

async userGender(){
    await this.page.click(this.genderRadioButton);
}

async userDetails(firstName :string,lastName:string,email:string,password:string,confirmPassword:string){
    await this.page.locator(this.userFirstName).fill(firstName);
    await this.page.locator(this.userLastName).fill(lastName);
    await this.page.locator(this.email).fill(email);
    await this.page.locator(this.password).fill(password);
    await this.page.locator(this.confirmPassword).fill(confirmPassword);
}

async userDetailsRegister()
{
    await this.page.click(this.registerSubmitButton); 
    console.info("register clicked")  ;
    }

     
async verifyRegistrationOrLogin(success: string,username: string,password: string)
    {
    const successMessage = this.page.locator(this.registerSuccessMessage);
    const alreadyRegistered = this.page.locator(this.alreadyRegisteredMessage);

    if (await successMessage.isVisible().catch(() => false))       //catch is used to catch the error if the element is not found and return false instead of throwing an error
        {
        await expect(successMessage).toHaveText(success);
    } 
    else if (await alreadyRegistered.isVisible().catch(() => false)) 
        {
        await this.page.click(this.loginButton);
        await this.page.fill(this.loginEmail, username);
        await this.page.fill(this.loginPassword, password);
        await this.page.click(this.loginSubmitButton);
    }
}
}