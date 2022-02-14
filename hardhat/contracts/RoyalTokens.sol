// SPDX-License-Identifier: MIT

pragma solidity ^0.8.4;

import '@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol';

/// @title Royal Token contract
/// @author agonist (https://github.com/agonist)
contract RoyalTokens is ERC20Burnable {

    address public minter;

    modifier onlyMinter() {
        require(msg.sender == minter, 'RTK: Only minter is authorized');
        _;
    }

    constructor(address _minter) ERC20('RoyalToken', 'RTK') {
        minter = _minter;
    }

    function mint(address _account, uint256 _amount) public onlyMinter {
        _mint(_account, _amount);
    }

    function setMinter(address _minter) external onlyMinter {
        minter = _minter;
    }
}
