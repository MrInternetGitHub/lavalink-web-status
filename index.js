console.log("fart")

const express =  require("express")
const app = express();
var http =require("http")
const server = http.createServer(app)
var socket = require("socket.io")
const io = socket(server)
console.log(socket.Socket)
const bodyParser = require("body-parser")
const moment = require("moment");
require("moment-duration-format");
const prettyBytes = require("pretty-bytes");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}))
app.use(express.static(__dirname))
server.listen(PORT,()=>{
console.log("Server Is Running")
})
let watching = 0;
let startStat;
var AntiSpam = new Set();
io.on("connection",(socket)=>{
  console.log(socket.id +"• User Connected "+ new Date())
watching +=1;

  io.emit("test",{data:`<h3>• Updates every : 30 seconds • Connected to ${client.user? client.user.tag:" "} • ${watching} people watching the site</h3><h3 class= "rainbow"> Last Updated At : ${moment(Date.now())}</h3>`, message: startStat? startStat:"Fetching stats please refresh or return shortly"})
  socket.on("disconnect",()=>{
console.log("User Disconnected "+socket.id)
    watching -=1;
  })
})


const {
  Client,
  Intents
}= require("discord.js")
const client = new Client({
  intents:[Intents.FLAGS.GUILDS]
})
const config = require("./config.js")
const {
  Manager
} = require("erela.js")
client.manager = new Manager({
  nodes: config.nodes,
  send: (id, payload) => {
    const guild = client.guilds.cache.get(id);
    if (guild) guild.shard.send(payload);
  }
})
client.login("TOKEN")

client.on("ready",(client)=>{
  console.log(client.user.tag+" ready")
  client.manager.init(client.user.id)
setTimeout(()=>{
startStat = getStat(client)?.join("\n");
},2000)
setInterval(()=>{
let bun = getStat(client);
  startStat = bun?.join("\n");
 io.emit("test",{
   data: `<h3>• Updates every : 30 seconds • Connected to ${client.user? client.user.tag:" "} • ${watching} people watching the site</h3><h3 class= "rainbow"> Last Updated At : ${moment(Date.now())}</h3>` ,
 ///  message: `${names[Math.floor(Math.random()*names.length)]} : [${says[Math.floor(Math.random()*says.length)]}]`
   message: `
${bun.join(" \n")}
   `
 }) 
},30000)
  
})
client.on("debug",msg=>{
  if(msg.includes("Hit a 429"))return process.kill(1)
})
client.manager.on("nodeConnect", node => {
    console.log(`Node "${node.options.identifier}" connected.`)
})
client.manager.on("nodeError", (node, error) => {
  console.log(`Node "${node.options.identifier}" encountered an error: ${error.message}.`)
})
client.on("raw", d => client.manager.updateVoiceState(d));

function getStat(client){
  let all = []
client.manager.nodes.forEach(node=>{
  
    
  all.push(`
  <div ${node.connected? `class = "alive"`:`class = "dead"`} id =  "Info" >
<p>
  ${node.connected? "🟢•Online":"🔴•Offline"} | ${node.options.identifier}<br>
  ${node.options.owner? `[ Hosted by : ${node.options.owner} ]`:" "}<br>
  PLAYERS : [${node.stats.playingPlayers}/${node.stats.players}]<br>
<br><br>
  Cores : ${node.stats.cpu.cores} Core(s)<br>
  Memory Usage : ${prettyBytes(node.stats.memory.used)}/${prettyBytes(node.stats.memory.reservable)}<br>
  UPTIME : ${moment.duration(node.stats.uptime).format(" d[d], h[h], m[m]")}<br><br>
 • LOAD •<br>
  CPU : ${(Math.round(node.stats.cpu.systemLoad * 100) / 100).toFixed(2)}% | Lavalink : ${(Math.round(node.stats.cpu.lavalinkLoad * 100) / 100).toFixed(2)}% 
  <br><br>
  Config:<br> 
  HOST: ${node.options.host}<br>
  PORT: ${node.options.port}<br>
  PASSWORD: ${node.options.password}<br>
  SECURE: ${node.options.secure? "true":"false"}<br>
 
                                
                                </p>
 </div> <br>                    `)
})
  
  return all;
}
