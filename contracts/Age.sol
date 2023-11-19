//SPDX-License-Identifier: MIT

pragma solidity ^0.8.11;

contract Age {
    uint256 public age = 12;

    function changeAge(uint _age) external {
        age = _age;
    }
}