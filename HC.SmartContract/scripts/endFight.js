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

    // Specify the fight ID and winner token ID
    const fightId = 1;  // replace with actual fight ID
    const winnerTokenId = 1;  // replace with actual winner token ID

    let result = await gameItemConnected.endFight(fightId, winnerTokenId);
    let receipt = await result.wait();

    console.log('Fight ended:', receipt);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
