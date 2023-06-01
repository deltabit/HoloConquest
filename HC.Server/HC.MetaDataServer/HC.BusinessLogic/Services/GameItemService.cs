using Nethereum.Web3;
using Nethereum.Contracts;
using System.Numerics;
using HC.BusinessLogic.Interfaces;
using HC.Domain.Models;
using Microsoft.Extensions.Options;
using HC.Domain.RequestModels;

namespace HC.BusinessLogic.Services
{
    public class GameItemService : IGameItemService
    {
        private readonly Web3 _web3;
        private readonly Contract _contract;
        private string _ownerPrivateKey;

        public GameItemService(
            IOptions<ContractSettings> contractOptions,
            IOptions<BlockchainSettings> blockchainOptions)
        {
            //TODO: investigate more safe method of sharing private key (maybe with crypting)
            _ownerPrivateKey = "contract owner private key here";

            _web3 = new Web3(blockchainOptions.Value.Url);
            _contract = _web3.Eth.GetContract(
                contractOptions.Value.Abi,
                contractOptions.Value.Address);
        }

        // Only Owner || withlist minter
        public async Task<string> MintAsync(MintRequest request)
        {
            var ownerAddress = new Nethereum.Signer.EthECKey(_ownerPrivateKey).GetPublicAddress();

            var function = _contract.GetFunction("mint");

            var transactionInput = function.CreateTransactionInput(
                ownerAddress,
                request.Strength,
                request.Speed,
                request.Intelligence,
                request.Endurance,
                request.Magic,
                request.TokenURI);

            var result = await _web3.Eth.Transactions.SendTransaction.SendRequestAsync(transactionInput);

            return result;
        }

        // Only Owner
        public async Task<string> StartFightAsync(BigInteger tokenId1, BigInteger tokenId2)
        {
            var ownerAddress = new Nethereum.Signer.EthECKey(_ownerPrivateKey).GetPublicAddress();

            var function = _contract.GetFunction("startFight");

            var transactionInput = function.CreateTransactionInput(ownerAddress, tokenId1, tokenId2);

            var result = await _web3.Eth.Transactions.SendTransaction.SendRequestAsync(transactionInput);

            return result;
        }

        // Only Owner
        public async Task<string> EndFightAsync(BigInteger fightId, BigInteger winnerTokenId)
        {
            var ownerAddress = new Nethereum.Signer.EthECKey(_ownerPrivateKey).GetPublicAddress();

            var function = _contract.GetFunction("endFight");

            var transactionInput = function.CreateTransactionInput(ownerAddress, fightId, winnerTokenId);

            var result = await _web3.Eth.Transactions.SendTransaction.SendRequestAsync(transactionInput);

            return result;
        }

        // Only Owner
        public async Task<string> AddMinterAsync(string minterAddress)
        {
            var ownerAddress = new Nethereum.Signer.EthECKey(_ownerPrivateKey).GetPublicAddress();

            var function = _contract.GetFunction("addMinter");

            var transactionInput = function.CreateTransactionInput(ownerAddress, null, null, minterAddress);

            var result = await _web3.Eth.Transactions.SendTransaction.SendRequestAsync(transactionInput);

            return result;
        }


        // Only Owner
        public async Task<string> RemoveMinterAsync(string minterAddress)
        {
            var ownerAddress = new Nethereum.Signer.EthECKey(_ownerPrivateKey).GetPublicAddress();

            var function = _contract.GetFunction("removeMinter");

            var transactionInput = function.CreateTransactionInput(ownerAddress, null, null, minterAddress);

            var result = await _web3.Eth.Transactions.SendTransaction.SendRequestAsync(transactionInput);

            return result;
        }

        public async Task<Ability> GetAbilityAsync(BigInteger tokenId)
        {
            var function = _contract.GetFunction("getAbility");

            var result = await function.CallDeserializingToObjectAsync<Ability>(tokenId);

            return result;
        }

        public async Task<string> GetTokenURIAsync(BigInteger tokenId)
        {
            var function = _contract.GetFunction("tokenURI");

            var result = await function.CallAsync<string>(tokenId);

            return result;
        }

        public async Task<string> GetOwnerOfTokenAsync(BigInteger tokenId)
        {
            var function = _contract.GetFunction("getOwnerOfToken");

            var result = await function.CallAsync<string>(tokenId);

            return result;
        }
    }
}
