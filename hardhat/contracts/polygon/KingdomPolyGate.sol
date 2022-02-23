pragma solidity ^0.8.0;

import "../tunnel/FxBaseChildTunnel.sol";
import "../lib/Create2.sol";
import "../interfaces/Interfaces.sol";
import '@openzeppelin/contracts/token/ERC721/ERC721.sol';
import '@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol';

contract KingdomPolyGate is FxBaseChildTunnel, Create2, IERC721Receiver {

    bytes32 public constant DEPOSIT = keccak256("DEPOSIT");
    bytes32 public constant MAP_TOKEN = keccak256("MAP_TOKEN");
    string public constant SUFFIX_NAME = " (FXERC721)";
    string public constant PREFIX_SYMBOL = "fx";

    // root to child token
    mapping(address => address) public rootToChildToken;

    constructor(address _fxChild) FxBaseChildTunnel(_fxChild) {
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
        address childToken,
        uint256 tokenId,
        bytes memory data
    ) external {
        _withdraw(childToken, msg.sender, tokenId, data);
    }

    function withdrawTo(
        address childToken,
        address receiver,
        uint256 tokenId,
        bytes memory data
    ) external {
        _withdraw(childToken, receiver, tokenId, data);
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
        address childToken = rootToChildToken[rootToken];

        // deposit tokens
        FxERC721 childTokenContract = FxERC721(childToken);
        childTokenContract.mint(to, tokenId, depositData);
    }

    function _withdraw(
        address childToken,
        address receiver,
        uint256 tokenId,
        bytes memory data
    ) internal {
        FxERC721 childTokenContract = FxERC721(childToken);
        // child token contract will have root token
        address rootToken = childTokenContract.connectedToken();

        // validate root and child token mapping
        require(
            childToken != address(0x0) && rootToken != address(0x0) && childToken == rootToChildToken[rootToken],
            "FxERC721ChildTunnel: NO_MAPPED_TOKEN"
        );

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
