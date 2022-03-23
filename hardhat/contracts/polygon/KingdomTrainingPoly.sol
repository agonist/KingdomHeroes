// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import "../tunnel/FxBaseChildTunnel.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "../Interfaces.sol";
import "./CreethGold.sol";

contract KingdomTrainingPoly is FxBaseChildTunnel, Ownable, TokensTypes {

    struct Yield {
        uint256 keys;
        uint256 heroes;
    }

    Yield public yield;

    CreethGold public cgldContract;

    mapping(address => mapping(uint256 => uint256)) public balances;
    mapping(address => uint256) public lastUpdated;

    constructor(address _fxChild) FxBaseChildTunnel(_fxChild) {
        yield.keys = (uint256(7) * 1e18) / 1 days;
        yield.heroes = (uint256(5) * 1e18) / 1 days;
    }

    function setCgldContract(address _address) external onlyOwner {
        cgldContract = CreethGold(_address);
    }

    function _processMessageFromRoot(
        uint256 stateId,
        address sender,
        bytes memory message
    ) internal override validateSender(sender) {
        (address from, uint256 token, uint256 count, bool action) = abi.decode(
            message,
            (address, uint256, uint256, bool)
        );
        action
        ? _processStake(from, TokenType(token), count)
        : _processUnstake(from, TokenType(token), count);
    }

    function _processStake(
        address account,
        TokenType tokenType,
        uint256 amount
    ) internal {
        _updateReward(msg.sender);
        balances[account][uint256(tokenType)] += amount;
    }

    function _processUnstake(
        address account,
        TokenType tokenType,
        uint256 amount
    ) internal {
        _updateReward(msg.sender);
        balances[account][uint256(tokenType)] -= amount;
    }

    function claimTokens() external {
        _updateReward(msg.sender);
    }

    function _updateReward(address account) internal {
        uint256 amount = unclaimedYield(account);
        lastUpdated[account] = block.timestamp;

        /// mint CGLD
        if (amount > 0)
            cgldContract.mint(account, amount);
    }

    function cgldPerSecond(address account) public view returns (uint256) {
        return ((balances[account][0] * yield.keys) +
        (balances[account][1] * yield.heroes));
    }

    function unclaimedYield(address account) public view returns (uint256) {
        return
        cgldPerSecond(account) * (block.timestamp - lastUpdated[account]);
    }

    function totalBalance(address account) public view returns (uint256) {
        return cgldContract.balanceOf(account) + unclaimedYield(account);
    }

    // ADMIN
    // The following functions should never be used.
    // Only here in case of extreme emergency where the state would get out of sync because Polygon fail.
    // Also useful for unit testing


    function processStake(
        address account,
        TokenType tokenType,
        uint256 amount)
    public onlyOwner {
        _processStake(account, tokenType, amount);
    }

    function processUnstake(
        address account,
        TokenType tokenType,
        uint256 amount)
    public onlyOwner {
        _processUnstake(account, tokenType, amount);
    }


}
