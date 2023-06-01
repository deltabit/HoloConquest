// SPDX-License-Identifier: MIT

pragma solidity ^0.8.10;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract GameItem is ERC721, ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    Counters.Counter private _fightIds;

    struct Ability {
        uint256 strength;
        uint256 speed;
        uint256 intelligence;
        uint256 endurance;
        uint256 magic;
    }

    struct Fight {
        uint256 tokenId1;
        uint256 tokenId2;
        address owner1;
        address owner2;
        bool active;
    }

    // Mapping from token ID to Ability
    mapping(uint256 => Ability) private _abilities;

    // Mapping from fight ID to Fight
    mapping(uint256 => Fight) private _fights;

    // Mapping from address to minter status
    mapping(address => bool) private _minters;

    // This mapping holds the betting status of the NFTs.
    // If an NFT is currently bet in the game, its value will be true.
    mapping (uint => bool) public isBet;

    // Mapping to store whether a user is ready to fight
    mapping(address => bool) private _readyToFight;

    // Event to notify when a user is ready to fight
    event UserReadyToFight(address indexed user);

    // Events to notify the external world (like your .NET server)
    event Bet(uint256 indexed tokenId, address indexed bettor);
    event AbilityAssigned(uint256 indexed tokenId, Ability ability);
    event FightStarted(uint256 indexed fightId, uint256 tokenId1, uint256 tokenId2);
    event FightEnded(uint256 indexed fightId, uint256 winnerTokenId, uint256 loserTokenId);

    constructor() ERC721("GameItem", "ITM") {}

    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }

    function tokenURI(uint256 tokenId) public view override(ERC721, ERC721URIStorage) returns (string memory) {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(bytes4 interfaceId) public view override(ERC721, ERC721URIStorage) returns (bool) {
        return super.supportsInterface(interfaceId);
    }

    // Function for a user to mark themselves as ready to fight
    function readyToFight() public {
        _readyToFight[msg.sender] = true;
        emit UserReadyToFight(msg.sender);
    }

    function mint(
        address player, 
        uint256 strength, 
        uint256 speed, 
        uint256 intelligence, 
        uint256 endurance, 
        uint256 magic,
        string memory _tokenURI
    ) public returns (uint256) {
        require(_minters[msg.sender] || msg.sender == owner(), "Caller is not an authorized minter");

        _tokenIds.increment();

        uint256 newItemId = _tokenIds.current();
        _mint(player, newItemId);
        _abilities[newItemId] = Ability(strength, speed, intelligence, endurance, magic);
        _setTokenURI(newItemId, _tokenURI);

        emit AbilityAssigned(newItemId, _abilities[newItemId]);

        return newItemId;
    }

    function addMinter(address minter) public onlyOwner {
        _minters[minter] = true;
    }

    function removeMinter(address minter) public onlyOwner {
        _minters[minter] = false;
    }

    // Getter function for Abilities
    function getAbility(uint256 tokenId) public view returns (Ability memory) {
        return _abilities[tokenId];
    }

    // This function starts a fight between two NFTs.
    function startFight(uint256 tokenId1, uint256 tokenId2) public onlyOwner {
        require(_isApprovedOrOwner(_msgSender(), tokenId1), "Caller is not owner nor approved for token 1");
        require(_isApprovedOrOwner(_msgSender(), tokenId2), "Caller is not owner nor approved for token 2");
        require(_readyToFight[ownerOf(tokenId1)], "Owner of token 1 is not ready to fight");
        require(_readyToFight[ownerOf(tokenId2)], "Owner of token 2 is not ready to fight");

        // Clear the ready to fight status of the users
        _readyToFight[ownerOf(tokenId1)] = false;
        _readyToFight[ownerOf(tokenId2)] = false;

        // Transfer the NFTs to the contract
        _transfer(_msgSender(), address(this), tokenId1);
        _transfer(_msgSender(), address(this), tokenId2);

        // Mark the NFTs as bet
        isBet[tokenId1] = true;
        isBet[tokenId2] = true;

        _fightIds.increment();
        uint256 newFightId = _fightIds.current();
        _fights[newFightId] = Fight({
            tokenId1: tokenId1,
            tokenId2: tokenId2,
            owner1: ownerOf(tokenId1),
            owner2: ownerOf(tokenId2),
            active: true
        });

        emit FightStarted(newFightId, tokenId1, tokenId2);
    }

    // This function ends a fight and transfers the NFTs to the winner.
    function endFight(uint256 fightId, uint256 winnerTokenId) public onlyOwner {
        Fight storage fight = _fights[fightId];
        require(fight.active, "Fight is not active");
        require(fight.tokenId1 == winnerTokenId || fight.tokenId2 == winnerTokenId, "Winner tokenId does not match any fighter");

        // Determine the loser tokenId based on the winner tokenId
        uint256 loserTokenId = (fight.tokenId1 == winnerTokenId) ? fight.tokenId2 : fight.tokenId1;
        address winner = (fight.tokenId1 == winnerTokenId) ? fight.owner1 : fight.owner2;

        // Transfer both NFTs to the winner
        _transfer(address(this), winner, winnerTokenId);
        _transfer(address(this), winner, loserTokenId);

        // Mark the NFTs as not bet
        isBet[winnerTokenId] = false;
        isBet[loserTokenId] = false;

        fight.active = false;

        emit FightEnded(fightId, winnerTokenId, loserTokenId);
    }

    // This function allows a player to approve multiple NFTs in a single transaction.
    function approveBatch(address to, uint256[] memory tokenIds) public {
        for (uint256 i = 0; i < tokenIds.length; i++) {
            require(ownerOf(tokenIds[i]) == msg.sender, "Caller is not owner of all tokens");
            approve(to, tokenIds[i]);
        }
    }

    function getOwnerOfToken(uint256 tokenId) public view returns (address) {
        return ownerOf(tokenId);
    }   
}
