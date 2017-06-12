SC.initialize({
  client_id: 'fd4e76fc67798bfa742089ed619084a6'
});
SC.resolve('http://soundcloud.com/forss/voca-nomen-tuum').then(function(response) {
  // things to do after the track info loads...

  // this should display all relevant information regarding the track
  // e.g title, author, album art
  console.log(response);
});



let elPlay = document.getElementById("play")
	, elPause = document.getElementById("pause")
	, elBackward = document.getElementById("backward")
	, elForward = document.getElementById("forward")
	, elAudio = document.querySelector("audio")
	, elVolume = document.getElementById("volume")
	, elRandom = document.getElementById("random")
	, elPlaylist = document.getElementById("playlist")
	, path = "audio/";

function Song( title, artist, file ){
  this.title = title;
  this.artist = artist;
  this.file = file;
}
function Jukebox( player ) {
  this.player = player;
  this.currentSong = 0;
  this.songs = [];
  this.newSongIndex = 0;
}
 Jukebox.prototype.addSong = function( song ){
 	this.songs.push(song);
 	elPlaylist.innerHTML = "<li id=" + this.newSongIndex + ">" +song.title + ", " + song.artist + "</li>"
 	this.newSongIndex ++;
 }

 // buttons

Jukebox.prototype.play = function(){
	this.player.src = path + this.songs[this.currentSong].file;
	this.player.play();
	document.getElementById("pause").style.display = "inline-block";
	document.getElementById("play").style.display = "none";
};
Jukebox.prototype.pause = function(){
 	this.player.pause();
 	document.getElementById("play").style.display = "inline-block";
 	document.getElementById("pause").style.display = "none";
 };
 Jukebox.prototype.random = function(){
 	this.player = parseInt(Math.random()*this.songs.length)
 	this.player.src = path + this.songs[this.currentSong].file;
 	this.player.play();
 	document.getElementById("pause").style.display = "inline-block";
	document.getElementById("play").style.display = "none";
 };
Jukebox.prototype.playNext = function(){
	this.currentSong = (this.currentSong + 1 ) % this.songs.length;
	this.player.src = path + this.songs[this.currentSong].file;
	this.player.play();
	document.getElementById("pause").style.display = "inline-block";
	document.getElementById("play").style.display = "none";
}
Jukebox.prototype.playPrevious = function(){
	if( this.currentSong >=1 ) {
		this.currentSong = (this.currentSong + 1 ) % this.songs.length;
	} else if ( this.currentSong === 0) {
		this.currentSong = this.songs.length - 1;
	}
	this.player.src = path + this.songs[this.currentSong].file;
	this.player.play();
	document.getElementById("pause").style.display = "inline-block";
	document.getElementById("play").style.display = "none";
}


document.addEventListener("DOMContentLoaded", function(){
Control = new Jukebox(document.querySelector("audio"));
// volume
	elVolume = document.getElementById("volume");
	noUiSlider.create(elVolume, {
		start: 0.8,
		connect: true,
		range: {
			min: 0,
			max: 1
		} 
	});
	elVolume.noUiSlider.on('slide',function(){
		Control.volume = parseFloat(elVolume.noUiSLider.get())
	});

// buttons
	elPlay.addEventListener("click", function(){
    	Control.play();
 	});
  	elPause.addEventListener("click", function(){
  	  Control.pause();
  	});
  	elForward.addEventListener("click", function(){
  	  Control.playNext();
  	});
  	elBackward.addEventListener("click", function(){
  	  Control.playPrevious();
  	});
  	elRandom.addEventListener("click", function(){
  	  Control.random();
  	});

// song list
	var Hero = new Song("Jukebox Hero", "Journey", "Jukebox Hero.mp3");
	var Valley = new Song("Death Valley", "Fall Out Boy", "Fall-Out-Boy_-_Death-Valley.mp3");

	Control.addSong(Hero);
	Control.addSong(Valley);
});


