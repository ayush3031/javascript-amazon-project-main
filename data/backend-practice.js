const xhr = new XMLHttpRequest();

xhr.addEventListener('load',()=>{
    console.log(xhr.response);
})
xhr.open('GET','https://supersimplebackend.dev');
//.open('type of message','where to send http message')
xhr.send();