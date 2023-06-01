const { ethers } = require("hardhat");
const { CONTRACT_ADDRESS, CONTRACT_OWNER } = require("../deploy-config.js");

async function main() {
    const GameItem = await ethers.getContractFactory("GameItem");
    const gameItem = GameItem.attach(CONTRACT_ADDRESS);
    
    // You can add minter and use addres instead CONTRACT_OWNER
    const player = '0xC0Aa3875E565a81d894cA6C8874Ae7ce42EB8622';//CONTRACT_OWNER; 
    const strength = 4;
    const speed = 4;
    const intelligence = 4;
    const endurance = 4;
    const magic = 4;
    const _tokenURI = "https://my-mock-service.com/token/1";

    let result = await gameItem.mint(player, strength, speed, intelligence, endurance, magic, _tokenURI);
    let receipt = await result.wait();

    console.log('Token minted with id:', receipt.events.filter(x => x.event == 'Transfer')[0].args.tokenId.toString());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
