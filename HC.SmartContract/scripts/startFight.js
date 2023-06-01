const ethers = require('ethers');
const { CONTRACT_ADDRESS, CONTRACT_OWNER } = require("../deploy-config.js");

async function main() {
    const GameItem = await ethers.getContractFactory("GameItem");
    const gameItem = GameItem.attach(CONTRACT_ADDRESS);

    // Get the signer you want to use for the transactions
    // If the deployer of the contract is supposed to call this function, 
    // then we can use CONTRACT_OWNER
    const specificSigner = ethers.provider.getSigner(CONTRACT_OWNER);

    // Connect the signer to the contract
    const gameItemConnected = gameItem.connect(specificSigner);

    // Specify the token IDs for the fight
    const tokenId1 = 1;  // replace with actual token ID
    const tokenId2 = 2;  // replace with actual token ID

    let result = await gameItemConnected.startFight(tokenId1, tokenId2);
    let receipt = await result.wait();

    console.log('Fight started:', receipt);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
