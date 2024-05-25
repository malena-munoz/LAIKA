// Función que cambia el estilo del control pulsado
function changePlaylistControlStyle(controlID) {
    var control = document.getElementById(controlID);

    switch(controlID){
        case 'play-playlist':
            if(window.getComputedStyle(control).color === 'rgb(42, 49, 62)'){
                control.style.color = '#E8DAED';
                control.style.backgroundColor = 'transparent';
            }else{
                control.style.color = '#2A313E';
                control.style.backgroundColor = '#AD88B0';
            }
            break;
        case 'shuffle-playlist':
            if(window.getComputedStyle(control).color==='rgb(173, 136, 176)'){
                control.style.color = '#E8DAED';
            }else{
                control.style.color = 'rgb(173, 136, 176)';
            }
            break;
        case 'add-playlist':
            if(window.getComputedStyle(control).color==='rgb(173, 136, 176)'){
                control.style.color = '#E8DAED';
            }else{
                control.style.color = 'rgb(173, 136, 176)';
            }
            break;
    }
}

// Agrega fondo al tener el cursor encima
function hoverRowIn(row){
    row.style.backgroundColor = '#4A404E';
}

// Quita fondo al no tener el cursor encima
function hoverRowOut(row){
    row.style.backgroundColor = '';
}
