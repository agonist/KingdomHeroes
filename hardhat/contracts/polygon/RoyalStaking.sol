// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import '@openzeppelin/contracts/token/ERC721/IERC721.sol';
import "@openzeppelin/contracts/access/Ownable.sol";

contract RoyalStaking is Ownable {

    IERC721 nftContract;

    struct StackingInfos {
        uint256 tokenId;
        uint256 timestamp;
    }

    mapping(address => StackingInfos[]) stakingStatus;

    constructor(address _nftContract) {
        nftContract = IERC721(_nftContract);
    }

    function stake(uint16[] calldata tokenIds) external {
        StackingInfos[] storage infos = stakingStatus[msg.sender];
        uint256 length = tokenIds.length;

        uint256 currentTimestamp = block.timestamp;

        for (uint16 i = 0; i < length; i++) {
            require(nftContract.ownerOf(tokenIds[i]) == msg.sender, "Not the owner");
            infos.push(StackingInfos(tokenIds[i], currentTimestamp));
            nftContract.transferFrom(msg.sender, address(this), tokenIds[i]);
        }

        stakingStatus[msg.sender] = infos;
    }

    function unstake(uint16[] calldata tokenIds) external {
        StackingInfos[] memory infos = stakingStatus[msg.sender];

        for (uint16 i = 0; i < tokenIds.length; i++) {
            require(nftContract.ownerOf(tokenIds[i]) == msg.sender, "Not the owner");
            //            infos.push(StackingInfos(tokenIds[i], currentTimestamp));
            nftContract.transferFrom(address(this), msg.sender, tokenIds[i]);
        }
    }

}
