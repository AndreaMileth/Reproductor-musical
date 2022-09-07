let now_playing = document.querySelector('.now-playing');
let track_art = document.querySelector('.track-art');
let track_name = document.querySelector('.track-name');
let track_artist = document.querySelector('.track-artist');

let playpause_btn = document.querySelector('.playpause-track');
let next_btn = document.querySelector('.next-track');
let prev_btn = document.querySelector('.prev-track');

let seek_slider = document.querySelector('.seek_slider');
let volume_slider = document.querySelector('.volume_slider');
let curr_time = document.querySelector('.current-time');
let total_duration = document.querySelector('.total-duration');
let wave = document.getElementById('wave');
let randomIcon = document.querySelector('.fa-random');
let curr_track = document.createElement('audio');

let track_index = 0;
let isPlaying = false;
let isRandom = false;
let updateTimer;

const music_list = [
    {
        img : 'https://i.ytimg.com/vi/z6oGFgxW6Lo/maxresdefault.jpg',
        name : 'Uno',
        artist : 'Redimi2,x Alex Zurdo x Funky Ft. Almighty, Christian Ponce, Ander Bock',
        music : 'music/uno.mp3.mpeg'
    },
    {
        img : 'https://www.lahiguera.net/musicalia/artistas/camila_cabello/disco/8409/tema/16416/camila_cabello_havana-portada.jpg',
        name : 'Havana',
        artist : 'Camila cabello',
        music : 'music/havana.mp3.mpeg'
    },
    {
        img : 'https://i.scdn.co/image/ab67616d0000b2736c99e8088dec46510a2c0975',
        name : 'En las nubes',
        artist : 'daawe',
        music : 'music/enlasnubes.mp3.mpeg'
    },
    {
        img : 'https://i.ytimg.com/vi/RxKdib1QS6w/mqdefault.jpg',
        name : 'Lacrimosa',
        artist : 'DTB',
        music : 'music/mozart.mp3.mpeg'
    },

    {
        img : 'https://i.ytimg.com/vi/NUTGr5t3MoY/maxresdefault.jpg',
        name : 'Basket Case',
        artist : 'Green Day',
        music : 'music/basketcase.mp3.mpeg'
    },


{
    img : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQY65nDT0QxcuwDgHTR28j4b1q8GTX1WCymHw&usqp=CAU',
    name : 'La sinfonia del nuevo mundo',
    artist : 'Dvorak',
    music : 'music/sinfonia.mp3.mpeg'
},

{
img : 'https://i.ytimg.com/vi/ErvgV4P6Fzc/maxresdefault.jpg',
name : 'Patience',
artist : 'Guns N Roses ',
music : 'music/patience.mpeg'
},

{
    img : 'https://i.ytimg.com/vi/8DOVsWe7H6U/hqdefault.jpg',
    name : 'Mad mad wolrd',
    artist : 'shaggy',
    music : 'music/shaggy.mpeg'
    },

    {
        img : 'https://i.pinimg.com/originals/3d/e2/86/3de2865d4824f95c3043d7ee38e0bf00.jpg',
        name : 'Wont bite',
        artist : 'Doja Cat',
        music : 'music/wont bite.mpeg'
        },
        {
            img : 'https://i.ytimg.com/vi/VcyWHWOxdIA/mqdefault.jpg',
            name : 'Redi',
            artist : 'Horus',
            music : 'music/horus.mpeg'
            },

            {
 img : 'https://images.genius.com/120934a990fa65d07f3d60ad0869ac74.1000x1000x1.png',
name : 'Gucci en mis pies',
 artist : 'El Dominio',
music : 'music/gucci.mpeg'
    },
    {
        img : 'https://i.ytimg.com/vi/vxMCJQeX9kQ/maxresdefault.jpg',
        name : 'Colapso',
       artist : 'Anier',
        music : 'music/colapso.mpeg'
        },        

        {
            img : 'https://lastfm.freetls.fastly.net/i/u/ar0/8bccd9c4336ffdbe502671287bc1b85c.jpg',
            name : 'Bored',
           artist : 'Billie Eilish',
            music : 'music/bore.mpeg'
         },      

         {
            img : 'https://i.ytimg.com/vi/Lc8kCZ2GlVw/maxresdefault.jpg',
            name : 'Beggin',
           artist : 'Maneskin',
            music : 'music/begin.mpeg'
         }, 

         {
            img : 'https://is5-ssl.mzstatic.com/image/thumb/Music126/v4/e2/28/ea/e228eaf8-9216-46dd-4488-08bc3422ff44/a85d1484-376c-4e10-af09-7b6233407705.jpg/600x600bf-60.jpg',
            name : 'Miedo',
           artist : 'Reality',
            music : 'music/miedo.mpeg'
         },      

         {
            img : 'https://1.bp.blogspot.com/-wV2JmStXbbY/X3I8ku6w_MI/AAAAAAAAJ_0/RVbfVGZLuQgRvzyH33zAn1KS9WAckSh-gCLcBGAsYHQ/w1200-h630-p-k-no-nu/letra%2BSolitario%2B-%2BMintamos.jpg',
            name : 'Mintamos',
           artist : 'Solitario',
            music : 'music/mintamos.mpeg'
         },      

];

