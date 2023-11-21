// Require the necessary discord.js classes
const { Client, Intents } = require("discord.js");

const dotenv = require("dotenv");

dotenv.config();

// Create a new client instance
const client = new Client({
  intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

// When the client is ready, run this code (only once)
client.once("ready", () => {
  console.log("Ready!");
});

// Login to Discord with your client's token
client.login(process.env.DISCORD_ASSISTANT_TOKEN);

var {
  problem,
  trust,
  cap,
  what,
  presale,
  is,
  enter,
  how,
  end,
  tax,
  error,
  raise,
  target,
  price,
  launch,
  exempt,
  can,
} = require("./keywords");

client.on("messageCreate", (message) => {
  // TODO check role of message sender

  // if (message.member.roles.cache.some((role) => role.name === "Founders"))
  //   return;
  if (message.author.bot) return;

  if (message.content.length > 100) return;
  if (
    problem.some((v) => message.content.toLowerCase().includes(v)) &&
    trust.some((v) => message.content.toLowerCase().includes(v))
  ) {
    message.reply(
      "> *People have been experiencing problems with trust wallet, especially on mobile.  Please try the following solutions:* https://discord.com/channels/955480373750542336/955493028502573146/996014739383648266"
    );
  }

  if (
    how.some((v) => message.content.toLowerCase().includes(v)) &&
    launch.some((v) => message.content.toLowerCase().includes(v)) &&
    is.some((v) => message.content.toLowerCase().includes(v))
  ) {
    message.reply("> *Launch happens shortly after the presale ends*");
    return;
  }

  if (
    what.some((v) => message.content.toLowerCase().includes(v)) &&
    price.some((v) => message.content.toLowerCase().includes(v))
  ) {
    message.reply(
      "> *The price during presale is 10c, after presale ends it will be launched at 12c and then will depend on the market.*"
    );
    return;
  }

  if (
    problem.some((v) => message.content.toLowerCase().includes(v)) &&
    raise.some((v) => message.content.toLowerCase().includes(v)) &&
    (target.some((v) => message.content.toLowerCase().includes(v)) ||
      cap.some((v) => message.content.toLowerCase().includes(v)))
  ) {
    message.reply(
      "> *If 10mil cannot be reached, the presale will simply last its full two weeks and then Liquid AR will launch as normal after the presale is over.*"
    );
    return;
  }

  if (
    cap.some((v) => message.content.toLowerCase().includes(v)) &&
    what.some((v) => message.content.toLowerCase().includes(v)) &&
    (problem.some((v) => message.content.toLowerCase().includes(v)) ||
      is.some((v) => message.content.toLowerCase().includes(v))) &&
    !exempt.some((v) => message.content.toLowerCase().includes(v))
  ) {
    message.reply(
      "> *The target is $10M but LC can launch with any amount. The hardcap is $2M x # of partners + $10M from LC.* https://discord.com/channels/955480373750542336/955493028502573146/996328637173338152"
    );
    return;
  }

  if (
    presale.some((v) => message.content.toLowerCase().includes(v)) &&
    is.some((v) => message.content.toLowerCase().includes(v)) &&
    enter.some((v) => message.content.toLowerCase().includes(v))
  ) {
    message.reply(
      "> *Yes the presale is open and you can still enter.  Please go to https://presale.liquidcapital.finance/partners to see where to buy.*"
    );
    return;
  }

  if (
    presale.some((v) => message.content.toLowerCase().includes(v)) &&
    is.some((v) => message.content.toLowerCase().includes(v)) &&
    end.some((v) => message.content.toLowerCase().includes(v))
  ) {
    message.reply(
      "> *No the presale is still open, you can go to https://presale.liquidcapital.finance/partners to enter.*"
    );
    return;
  }

  if (
    how.some((v) => message.content.toLowerCase().includes(v)) &&
    enter.some((v) => message.content.toLowerCase().includes(v)) &&
    can.some((v) => message.content.toLowerCase().includes(v)) &&
    !cap.some((v) => message.content.toLowerCase().includes(v)) &&
    !error.some((v) => message.content.toLowerCase().includes(v))
  ) {
    message.reply(
      "> *You can buy from any partner or directly from LC.  All links can be found at* https://presale.liquidcapital.finance/partners"
    );
    return;
  }

  if (
    how.some((v) => message.content.toLowerCase().includes(v)) &&
    end.some((v) => message.content.toLowerCase().includes(v)) &&
    presale.some((v) => message.content.toLowerCase().includes(v))
  ) {
    message.reply(
      "> *The presale will be for 2 weeks from its start unless the target of $10M has been reached, then a 7 day countdown will start. During the countdown you can still enter the pre sale. When the countdown comes to an end, LC will begin the process of withdrawing the presale funds from the contracts across all chains, migrate the funds to BSC, and prepare for the airdrop and to launch within the following week.*"
    );
    return;
  }

  if (
    tax.some((v) => message.content.toLowerCase().includes(v)) &&
    is.some((v) => message.content.toLowerCase().includes(v)) &&
    what.some((v) => message.content.toLowerCase().includes(v))
  ) {
    message.reply(
      "> *The initial sales tax is 26%, scaling down over time.  You can read more about it at* https://liquidcapital.gitbook.io/liquid-capital-white-paper/liquid-ar/buy-and-sell-fees/trading-fee-details"
    );
    return;
  }

  if (
    enter.some((v) => message.content.toLowerCase().includes(v)) &&
    error.some((v) => message.content.toLowerCase().includes(v))
  ) {
    message.reply(
      "> *The most common error we have seen is people trying to buy less than the minimum, which is $50.  The second most common is trust wallet issues.  Some troubleshooting can be found at* https://discord.com/channels/955480373750542336/955493028502573146/996014739383648266"
    );
    return;
  }
});
