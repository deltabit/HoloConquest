using Microsoft.AspNetCore.Mvc;
using HC.BusinessLogic.Interfaces;
using System.Numerics;
using HC.Domain.RequestModels;

namespace HC.MetaDataServer.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class SmartContractController : ControllerBase
    {
        private readonly IGameItemService _gameItemService;

        public SmartContractController(IGameItemService gameItemService)
        {
            _gameItemService = gameItemService;
        }

        [HttpPost("mint")]
        public async Task<IActionResult> MintAsync([FromBody] MintRequest request)
        {
            var result = await _gameItemService.MintAsync(request);

            return Ok(result);
        }


        [HttpPost("startFight")]
        public async Task<IActionResult> StartFightAsync([FromBody] StartFightRequest request)
        {
            var result = await _gameItemService.StartFightAsync((BigInteger)request.TokenId1, (BigInteger)request.TokenId2);
            return Ok(result);
        }

        [HttpPost("endFight")]
        public async Task<IActionResult> EndFightAsync([FromBody] EndFightRequest request)
        {
            var result = await _gameItemService.EndFightAsync(request.FightId, request.WinnerTokenId);
            return Ok(result);
        }

        // works
        [HttpGet("getAbility/{tokenId}")]
        public async Task<IActionResult> GetAbilityAsync(int tokenId)
        {
            var result = await _gameItemService.GetAbilityAsync((BigInteger)tokenId);
            return Ok(result);
        }

        [HttpGet("getTokenURI/{tokenId}")]
        public async Task<IActionResult> GetTokenURIAsync(int tokenId)
        {
            var result = await _gameItemService.GetTokenURIAsync((BigInteger)tokenId);
            return Ok(result);
        }

        //works
        [HttpGet("addMinter")]
        public async Task<IActionResult> AddMinterAsync(string minterAddress)
        {
            var result = await _gameItemService.AddMinterAsync(minterAddress);
            return Ok(result);
        }

        //works
        [HttpGet("removeMinter")]
        public async Task<IActionResult> RemoveMinterAsync(string minterAddress)
        {
            var result = await _gameItemService.RemoveMinterAsync(minterAddress);
            return Ok(result);
        }

        [HttpGet("getOwnerOfToken/{tokenId}")]
        public async Task<IActionResult> GetOwnerOfTokenAsync(int tokenId)
        {
            var result = await _gameItemService.GetOwnerOfTokenAsync((BigInteger)tokenId);
            return Ok(result);
        }
    }
}
