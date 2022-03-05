// SPDX-License-Identifier: MIT
pragma solidity ^0.8.1;

contract ProofOfStudent {  

 struct Tx {
        string time;
        string room;
        address owner;
        bool status;
    }
  mapping (string => Tx) private ListRooms;

  //---events---
  event reserve(
    address from,   
    Tx text
  );

  event reserveError(
    address from,   
    string text
  );
  
  
  // record a student name
  function reserveRoom(string memory time,string memory room) public payable {
    
    //---check if string was previously stored---
    if (ListRooms[room].status) {
        //---fire the event---
        emit reserveError(msg.sender, "Room not empty");
        //---refund back to the sender---
        payable(msg.sender).transfer(msg.value);
        //---exit the function---
        return;
    }
 // store the proof for a Rooms in the contract state
    
    ListRooms[room] = Tx(time,room,msg.sender,true);
    
    
    //---fire the event---
    emit reserve(msg.sender, ListRooms[room]);
   
  }
  // check name of student in this class
  function checkName(string memory name) public 
  view returns (Tx memory) {
    return ListRooms[name];
  }

}