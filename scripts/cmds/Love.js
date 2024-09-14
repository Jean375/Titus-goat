module.exports = {
  config: {
    name: "love",
    aliases: ["lve"],
    version: "1.0",
    author: "ʬɸʬ Shïsûį Dånïęl ʬɸʬ",
    countDown: 10,
    role: 0,
    shortDescription: "Play miss, the oldest gambling game",
    longDescription: "Play miss, the oldest gambling game, and earn money",
    category: "game",
    guide: "{pn} <amy/rouge> <amount of money>"
  },

  onStart: async function ({ args, message, usersData, event }) {
    const betType = args[0];
    const betAmount = parseInt(args[1]);
    const user = event.senderID;
    const userData = await usersData.get(event.senderID);

    if (!["amy", "rouge"].includes(betType)) {
      return message.reply("🎶| ℭ𝔥𝔬𝔦𝔰𝔦𝔰 𝔞𝔪𝔶 𝔬𝔲 𝔯𝔬𝔲𝔤𝔢");
    }

    if (!Number.isInteger(betAmount) || betAmount < 1000) {
      return message.reply("🔰| tu veux transfert à quelqu'un ? 🈯✍️");
    }

    if (betAmount > userData.money) {
      return message.reply("vas chercher l'argent pauvre...🈯✍️");
    }

    const dice = [1, 2, 3, 4, 5, 6];
    const results = [];

    for (let i = 0; i < 3; i++) {
      const result = dice[Math.floor(Math.random() * dice.length)];
      results.push(result);
    }

    const winConditions = {
      small: results.filter((num, index, arr) => num >= 1 && num <= 3 && arr.indexOf(num) !== index).length > 0,
      big: results.filter((num, index, arr) => num >= 4 && num <= 6 && arr.indexOf(num) !== index).length > 0,
    };

    const resultString = results.join(" | ");

    if ((winConditions[betType] && Math.random() <= 0.4) || (!winConditions[betType] && Math.random() > 0.4)) {
      const winAmount = 4 * betAmount;
      userData.money += winAmount;
      await usersData.set(event.senderID, userData);
      return message.reply(`⚘Ïmpøstër⊰♔⊱ 🎭\n━━━━━━━━━━━━━━━━\n[ 🉑${resultString}🉑 ]\n🧘| 𝑩𝒓𝒂𝒗𝒐 𝒕'𝒂𝒔 𝒈𝒂𝒈𝒏𝒆 🌱${winAmount}€🌱`);
    } else {
      userData.money -= betAmount;
      await usersData.set(event.senderID, userData);
      return message.reply(`⚘Ïmpøstër⊰♔⊱ 🎭\n━━━━━━━━━━━━━━━━\n[🉑${resultString}🉑]\n\n🤣 | 𝑀𝑒𝑟𝑑𝑒....🤣 𝑐𝑜𝑚𝑚𝑒𝑛𝑡 𝑡𝑢 𝑝𝑒𝑢𝑥 𝑝𝑒𝑟𝑑𝑟𝑒 🌱${betAmount}€🌱`);
    }
  }
};
