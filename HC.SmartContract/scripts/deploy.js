const hre = require("hardhat");
const fs = require('fs');
const path = require('path');

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  const privateKeyName = 'LOCAL_PRIVATE_KEY';
  
  console.log("Deploying contracts with the account:", deployer.address);

  const ContractFactory = await hre.ethers.getContractFactory("GameItem");
  const contract = await ContractFactory.deploy();
  await contract.deployed();

  console.log("Contract deployed to:", contract.address);

  // save the contract ABI
  const contractAbi = ContractFactory.interface.format('json');
  fs.writeFileSync(
    path.join(__dirname, '..', 'contractsAbi', 'GameItemABI.json'), 
    JSON.stringify(contractAbi, null, 2),
    (err) => {
    if (err) throw err;
  });

  // read the .env file
  const env = fs.readFileSync('.env', 'utf8');
  const ownerPrivateKey = env.split('\n').find(line => line.startsWith(privateKeyName)).split('=')[1];

  // read appsettings.json
  const appSettingsPath = path.join(__dirname, '..', '..', 'HC.MetaDataServer', 'HC.MetaDataServer', 'appsettings.json');
  const appSettings = JSON.parse(fs.readFileSync(appSettingsPath, 'utf8'));

  // update the contract details
  appSettings.Contract.Abi = contractAbi;
  appSettings.Contract.Address = contract.address;
  appSettings.Contract.OwnerAddress = deployer.address;
  appSettings.Ganache.LocalPrivateKey = ownerPrivateKey;

  // write back to appsettings.json
  fs.writeFileSync(
    appSettingsPath, 
    JSON.stringify(appSettings, null, 2), 
    (err) => {
    if (err) throw err;
  });

  // update environment.ts
  const environmentPath = path.join(__dirname, '..', '..', 'HC.WebClient', 'src', 'environment.ts');
  let environmentData = fs.readFileSync(environmentPath, 'utf8');
  environmentData = environmentData.replace(/abi: '.*?'/, `abi: ${JSON.stringify(contractAbi)}`);
  environmentData = environmentData.replace(/address: '.*?'/, `address: '${contract.address}'`);
  environmentData = environmentData.replace(/ownerAddress: '.*?'/, `ownerAddress: '${deployer.address}'`);

  fs.writeFileSync(environmentPath, environmentData, 'utf8', (err) => {
    if (err) throw err;
  });
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
