const { ethers } = require("hardhat");
const { CONTRACT_ADDRESS } = require("../deploy-config.js");

async function main() {
    const GameItem = await ethers.getContractFactory("GameItem");
    const gameItem = GameItem.attach(CONTRACT_ADDRESS);

    let result = await gameItem.addMinter("0xAddressToBeAddedAsMinter");
    let receipt = await result.wait();

    console.log('Minter added:', receipt);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
