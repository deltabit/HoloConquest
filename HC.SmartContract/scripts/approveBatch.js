// approveBatch.js
const { ethers } = require("hardhat");
const { CONTRACT_ADDRESS } = require("../deploy-config.js");

async function main() {
    const GameItem = await ethers.getContractFactory("GameItem");
    const gameItem = GameItem.attach(CONTRACT_ADDRESS);

    const specificSigner = ethers.provider.getSigner("0xYourPrivateKeyHere");
    const gameItemConnected = gameItem.connect(specificSigner);

    const to = "0xAddressToApproveTokensFor";
    const tokenIds = [1, 2, 3, 4, 5];  // Replace with actual token IDs you want to approve

    const result = await gameItemConnected.approveBatch(to, tokenIds);
    const receipt = await result.wait();

    console.log('Batch approval succeeded:', receipt);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
