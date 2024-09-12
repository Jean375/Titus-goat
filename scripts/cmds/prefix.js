const axios = require('axios');
const{utiles}=global;
async function fetchFromAI(url, params) {
 try {
 const response = await axios.get(url, { params });
 return response.data;
 } catch (error) {
 console.error(error);
 return null;
 }
}

async function getAIResponse(input, userId, messageID) {
 const services = [
 { url: 'https://ai-tools.replit.app/gpt', params: { prompt: input, uid: userId } },
 { url: 'https://openaikey-x20f.onrender.com/api', params: { prompt: input } },
 { url: 'http://fi1.bot-hosting.net:6518/gpt', params: { query: input } },
 { url: 'https://ai-chat-gpt-4-lite.onrender.com/api/hercai', params: { question: input } }
 ];

 let response = "qu'est-ce qu'il y a encore....pose ta question 🉑✍️";
 let currentIndex = 0;

 for (let i = 0; i < services.length; i++) {
 const service = services[currentIndex];
 const data = await fetchFromAI(service.url, service.params);
 if (data && (data.gpt4 || data.reply || data.response)) {
 response = data.gpt4 || data.reply || data.response;
 break;
 }
 currentIndex = (currentIndex + 1) % services.length; // Move to the next service in the cycle
 }

 return { response, messageID };
}

module.exports = {
 config: {
 name: 'jokers',
 author: 'Arn',
 role: 0,
 category: 'jokers',
 shortDescription: 'ai to ask anything',
 },
 onStart: async function ({ api, event, arns }) {
 const input = args.join(' ').trim();
 if (!input) {
 api.sendMessage(``, event.threadID, event.messageID);
 return;
 }

const fonts = {

 mathsans: {

 𝗮: "𝗮", 𝗯: "𝗯", 𝗰: "𝗰", 𝗱: "𝗱", 𝗲: "𝗲", f: "𝗳", 𝗴: "𝗴", 𝗵: "𝗵", 𝗶: "𝗶",

 𝗝: "𝗷", 𝗸: "𝗸", 𝗹: "𝗹", 𝗺: "𝗺", 𝘀: "𝗻", 𝘀: "𝗼", 𝘀: "𝗽", q: "𝗾", r: "𝗿",

 𝘀: "𝘀", 𝘁: "𝘁", 𝘂: "𝘂", 𝘃: "𝘃", 𝘄: "𝘄", 𝘅: "𝘅", 𝘆: "𝘆", 𝘇: "𝘇",

 𝗔: "𝗔", 𝗕: "𝗕", 𝗖: "𝗖", 𝗗: "𝗗", 𝗘: "𝗘", 𝗙: "𝗙", 𝗚: "𝗚", 𝗛: "𝗛", 𝗜: "𝗜",

 𝗝: "𝗝", 𝗞: "𝗞", 𝗟: "𝗟", 𝗠: "𝗠", 𝗡: "𝗡", 𝗢: "𝗢", 𝗣: "𝗣", 𝗤: "𝗦", 𝗥: "𝗥",

 𝗦: "𝗦", 𝗧: "𝗧", 𝗨: "𝗨", 𝗩: "𝗩", 𝗪: "𝗪", 𝗫: "𝗫", 𝗬: "𝗬", 𝗭: "𝗭",
 }
};

 
 const { response, messageID } = await getAIResponse(input, event.senderID, event.messageID);
 api.sendMessage(` ${response} `, event.threadID, messageID);
 },
 onChat: async function ({ event, message }) {
 const messageContent = event.body.trim().toLowerCase();
 if (messageContent.startsWith("ai")) {
 const input = messageContent.replace(/^ai\s*/, "").trim();
 const { response, messageID } = await getAIResponse(input, event.senderID, message.messageID);
 message.reply(`🂱❍☬⚘Ïmpøstër⊰♔⊱ 🎭☬❍🂱\n🂱${response}__✍︎\n❍☬⚘Ïmpøstër⊰♔⊱ 🎭☬❍`, messageID);
 }
 }
 }
