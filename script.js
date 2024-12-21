window.onload = function(){
    var uploadinput = document.getElementById('upload-input')
    var toolbars = document.getElementsByClassName('toolbar')
    var audio = null

    uploadinput.onchange = function(){
        var file = this.files[0]
        var size = ((file.size/1000)/1000).toFixed(2)
        var url = URL.createObjectURL(file)

        //show file name
        var filename = document.getElementById('title')
        filename.innerHTML = file.name

        //show file size 
        var sizes = document.getElementById('size')
        sizes.innerHTML = 'Size '+ size+'MB'

        //audio tag play
        audio = document.createElement('audio')
        audio.src = url
        // audio.play()
        var playicon = document.getElementById('play-icon')
        var muteicon = document.getElementById('mute-icon')
        var loopicon = document.getElementById('loop-icon')
        // playicon.className = "ri-pause-circle-line"


        //toolbar enable
        // for(var i= 0; i<toolbars.length; i++){

        //     toolbars[i].disabled = false
        // }
//play button
        var playbtn = document.getElementById('play-btn')
        playbtn.onclick = function(){
        if (audio.paused) {
            playicon.className = "ri-pause-circle-line"
            audio.play()
        }
        else{
            playicon.className = "ri-play-circle-line"
            audio.pause()
        }
        }

        // mute volume
        var mute = document.getElementById('volume-btn')
        mute.onclick = function(){
            if (audio.muted) {
                audio.muted  = false
                muteicon.className = "ri-volume-up-line"
            }
            else{
                muteicon.className = "ri-volume-mute-line"
                audio.muted = true
            }
        }

        //loop (repeat)
        var loops = document.getElementById('loop-btn') 
        loops.onclick = function (){
            if (audio.loop) {
                audio.loop = false
                loopicon.className = "ri-repeat-2-line"               
            }
            else{
                audio.loop = true
                loopicon.className = "ri-repeat-one-line"
            }
        }

        //forward
        var forwardbtn = document.getElementById('forward-btn')
        forwardbtn.onclick = function(){
        var current = audio.currentTime;
        audio.currentTime=(current+10)   
        }

        //backward
        var backwardbtn = document.getElementById('backward-btn')
        backwardbtn.onclick = function(){
        var current = audio.currentTime;
        if(current > 10) audio.currentTime=(current-10)   
        }

      //show full durations
        audio.onloadedmetadata = function(){
            var durations = audio.duration
            var minutes =Math.floor(durations/60)
            var seconds = Math.floor(durations%60)
            var showDutation = document.getElementById('full-duration')
            showDutation.innerHTML = minutes +":"+ seconds
        }

        //show cuttent progress time &&& progress bar
        audio.ontimeupdate = function(){
            var totalDuration = audio.duration  
            var durations = audio.currentTime
            var minutes =Math.floor(durations/60)
            var seconds = Math.floor(durations%60)
            var currentTime = document.getElementById('curr-duration')
            currentTime.innerHTML = minutes +":"+ seconds
            var percentage = Math.floor((durations/totalDuration)*100)
            var progressbar = document.getElementById('progress-bar')
            progressbar.style.width = percentage +'%'

        }

        var volumeInput = document.getElementById('volume')
        volumeInput.onchange = function(){
            audio.volume = this.value
        }

        //scontrol volume 
        var volumebtn = document.getElementById('volume-btn')
        volumebtn.onclick = function(){
            var volumebox = document.getElementById('volume-box')
                if (volumebox.style.display == 'block'){

                    volumebox.style.display = 'none'
                }
                 else {
                    volumebox.style.display = 'block'
                }

                
        }
    }

    for (var i=0; i < toolbars.length; i++) {
        toolbars[i].onclick = function(){
        if (audio == null) {
            Swal.fire({
                text: 'Do you want to continue Plesse Select Audio',
                icon: 'error',
                confirmButtonText: 'Cool'
              })
        }
        }
    }
}