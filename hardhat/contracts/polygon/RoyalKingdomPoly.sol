// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "../interfaces/Interfaces.sol";
import '@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol';
import "@openzeppelin/contracts/utils/Strings.sol";

/// @title Royal Kingdom Polygon NFT contract
/// @notice This contract is only used to mint/burn from the gate.
/// @author agonist (https://github.com/agonist)
contract RoyalKingdomPoly is ERC721Enumerable, Ownable, FxERC721 {
    using Strings for uint256;

    address internal gate;
    string public baseTokenURI;

    modifier onlyGate() {
        require(gate == msg.sender, "RoyalKingdomPoly: caller is not the gate");
        _;
    }

    constructor(
        string memory name_,
        string memory symbol_,
        string memory baseTokenURI_
    ) ERC721(name_, symbol_){
        baseTokenURI = baseTokenURI_;
    }

    /// @notice mint function can only be called from the gate contract
    /// after the token is transferred from ethereum.
    /// @param _user who will receive the token
    /// @param _tokenId to be minted
    /// @param _data extra data
    function mint(
        address _user,
        uint256 _tokenId,
        bytes memory _data
    ) external override onlyGate {
        _safeMint(_user, _tokenId, _data);
    }

    function burn(uint256 tokenId) external override onlyGate {
        _burn(tokenId);
    }

    /// @notice set the base URI of the NFT
    /// @param _baseTokenURI The new URI
    function setBaseURI(
        string calldata _baseTokenURI
    ) external onlyOwner {
        baseTokenURI = _baseTokenURI;
    }

    function tokenURI(
        uint256 tokenId
    ) public view override returns (string memory) {
        require(_exists(tokenId), "URI query for nonexistent token");
        return string(abi.encodePacked(baseTokenURI, tokenId.toString(), ".json"));
    }

    function setGate(address _gate) external onlyOwner {
        gate = _gate;
    }
}
