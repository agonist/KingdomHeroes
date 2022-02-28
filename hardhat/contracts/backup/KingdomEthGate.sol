//// SPDX-License-Identifier: MIT
//
//pragma solidity ^0.8.0;
//
//import "../tunnel/FxBaseRootTunnel.sol";
//import '@openzeppelin/contracts/token/ERC721/ERC721.sol';
//import '@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol';
//
///// @title Royal Kingdom NFT cross-chain gate
///// @notice This is the Ethereum gate to send your little NFTs to Polygon
///// @author agonist (https://github.com/agonist)
//contract KingdomEthGate is FxBaseRootTunnel, IERC721Receiver {
//
//    bytes32 public constant DEPOSIT = keccak256("DEPOSIT");
//
//    event FxWithdrawERC721(
//        address indexed rootToken,
//        address indexed childToken,
//        address indexed userAddress,
//        uint256 id
//    );
//
//    event FxDepositERC721(
//        address indexed rootToken,
//        address indexed depositor,
//        address indexed userAddress,
//        uint256 id
//    );
//
//    address rootToken;
//    address childToken;
//
//    constructor(
//        address _checkpointManager,
//        address _fxRoot,
//        address _rootToken,
//        address _childToken
//    ) FxBaseRootTunnel(_checkpointManager, _fxRoot) {
//        rootToken = _rootToken;
//        childToken = _childToken;
//    }
//
//    function onERC721Received(
//        address, /* operator */
//        address, /* from */
//        uint256, /* tokenId */
//        bytes calldata /* data */
//    ) external pure override returns (bytes4) {
//        return this.onERC721Received.selector;
//    }
//
//    // @notice deposit a root token to this contract and let the child gate know about it.
//    function deposit(
//        address _user,
//        uint256 _tokenId,
//        bytes memory _data
//    ) public {
//        address _rootToken = rootToken;
//
//        // transfer from depositor to this contract
//        ERC721(rootToken).safeTransferFrom(
//            msg.sender,
//            address(this),
//            _tokenId,
//            _data
//        );
//
//        // DEPOSIT, encode(rootToken, depositor, user, tokenId, extra data)
//        bytes memory message = abi.encode(DEPOSIT, abi.encode(_rootToken, msg.sender, _user, _tokenId, _data));
//        _sendMessageToChild(message);
//        emit FxDepositERC721(_rootToken, msg.sender, _user, _tokenId);
//    }
//
//    // exit processor
//    function _processMessageFromChild(bytes memory data) internal override {
//        (address rootToken, address _childToken, address to, uint256 tokenId, bytes memory syncData) = abi.decode(
//            data,
//            (address, address, address, uint256, bytes)
//        );
//        // validate mapping for root to child
//        require(childToken == _childToken, "FxERC721RootTunnel: INVALID_MAPPING_ON_EXIT");
//
//        // transfer from tokens to
//        ERC721(rootToken).safeTransferFrom(address(this), to, tokenId, syncData);
//        emit FxWithdrawERC721(rootToken, _childToken, to, tokenId);
//    }
//}
