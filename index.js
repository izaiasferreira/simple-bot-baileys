// const { default: makeWASocket, delay, jidDecode, DisconnectReason, useMultiFileAuthState } = require("@adiwajshing/baileys")
const makeWASocket = require('@whiskeysockets/baileys').default
const { useMultiFileAuthState, jidDecode } = require('@whiskeysockets/baileys')
const { Boom } = require("@hapi/boom")
const path = require("path")
const pino = require("pino")
const chalk = require("chalk")
//const util = require('util');

const color = (text, color) => { return !color ? chalk.green(text) : chalk.keyword(color)(text) };



async function connectToWhatsApp() {
    const { state, saveCreds } = await useMultiFileAuthState(path.resolve(__dirname, "cache", "auth-info-multi"))

    const socket = makeWASocket({
        logger: pino({ level: 'silent' }),
        printQRInTerminal: true,
        auth: state,
        defaultQueryTimeoutMs: undefined
    })
    
    
    
    socket.ev.on("creds.update", saveCreds)
    socket.ev.on("messages.upsert", async ({messages}) => {
    for(message of messages){
    require("./messages.js")(socket, message)
          }
    })

socket.ev.on('connection.update', async (update) => {
const { connection, lastDisconnect, qr, receivedPendingNotifications } = update  
if(connection === "open") {console.log(color(`BOT CONECTADO....`))}
if(receivedPendingNotifications){console.log(color("mensagens carregadas"))}
if(qr) {console.log(color("VOCÊ PRECISARÁ DE UM SEGUNDO CELULAR, PARA TIRAR FOTO DO QRCODE, PRA DEPOIS ESCANEAR A FOTO QUE TIROU"))}
if(connection === "close") {
const state_connection = new Boom(lastDisconnect?.error)?.output.statusCode 
if(String(lastDisconnect.error).includes("Connection Terminated")) {
console.log(color("Conexão está querendo terminar, mas apenas ignore, o bot reiniciará..", "gray"))}

switch(state_connection){
case 503:; case 500:; case 400:; case 515:; case 502:
connectToWhatsApp()
break
case 440:
console.log(color("Conexão substituida, feche uma para continuar / ou desligue e ligue para continuar visualizando o console de comandos e mensagens enviadas..", "red"))
break
case 428:
console.log(color("Conexão fechada...", "gray"))
connectToWhatsApp()
break
case 403:; case 401:
console.log(color("O QRCODE DO BOT FOI DESCONECTADO, RE-LEIA O QRCODE DENOVO PARA CONECTAR", "red"))
exec(`rm -rf ${qrcode}`); connectToWhatsApp()
break
case 408:
console.log(color("Conexão fraca, apenas ignore esta mensagem..", "gray"))
connectToWhatsApp()
break
default: 
console.log("Conexão fechada por :", lastDisconnect.error)
}}

    })
    
    
    
    
socket.sendMedia = async (jid, path, fileName = '', caption = '', quoted = '', options = {}) => {
        let types = await bat.getFile(path, true)
           let { mime, res, filename } = types
           if (res && res.status !== 200 || file.length <= 65536) {
               try { throw { json: JSON.parse(file.toString()) } }
               catch (e) { if (e.json) throw e.json }
           }
       let type = '', mimetype = mime, pathFile = filename
       if (options.asDocument) type = 'document'
       else if (/image/.test(mime)) type = 'image'
       else if (/video/.test(mime)) type = 'video'
       else if (/audio/.test(mime)) type = 'audio'
       else type = 'document'
       await socket.sendMessage(jid, { [type]: { url: pathFile }, caption, mimetype, fileName, ...options }, { quoted, ...options })
       return fs.promises.unlink(pathFile)
       }
       
       
      socket.decodeJid = (jid) => {
        if (!jid) return jid
        if (/:\d+@/gi.test(jid)) {
            let decode = jidDecode(jid) || {}
            return decode.user && decode.server && decode.user + '@' + decode.server || jid
        } else return jid
    }       
    
    return socket
    
       }


connectToWhatsApp()