console.log("Hello World");

		PlayersList = new Mongo.Collection('players');


if (Meteor.isClient){

	Template.leaderboard.helpers({
		player:function(){
			return PlayersList.find({}, {sort:{score:-1,name:1}});
		},
		selectedClass: function(){
    		var playerId = this._id;
    		var selectedPlayer = Session.get('selectedPlayer');
    		if (playerId== selectedPlayer){
    			return "selected";
    		}
		},
		selectedPlayer: function(){
			var selectedPlayer = Session.get('selectedPlayer');
			currentPlayer= PlayersList.findOne({_id: selectedPlayer});
			return currentPlayer;
		}  
	})
	Template.leaderboard.events({
		'click .player': function(){
			//console.log("we are going to create a session");

			var playerId = this._id;
			Session.set('selectedPlayer', playerId);

			var sesssionCatch = Session.get('selectedPlayer');
			console.log(sesssionCatch);
		},
		'click .increment': function(){
			var selectedPlayer = Session.get('selectedPlayer');
			PlayersList.update({_id:selectedPlayer},{$inc:{score: 5}})
		},
		'click .decrement': function(){
			var selectedPlayer = Session.get('selectedPlayer');
			PlayersList.update({_id:selectedPlayer},{$inc:{score: -5}})
		}
	})

}

if (Meteor.isServer){
	//console.log("This runs on server")

}