pragma solidity ^0.8.0;

import '@openzeppelin/contracts/token/ERC721/IERC721.sol';

interface FxERC721 is IERC721 {
    function mint(
        address user,
        uint256 tokenId,
        bytes memory _data
    ) external;

    function burn(uint256 tokenId) external;
}