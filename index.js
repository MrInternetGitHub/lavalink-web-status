console.log("fart")

const express =  require("express")

import { setDialHandPosition, setDialHandInvertedPosition } from './scripts/updater.js';
//const updtrscrpt = require("./scripts/updater.js");

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
server.listen(2334,()=>{
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
client.login("MTA3MDczNTY3OTg4MzA2MzQzNw.G0vPda.t5lx-KUcqcyLwdQiYX59WITNtxdlWoBLq4_ZxQ")

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

//const cardsContainer = document.getElementsByClassName('cards');

function getStat(client) {
    let all = []
    client.manager.nodes.forEach(node => {
        all.push(`
      <div class="card">
        <div style="display: inline-block; margin: 20px auto;">
          <div class="center">
            <h1 class="title">${node.options.owner}</h1>
          </div>
          <div class="center">
            <h1 id="connection-status" class="${node.connected ? 'connected' : 'disconnected'}">${node.connected ? 'CONNECTED' : 'DISCONNECTED'}</h1>
          </div>
          <div class="center">
            <h1>CPU USAGE</h1>
            <h2 id="dial-value">${Math.round((node.stats.cpu.systemLoad * 100) / 100).toFixed(2)}%</h2>
          </div>
          <div class="dial">
            <div id="hand" class="hand"></div>
          </div>
          <div class="dial-inverted">
            <div id="hand-inv" class="hand-inverted"></div>
          </div>
          <div class="center">
            <h2 id="dial-value-inverted">${((node.stats.memory.used / node.stats.memory.reservable) * 100).toFixed(2)}%</h2>
            <h1>MEMORY USAGE</h1>
          </div>
          <div class="center">
            <div class="bg-ct">
              <h3>
                Uptime
                <br>
                <span class="detail">${moment.duration(node.stats.uptime).format(" d[d], h[h], m[m]")}</span>
              </h3>
              <h3>
                Host
                <br>
                <span class="detail">${node.options.host}</span>
              </h3>
              <h3>
                Port
                <br>
                <span class="detail">${node.options.port}</span>
              </h3>
              <h3>
                Password
                <br>
                <span class="password">${node.options.password}</span>
              </h3>
              <h3>
                Secure
                <br>
                <span class="password">${node.options.secure ? "TRUE" : "FALSE"}</span>
              </h3>
            </div>
          </div>
        </div>
      </div>
      <br>
    `);

    setDialHandPosition(Math.round((node.stats.cpu.systemLoad * 100) / 100).toFixed(2))
    setDialHandInvertedPosition(((node.stats.memory.used / node.stats.memory.reservable) * 100).toFixed(2));
    })

return all;
}