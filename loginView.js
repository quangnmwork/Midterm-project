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
    if(enteredUsername.value.trim().length===0){
        errorStyleHandler(true,0,errorMessageUsername)
    }
    if(enteredPassword.value.trim().length===0){
        errorStyleHandler(true,1,errorMessagePassword);  
    }
    if(enteredUsername.value.trim().length>0){
        errorStyleHandler(false,0);
    }
    if(enteredPassword.value.trim().length>0){
        errorStyleHandler(false,1); 
    }
}

const loginUserHandler = () => { 
    // btnLoginUser.addEventListener('click', (event) => {
    //     event.preventDefault() ; 
    //     errorLoginHandler();
    // })
    btnLoginAdmin.addEventListener('click',(event) => {
        event.preventDefault(); 
        errorLoginHandler();
    })
}

const keystrokeHandler = () => {
    enteredUsername.addEventListener('input',()=> {
        errorMessage[0].innerText = '';
        errorMessage[0].style.visibility = 'hidden';
        inputHandler[0].style.backgroundColor = '#f0f0f0';  
    })
    enteredPassword.addEventListener('input', () => {
        errorMessage[1].innerText = ''
        errorMessage[1].style.visibility = 'hidden';
        inputHandler[1].style.backgroundColor = '#f0f0f0'; 
    })
}


const init = () => {
    loginUserHandler();
    keystrokeHandler();
}
init();