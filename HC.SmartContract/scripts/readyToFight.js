const ethers = require('ethers');
const { CONTRACT_ADDRESS } = require("../deploy-config.js");

async function main() {
    const GameItem = await ethers.getContractFactory("GameItem");
    const gameItem = GameItem.attach(CONTRACT_ADDRESS);

    // The public address of the account you want to use
    const someAddress = "0x1234..."; // Replace with actual address

    // Get the signer you want to use for the transactions
    const specificSigner = ethers.provider.getSigner(someAddress);

    // Connect the signer to the contract
    const gameItemConnected = gameItem.connect(specificSigner);

    // Call the readyToFight function
    const tx = await gameItemConnected.readyToFight();
    const receipt = await tx.wait();

    console.log(`Transaction mined! Ready to fight. Hash: ${receipt.transactionHash}`);

}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
