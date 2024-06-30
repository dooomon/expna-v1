// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract DynamicNFT is ERC721URIStorage, Ownable {
    uint256 public tokenCounter;

    constructor() ERC721("DynamicNFT", "DNFT") Ownable(msg.sender) {
        tokenCounter = 0;
    }

    function createNFT(string memory newtokenURI) public onlyOwner returns (uint256) {
        uint256 newItemId = tokenCounter;
        _safeMint(msg.sender, newItemId);
        _setTokenURI(newItemId, newtokenURI);
        tokenCounter++;
        return newItemId;
    }
    // tokenURIメソッドをオーバーライド
    function tokenURI(uint256 tokenId) public view override returns (string memory) {
        return super.tokenURI(tokenId);
    }
}

