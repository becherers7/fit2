import React from 'react';

 //create a clickable room for each availableChatRoom.
 function RoomsList (props) {
   if (props.availableChatRooms.length > 0){
     let chatRooms = props.availableChatRooms.map(room=>{
       let randomNumber = Math.random();
       let keyName = room + randomNumber;
       return(
         <li key={keyName}>{room}</li>
       )
     });
     return (
       <div>
          <ul>{chatRooms}</ul>
          <br />
       </div>
     )
   }else{
     return null;
   }
}

export default RoomsList;
