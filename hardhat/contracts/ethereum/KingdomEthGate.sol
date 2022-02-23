pragma solidity ^0.8.0;

import "../tunnel/FxBaseRootTunnel.sol";
import '@openzeppelin/contracts/token/ERC721/ERC721.sol';
import '@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol';

contract KingdomEthGate is FxBaseRootTunnel, IERC721Receiver {

    bytes32 public constant DEPOSIT = keccak256("DEPOSIT");

    event FxWithdrawERC721(
        address indexed rootToken,
        address indexed childToken,
        address indexed userAddress,
        uint256 id
    );
    event FxDepositERC721(
        address indexed rootToken,
        address indexed depositor,
        address indexed userAddress,
        uint256 id
    );

    mapping(address => address) public rootToChildTokens;

    constructor(
        address _checkpointManager,
        address _fxRoot,
        address _fxERC721Token
    ) FxBaseRootTunnel(_checkpointManager, _fxRoot) {
    }

    function onERC721Received(
        address, /* operator */
        address, /* from */
        uint256, /* tokenId */
        bytes calldata /* data */
    ) external pure override returns (bytes4) {
        return this.onERC721Received.selector;
    }

    function deposit(
        address rootToken,
        address user,
        uint256 tokenId,
        bytes memory data
    ) public {

        // transfer from depositor to this contract
        ERC721(rootToken).safeTransferFrom(
            msg.sender, // depositor
            address(this), // manager contract
            tokenId,
            data
        );

        // DEPOSIT, encode(rootToken, depositor, user, tokenId, extra data)
        bytes memory message = abi.encode(DEPOSIT, abi.encode(rootToken, msg.sender, user, tokenId, data));
        _sendMessageToChild(message);
        emit FxDepositERC721(rootToken, msg.sender, user, tokenId);
    }

    // exit processor
    function _processMessageFromChild(bytes memory data) internal override {
        (address rootToken, address childToken, address to, uint256 tokenId, bytes memory syncData) = abi.decode(
            data,
            (address, address, address, uint256, bytes)
        );
        // validate mapping for root to child
        require(rootToChildTokens[rootToken] == childToken, "FxERC721RootTunnel: INVALID_MAPPING_ON_EXIT");

        // transfer from tokens to
        ERC721(rootToken).safeTransferFrom(address(this), to, tokenId, syncData);
        emit FxWithdrawERC721(rootToken, childToken, to, tokenId);
    }
}
