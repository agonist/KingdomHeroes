// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import '@openzeppelin/contracts/token/ERC20/IERC20.sol';
import "./lib/ERC20Permit.sol";

interface ICreethGold {

    function mint(address _account, uint256 _amount) external;

}

interface IKingdomTraining {
    function heoresBalanceOf(address _address) external view returns (uint256);
    function keysBalanceOf(address _address) external view returns (uint256);
}

interface TokensTypes {

    enum TokenType {
        Key,
        Hero
    }
}
