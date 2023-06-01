export const environment = {
  production: false,
  blockchain: {
    contract: {
      abi: '"[{\"type\":\"constructor\",\"payable\":false,\"inputs\":[]},{\"type\":\"event\",\"anonymous\":false,\"name\":\"AbilityAssigned\",\"inputs\":[{\"type\":\"uint256\",\"name\":\"tokenId\",\"indexed\":true},{\"type\":\"tuple\",\"name\":\"ability\",\"indexed\":false,\"components\":[{\"type\":\"uint256\",\"name\":\"strength\"},{\"type\":\"uint256\",\"name\":\"speed\"},{\"type\":\"uint256\",\"name\":\"intelligence\"},{\"type\":\"uint256\",\"name\":\"endurance\"},{\"type\":\"uint256\",\"name\":\"magic\"}]}]},{\"type\":\"event\",\"anonymous\":false,\"name\":\"Approval\",\"inputs\":[{\"type\":\"address\",\"name\":\"owner\",\"indexed\":true},{\"type\":\"address\",\"name\":\"approved\",\"indexed\":true},{\"type\":\"uint256\",\"name\":\"tokenId\",\"indexed\":true}]},{\"type\":\"event\",\"anonymous\":false,\"name\":\"ApprovalForAll\",\"inputs\":[{\"type\":\"address\",\"name\":\"owner\",\"indexed\":true},{\"type\":\"address\",\"name\":\"operator\",\"indexed\":true},{\"type\":\"bool\",\"name\":\"approved\",\"indexed\":false}]},{\"type\":\"event\",\"anonymous\":false,\"name\":\"BatchMetadataUpdate\",\"inputs\":[{\"type\":\"uint256\",\"name\":\"_fromTokenId\",\"indexed\":false},{\"type\":\"uint256\",\"name\":\"_toTokenId\",\"indexed\":false}]},{\"type\":\"event\",\"anonymous\":false,\"name\":\"Bet\",\"inputs\":[{\"type\":\"uint256\",\"name\":\"tokenId\",\"indexed\":true},{\"type\":\"address\",\"name\":\"bettor\",\"indexed\":true}]},{\"type\":\"event\",\"anonymous\":false,\"name\":\"FightEnded\",\"inputs\":[{\"type\":\"uint256\",\"name\":\"fightId\",\"indexed\":true},{\"type\":\"uint256\",\"name\":\"winnerTokenId\",\"indexed\":false},{\"type\":\"uint256\",\"name\":\"loserTokenId\",\"indexed\":false}]},{\"type\":\"event\",\"anonymous\":false,\"name\":\"FightStarted\",\"inputs\":[{\"type\":\"uint256\",\"name\":\"fightId\",\"indexed\":true},{\"type\":\"uint256\",\"name\":\"tokenId1\",\"indexed\":false},{\"type\":\"uint256\",\"name\":\"tokenId2\",\"indexed\":false}]},{\"type\":\"event\",\"anonymous\":false,\"name\":\"MetadataUpdate\",\"inputs\":[{\"type\":\"uint256\",\"name\":\"_tokenId\",\"indexed\":false}]},{\"type\":\"event\",\"anonymous\":false,\"name\":\"OwnershipTransferred\",\"inputs\":[{\"type\":\"address\",\"name\":\"previousOwner\",\"indexed\":true},{\"type\":\"address\",\"name\":\"newOwner\",\"indexed\":true}]},{\"type\":\"event\",\"anonymous\":false,\"name\":\"Transfer\",\"inputs\":[{\"type\":\"address\",\"name\":\"from\",\"indexed\":true},{\"type\":\"address\",\"name\":\"to\",\"indexed\":true},{\"type\":\"uint256\",\"name\":\"tokenId\",\"indexed\":true}]},{\"type\":\"event\",\"anonymous\":false,\"name\":\"UserReadyToFight\",\"inputs\":[{\"type\":\"address\",\"name\":\"user\",\"indexed\":true}]},{\"type\":\"function\",\"name\":\"addMinter\",\"constant\":false,\"payable\":false,\"inputs\":[{\"type\":\"address\",\"name\":\"minter\"}],\"outputs\":[]},{\"type\":\"function\",\"name\":\"approve\",\"constant\":false,\"payable\":false,\"inputs\":[{\"type\":\"address\",\"name\":\"to\"},{\"type\":\"uint256\",\"name\":\"tokenId\"}],\"outputs\":[]},{\"type\":\"function\",\"name\":\"approveBatch\",\"constant\":false,\"payable\":false,\"inputs\":[{\"type\":\"address\",\"name\":\"to\"},{\"type\":\"uint256[]\",\"name\":\"tokenIds\"}],\"outputs\":[]},{\"type\":\"function\",\"name\":\"balanceOf\",\"constant\":true,\"stateMutability\":\"view\",\"payable\":false,\"inputs\":[{\"type\":\"address\",\"name\":\"owner\"}],\"outputs\":[{\"type\":\"uint256\"}]},{\"type\":\"function\",\"name\":\"endFight\",\"constant\":false,\"payable\":false,\"inputs\":[{\"type\":\"uint256\",\"name\":\"fightId\"},{\"type\":\"uint256\",\"name\":\"winnerTokenId\"}],\"outputs\":[]},{\"type\":\"function\",\"name\":\"getAbility\",\"constant\":true,\"stateMutability\":\"view\",\"payable\":false,\"inputs\":[{\"type\":\"uint256\",\"name\":\"tokenId\"}],\"outputs\":[{\"type\":\"tuple\",\"components\":[{\"type\":\"uint256\",\"name\":\"strength\"},{\"type\":\"uint256\",\"name\":\"speed\"},{\"type\":\"uint256\",\"name\":\"intelligence\"},{\"type\":\"uint256\",\"name\":\"endurance\"},{\"type\":\"uint256\",\"name\":\"magic\"}]}]},{\"type\":\"function\",\"name\":\"getApproved\",\"constant\":true,\"stateMutability\":\"view\",\"payable\":false,\"inputs\":[{\"type\":\"uint256\",\"name\":\"tokenId\"}],\"outputs\":[{\"type\":\"address\"}]},{\"type\":\"function\",\"name\":\"getOwnerOfToken\",\"constant\":true,\"stateMutability\":\"view\",\"payable\":false,\"inputs\":[{\"type\":\"uint256\",\"name\":\"tokenId\"}],\"outputs\":[{\"type\":\"address\"}]},{\"type\":\"function\",\"name\":\"isApprovedForAll\",\"constant\":true,\"stateMutability\":\"view\",\"payable\":false,\"inputs\":[{\"type\":\"address\",\"name\":\"owner\"},{\"type\":\"address\",\"name\":\"operator\"}],\"outputs\":[{\"type\":\"bool\"}]},{\"type\":\"function\",\"name\":\"isBet\",\"constant\":true,\"stateMutability\":\"view\",\"payable\":false,\"inputs\":[{\"type\":\"uint256\"}],\"outputs\":[{\"type\":\"bool\"}]},{\"type\":\"function\",\"name\":\"mint\",\"constant\":false,\"payable\":false,\"inputs\":[{\"type\":\"address\",\"name\":\"player\"},{\"type\":\"uint256\",\"name\":\"strength\"},{\"type\":\"uint256\",\"name\":\"speed\"},{\"type\":\"uint256\",\"name\":\"intelligence\"},{\"type\":\"uint256\",\"name\":\"endurance\"},{\"type\":\"uint256\",\"name\":\"magic\"},{\"type\":\"string\",\"name\":\"_tokenURI\"}],\"outputs\":[{\"type\":\"uint256\"}]},{\"type\":\"function\",\"name\":\"name\",\"constant\":true,\"stateMutability\":\"view\",\"payable\":false,\"inputs\":[],\"outputs\":[{\"type\":\"string\"}]},{\"type\":\"function\",\"name\":\"owner\",\"constant\":true,\"stateMutability\":\"view\",\"payable\":false,\"inputs\":[],\"outputs\":[{\"type\":\"address\"}]},{\"type\":\"function\",\"name\":\"ownerOf\",\"constant\":true,\"stateMutability\":\"view\",\"payable\":false,\"inputs\":[{\"type\":\"uint256\",\"name\":\"tokenId\"}],\"outputs\":[{\"type\":\"address\"}]},{\"type\":\"function\",\"name\":\"readyToFight\",\"constant\":false,\"payable\":false,\"inputs\":[],\"outputs\":[]},{\"type\":\"function\",\"name\":\"removeMinter\",\"constant\":false,\"payable\":false,\"inputs\":[{\"type\":\"address\",\"name\":\"minter\"}],\"outputs\":[]},{\"type\":\"function\",\"name\":\"renounceOwnership\",\"constant\":false,\"payable\":false,\"inputs\":[],\"outputs\":[]},{\"type\":\"function\",\"name\":\"safeTransferFrom\",\"constant\":false,\"payable\":false,\"inputs\":[{\"type\":\"address\",\"name\":\"from\"},{\"type\":\"address\",\"name\":\"to\"},{\"type\":\"uint256\",\"name\":\"tokenId\"}],\"outputs\":[]},{\"type\":\"function\",\"name\":\"safeTransferFrom\",\"constant\":false,\"payable\":false,\"inputs\":[{\"type\":\"address\",\"name\":\"from\"},{\"type\":\"address\",\"name\":\"to\"},{\"type\":\"uint256\",\"name\":\"tokenId\"},{\"type\":\"bytes\",\"name\":\"data\"}],\"outputs\":[]},{\"type\":\"function\",\"name\":\"setApprovalForAll\",\"constant\":false,\"payable\":false,\"inputs\":[{\"type\":\"address\",\"name\":\"operator\"},{\"type\":\"bool\",\"name\":\"approved\"}],\"outputs\":[]},{\"type\":\"function\",\"name\":\"startFight\",\"constant\":false,\"payable\":false,\"inputs\":[{\"type\":\"uint256\",\"name\":\"tokenId1\"},{\"type\":\"uint256\",\"name\":\"tokenId2\"}],\"outputs\":[]},{\"type\":\"function\",\"name\":\"supportsInterface\",\"constant\":true,\"stateMutability\":\"view\",\"payable\":false,\"inputs\":[{\"type\":\"bytes4\",\"name\":\"interfaceId\"}],\"outputs\":[{\"type\":\"bool\"}]},{\"type\":\"function\",\"name\":\"symbol\",\"constant\":true,\"stateMutability\":\"view\",\"payable\":false,\"inputs\":[],\"outputs\":[{\"type\":\"string\"}]},{\"type\":\"function\",\"name\":\"tokenURI\",\"constant\":true,\"stateMutability\":\"view\",\"payable\":false,\"inputs\":[{\"type\":\"uint256\",\"name\":\"tokenId\"}],\"outputs\":[{\"type\":\"string\"}]},{\"type\":\"function\",\"name\":\"transferFrom\",\"constant\":false,\"payable\":false,\"inputs\":[{\"type\":\"address\",\"name\":\"from\"},{\"type\":\"address\",\"name\":\"to\"},{\"type\":\"uint256\",\"name\":\"tokenId\"}],\"outputs\":[]},{\"type\":\"function\",\"name\":\"transferOwnership\",\"constant\":false,\"payable\":false,\"inputs\":[{\"type\":\"address\",\"name\":\"newOwner\"}],\"outputs\":[]}]"',
      address: '0x924ed2b4DE71BED7aB5e8067bAbF0B658FB9aaF9',
      ownerAddress: '0xA960515DA5758B6d827F6d20E207C4293e7785F4'
    }
  }
};
  