using HC.Domain.RequestModels;
using System.Numerics;

namespace HC.BusinessLogic.Interfaces
{
    public interface IGameItemService
    {
        Task<string> MintAsync(MintRequest request);

        Task<string> StartFightAsync(BigInteger tokenId1, BigInteger tokenId2);

        Task<string> EndFightAsync(BigInteger fightId, BigInteger winnerTokenId);

        Task<string> AddMinterAsync(string minterAddress);

        Task<string> RemoveMinterAsync(string minterAddress);

        Task<Ability> GetAbilityAsync(BigInteger tokenId);

        Task<string> GetTokenURIAsync(BigInteger tokenId);

        Task<string> GetOwnerOfTokenAsync(BigInteger tokenId);

    }
}
