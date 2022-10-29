
  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-app.js";
  import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-auth.js";
  import { collection, addDoc,getFirestore, doc, updateDoc ,onSnapshot ,arrayUnion,arrayRemove,deleteDoc } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-firestore.js"; 
  import { getStorage, ref, uploadBytesResumable, getDownloadURL, } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-storage.js";



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
  const db =getFirestore()

  ///
const title = document.getElementById("post-title")
const discribtion = document.getElementById("post-discribtion")
const upload_image = document.getElementById("upload-image")
////
let uid;
///
//
let email;
//
let user_login_cheack=()=>{
  onAuthStateChanged(auth,(user) => {
    if (user) {
      // console.log(user);
       uid = user.uid;
       email = user.email



//////////////////////////////////////////////

const post_btn = document.getElementById("post-button")

post_btn.addEventListener('click',async()=>{

// if(title === "" && discribtion === "" && upload_image  === ""){
  

    

//       if(title === ""){

// if(discribtion ===""){

//   if(upload_image){

//   }else{alert("upload file is emty")}
// }else{alert("discibtion is empty")}
//       }else{alert("title is emty")}

      const docRef = await addDoc(collection(db, "post-data-All"), {
        tilte: title.value,
        discribtion:discribtion.value ,
        // userID : uid,
        like :[]
      });
      console.log("Document written with ID: ", docRef.id);
      



      let storage = ()=>{

        
        let file = upload_image.files[0]
        console.log(file)
        
          const storage = getStorage();
          const storageRef = ref(storage, `users/${docRef.id}.jpg`);
          
          const uploadTask = uploadBytesResumable(storageRef, file);
          uploadTask.on('state_changed', 
            (snapshot) => {
              // Observe state change events such as progress, pause, and resume
              // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
              const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              console.log('Upload is ' + progress + '% done');
              switch (snapshot.state) {
                case 'paused':
                  console.log('Upload is paused');
                  break;
                case 'running':
                  console.log('Upload is running');
                  break;
              }
            }, 
            (error) => {
              // Handle unsuccessful uploads
            }, 
            () => {
              
              getDownloadURL(uploadTask.snapshot.ref).then(async(downloadURL) => {
                console.log('File available at', downloadURL);
                ////
                const washingtonRef = doc(db, "post-data-All",docRef.id);
              await updateDoc(washingtonRef, {
              post: downloadURL,
            });
            //////
              });
            }
          );
        
        }
        storage()
        
title.value=""
discribtion.value=""
      // }else{alert("plzz fill title discribtion upload file")}

    })
  
///////////




    //////////
    get_data_post()
///////////////////////////////

////////////////
user_login()
//////////////
  console.log(uid);
      // ...
    }else{
      // User is signed out
      alert("you not login account")
      // ...
    }
  });
}

user_login_cheack()

// let ADMIN = []

let get_data_post = () => {

  let title = document.getElementById("title")
  let discribtion = document.getElementById("discribtion")
  let imge = document.getElementById("imge")
  let card_child_1 =  document.getElementById("card-child-1")
  
  const unsubscribe = onSnapshot(collection(db, "post-data-All"), (querySnapshot) => {
    card_child_1.innerHTML=""
    querySnapshot.forEach((doc) => { 
      // console.log(doc.data())
      // ADMIN.push(uid)
      // console.log(doc.id);

card_child_1.innerHTML += `

    <div class="card" style="width: 18rem;">
    <img class="card-img-top" src="${doc.data().post}" id="post-imge" >
    <div class="card-body">
      <h5 class="card-title" id="title">${doc.data().tilte}</h5>
      <p class="card-text" id="discribtion"> ${doc.data().discribtion}</p>
      (${doc.data().like.length})
       ${doc.data().like.indexOf(uid) !== -1
         ?  `<i onclick="unLikePost('${doc.id}',)" class="fa-solid fa-thumbs-up"></i>`
       :  `<i onclick="Like('${doc.id}',)" class="fa-regular fa-thumbs-up"></i>`}
       <button  id="delete_blog" onclick="delete_blog('${doc.id}')">delete</button>
    </div>
  </div>

`

    });
 
  });
}


let user_login=() => {
  let user_login1 = document.getElementById("user-login-cheack")
      user_login1.innerHTML=`
      ${email}
      `

}


console.log("like");
 let Like = async(id ,)=>{
   const washingtonRef = doc(db, "post-data-All",id);
   
   // Atomically increment the population of the city by 50.
   await updateDoc(washingtonRef, {
     like: arrayUnion(uid),
     // lastlike:username,
    })
  

}

window.Like = Like

