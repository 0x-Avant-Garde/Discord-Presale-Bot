// Require the necessary discord.js classes
const { Client, Intents } = require("discord.js");

const dotenv = require("dotenv");

dotenv.config();

const { ABI } = require("./abi");
var { Tokens } = require("./tokens");
var Web3 = require("web3");

const BSCWeb3 = new Web3(
  new Web3.providers.HttpProvider("https://bsc-dataseed.binance.org/")
);

const AVAXWeb3 = new Web3(
  new Web3.providers.HttpProvider("https://api.avax.network/ext/bc/C/rpc")
);

const FANTOMWeb3 = new Web3(
  new Web3.providers.HttpProvider("https://rpc.ankr.com/fantom/")
);

const ETHWeb3 = new Web3(
  new Web3.providers.HttpProvider(process.ENV.HTTP_PROVIDER)
);

const CHRONOSWeb3 = new Web3(
  new Web3.providers.HttpProvider("https://evm-cronos.crypto.org")
);

var formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 0,
});

// Create a new client instance
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

// When the client is ready, run this code (only once)
client.once("ready", () => {
  console.log("Ready!");
  client.user.setPresence({
    activities: [{ name: "Presale", type: "WATCHING" }],
  });
});

// Login to Discord with your client's token
client.login(process.env.DISCORD_TOKEN);

async function getBalances(chainId, tokenAddress, project) {
  let Contract;

  if (chainId == 56) {
    Contract = new BSCWeb3.eth.Contract(ABI, tokenAddress);
    const balance = await Contract.methods.total_deposited().call();
    return Number(balance / 1e18);
  }

  if (chainId == 43114) {
    Contract = new AVAXWeb3.eth.Contract(ABI, tokenAddress);
    const balance = await Contract.methods.total_deposited().call();
    return Number(balance / 1e6);
  }

  if (chainId == 250) {
    Contract = new FANTOMWeb3.eth.Contract(ABI, tokenAddress);
    const balance = await Contract.methods.total_deposited().call();
    return Number(balance / 1e6);
  }

  if (chainId == 1) {
    Contract = new ETHWeb3.eth.Contract(ABI, tokenAddress);
    const balance = await Contract.methods.total_deposited().call();
    return Number(balance / 1e6);
  }

  if (chainId == 25) {
    Contract = new CHRONOSWeb3.eth.Contract(ABI, tokenAddress);
    const balance = await Contract.methods.total_deposited().call();
    return Number(balance / 1e6);
  }
}

function main() {
  let interval;

  async function updateStatus() {
    let total = 0;

    try {
      for (const token of Tokens) {
        const balance = await getBalances(
          token.chainId,
          token.address,
          token.networkName
        );
        total += balance;
      }
    } catch (e) {
      console.log(e);
      return;
    }
    console.log(formatter.format(total.toFixed()));
    // client.user.setActivity(`Raised: ${formatter.format(total)}`, {
    //   type: "WATCHING",
    // });
    // client.user.setPresence({
    //   activities: [{ name: formatter.format(total), type: "WATCHING" }],
    // });

    client.guilds.cache.forEach((guild) => {
      const nickname = `Raised ${formatter.format(total.toFixed())}`;
      guild.me.setNickname(nickname);
    });

    clearInterval(interval);

    interval = setInterval(updateStatus, 30000);

    return;
  }

  interval = setInterval(updateStatus, 30000);
}

main();
