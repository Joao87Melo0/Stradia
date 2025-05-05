const params = new URLSearchParams(window.location.search);
const nomeEstrada = params.get('nome') || 'AM-372';
const chaveAPI = 'AIzaSyB7LRhS0lCzDscdXZsKuxvWPPsE_Ygng5U'; 
const mapa = document.getElementById('mapa');
mapa.src = `https://www.google.com/maps/embed/v1/search?key=${chaveAPI}&q=${encodeURIComponent(nomeEstrada + ', Amazonas, Brazil')}&maptype=satellite`;
    