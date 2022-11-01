
let loaded =()=>{
    let rigisterr = document.getElementById("rigister-div").style.display="none"
    let loginn = document.getElementById("login-div").style.display="block"}
window.loaded = loaded



let create = document.getElementById("create-button").addEventListener("click",()=>{
    let rigister = document.getElementById("rigister-div").style.display="block"
    let login = document.getElementById("login-div").style.display="none"})

    import { initializeApp } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-app.js";

    import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-auth.js";
    
    import {collection, setDoc,doc,addDoc,getFirestore, } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-firestore.js"; 


  const firebaseConfig = {
    apiKey: "AIzaSyCyf0C8sD0RSJmXl-6uj7aDzHlW3Ktycuc",
    authDomain: "blogs-app-fe946.firebaseapp.com",
    projectId: "blogs-app-fe946",
    storageBucket: "blogs-app-fe946.appspot.com",
    messagingSenderId: "1094392365266",
    appId: "1:1094392365266:web:4f9c8a92b1585b2e552d0b",
    measurementId: "G-8ENFKRJHVP"
  };
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const auth = getAuth();
  // const db = getfirestore()
  // const db = getFirestore();
  const db = getFirestore();

  let rigister = document.getElementById("submit-button")

  rigister.addEventListener("click",()=>{
  let  name =  document.getElementById("name")
  let  fname =  document.getElementById("fname")
  let  date =  document.getElementById("date")
    let rigisteremail = document.getElementById("rigister-email")
    let rigisterpassword = document.getElementById("rigister-password")
    

createUserWithEmailAndPassword(auth, rigisteremail.value, rigisterpassword.value,  )
  .then(async(userCredential) => {
    // Signed in 
    const user = userCredential.user;
    console.log(user);
    console.log("rigister");

    // const docRef = await addDoc(collection(db, "users"), {
      await setDoc(doc(db, "user", user.uid), {
      name:name.value,
      fathername:fname.value,
      date:date.value,
      email: rigisteremail.value,
      password: rigisterpassword.value
    });
    // console.log("Document written with ID: ", docRef.id);

    console.log(user.uid);

   const  rigister_div = document.getElementById("rigister-div").style.display="none"
   const login_div = document.getElementById("login-div").style.display="block"

    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorMessage);
    // ..
  });


  })

  let login = document.getElementById("login-button")

  login.addEventListener('click',()=>{

    const login_email = document.getElementById("login-email")
    const login_password = document.getElementById("login-password")

    signInWithEmailAndPassword(auth, login_email.value, login_password.value)
    .then(async(userCredential) => {
      // Signed in 
      const user = userCredential.user;

      location.replace("create blog.html")
      setTimeout(()=>{window.location="login.html"},2000)
      
      console.log("rigister") ;
    })
    .catch((error) => {
      
      const errorCode = error.code;
      if(errorCode){
        alert("wrong email and password")
      }
      const errorMessage = error.message;
      // if(errorMessage){
      //   alert("")
      // }
      console.log(errorMessage);
    });


  })



