// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import '@openzeppelin/contracts/token/ERC20/ERC20.sol';
import "@openzeppelin/contracts/access/Ownable.sol";
import "../lib/ERC20Permit.sol";
import "../Interfaces.sol";

/// @title CreethGold Token contract
/// @author agonist (https://github.com/agonist)
contract CreethGold is ICreethGold, ERC20Permit, Ownable {

    address public minter;

    modifier onlyMinter() {
        require(msg.sender == minter, 'CGLD: Only minter is authorized');
        _;
    }

    constructor(address _minter) ERC20Permit('CreethGold', 'CGLD', 18) {
        minter = _minter;
    }

    function mint(address _account, uint256 _amount) external override onlyMinter {
        _mint(_account, _amount);
    }

    function burn(uint256 amount) external {
        _burn(msg.sender, amount);
    }

    function setMinter(address _minter) external onlyOwner {
        minter = _minter;
    }
}
