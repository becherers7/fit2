import Auth from './Auth';

// accept friend request
let acceptFriendRequest = function(friend) {
		return new Promise(function (resolve, reject) {
			let addFriend = `email=${friend}`
		    const xhr = new XMLHttpRequest();
		    xhr.open('post', 'http://localhost:8000/api/acceptFriendRequest');
		    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
		    xhr.setRequestHeader('Authorization', `bearer ${Auth.getToken()}`);
		    xhr.responseType = 'json';
		    xhr.addEventListener('load', () => {
				if(xhr.status === 200) {
				    let friends = xhr.response;
				    resolve(friends);
				} else {
					reject('bad accept friend request');
				};
		    });
		    xhr.send(addFriend);
		});
}

// dashboard
// let dashboard

// find friends
let findFriends = function(friend) {
		return new Promise(function(resolve, reject) {
			const xhr = new XMLHttpRequest();
	        let searchQuery = `friend=${friend}`;
	        xhr.open('post', 'http://localhost:8000/api/findFriends');
	        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
	        // set the authorization HTTP header
	        xhr.setRequestHeader('Authorization', `bearer ${Auth.getToken()}`);
	        xhr.responseType = 'json';
	        xhr.addEventListener('load', () => {
	          if (xhr.status === 200) {
	              let suggestions = xhr.response.map(el => {
	                  if(el.email) {
	                    let email = {
	                      email: el.email,
	                      id: el._id
	                    };
	                    return email
	                  }
	              });
	              resolve(suggestions);
	              
	          } else {
	              reject("bad find friends request");
	          }
	        });
	        xhr.send(searchQuery);
		});
};

// get friend requests
let getFriendRequests = function() {
		return new Promise(function (resolve, reject) {
			const xhr = new XMLHttpRequest();
		    xhr.open('post', 'http://localhost:8000/api/getFriendRequests');
		    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
		    xhr.setRequestHeader('Authorization', `bearer ${Auth.getToken()}`);
		    xhr.responseType = 'json';
		    xhr.addEventListener('load', () => {
				if (xhr.status === 200) {
				    let friendRequests = xhr.response.friendRequests;
				    resolve(friendRequests);

				} else {
				    reject("bad get friend requests");
				}
		    });
		    xhr.send();
		});
}

// make friend request
let makeFriendRequest = function(email) {
		return new Promise(function(resolve, reject) {
			const xhr = new XMLHttpRequest();
			let friendsEmail = `email=${email}`;
			
			xhr.open('post', 'http://localhost:8000/api/friendRequest');
	        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
	        xhr.setRequestHeader('Authorization', `bearer ${Auth.getToken()}`);
	        console.log('friendPage: ', Auth.getToken());
	        xhr.responseType = 'text';
	        xhr.addEventListener('load', () => {
				if (xhr.status === 200) {
					let response = xhr.response;
					resolve(response);
				} else {
					reject("bad make friend request");
				}
	        });
	        console.log("sending email: ", email);
	        xhr.send(friendsEmail);
		});
}

// save channel
let saveChannel = function(channel) {
		return new Promise(function(resolve, reject) {
			const name = encodeURIComponent(channel.name);
			const purpose = encodeURIComponent(channel.purpose);
			const members = encodeURIComponent(channel.members);
			const xhr = new XMLHttpRequest();
			let searchQuery = `name=${name}&purpose=${purpose}&members=${members}`;
			xhr.open('post', 'http://localhost:8000/api/saveRoom');
			xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
			// set the authorization HTTP header
			xhr.setRequestHeader('Authorization', `bearer ${Auth.getToken()}`);
			xhr.responseType = 'json';
			xhr.addEventListener('load', () => {
				if (xhr.status === 200) {
				    resolve("saving channel");
				} else {
				    reject("bad save channel");
				}
			});
			xhr.send(searchQuery);
		});
}

// save direct messages
// saveDirectMessage

export {
	acceptFriendRequest, 
	findFriends,
	getFriendRequests, 
	makeFriendRequest, 
	saveChannel,
};