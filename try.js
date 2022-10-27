import { initializeApp } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-app.js";
  import {getFirestore, doc, addDoc, updateDoc, increment,  collection, query, where, onSnapshot ,  arrayUnion, arrayRemove  } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-firestore.js";

 
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
  const db = getFirestore();

  let userID =1



  let get_data_post = ()=>{

  let text = document.getElementById("text");
  const unsubscribe = onSnapshot(collection(db, "post"), (querySnapshot) => {
    text.innerHTML = "";
    querySnapshot.forEach((doc) => {
      console.log(doc.data());
     text.innerHTML +=`
<h2>${doc.data().text}
  (${doc.data().like.length})
${doc.data().like.indexOf(userID) !== -1
  ?  `<i onclick="unLikePost('${doc.id}')" class="fa-solid fa-thumbs-up"></i>`
:  `<i onclick="Like('${doc.id}')" class="fa-regular fa-thumbs-up"></i>`
} 
</h2>

`

    });
  });

text.value=""
}

get_data_post()