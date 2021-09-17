"use-strict" ; 

const inputHandler = document.querySelectorAll(".input_field");
const enteredUsername = document.getElementById("username");
const enteredPassword = document.getElementById("password");
const btnLoginUser = document.getElementById("btn__user");
const btnLoginAdmin = document.getElementById("btn__admin");
const errorMessage = document.querySelectorAll("small");
const errorMessageUsername = "Username must not be empty" ;
const errorMessagePassword = "Password must not be empty" ;
const errorStyleHandler = (isEmpty,index_input=0,message='') => {
    if(isEmpty){
        errorMessage[index_input].innerText = message;
        errorMessage[index_input].style.visibility = 'visible';
        inputHandler[index_input].style.backgroundColor = '#fce1e5'; 
    }
    else {
        errorMessage[index_input].innerText = message;
        errorMessage[index_input].style.visibility = 'hidden';
        inputHandler[index_input].style.backgroundColor = '#f0f0f0'; 
    }
}


const errorLoginHandler = () => {
    let checkIsValid = true; 
    if(enteredUsername.value.trim().length===0){
        errorStyleHandler(true,0,errorMessageUsername)
        checkIsValid = false;
    }
    if(enteredPassword.value.trim().length===0){
        errorStyleHandler(true,1,errorMessagePassword);  
        checkIsValid = false;
    }
    if(enteredUsername.value.trim().length>0){
        errorStyleHandler(false,0);
    }
    if(enteredPassword.value.trim().length>0){
        errorStyleHandler(false,1); 
    }
    return checkIsValid;
}

const loginUserHandler = () => { 
    btnLoginUser.addEventListener('click', (event) => {
        event.preventDefault() ; 
        const isValid =errorLoginHandler();
        isValid?window.location.pathname='/Midterm-project/user.html':errorLoginHandler();
        //isValid?window.location.pathname='./user.html':errorLoginHandler();
        
    })
}
const loginAdminHandler = () => {
    btnLoginAdmin.addEventListener('click',(event) => {
        event.preventDefault();
        const isValid =errorLoginHandler();
        isValid?window.location.pathname='/Midterm-project/admin.html':errorLoginHandler();
    })
}

const keystrokeHandler = () => {
    enteredUsername.addEventListener('input',()=> {
        errorStyleHandler(false,0,'')
    })
    enteredPassword.addEventListener('input', () => {
        errorStyleHandler(false,1,'')
    })
}


const init = () => {
    loginUserHandler();
    loginAdminHandler();
    keystrokeHandler();
}
init();