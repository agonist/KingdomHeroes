// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "../interfaces/Interfaces.sol";
import '@openzeppelin/contracts/token/ERC721/ERC721.sol';

/// @title Royal Kingdom NFT contract
/// @author agonist (https://github.com/agonist)
contract RoyalKingdomPoly is ERC721, Ownable, FxERC721 {


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
    ) public override onlyGate {
        _safeMint(_user, _tokenId, _data);
    }

    function burn(uint256 tokenId) public override onlyGate {
        _burn(tokenId);
    }
    //
    //    function _baseURI() internal view override returns (string memory) {
    //        return baseTokenURI;
    //    }

    /// @notice set the base URI of the NFT
    /// @param _baseTokenURI The new URI
    function setBaseURI(
        string calldata _baseTokenURI
    ) external onlyOwner {
        baseTokenURI = _baseTokenURI;
    }

    function connectedToken() public view override returns (address) {
        return address(0x0);
    }
}
