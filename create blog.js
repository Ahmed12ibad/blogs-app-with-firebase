
  let div_chat=()=>{
let div_chat = document.getElementById("chat_messge_div").style.display="block"
  }

  window.div_chat=div_chat
  
  let div_chat_close = ()=>{
    let div_chat = document.getElementById("chat_messge_div")
    div_chat.style.display="none"
  friend_messge_div.style.display="none"
  }

  window.div_chat_close=div_chat_close

  let chat_div_close= ()=>{
    friend_messge_div.style.display="none"
  }

window.chat_div_close=chat_div_close

  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-app.js";
  import { getAuth, onAuthStateChanged,signOut } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-auth.js";
  import { collection, getDoc, addDoc,getFirestore, doc, updateDoc ,onSnapshot ,arrayUnion,arrayRemove,deleteDoc, query, where,serverTimestamp, orderBy } from "https://www.gstatic.com/firebasejs/9.12.1/firebase-firestore.js"; 
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

if(title.value !== "" && discribtion.value !== ""){
  

    

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
      }else{alert("plzz fill title discribtion upload file")}

    })
  
///////////




    //////////
    get_data_post()
///////////////////////////////

////////////////
user_login()
//////////////
//
friend_chat()
//
console.log(uid);
      // ...
    }else{
      // User is signed out
      alert("you not login account")
      location.replace("index.html")
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
  
      card_child_1.innerHTML +=`
      <div id="card" data-aos="fade-up" data-aos-duration="1600"data-aos-offset="180">
      <img src="${doc.data().post}" id="post_imge">
      <p id="title">${doc.data().tilte}</p>
      <p id="discribtion"> ${doc.data().discribtion}</p>
      (${doc.data().like.length})
        ${doc.data().like.indexOf(uid) !== -1
          ?  `<i onclick="unLikePost('${doc.id}',)" class="fa-solid fa-thumbs-up"></i>`
       :  `<i onclick="Like('${doc.id}',)" class="fa-regular fa-thumbs-up"></i>`}
      <button id="delte_blog" onclick="delete_blog('${doc.id}')">DELETE BLOG</button>

  </div>

      `


    });
 
  });
}

// friend chat

let friend_chat =()=>{

let friends_chat_name = document.getElementById("friends_chat_name")

  const q = query(collection(db, "user"), where("email", "!=", email));
  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    friends_chat_name.innerHTML=""
    querySnapshot.forEach((doc) => {
        console.log(doc.data());

        friends_chat_name.innerHTML +=`
        <li> ${doc.data().name}
        <button id="start_btn" onclick="start_chat('${doc.data().uid}','${uid}','${doc.data().name}')">start chat </button>
        </li>
                 
        `


    });
    
  });

}
window.friend_chat=friend_chat

// start chat

let merge_uid;
let friend_messge_div = document.getElementById("friend_messge_div")
let friend_div_name = document.getElementById("friend_div_name")
let input_value = document.getElementById("input_value")

let start_chat=(friend_uid,current_uid,friend_name)=>{

console.log("han chal raha he");
friend_messge_div.style.display="block"

if(current_uid > friend_uid){
  merge_uid = `${current_uid}${friend_uid}`
}
else{
  merge_uid = `${friend_uid}${current_uid}`
}

friend_div_name.innerHTML=`
❤<h2 id="friend_name">${friend_name}</h2>
`
render_data_all_messge()
setTimeout(()=>{input_value.focus()},3000)

}
window.start_chat = start_chat

// send messge 

let send_messge = document.getElementById("send_messge")


send_messge.addEventListener('click',async()=>{
  if(input_value.value !== ""){
chat_div.innerHTML=""
  const docRef = await addDoc(collection(db, "messages"), {
    messge: input_value.value,
    merge_uid:merge_uid,
    timestamp: serverTimestamp()
  });
input_value.value=""
  }else{
    alert("enter messages plzz")
  }
})




// render_data_all_messge

let chat_div = document.getElementById("chat_div")

let render_data_all_messge = ()=>{

const q = query(collection(db, "messages"), where("merge_uid", "==", merge_uid),orderBy("timestamp", "desc"));
const unsubscribe = onSnapshot(q, (querySnapshot) => {
  chat_div.innerHTML=""
  querySnapshot.forEach((doc) => {
      // console.log(doc.data());
      chat_div.innerHTML+=`
      <li id="messages" data-aos="fade-up" data-aos-duration="1600">${doc.data().messge}</li>
      `
  });
  // console.log("Current cities in CA: ", cities.join(", "));
});
}

window.render_data_all_messge=render_data_all_messge


// user login name

let user_login=async()=> {
  let user_login1 = document.getElementById("login_user_name")

  const docRef = doc(db, "user", uid);
const docSnap = await getDoc(docRef);

if (docSnap.exists()) {
  console.log("Document data:", docSnap.data());
  user_login1.innerHTML=`
  <h1>user login (${docSnap.data().name}) </h1>
  `

} else {
  // doc.data() will be undefined in this case
  console.log("No such document!");
}

     
}

//


let Like = async(id ,)=>{
   console.log("like");
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
    alert("comming soon ...")
  // await deleteDoc(doc(db, "post-data-All", id));

  // }else{alert("sorry your not post")}

}

window.delete_blog  = delete_blog


// logout

const logout = document.getElementById("logout")
logout.addEventListener("mouseover",()=>{
  logout.style.backgroundColor="white"
  logout.style.color="black"
  // logout.style.borderColor="black"
})


logout.addEventListener("mouseout",()=>{
  logout.style.backgroundColor="black"
  logout.style.color="white"
  // logout.style.borderColor="black"
})






logout.addEventListener('click',()=>{

  signOut(auth).then(() => {
    location.replace("index.html")
  }).catch((error) => {
    console.log(error);
  });


})


////
// chat_btn
// setTimeout(()=>{

//   let start_btn = document.getElementById("start_btn")
//   let start_btn1 = ()=>{
//     start_btn.style.backgroundColor="white"
//     start_btn.style.color="black"
//     // logout.style.borderColor="black"
//   }
//   window.start_btn1=start_btn1
  
//   let start_btn2 = ()=>{
//     start_btn.style.backgroundColor="black"
//     start_btn.style.color="white"
//     // logout.style.borderColor="black"
//   }
//   window.start_btn2=start_btn2
// },4000)












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






