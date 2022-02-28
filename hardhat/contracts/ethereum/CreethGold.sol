// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

import '@openzeppelin/contracts/token/ERC20/ERC20.sol';
import "@openzeppelin/contracts/access/Ownable.sol";

/// @title CreethGold Token contract
/// @author agonist (https://github.com/agonist)
contract CreethGold is ERC20, Ownable {

    address public minter;

    modifier onlyMinter() {
        require(msg.sender == minter, 'CGLD: Only minter is authorized');
        _;
    }

    constructor(address _minter) ERC20('CreethGold', 'CGLD') {
        minter = _minter;
    }

    function mint(address _account, uint256 _amount) public onlyMinter {
        _mint(_account, _amount);
    }

    function burn(uint256 amount) public virtual {
        _burn(_msgSender(), amount);
    }

    function burnFrom(address account, uint256 amount) public virtual {
        _spendAllowance(account, _msgSender(), amount);
        _burn(account, amount);
    }

    function setMinter(address _minter) external onlyOwner {
        minter = _minter;
    }
}
