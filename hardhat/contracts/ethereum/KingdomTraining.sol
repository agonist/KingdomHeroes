// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "../tunnel/FxBaseRootTunnel.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import '@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol';
import '@openzeppelin/contracts/token/ERC721/ERC721.sol';
import '@openzeppelin/contracts/token/ERC1155/ERC1155.sol';
import '@openzeppelin/contracts/token/ERC1155/IERC1155Receiver.sol';
import "../Interfaces.sol";

contract KingdomTraining is FxBaseRootTunnel, Ownable, TokensTypes, IKingdomTraining {

    IERC721 public heroesContract;
    ERC1155 public keysContract;

    struct Staked {
        uint256[] stakedHeroes;
        uint256 stakedKeys;
    }

    mapping(address => Staked) public stakingInfos;

    bool public stakingPaused;

    constructor(
        address _checkpointManager,
        address _fxRoot,
        address _heroesContract,
        address _keysContract
    ) FxBaseRootTunnel(_checkpointManager, _fxRoot) {
        heroesContract = IERC721(_heroesContract);
        keysContract = ERC1155(_keysContract);
    }

    function setContractAddresses(
        address _heroesContract,
        address _keysContract
    ) public onlyOwner {
        heroesContract = IERC721(_heroesContract);
        keysContract = ERC1155(_keysContract);
    }

    function setStakingPaused(bool paused) public onlyOwner {
        stakingPaused = paused;
    }

    // for heroes contract and balanceOf trick
    function heoresBalanceOf(address _address) external view returns (uint256) {
        return stakingInfos[_address].stakedHeroes.length;
    }

    // for key contract and balanceOf trick
    function keysBalanceOf(address _address) external view returns (uint256) {
        return stakingInfos[_address].stakedKeys;
    }

    function getStakedTokens(address user) public view returns (uint256[] memory stakedHeroes, uint256 stakedKeys)
    {
        Staked memory staked = stakingInfos[user];

        return (staked.stakedHeroes, staked.stakedKeys);
    }

    // STAKING

    // stake heroes and keys at the same time
    function bulkStake(
        uint256[] memory heroes,
        uint128 keys
    ) external {
        if (heroes.length > 0) bulkStakeHeroes(heroes);
        if (keys > 0) stakeKey(keys);
    }

    // unstake heroes and key at the same time
    function bulkUnstake(
        uint256[] memory heroes,
        uint128 keys
    ) external {
        if (heroes.length > 0) bulkUnstakeHero(heroes);
        if (keys > 0) unstakeKey(keys);
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
    function bulkUnstakeHero(uint256[] memory tokenIds) public {
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

    function stakeKey(uint256 amount) public {
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

    function unstakeKey(uint256 amount) public {
        require(!stakingPaused, "Staking is currently paused.");

        Staked storage staked = stakingInfos[msg.sender];
        staked.stakedKeys -= amount;
        keysContract.safeTransferFrom(
            address(this),
            msg.sender,
            1,
            amount, ""
        );
        _unstakeKeyMessage(amount, msg.sender);
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

    /**
    * @dev Whenever an {IERC721} `tokenId` token is transferred to this contract via {IERC721-safeTransferFrom}
     * by `operator` from `from`, this function is called.
     *
     * It must return its Solidity selector to confirm the token transfer.
     * If any other value is returned or the interface is not implemented by the recipient, the transfer will be reverted.
     *
     * The selector can be obtained in Solidity with `IERC721.onERC721Received.selector`.
     */
    function onERC721Received(
        address operator,
        address from,
        uint256 id,
        bytes calldata data
    ) external returns (bytes4) {
        return IERC721Receiver.onERC721Received.selector;
    }

    /**
     * @notice Handle the receipt of a single ERC1155 token type.
     * @dev An ERC1155-compliant smart contract MUST call this function on the token recipient contract, at the end of a `safeTransferFrom` after the balance has been updated.
     * This function MAY throw to revert and reject the transfer.
     * Return of other amount than the magic value MUST result in the transaction being reverted.
     * Note: The token contract address is always the message sender.
     * @param operator  The address which called the `safeTransferFrom` function.
     * @param from      The address which previously owned the token.
     * @param id        The id of the token being transferred.
     * @param amount    The amount of tokens being transferred.
     * @param data      Additional data with no specified format.
     * @return           `bytes4(keccak256("onERC1155Received(address,address,uint256,uint256,bytes)"))`.
     */
    function onERC1155Received(
        address operator,
        address from,
        uint256 id,
        uint256 amount,
        bytes calldata data
    ) external returns (bytes4) {
        return IERC1155Receiver.onERC1155Received.selector;
    }

    /**
     * @notice Handle the receipt of multiple ERC1155 token types.
     * @dev An ERC1155-compliant smart contract MUST call this function on the token recipient contract, at the end of a `safeBatchTransferFrom` after the balances have been updated.
     * This function MAY throw to revert and reject the transfer.
     * Return of other amount than the magic value WILL result in the transaction being reverted.
     * Note: The token contract address is always the message sender.
     * @param operator  The address which called the `safeBatchTransferFrom` function.
     * @param from      The address which previously owned the token.
     * @param ids       An array containing ids of each token being transferred.
     * @param amounts   An array containing amounts of each token being transferred.
     * @param data      Additional data with no specified format.
     * @return           `bytes4(keccak256("onERC1155BatchReceived(address,address,uint256[],uint256[],bytes)"))`.
     */
    function onERC1155BatchReceived(
        address operator,
        address from,
        uint256[] calldata ids,
        uint256[] calldata amounts,
        bytes calldata data
    ) external returns (bytes4) {
        return IERC1155Receiver.onERC1155BatchReceived.selector;
    }

}
