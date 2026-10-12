import{Page,test,expect} from'@playwright/test';
import Login from'../pages/Login';

 
const firstName= process.env.First_Name ??'';   //process.env.First_Name → read the value of First_Name from the environment.                                              //?? '' → if it's undefined or null, use an empty string instead.
const lastName= process.env.Last_Name ??'';        //process is a built-in Node.js object.
const email= process.env.Email ??'';
const password= process.env.Password ??'';
const confirm_password= process.env.Confirm_password ??'';

test("user regoistration",async({page})=>{

    const loginpagedata=new Login(page);

    await loginpagedata.navigateUrl();
    await loginpagedata.userRegister();
    await loginpagedata.userGender();
    await loginpagedata.userDetails(firstName,lastName,email,password,confirm_password);
    await loginpagedata.userDetailsRegister();
    await loginpagedata.verifyRegistrationOrLogin("Your registration completed",email,password);
    
})