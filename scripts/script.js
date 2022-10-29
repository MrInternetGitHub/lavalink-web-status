const socket = io()
var button = document.getElementById("butt1")
var body = document.getElementById("page")
socket.on("test",function(data){
  console.log(data)
  try{
  body.value = data;
  }catch(er){
    console.log(er)
  }
});
button.addEventListener("click",()=>{
  body.innerHtml = `<p>${Date.now()}</p>`
})
