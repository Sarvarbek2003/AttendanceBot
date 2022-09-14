const TelegramBot = require('node-telegram-bot-api')
const token = "5600745824:AAEmzdaJNI5zIgaKyyw6KiBj0M1XCQWqE3I"
const bot = new TelegramBot(token, {polling:true}) 

const { GoogleSpreadsheet } = require('google-spreadsheet')
const { join } = require('path')
const { readFileSync } = require('fs')


const googleshet = async () => {
    try {
        let api = JSON.parse(readFileSync(join(process.cwd(), 'sheetapi.json'), 'utf-8'));
        let GOOGLEE_SHEET_ID = '1Uid84nWYgYt60RQXBacFpBMpZ8BeAMwVGii5tcCJG9Y';
        const doc = new GoogleSpreadsheet(GOOGLEE_SHEET_ID);
        await doc.useServiceAccountAuth({
          client_email: api.client_email,
          private_key: api.private_key,
        });
        await doc.loadInfo();
        return await doc
      } catch (error) {
        console.log('get_sheet', error);
      }
} 

bot.on('message', async msg => {
    let text = msg.text;
    let chatId = msg.from.id

    if(text == '/start'){
        return bot.sendMessage(chatId, "Assalomualekum men googlesheets nazoratchi bo'timan\n\nLink: https://docs.google.com/spreadsheets/d/1Uid84nWYgYt60RQXBacFpBMpZ8BeAMwVGii5tcCJG9Y/edit#gid=186001220")
    }
    else if(text.split(" ")[0] == '/student'){
        let {interval, msgId} = await waiting(msg) 
        try {
            let doc = await googleshet()
            const sheet = doc.sheetsByIndex[0]; 
            const rows = await sheet.getRows();
            rows.forEach(async row => {
                if(row._rawData[1] == text.split(" ")[1]){

                    await sheet.loadCells('A:Z');
                    let d = new Date();
                    let day = d.getDate()
                    let month = d.getMonth() + 1
                    let hour = d.getHours()
                    let column = row._sheet.headerValues.findIndex(el => el == `${month}/${day}`);
                    const a1 = sheet.getCell(row._rowNumber-1, column);
                    let status = 'P'
                    if( hour > 9 ) status = 'L' 
                    a1.value = status;
                    await sheet.saveUpdatedCells();
                }
            });
            clearInterval(interval)
            bot.editMessageText("✅ Amalyot muvoffaqyatli bajarildi",{
                chat_id: chatId,
                message_id: msgId
            })
        } catch (error) {
            clearInterval(interval)
            bot.deleteMessage(chatId, msgId)
            return bot.sendMessage(chatId, "❌ Qandaydir xatolik yuz berdi qaytadan urinib ko'ring")
        }
        
    }
    else if(text == '/hammasi'){    
        let {interval, msgId } = await waiting(msg) 
        try {
            let doc = await googleshet()
            const sheet = doc.sheetsByIndex[0]; 
            const rows = await sheet.getRows();
            rows.shift()
            let txt = ''
            rows.forEach(row => {
                let username = row._rawData[1]
                let l = row._rawData[23]
                let e = row._rawData[24]
                let u = row._rawData[25]
                if(username) txt += `👤 ${username}: \n➡️ L: ${l}     E: ${e}      U:${u}\n🟰🟰🟰🟰🟰🟰🟰🟰🟰🟰🟰\n`
            });
            clearInterval(interval)
            return bot.editMessageText(txt == '' ? 'Ma\'lumot topilmadi':txt,{
                chat_id:chatId,
                message_id: msgId
            })
        } catch (error) {
            clearInterval(interval)
            bot.deleteMessage(chatId, msgId)
            return bot.sendMessage(chatId, "❌ Qandaydir xatolik yuz berdi qaytadan urinib ko'ring")
        }
    } else if(text == '/sababli'){ 
        let {interval, msgId } = await waiting(msg)    
        try {
            let doc = await googleshet()
            const sheet = doc.sheetsByIndex[0]; 
            const rows = await sheet.getRows();
            rows.shift()
            let txt = ''
            rows.forEach(row => {
                let username = row._rawData[1]
                let l = row._rawData[23]
                let e = row._rawData[24]
                let u = row._rawData[25]
                if(e > 0 && username) txt += `👤 ${username}: \n➡️ L: ${l}     E: ${e}      U:${u}\n🟰🟰🟰🟰🟰🟰🟰🟰🟰🟰🟰\n`
            });
            clearInterval(interval)
            return bot.editMessageText(txt == '' ? 'Ma\'lumot topilmadi':txt,{
                chat_id: chatId,
                message_id: msgId
            })
        } catch (error) {
            clearInterval(interval)
            bot.deleteMessage(chatId, msgId)
            return bot.sendMessage(chatId, "❌ Qandaydir xatolik yuz berdi qaytadan urinib ko'ring")
        }
    } else if(text == '/sababsiz'){  
        let {interval, msgId } = await waiting(msg)   
        try {
            let doc = await googleshet()
            const sheet = doc.sheetsByIndex[0];
            const rows = await sheet.getRows();
            rows.shift()
            let txt = ''
            rows.forEach(row => {
                let username = row._rawData[1]
                let l = row._rawData[23]
                let e = row._rawData[24]
                let u = row._rawData[25]
                if(u > 0 && username) txt += `👤 ${username}: \n➡️ L: ${l}     E: ${e}      U:${u}\n🟰🟰🟰🟰🟰🟰🟰🟰🟰🟰🟰\n`
            });
            clearInterval(interval)
            return bot.editMessageText( txt == '' ? 'Ma\'lumot topilmadi':txt, {
                chat_id: chatId,
                message_id: msgId
            })
        } catch (error) {
            clearInterval(interval)
            bot.deleteMessage(chatId, msgId)
            return bot.sendMessage(chatId, "❌ Qandaydir xatolik yuz berdi qaytadan urinib ko'ring")
        }
    } else if(text == '/kech'){   
        let {interval, msgId } = await waiting(msg)  
        try {
            let doc = await googleshet()
            const sheet = doc.sheetsByIndex[0];
            const rows = await sheet.getRows();
            rows.shift()
            let txt = ''
            rows.forEach(row => {
                let username = row._rawData[1]
                let l = row._rawData[23]
                let e = row._rawData[24]
                let u = row._rawData[25]
                if(l > 0 && username) txt += `👤 ${username}: \n➡️ L: ${l}     E: ${e}      U:${u}\n🟰🟰🟰🟰🟰🟰🟰🟰🟰🟰🟰\n`
            });
            clearInterval(interval)
            return bot.editMessageText(txt == '' ? 'Ma\'lumot topilmadi':txt,{
                chat_id: chatId,
                message_id: msgId
            })
        } catch (error) {
            clearInterval(interval)
            bot.deleteMessage(chatId, msgId)
            return bot.sendMessage(chatId, "❌ Qandaydir xatolik yuz berdi qaytadan urinib ko'ring")
        }
    }
    
})

const waiting = async (msg) => {
    let chatId = msg.from.id

    let count = (1 + Math.random() * 10 | 0)
    let message = await bot.sendMessage(chatId, '💫 Yuklanmoqda ')

    let interval = setInterval(async () => {
        if(count <= 100){
            bot.editMessageText( '💫 Yuklanmoqda ' + count + ' %', {
                chat_id: chatId,
                message_id: message.message_id
            })
            count += (1 + Math.random() * 10 | 0)
        } else {
            bot.editMessageText( '💫 Yuklanmoqda 100%', {
                chat_id: chatId,
                message_id: message.message_id
            })
        }
    }, 100);
    return await {interval, msgId: message.message_id}
}