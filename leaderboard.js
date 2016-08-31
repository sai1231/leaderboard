console.log("Hello World");

		PlayersList = new Mongo.Collection('players');
		// UserAccounts = new Mongo.Collection('users');

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
		},
		'click .remove': function(){
			var selectedPlayer = Session.get('selectedPlayer');
			PlayersList.remove({_id:selectedPlayer})

		},
		'click #remove': function(){
			if(confirm("Do you really want to delete?"))
			{
			var selectedPlayer = this._id;
			PlayersList.remove({_id:selectedPlayer})}
			else{}
		}
	})
	Template.addPlayerForm.events({
		'submit form': function(event){
			event.preventDefault();
			console.log("Form Submitted")
			console.log(event.type);
			var playerName = event.target.playerName.value;
			console.log(playerName);
			PlayersList.insert({
				name: playerName,
				score: 0
			})
			event.target.playerName.value="";
		} 
	})

}

if (Meteor.isServer){
	//console.log("This runs on server")

}