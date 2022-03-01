// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import '@openzeppelin/contracts/utils/structs/EnumerableSet.sol';
import '@openzeppelin/contracts/token/ERC721/IERC721.sol';
import '@openzeppelin/contracts/token/ERC20/IERC20.sol';
import "@openzeppelin/contracts/access/Ownable.sol";
import "./Interfaces.sol";

/// @title Royal Kingdom NFT staking contract
/// @author agonist (https://github.com/agonist)
contract RoyalStaking is Ownable {
    using EnumerableSet for EnumerableSet.UintSet;

    IERC721 nftContract;
    ICreethGold tokenContract;

    // mapping tokens ID => last claimed timestamp
    mapping(uint256 => uint256) public staked;

    // mapping address => set of tokens ID staked
    mapping(address => EnumerableSet.UintSet) private stakedTokensByAddress;

    // daily yield
    uint256 yield = 25;

    event YieldPaid(address indexed account, uint256 amount);
    event TokenStaked(address indexed account, uint256 id);
    event TokenUnstaked(address indexed account, uint256 id);

    constructor(address _nftContract, address _tokenContract) {
        nftContract = IERC721(_nftContract);
        tokenContract = ICreethGold(_tokenContract);
    }

    /// ----- Staking functions ----- ///

    // @notice stake tokens of a user.
    function stake(uint16[] calldata tokenIds) external {
        uint256 length = tokenIds.length;

        // fail early
        for (uint16 i = 0; i < length; i++) {
            require(nftContract.ownerOf(tokenIds[i]) == msg.sender, "Not the owner");
        }

        EnumerableSet.UintSet storage set = stakedTokensByAddress[msg.sender];
        uint256 currentTimestamp = block.timestamp;

        for (uint16 i = 0; i < length; i++) {
            staked[tokenIds[i]] = currentTimestamp;
            nftContract.transferFrom(msg.sender, address(this), tokenIds[i]);
            set.add(uint16(tokenIds[i]));
            emit TokenStaked(msg.sender, tokenIds[i]);

        }

    }

    // @notice unstake tokens of a user.
    function unstake(uint16[] calldata tokenIds) external {
        uint256 length = tokenIds.length;
        EnumerableSet.UintSet storage set = stakedTokensByAddress[msg.sender];

        for (uint16 i = 0; i < length; i++) {
            require(set.contains(tokenIds[i]), "Not the owner");
        }

        for (uint16 i = 0; i < length; i++) {
            nftContract.transferFrom(address(this), msg.sender, tokenIds[i]);
            set.remove(uint16(tokenIds[i]));
            delete staked[tokenIds[i]];
            emit TokenUnstaked(msg.sender, tokenIds[i]);
        }
    }

    /// ----- Yield functions ----- ///

    function _calculateYieldForAddress(EnumerableSet.UintSet storage set) internal view returns (uint256) {
        uint256 length = set.length();
        uint256 currentYield = yield;

        uint256 totalYield = 0;
        for (uint16 i = 0; i < length; i++) {
            totalYield += _calculateTokenYield(uint16(set.at(i)), currentYield);
        }
        return totalYield;
    }

    function _calculateTokenYield(uint16 _tokenId, uint256 _yield) internal view returns (uint256) {
        uint256 time = (block.timestamp - staked[_tokenId]) * 10 ** 18;
        uint256 timeRate = time / 1 days;
        return timeRate * _yield;
    }

    function claimYield() external {
        EnumerableSet.UintSet storage depositSet = stakedTokensByAddress[msg.sender];
        uint256 totalYield = _calculateYieldForAddress(depositSet);
        uint256 length = depositSet.length();

        if (totalYield > 0) {
            for (uint256 i = 0; i < length; i++) {
                staked[depositSet.at(i)] = block.timestamp;
            }

            tokenContract.mint(msg.sender, totalYield);
            emit YieldPaid(msg.sender, totalYield);
        }
    }

    /// ----- Useful view functions ----- ///

    // @notice return an array of the tokens ids staked for an _address
    function stakedTokensIdsOf(address _address) external view returns (uint16[] memory){
        EnumerableSet.UintSet storage depositSet = stakedTokensByAddress[_address];
        uint16[] memory tokenIds = new uint16[](depositSet.length());

        for (uint16 i; i < depositSet.length(); i++) {
            tokenIds[i] = uint16(depositSet.at(i));
        }

        return tokenIds;
    }

    // @notice return balance of an _address
    function balanceOf(address _address) external view returns (uint256) {
        return stakedTokensByAddress[_address].length();
    }

    // @notice return yield for a token id
    function calculateTokenYield(uint16 _tokenId) external view returns (uint256) {
        return _calculateTokenYield(_tokenId, yield);
    }

    // @notice return yield for an address
    function calculateYieldForAddress(address _address) external view returns (uint256) {
        EnumerableSet.UintSet storage set = stakedTokensByAddress[_address];
        return _calculateYieldForAddress(set);
    }

}
