// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCujEWbrVsvuLKTAKEffSCsnDBBGHcR7qQ",
    authDomain: "coursework-ba6b7.firebaseapp.com",
    projectId: "coursework-ba6b7",
    storageBucket: "coursework-ba6b7.appspot.com",
    messagingSenderId: "465527666957",
    appId: "1:465527666957:web:dfccf4b0d59c8bfd479844",
    measurementId: "G-0Y786RXT55"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

function signUp() {
    firstName = document.getElementById("firstName").value;
    surname = document.getElementById("surname").value;
    email = document.getElementById("email").value;
    password = document.getElementById("password").value;
    confirmPassword = document.getElementById("confirmPassword").value;
    fields = document.getElementsByClassName("form__input-group").value;
}

function validateEmail(email) {
    emailSyntax = /^[^@]+@\w+(\.\w+)+\w$/;
    if (emailSyntax.test(email) = true) {
        return true
    } else {
        return false
    }
}
function validatePassword(password) {
    if (password != confirmPassword) {
        console.log("Passwords don't match");
        return false
    } else if (password.length < 6) {
        console.log("Password isn't more than 6 characters");
        return false
    } else {
        return true
    }
}

function validateRest(fields) {
    if (fields === nul) {
        console.log("Incomplete Fields");
        return false
    } else if (fields.length = 0) {
        console.log("Incomplete Fields");
        return false
    } else {
        return true
    }
}