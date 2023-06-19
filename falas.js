const fetch = require("node-fetch");

prefixo = "/"
nomeBot = "ATENDIMENTO AUTOMÁTICO 🤖"
numerodono = "5511937080945" 
nomedono = "Wolf Play 🐺"
meunome = "Raphael M"












const menu = (name) => {
return `🤖 Seja bem vindo ao atendimento automático *Wolf Play* 🐺📺`
}







const fetchJson = (url, options) => new Promise(async (resolve, reject) => {
    fetch(url, options)
        .then(response => response.json())
        .then(json => {
            resolve(json)
        })
        .catch((err) => {
            reject(err)
        })
})


module.exports = {
prefixo,
nomeBot,
numerodono,
nomedono,
fetchJson,
menu
}
