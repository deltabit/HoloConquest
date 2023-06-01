# Sample Hardhat Project

Try running some of the following tasks:

```shell
npx hardhat help
npx hardhat test
```

# Dependencies

node v16.16.0<br>
npm v9.6.1

```shell
npm install --save-dev hardhat
npm install --save-dev @nomiclabs/hardhat-waffle ethereum-waffle chai ethers @nomiclabs/hardhat-ethers
npm install --save-dev @openzeppelin/contracts
npm install dotenv
```

# Setting .env File

Create a .env file in the root of your project. In this file, you will put your Infura Project ID and private key like this:

```shell
INFURA_PROJECT_ID=YourInfuraProjectId
PRIVATE_KEY=YourPrivateKey
LOCAL_PRIVATE_KEY=YourLocalGanachePrivateKey
```

# Local deploy ganache

```shell
npm run deploy:ganache
```

local mint:

```shell
npm run mint:ganache
```

add minter:

```shell
npm run addminter:ganache
```

get ability:

paste the token you need, like TOKEN_ID=2, TOKEN_ID=3... (TOKEN_ID=1 as default)

```shell
TOKEN_ID=2 npm run getability:ganache
```

or for windows terminal 

```shell
set TOKEN_ID=1 && npm run getability:ganache
```
powershell:

```shell
$env:TOKEN_ID=1; npm run getability:ganache
```

# Global deploy goerli

same for global deploy, only change network name to goerli

```shell
npm run deploy:goerli
```

find smart contract after global deploy on https://goerli.etherscan.io/address/YourContractAddress