let unLikePost = async(id,)=>{
  console.log("unlike");
  const washingtonRef = doc(db, "post-data-All",id);
  // Atomically increment the population of the city by 50.
  await updateDoc(washingtonRef, {
      like: arrayRemove(uid),
      // lastlike:"",
  })
  

}

window.unLikePost = unLikePost



let delete_blog =async(id)=>{
  
  // if(ADMIN === id){
  await deleteDoc(doc(db, "post-data-All", id));

  // }else{alert("sorry your not post")}

}

window.delete_blog  = delete_blog















//   import {getFirestore, doc, addDoc, updateDoc, increment,  collection, query, where, onSnapshot ,  arrayUnion, arrayRemove  } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-firestore.js";

  

//   const firebaseConfig = {
//     apiKey: "AIzaSyCyf0C8sD0RSJmXl-6uj7aDzHlW3Ktycuc",
//     authDomain: "blogs-app-fe946.firebaseapp.com",
//     projectId: "blogs-app-fe946",
//     storageBucket: "blogs-app-fe946.appspot.com",
//     messagingSenderId: "1094392365266",
//     appId: "1:1094392365266:web:4f9c8a92b1585b2e552d0b",
//     measurementId: "G-8ENFKRJHVP"
//   };
//   // Initialize Firebase
//   const app = initializeApp(firebaseConfig);
//   const db = getFirestore();


  
// let number = document.getElementById("number")

//   let minus = document.getElementById("minus")
//   minus.addEventListener('click',async()=>{

//     const washingtonRef = doc(db, "count", "nHedB4yayJxUdy12cCCy");

//     // Atomically increment the population of the city by 50.
//     await updateDoc(washingtonRef, {
//         count:increment(-1)
//     });
    


//   })

//   let plus = document.getElementById("plus")
//   plus.addEventListener('click',async()=>{

//     const washingtonRef = doc(db, "count", "nHedB4yayJxUdy12cCCy");

//     // Atomically increment the population of the city by 50.
//     await updateDoc(washingtonRef, {
//         count:increment(+1)
//     });
    


//   })


//   let count = ()=>{

//   const unsubscribe = onSnapshot(collection(db, "count"), (querySnapshot) => {
//     const count = [];
//     querySnapshot.forEach((doc) => {
//       count.push(doc.data());
//     });
//     if(count[0].count){
//     let number = document.getElementById("number");
//     number.innerHTML = count[0].count;
// }
// else{
//        let number = document.getElementById("number");
//     number.innerHTML = "0"
// }
//   });
// }

// count()

// let rest = document.getElementById("reset-number").addEventListener('click',async()=>{

//   const washingtonRef = doc(db, "count", "nHedB4yayJxUdy12cCCy");

//     // Atomically increment the population of the city by 50.
//     await updateDoc(washingtonRef, {
//         count:"0"
//     });
    

//   });


//   // like


//   const userID=1
//   // let userID=Math.random()*2
//   // let userid=Math.rund(userID)
//   // console.log(userid);
//   let username="ahmed"
  
//   let btn = document.getElementById("post-button").addEventListener("click",async()=>{

//   let post = document.getElementById("post")

//   const docRef = await addDoc(collection(db, "post"), {
//     user:userID,
//     text: post.value,
//     // like:[],
//     // lastlike:""
//   });
//   console.log("Document written with ID: ", docRef.id);
// })

// let get_data_post = ()=>{

//   let text = document.getElementById("text");
//   const unsubscribe = onSnapshot(collection(db, "post"), (querySnapshot) => {
//     text.innerHTML = "";
//     querySnapshot.forEach((doc) => {
//       console.log(doc.data());
     
// text.innerHTML +=`
// <h2>${doc.data().text}
//   (${doc.data().like.length})
// ${doc.data().like.indexOf(userID) !== -1
//   ?  `<i onclick="unLikePost('${doc.id}')" class="fa-solid fa-thumbs-up"></i>`
// :  `<i onclick="Like('${doc.id}')" class="fa-regular fa-thumbs-up"></i>`
// } 
// </h2>

// `
//     });
//   });

// text.value=""
// }

// get_data_post()

// let Like = async(id)=>{
// console.log("like");
//   const washingtonRef = doc(db, "post",id);

//   // Atomically increment the population of the city by 50.
//   await updateDoc(washingtonRef, {
//       like: arrayUnion(userID),
//       // lastlike:username,
//   })
  

// }

// window.Like = Like

// let unLikePost = async(id)=>{
//   console.log("unlike");
//   const washingtonRef = doc(db, "post",id);

//   // Atomically increment the population of the city by 50.
//   await updateDoc(washingtonRef, {
//       like: arrayRemove(userID),
//       // lastlike:"",
//   })
  

// }

// // window.like = like
// window.unLikePost = unLikePost






