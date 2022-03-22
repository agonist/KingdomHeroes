// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "../tunnel/FxBaseRootTunnel.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import '@openzeppelin/contracts/token/ERC721/ERC721.sol';
import '@openzeppelin/contracts/token/ERC1155/ERC1155.sol';

contract KingdomTraining is FxBaseRootTunnel, Ownable {

    enum TokenType {
        Key,
        Hero
    }

    ERC721 public heroesContract;
    ERC1155 public keysContract;

    struct Staked {
        uint256[] stakedHeroes;
        uint128 stakedKeys;
    }

    mapping(address => Staked) public stakingInfos;

    bool public stakingPaused;

    constructor(
        address checkpointManager,
        address fxRoot,
        address _heroesContract,
        address _keysContract
    ) FxBaseRootTunnel(checkpointManager, fxRoot) {
        heroesContract = ERC721(_heroesContract);
        keysContract = ERC1155(_keysContract);
    }

    function setContractAddresses(
        address _heroesContract,
        address _keysContract
    ) public onlyOwner {
        heroesContract = ERC721(_heroesContract);
        keysContract = ERC1155(_keysContract);
    }

    function setStakingPaused(bool paused) public onlyOwner {
        stakingPaused = paused;
    }

    function balanceOf(address owner) public view returns (uint256) {
        return stakingInfos[owner].stakedHeroes.length;
    }

    function getStakedTokens(address user) public view returns (uint256[] memory stakedHeroes, uint128 stakedKeys)
    {
        Staked memory staked = stakingInfos[user];

        return (
        staked.stakedHeroes,
        staked.stakedKeys
        );
    }

    // STAKING

    function bulkStake(
        uint256[] memory heroes,
        uint128 keys
    ) public {
        if (heroes.length > 0) bulkStakeHeroes(heroes);
        if (keys > 0) bulkStakeKey(keys);
    }

    // HEROES STAKING / UNSTAKING

    // stake multiple heroes
    function bulkStakeHeroes(uint256[] memory ids) public {
        require(!stakingPaused, "Staking is currently paused.");

        Staked storage staked = stakingInfos[msg.sender];
        for (uint256 i = 0; i < ids.length; i++) {
            staked.stakedHeroes.push(ids[i]);
            heroesContract.transferFrom(
                msg.sender,
                address(this),
                ids[i]
            );
        }

        _stakeHeroMessage(ids.length, msg.sender);
    }


    // Stake a single hero
    function stakeHero(uint256 tokenId) external {
        require(!stakingPaused, "Staking is currently paused.");

        Staked storage staked = stakingInfos[msg.sender];
        staked.stakedHeroes.push(tokenId);
        heroesContract.transferFrom(
            msg.sender,
            address(this),
            tokenId
        );
        _stakeHeroMessage(1, msg.sender);
    }

    // unstake multiple heroes
    function bulkUnstakeHero(uint256[] memory tokenIds) external {
        require(!stakingPaused, "Staking is currently paused.");
        Staked storage staked = stakingInfos[msg.sender];

        for (uint256 i = 0; i < tokenIds.length; i++) {
            uint256 tokenId = tokenIds[i];
            heroesContract.transferFrom(
                address(this),
                msg.sender,
                tokenId
            );
            uint256[] memory stakedHeroes = staked.stakedHeroes;
            uint256 index;
            for (uint256 j; j < stakedHeroes.length; j++) {
                if (stakedHeroes[j] == tokenId) index = j;
            }
            if (stakedHeroes[index] == tokenId) {
                staked.stakedHeroes[index] = stakedHeroes[staked.stakedHeroes.length - 1];
                staked.stakedHeroes.pop();
            }
        }
        _unstakeHeroMessage(tokenIds.length, msg.sender);
    }

    // unstake single hero
    function unstakeHero(uint256 tokenId) external {
        require(!stakingPaused, "Staking is currently paused.");
        Staked storage staked = stakingInfos[msg.sender];

        heroesContract.transferFrom(
            address(this),
            msg.sender,
            tokenId
        );

        uint256[] memory stakedHeores = staked.stakedHeroes;
        uint256 index;
        for (uint256 i; i < stakedHeores.length; i++) {
            if (stakedHeores[i] == tokenId) index = i;
        }
        if (stakedHeores[index] == tokenId) {
            _unstakeHeroMessage(1, msg.sender);
            staked.stakedHeroes[index] = stakedHeores[staked.stakedHeroes.length - 1];
            staked.stakedHeroes.pop();
        }
    }

    // Send message to the child to stake heroes
    function _stakeHeroMessage(uint256 _amount, address _sender) internal {
        _sendMessageToChild(
            abi.encode(_sender, uint256(TokenType.Hero), _amount, true)
        );
    }

    // Send message to the child to unstake heroes
    function _unstakeHeroMessage(uint256 _amount, address _sender) internal {
        _sendMessageToChild(
            abi.encode(_sender, uint256(TokenType.Hero), _amount, false)
        );
    }

    // KEYS STAKING/UNSTAKING


    function bulkStakeKey(uint256 amount) public {
        require(!stakingPaused, "Staking is currently paused.");

        Staked storage staked = stakingInfos[msg.sender];
        staked.stakedKeys += amount;
        keysContract.safeTransferFrom(
            msg.sender,
            address(this),
            1,
            amount, ""
        );
        _stakeKeyMessage(amount, msg.sender);
    }

    function _stakeKeyMessage(uint256 _amount, address _sender) internal {
        _sendMessageToChild(
            abi.encode(_sender, uint256(TokenType.Key), _amount, true)
        );
    }

    function _unstakeKeyMessage(uint256 _amount, address _sender) internal {
        _sendMessageToChild(
            abi.encode(_sender, uint256(TokenType.Key), _amount, false)
        );
    }

    function _processMessageFromChild(bytes memory message) internal override {
        // We don't need a message from child
    }

}
