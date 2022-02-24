pragma solidity ^0.8.0;

import "../tunnel/FxBaseChildTunnel.sol";
import "../lib/Create2.sol";
import "../interfaces/Interfaces.sol";
import '@openzeppelin/contracts/token/ERC721/ERC721.sol';
import '@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol';

contract KingdomPolyGate is FxBaseChildTunnel, Create2, IERC721Receiver {

    bytes32 public constant DEPOSIT = keccak256("DEPOSIT");
    string public constant SUFFIX_NAME = " (FXERC721)";
    string public constant PREFIX_SYMBOL = "fx";

    // root to child token
    mapping(address => address) public rootToChildToken;

    address rootToken;
    address childToken;

    constructor(address _fxChild, address _rootToken, address _childToken) FxBaseChildTunnel(_fxChild) {
        rootToken = _rootToken;
        childToken = _childToken;
    }

    function onERC721Received(
        address, /* operator */
        address, /* from */
        uint256, /* tokenId */
        bytes calldata /* data */
    ) external pure override returns (bytes4) {
        return this.onERC721Received.selector;
    }

    function withdraw(
        uint256 _tokenId,
        bytes memory _data
    ) external {
        _withdraw(msg.sender, _tokenId, _data);
    }

    function withdrawTo(
        address _receiver,
        uint256 _tokenId,
        bytes memory _data
    ) external {
        _withdraw(_receiver, _tokenId, _data);
    }

    //
    // Internal methods
    //

    function _processMessageFromRoot(
        uint256, /* stateId */
        address sender,
        bytes memory data
    ) internal override validateSender(sender) {
        // decode incoming data
        (bytes32 syncType, bytes memory syncData) = abi.decode(data, (bytes32, bytes));

        if (syncType == DEPOSIT) {
            _syncDeposit(syncData);
        } else {
            revert("FxERC721ChildTunnel: INVALID_SYNC_TYPE");
        }
    }

    function _syncDeposit(bytes memory syncData) internal {
        (address rootToken, address depositor, address to, uint256 tokenId, bytes memory depositData) = abi.decode(
            syncData,
            (address, address, address, uint256, bytes)
        );

        // deposit tokens
        FxERC721 childTokenContract = FxERC721(childToken);
        childTokenContract.mint(to, tokenId, depositData);
    }

    function _withdraw(
        address receiver,
        uint256 tokenId,
        bytes memory data
    ) internal {
        FxERC721 childTokenContract = FxERC721(childToken);

        require(msg.sender == childTokenContract.ownerOf(tokenId));

        // withdraw tokens
        childTokenContract.burn(tokenId);
        // send message to root regarding token burn
        _sendMessageToRoot(abi.encode(rootToken, childToken, receiver, tokenId, data));
    }

    // check if address is contract
    function _isContract(address _addr) private view returns (bool) {
        uint32 size;
        assembly {
            size := extcodesize(_addr)
        }
        return (size > 0);
    }

}
