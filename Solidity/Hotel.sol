// SPDX-License-Identifier: MIT
pragma solidity ^0.8.1;

contract bangsaenVille {  

  mapping (bytes32 => bool) private listReserve;

  //---events---
  event reserveAdded(
    address from,
    string timestamp,   
    string hotelname,
    bytes32 hash
  );
  
  event reserveError(
    address from,
    string text,
    string reason
  );

  // store the proof for a student in the contract state
  function recordReserve(bytes32 proof) private {
    listReserve[proof] = true;
  }
  
  // record a student name
  function reserve(string memory t,string memory h) public payable {
    
    if (msg.value < 0.001 ether) {
        emit reserveError(msg.sender, h, "Please pay value >= 0.001 eth");
        payable(msg.sender).transfer(msg.value);
        return;
    }
    recordReserve(hashing(t));
    emit reserveAdded(msg.sender, t, h, 
        hashing(t));
    
  }
  
  // SHA256 for Integrity
  function hashing(string memory name) private 
  pure returns (bytes32) {
    return sha256(bytes(name));
  }
  
  // check name of student in this class
  function checkReserve(string memory name) public 
  view returns (bool) {
    return listReserve[hashing(name)];
  }
}