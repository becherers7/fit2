const express = require('express');
const User = require('mongoose').model('User');
const config = require('../config');
const router = new express.Router();

router.get('/dashboard', (req, res) => {
	res.status(200).json({
	message: "You're authorized to see this secret message.",
	// user values passed through from auth middleware
	user: req.user
	});
});

// first create a post request. get request must be a mongodb search find.
// must find and display all users in an array.
// users must filter by 8 to 10 emails.
// YOU'RE FINDING THE USERS!!! 
// next step is to populate so you get rid of the password.
// then send to front end to populate suggestions array.
router.post('/findFriends', (req, res) => {
	//get input, create find where anything that contains req.body
	//res.send results.
	if(typeof(req.body === 'object') && typeof(req.body === 'string')){
		// User.find()
		let searchQuery = req.body;
		// db.users.findOne({"username" : {$regex : ".*son.*"}});
		User.find({"email" : {$regex : `(^${searchQuery.friend})`}}, function(err, result){
			if (err) {
				throw Error(err);
			} else {
				res.status(200).send(result);
			}	
		});
	} else {
		res.status(400).json({
			message: 'something went wrong'
		});
	}
});

router.post('/saveRoom', (req, res) => {
	if (typeof(req.body === 'object')) {

		let newRoom = req.body;
		let userToUpdate = req.user.email;
		console.log("user to update: ", userToUpdate);
		let roomMembers = req.body.members;
		let searchQuery = roomMembers.split(",");
		searchQuery.push(userToUpdate);
		//- find _ids of members included in the room
		User.find({email: {$in: searchQuery}}, function(err, results) {
			if (err) {
				throw new Error(err);
			} else {
				//make array of user ids
				getUserIds = results.map((el, i, arr) => {
					if (el._id) {
						return el._id
					}
				});
				//replace room member array
				newRoom.roomMembers = getUserIds;
				console.log("getUserIds: ", getUserIds);
				
				//update our user... change this to array of ids for where to update
				User.updateMany({'_id': {$in: getUserIds}}, {$push: {rooms: newRoom}}, function (err, results) {
					if (err) {
						throw new Error(err);
					} else {
						console.log("success: ", results);
						res.status(200).send("updated user room");
					}
				});
			}
		});
	}
});

// router.get('/retrieveRoom', (req, res) => {

// });

// router.post('/friendRequest', (req, res) => {
// 	if(typeof(req.body === 'string')){
// 		let searchQuery = req.user._id;
// 		let email = req.body;
// 		console.log('search query: ', searchQuery);
// 		console.log('incoming email: ', email);
// 		console.log('typeof: ', typeof(searchQuery));
// 		User.findOneAndUpdate({'email' : email}, { $push: {friendRequests: searchQuery}}, function(err, result){
// 			if (err) {
// 				throw Error(err);
// 			} else {
// 				console.log('successfully found result: ', result);
// 				// result.friendRequests.push(email);
// 				res.status(200).send('hello');
// 			}
// 		});

// 	} else {
// 		res.status(400).json({
// 			message: 'something went wrong'
// 		});
// 	}
// });

router.post('/friendRequest', (req, res) => {
	if(typeof(req.body === 'string')){
		let searchQuery = req.body;
		let email = req.user.email;

		console.log('users email: ', email);
		console.log('typeof: ', typeof(searchQuery));
		User.findOneAndUpdate({'email' : searchQuery.email}, { $push: {friendRequests: {email: email}} }, function(err, result){
			if (err) {
				throw Error(err);
			} else {
				// console.log('successfully found result: ', result);
				// result.friendRequests.push(email);
				res.status(200).send('hello');
			}
		});

	} else {
		res.status(400).json({
			message: 'something went wrong'
		});
	}
});

router.post('/acceptFriendRequest', (req, res) => {
	if(typeof(req.body === 'string')){
		let searchQuery = req.user._id;
		let email = req.body;

		User.findOneAndUpdate({'_id' : searchQuery}, { $push: {friends: email} }, function(err, result){
			if (err) {
				throw Error(err);
			} else {
				// result.friendRequests.push(email);
				let friends = result.friends;
				res.status(200).send(friends);
			}
		});

	} else {
		res.status(400).json({
			message: 'something went wrong'
		});
	}
});

router.post('/getFriendRequests', (req, res) => {
	let searchQuery = req.user._id;
	
	User.findOne({'_id' : searchQuery}, function(err, result){
			if (err) {
				throw Error(err);
			} else {
				res.status(200).send(result);
			}
	});
});

module.exports = router;
