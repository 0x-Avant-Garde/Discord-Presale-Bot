// Require the necessary discord.js classes
const { Client, Intents } = require("discord.js");

const dotenv = require("dotenv");

dotenv.config();

// Create a new client instance
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

// When the client is ready, run this code (only once)
client.once("ready", () => {
  console.log("Ready!");
  client.user.setPresence({
    activities: [{ name: "Orbital Extension", type: "WATCHING" }],
  });
});

// Login to Discord with your client's token
client.login(process.env.DISCORD_TOKEN);

// Set the date we're counting down to
var countDownDate = new Date(1658959200).getTime() * 1000;
// Update the count down every 1 second
var x = setInterval(function () {
  // Get today's date and time
  var now = new Date().getTime();

  // Find the distance between now and the count down date
  var distance = countDownDate - now;

  // Time calculations for days, hours, minutes and seconds
  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);

  if (distance < 0) {
    clearInterval(x);
    client.guilds.cache.forEach((guild) => {
      const nickname = `Presale Complete!`;
      guild.me.setNickname(nickname);
    });
    return;
  }

  client.guilds.cache.forEach((guild) => {
    const nickname = `${days}d ${hours}h ${minutes}m`;
    guild.me.setNickname(nickname);
  });
  return;
}, 60000);
