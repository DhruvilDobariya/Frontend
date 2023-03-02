window.onload = ()=>{
    document.querySelector("#video").addEventListener('play', ()=>{
        console.log("Video play");
    });
    
    document.querySelector("#video").addEventListener('playing', ()=>{
        console.log("Video id playing...");
    });

    document.querySelector("#video").addEventListener('pause', ()=>{
        console.log("Video pause");
    }); 
    
    document.querySelector("#video").addEventListener('ended', ()=>{
        console.log("Video ended");
    });

    document.querySelector("#video").addEventListener('volumechange', ()=>{
        console.log("volume changed");
    });

    document.querySelector("#video").addEventListener('timeupdate', ()=>{
        console.log("time is updating...");
    });

    document.querySelector("#video").addEventListener('onratechange', ()=>{
        console.log("playback speed is changed");
    });

    document.querySelector("#video").addEventListener('progress', ()=>{
        console.log("Video in progress");
    });

    document.querySelector("#video").addEventListener('loadstart', ()=>{
        console.log("load start");
    });

    document.querySelector("#video").addEventListener('loadmetadata', ()=>{
        console.log("load metadata");
    });

    document.querySelector("#video").addEventListener('loaddata', ()=>{
        console.log("load data");
    });

    document.querySelector("#video").addEventListener('onabort', ()=>{
        console.log("Video in aborted");
    });

    document.querySelector("#video").addEventListener('onerror', ()=>{
        console.log("some error ocured during load");
    });

    document.querySelector("#video").addEventListener('canplay', ()=>{
        console.log("Video is ready to play with buffer");
    });

    document.querySelector("#video").addEventListener('canplaythrough', ()=>{
        console.log("Video is ready to play without buffer");
    });

    document.querySelector("#video").addEventListener('emptied', ()=>{
        console.log("some bed things happen during video");
    });

    document.querySelector("#video").addEventListener('stalled', ()=>{
        console.log("browser unable to fetch video");
    });

    document.querySelector("#video").addEventListener('waiting', ()=>{
        console.log("Video is in waiting state");
    });
}