let elPlay = document.getElementById("play")
	, elPause = document.getElementById("pause")
	, elBackward = document.getElementById("backward")
	, elForward = document.getElementById("forward")
	, elAudio = document.querySelector("audio")
	, elVolume = document.getElementById("volume")
	, elRandom = document.getElementById("random")
	, elPlaylist = document.getElementById("playlist");

function Song( id, title) {
  this.title = title;
  this.id = id;
}
function Jukebox() {
 this.songs = []; 
  this.players = []; 
  this.currentSong = 0;
  this.SC = SC;
  this.SC.initialize({
    client_id: 'fd4e76fc67798bfa742089ed619084a6'
  });
}

 Jukebox.prototype.addSong = function( song ){
 	 for( let i=0; i<arguments.length; i++){
    this.songs.push( arguments[i] );
  }
 }

 // buttons

Jukebox.prototype.playPrevious = function(){
 if( this.currentSong >=1 ) {
   this.currentSong = (this.currentSong + 1 ) % this.songs.length;
 } else if ( this.currentSong === 0) {
   this.currentSong = this.songs.length - 1;
 }
 let player = this.players[this.currentSong],
      song = this.songs[this.currentSong];
  this.play();
 document.getElementById("pause").style.display = "inline-block";
 document.getElementById("play").style.display = "none";
}

Jukebox.prototype.play = function(){
  console.log( "in play", this );
  const self = this;
  let player = this.players[this.currentSong],
      song = this.songs[this.currentSong];
  if( player ) {
    console.log( "player detected" );
    player.play();
  } else {
    console.log( "no player detected" );
    self.SC.stream('/tracks/'+song.id).then(function(p){
      console.log( "got player", p);
      self.players[self.currentSong] = p;
      console.log( self.players );
      self.play();   
});
    };
    document.getElementById("pause").style.display = "inline-block";
    document.getElementById("play").style.display = "none";
  }

Jukebox.prototype.pause = function(){
  let player = this.players[this.currentSong],
      song = this.songs[this.currentSong];
 	player.pause();
 	document.getElementById("play").style.display = "inline-block";
 	document.getElementById("pause").style.display = "none";
 };
 
Jukebox.prototype.playNext = function(){ 
	this.currentSong = (this.currentSong + 1 ) % this.songs.length;
  let player = this.players[this.currentSong],
      song = this.songs[this.currentSong];
  this.play();
	document.getElementById("pause").style.display = "inline-block";
	document.getElementById("play").style.display = "none";
}

Jukebox.prototype.random = function(){
  this.currentSong = parseInt(Math.random()*this.songs.length)
  let player = this.players[this.currentSong],
      song = this.songs[this.currentSong];
  this.play();
  document.getElementById("pause").style.display = "inline-block";
  document.getElementById("play").style.display = "none";
    };

var myJukebox = new Jukebox();
myJukebox.addSong(new Song('2944467', 'Knocking On Heavens Door')
	, new Song('309989348',"Swalla")
	, new Song('39598597',"Jukebox Hero"));


// ***********DOMContentLoaded************

document.addEventListener("DOMContentLoaded", function(){


document.getElementById("search").addEventListener("submit",function(event){
    event.preventDefault();
    var term = document.querySelector("#search input[name=search]").value;
  SC.get('/tracks/',{
    q: term
  },).then(function(response){
    document.querySelector("#results").innerHTML = ' ';
    console.log(response);
    response.forEach(function(track,){
    var template = 
    `<br><li> ${track.title},<br> ${track.label_name}</li><br><li><img class="art" width=100px src="${track.artwork_url}"/></li><hr>`;
      document.querySelector("#results").innerHTML += template;
    });

  });

  console.log("Search term:", term);
});
// buttons
	elPlay.addEventListener("click", function(event){
    	myJukebox.play();
 	});
  	elPause.addEventListener("click", function(){
  	  myJukebox.pause();
  	});
  	elForward.addEventListener("click", function(){
  	  myJukebox.playNext();
  	});
  	elBackward.addEventListener("click", function(){
  	  myJukebox.playPrevious();
  	});
  	elRandom.addEventListener("click", function(){
  	  myJukebox.random();
  	});
});
