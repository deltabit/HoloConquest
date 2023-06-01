const { ethers } = require("hardhat");
const { CONTRACT_ADDRESS } = require("../deploy-config.js");

async function main() {
    const GameItem = await ethers.getContractFactory("GameItem");
    const gameItem = GameItem.attach(CONTRACT_ADDRESS);
    const tokenId = process.env.TOKEN_ID;

    const ability = await gameItem.getAbility(tokenId);
    
    console.log('Ability of Token:', tokenId);
    console.log('Strength:', ability.strength.toString());
    console.log('Speed:', ability.speed.toString());
    console.log('Intelligence:', ability.intelligence.toString());
    console.log('Endurance:', ability.endurance.toString());
    console.log('Magic:', ability.magic.toString());
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
