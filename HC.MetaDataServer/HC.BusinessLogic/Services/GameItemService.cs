using Nethereum.Web3;
using Nethereum.Contracts;
using System.Numerics;
using HC.BusinessLogic.Interfaces;
using HC.Domain.Models;
using Microsoft.Extensions.Options;
using HC.Domain.RequestModels;
using HC.BusinessLogic.Mapper;
using Nethereum.Hex.HexTypes;
using Nethereum.RPC.Eth.DTOs;
using HC.BusinessLogic.DTOs;

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
            _ownerPrivateKey = blockchainOptions.Value.LocalPrivateKey;

            _web3 = new Web3(blockchainOptions.Value.Url);
            _contract = _web3.Eth.GetContract(
                contractOptions.Value.Abi,
                contractOptions.Value.Address);
        }

        // Only Owner | works
        public async Task<string> MintAsync(MintRequest mintRequest)
        {
            var ownerAddress = new Nethereum.Signer.EthECKey(_ownerPrivateKey).GetPublicAddress();

            var simpleAbility = SimpleAbility.CreateRandomAbilityInt();

            var ability = AbilityMapper.MapToAbility(simpleAbility);

            var function = _contract.GetFunction("mint");

            var gasLimit = new HexBigInteger(500000);

            var transactionInput = function.CreateTransactionInput(
                ownerAddress,
                mintRequest.PlayerAddress,
                ability.Strength,
                ability.Speed,
                ability.Intelligence,
                ability.Endurance,
                ability.Magic,
                "fake token URI");

            transactionInput.Gas = gasLimit;

            var transactionHash = await _web3.Eth.Transactions.SendTransaction.SendRequestAsync(transactionInput);

            var receipt = await _web3.Eth.Transactions.GetTransactionReceipt.SendRequestAsync(transactionHash);

            // Create a filter to find the Transfer event related to the transaction
            var filterInput = _contract
                .GetEvent("Transfer")
                .CreateFilterInput(new BlockParameter(receipt.BlockNumber), BlockParameter.CreateLatest());

            // Query all Transfer events with our filter
            var events = await _contract
                .GetEvent("Transfer")
                .GetAllChangesAsync<TransferEventDTO>(filterInput);

            // Find our event and get the tokenId from it
            var ourEvent = events.FirstOrDefault(e => e.Log.TransactionHash == transactionHash);
            var mintedNftId = ourEvent?.Event.TokenId.ToString();

            return mintedNftId;
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
