const { proto, getContentType } = require('@whiskeysockets/baileys')
const fs = require('fs')


module.exports.getMessage = (socket, message) => {
    if (!message) return message
    let M = proto.WebMessageInfo
    if (message.key) {
        message.id = message.key.id
        message.chat = message.key.remoteJid
        message.fromMe = message.key.fromMe
        message.isGroup = message.chat.endsWith('@g.us')
        message.sender = socket.decodeJid(message.fromMe && socket.user.id || message.participant || message.key.participant || message.chat || '')
        if (message.isGroup) message.participant = socket.decodeJid(message.key.participant) || ''
    }
    if (message.message) {
        message.mtype = getContentType(message.message)
        message.msg = (message.mtype == 'viewOnceMessage' ? message.message[message.mtype].message[getContentType(message.message[message.mtype].message)] : message.message[message.mtype])
        message.body = message.message?.conversation || message.message?.viewOnceMessageV2?.message?.imageMessage?.caption || message.message?.viewOnceMessageV2?.message?.videoMessage?.caption || message.message?.imageMessage?.caption || message.message?.videoMessage?.caption || message.message?.extendedTextMessage?.text || message.message?.viewOnceMessage?.message?.videoMessage?.caption || message.message?.viewOnceMessage?.message?.imageMessage?.caption || message.message?.documentWithCaptionMessage?.message?.documentMessage?.caption || message.message?.buttonsMessage?.imageMessage?.caption || message.message?.buttonsResponseMessage?.selectedButtonId || message.message?.listResponseMessage?.singleSelectReply?.selectedRowId || message.message?.templateButtonReplyMessage?.selectedId || message.message.conversation || ""

    }
    
    

    message.reply = (text, chatId = message.chat, options = {}) => Buffer.isBuffer(text) ? socket.sendMedia(chatId, text, 'file', '', message, { ...options }) : socket.sendText(chatId, text, message, { ...options })

    return message
}


let file = require.resolve(__filename)
fs.watchFile(file, () => {
	fs.unwatchFile(file)
	console.log(`Ouve uma atualização no arquivo com o diretório: ${__filename}`)
	delete require.cache[file]
	require(file)
})
