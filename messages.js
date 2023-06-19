const { delay } = require("@whiskeysockets/baileys")
const fs = require("fs");
const moment = require('moment-timezone')
const hr = moment.tz('America/Sao_Paulo').format('HH:mm:ss')
const date = moment.tz('America/Sao_Paulo').format('DD/MM/YY');
const fala = require("./falas.js");
const { prefixo, menu } = fala
const { color } = require('./lib/color')


module.exports = async (conn, message) => {
    if (!message.message) return
    msg = require("./lib/function.js").getMessage(conn, message)
    if (msg.chat === "status@broadcast") return
    const { isGroup, sender, pushName, chat, fromMe, body } = msg
    if (fromMe) return
    function reply(txt) { conn.sendMessage(chat, { text: txt, }, { quoted: message }) }
    const groupMetadata = isGroup ? await conn.groupMetadata(chat).catch(e => { return }) : ''
    const groupName = isGroup ? groupMetadata.subject : ''
    const isCmd = body.startsWith(prefixo)
    const command = body.startsWith(prefixo) ? body.replace(prefixo, '').trim().split(/ +/).shift().toLowerCase() : '';
    if (!isGroup && isCmd && sender) console.log(`${color('╭━━━━━━━━━━━━━━━━━━━━━━━━━╮', 'gold')}\n${color('┃', 'gold')} ${color('Número:', 'yellow')} ${color(sender.split('@')[0], 'purple')}\n${color('┃', 'gold')} ${color('Nome:', 'yellow')} ${color(pushName, 'purple')}\n${color('┃', 'gold')} ${color('Data:', 'yellow')} ${color(hr, 'magenta')}\n${color('┃', 'gold')} ${color('Comando:', 'yellow')} ${color(command)}\n${color('┃', 'gold')} ${color('Palavras:', 'yellow')} ${color(body.length, 'magenta')}\n${color('╰━━━━━━━━━━━━━━━━━━━━━━━━━╯', 'gold')}`)
    if (!isGroup && !isCmd && sender) console.log(`${color('╭━━━━━━━━━━━━━━━━━━━━━━━━━╮', 'gold')}\n${color('┃', 'gold')} ${color('Número:', 'yellow')} ${color(sender.split('@')[0], 'magenta')}\n${color('┃', 'gold')} ${color('Nome:', 'yellow')} ${color(pushName, 'purple')}\n${color('┃', 'gold')} ${color('Data:', 'yellow')} ${color(hr, 'magenta')}\n${color('┃', 'gold')} ${color('Comando:', 'yellow')} ${color('Não', 'red')}\n${color('┃', 'gold')} ${color('Palavras:', 'yellow')} ${color(body.length, 'magenta')}\n${color('╰━━━━━━━━━━━━━━━━━━━━━━━━━╯', 'gold')}`)
    if (isGroup && isCmd && sender) console.log(`${color('╭━━━━━━━━━━━━━━━━━━━━━━━━━╮', 'gold')}\n${color('┃', 'gold')} ${color('Número:', 'yellow')} ${color(sender.split('@')[0], 'magenta')}\n${color('┃', 'gold')} ${color('Nome:', 'yellow')} ${color(pushName, 'purple')}\n${color('┃', 'gold')} ${color('Data:', 'yellow')} ${color(hr, 'magenta')}\n${color('┃', 'gold')} ${color('Comando:', 'yellow')} ${color(command)}\n${color('┃', 'gold')} ${color('Palavras:', 'yellow')} ${color(body.length, 'magenta')}\n${color('┃', 'gold')} ${color('Grupo:', 'yellow')} ${color(groupName, 'magenta')}\n${color('╰━━━━━━━━━━━━━━━━━━━━━━━━━╯', 'gold')}`)
    if (isGroup && !isCmd && sender) console.log(`${color('╭━━━━━━━━━━━━━━━━━━━━━━━━━╮', 'gold')}\n${color('┃', 'gold')} ${color('Número:', 'yellow')} ${color(sender.split('@')[0], 'magenta')}\n${color('┃', 'gold')} ${color('Nome:', 'yellow')} ${color(pushName, 'purple')}\n${color('┃', 'gold')} ${color('Data:', 'yellow')} ${color(hr, 'magenta')}\n${color('┃', 'gold')} ${color('Comando:', 'yellow')} ${color('Não', 'red')}\n${color('┃', 'gold')} ${color('Palavras:', 'yellow')} ${color(body.length, 'magenta')}\n${color('┃', 'gold')} ${color('Grupo:', 'yellow')} ${color(groupName, 'magenta')}\n${color('╰━━━━━━━━━━━━━━━━━━━━━━━━━╯', 'gold')}`)
    dates = JSON.parse(fs.readFileSync("./cache/json/dates.json"))
    async function bv() {
        if (isGroup) return



        reply(menu());

        await delay(1000)


        reply(`🔽 *ENVIE SUA OPÇÃO* 🔽

📺 *_IPTV_* 📺

1️⃣ Renovar/Pagamento IPTV
2️⃣ Fazer um teste grátis IPTV
3️⃣ Problemas com meu IPTV

🌐 *_INTERNET ILIMITADA_* 🌐

4️⃣ Renovar/Pagamento INTERNET
5️⃣ Fazer um teste grátis INTERNET
6️⃣ Problemas com minha INTERNET

7️⃣ FALAR COM O ATENDENTE

🚨 *NÃO MANDE ÁUDIO* 🚨

*📅 Data:* ${moment.tz('America/Sao_Paulo').format('DD/MM/YY')}
*🕓 Hora:* ${moment.tz('America/Sao_Paulo').format('HH:mm:ss')}`)


        dates.map(i => i.id).includes(chat) ? dates[dates.map(i => i.id).indexOf(chat)].date = date : dates.push({ id: sender, date: date })
        fs.writeFileSync("./cache/json/dates.json", JSON.stringify(dates, null, 2))
    }

    async function bv2() {
        if (isGroup) return



        reply(menu());

        await delay(1000)


        reply(`🔽 *ENVIE SUA OPÇÃO* 🔽

📺 *_IPTV_* 📺

1️⃣ Renovar/Pagamento IPTV
2️⃣ Fazer um teste grátis IPTV
3️⃣ Problemas com meu IPTV

🌐 *_INTERNET ILIMITADA_* 🌐

4️⃣ Renovar/Pagamento INTERNET
5️⃣ Fazer um teste grátis INTERNET
6️⃣ Problemas com minha INTERNET

7️⃣ FALAR COM O ATENDENTE

🚨 *NÃO MANDE ÁUDIO* 🚨

*📅 Data:* ${moment.tz('America/Sao_Paulo').format('DD/MM/YY')}
*🕓 Hora:* ${moment.tz('America/Sao_Paulo').format('HH:mm:ss')}`)
    }


    if (!dates.map(i => i.id).includes(chat)) {
        bv()
    } else if (dates.map(i => i.id).includes(chat) && dates[dates.map(i => i.id).indexOf(chat)].date != date) {
        bv()
    }


    switch (body) {

        case "1":
            reply(`💲 *TABELA DE PREÇOS*

🏷️ 1 MÊS - *R$29,90*
🏷️ 3 MESES - *R$84,90*
🏷️ 6 MESES - *R$159,90*

*——————————————————*

*(PARA RENOVAÇÃO/ATIVAÇÃO BASTA EFETUAR O PAGAMENTO E NOS ENCAMINHAR O COMPROVANTE QUE JÁ RENOVAMOS/ATIVAMOS O SEU ACESSO)* ✅

*——————————————————*
 
*❖ VIA PIX ❖*

SEGUE OS DADOS E LEIA COM ATENÇÃO

TIPO DE CHAVE : *CELULAR* 📲

*⚠️ DICA: CLIQUE E SEGURE ACIMA DA CHAVE PIX PARA COPIAR ⚠️*

CHAVE PIX: → *11937080945* ←

BANCO:  *NU BANK* 🏦

NOME : *RAPHAEL MARTINS*

*——————————————————* \n\nCaso deseje voltar para o menu anterior, digite  9️⃣`)
            //reply(`Caso deseje voltar para o menu anterior, digite  9️⃣`)
            //reply('Para CANCELAR o atendimento, digite 8️⃣')
            break


        case "4":
            reply(`💲 *TABELA DE PREÇOS*

🏷️ 1 MÊS - *R$19,90*
🏷️ 3 MESES - *R$49,00*
🏷️ 6 MESES - *R$90,00*

*——————————————————*

*(PARA RENOVAÇÃO/ATIVAÇÃO BASTA EFETUAR O PAGAMENTO E NOS ENCAMINHAR O COMPROVANTE QUE JÁ RENOVAMOS/ATIVAMOS O SEU ACESSO)* ✅

*——————————————————*
 
*❖ VIA PIX ❖*

SEGUE OS DADOS E LEIA COM ATENÇÃO

TIPO DE CHAVE : *CELULAR* 📲

*⚠️ DICA: CLIQUE E SEGURE ACIMA DA CHAVE PIX PARA COPIAR ⚠️*

CHAVE PIX: → *11937080945* ←

BANCO:  *NU BANK* 🏦

NOME : *RAPHAEL MARTINS*

*——————————————————* \n\nCaso deseje voltar para o menu anterior, digite  9️⃣`)
            //reply(`Caso deseje voltar para o menu anterior, digite  9️⃣`)
            //reply('Para CANCELAR o atendimento, digite 8️⃣')
            break


        case "3":
            reply(`*SUPORTE IPTV* ⚒️📺

Pode nos dizer detalhadamente o que está acontecendo ?

Se possível me mande um vídeo do erro que aparece na sua TV 🙏🏼️\n\nCaso deseje voltar para o menu anterior, digite  9️⃣`)

            // reply('Para CANCELAR o atendimento, digite 8️⃣')
            break

        case "6":
            reply(`*SUPORTE INTERNET ILIMITADA* ⚒️🌐

Pode nos dizer detalhadamente o que está acontecendo ?

Se possível me mande um print do erro que aparece no seu aplicativo 🙏🏼️
\n\nCaso deseje voltar para o menu anterior, digite  9️⃣`)
            //reply(`\n\nCaso deseje voltar para o menu anterior, digite  9️⃣`)
            //reply('Para CANCELAR o atendimento, digite 8️⃣')
            break


        case "2":
            reply(`*TESTE GRÁTIS IPTV 📺🆓*

⚠️ Para fazer um teste grátis eu preciso que você me diga. Você tem uma tv box ou uma tv smart ? 

📺 Se for uma smart tv, você pode me mandar a marca dela e uma foto na tela dos aplicativos por favor ?

🕹️ Se for um tv box aguarde um momento que já lhe passo o procedimento para o teste grátis. \n\nCaso deseje voltar para o menu anterior, digite  9️⃣`)
            // reply(`Caso deseje voltar para o menu anterior, digite  9️⃣`)
            //reply('Para CANCELAR o atendimento, digite 8️⃣')
            break


        case "5":
            reply(`*TESTE GRÁTIS INTERNET 🌐🆓*

⚠️ Para fazer um teste grátis é preciso que você tenha um chip VIVO e ele esteja sem internet 4G ou H+.

Você afirma que tem as duas opções acima ?\n\nCaso deseje voltar para o menu anterior, digite  9️⃣`)
            //reply(`Caso deseje voltar para o menu anterior, digite  9️⃣`)
            //reply('Para CANCELAR o atendimento, digite 8️⃣')
            break


        case "7":
            reply(`*FALAR COM ATENDENTE 🗣️*

Okay, só um momento que já te atendemos 🤝🏼

⚠️ Por favor não faça ligação e evite mandar áudio, auto risco de ser ignorado.\n\nCaso deseje voltar para o menu anterior, digite  9️⃣`)
            //reply(`Caso deseje voltar para o menu anterior, digite  9️⃣`)
            //reply('Para CANCELAR o atendimento, digite 8️⃣')
            break


        // case "8":
        //     dates = dates.filter(i => i.id !== chat)
        //     fs.writeFileSync("./cache/json/dates.json", JSON.stringify(dates, null, 2))
        //     reply(`*SEU ATENDIENTO FOI CANCELADO* \nAgradecemos o contato, caso queira iniciar o atendimento novamente basta mandar um oi. \n\nAté a próxima!`)
        //     break


        case "9":
            bv2()
            break


        // default:
        //     reply(`*OPÇÃO INVÁLIDA* ❌ \n Por favor escolha apenas as opções da lista.`)
        //     reply(`Já sei, vou te mandar as opções novamente.`)
        //     dates = dates.filter(i => i.id !== chat)
        //     fs.writeFileSync("./cache/json/dates.json", JSON.stringify(dates, null, 2))
        //     bv()
    }


    switch (command) {

        case "menu":
            bv()
            break
    }
}

file = require.resolve(__filename)
fs.watchFile(file, () => {
    fs.unwatchFile(file)
    console.log("Atualizando, messages.js...")
    delete require.cache[file]
    require(file)
})