loadTrack(track_index);

function loadTrack(track_index){
    clearInterval(updateTimer);
    reset();

    curr_track.src = music_list[track_index].music;
    curr_track.load();

    track_art.style.backgroundImage = "url(" + music_list[track_index].img + ")";
    track_name.textContent = music_list[track_index].name;
    track_artist.textContent = music_list[track_index].artist;
    now_playing.textContent = "Playing music " + (track_index + 1) + " of " + music_list.length;

    updateTimer = setInterval(setUpdate, 1000);

    curr_track.addEventListener('ended', nextTrack);
    random_bg_color();
}

function random_bg_color(){
    let hex = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e'];
    let a;

    function populate(a){
        for(let i=0; i<6; i++){
            let x = Math.round(Math.random() * 14);
            let y = hex[x];
            a += y;
        }
        return a;
    }
    let Color1 = populate('#');
    let Color2 = populate('#');
    var angle = 'to right';

    let gradient = 'linear-gradient(' + angle + ',' + Color1 + ', ' + Color2 + ")";
    document.body.style.background = gradient;
}
function reset(){
    curr_time.textContent = "00:00";
    total_duration.textContent = "00:00";
    seek_slider.value = 0;
}
function randomTrack(){
    isRandom ? pauseRandom() : playRandom();
}
function playRandom(){
    isRandom = true;
    randomIcon.classList.add('randomActive');
}
function pauseRandom(){
    isRandom = false;
    randomIcon.classList.remove('randomActive');
}
function repeatTrack(){
    let current_index = track_index;
    loadTrack(current_index);
    playTrack();
}
function playpauseTrack(){
    isPlaying ? pauseTrack() : playTrack();
}
function playTrack(){
    curr_track.play();
    isPlaying = true;
    track_art.classList.add('rotate');
    wave.classList.add('loader');
    playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
}
function pauseTrack(){
    curr_track.pause();
    isPlaying = false;
    track_art.classList.remove('rotate');
    wave.classList.remove('loader');
    playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';
}
function nextTrack(){
    if(track_index < music_list.length - 1 && isRandom === false){
        track_index += 1;
    }else if(track_index < music_list.length - 1 && isRandom === true){
        let random_index = Number.parseInt(Math.random() * music_list.length);
        track_index = random_index;
    }else{
        track_index = 0;
    }
    loadTrack(track_index);
    playTrack();
}
function prevTrack(){
    if(track_index > 0){
        track_index -= 1;
    }else{
        track_index = music_list.length -1;
    }
    loadTrack(track_index);
    playTrack();
}
function seekTo(){
    let seekto = curr_track.duration * (seek_slider.value / 100);
    curr_track.currentTime = seekto;
}
function setVolume(){
    curr_track.volume = volume_slider.value / 100;
}
function setUpdate(){
    let seekPosition = 0;
    if(!isNaN(curr_track.duration)){
        seekPosition = curr_track.currentTime * (100 / curr_track.duration);
        seek_slider.value = seekPosition;

        let currentMinutes = Math.floor(curr_track.currentTime / 60);
        let currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60);
        let durationMinutes = Math.floor(curr_track.duration / 60);
        let durationSeconds = Math.floor(curr_track.duration - durationMinutes * 60);

        if(currentSeconds < 10) {currentSeconds = "0" + currentSeconds; }
        if(durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
        if(currentMinutes < 10) {currentMinutes = "0" + currentMinutes; }
        if(durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }

        curr_time.textContent = currentMinutes + ":" + currentSeconds;
        total_duration.textContent = durationMinutes + ":" + durationMinutes;
    }
}
