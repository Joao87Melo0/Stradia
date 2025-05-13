const mapa = document.getElementById('mapa');
    const chaveAPI = 'AIzaSyB7LRhS0lCzDscdXZsKuxvWPPsE_Ygng5U'; // substitua aqui com sua chave válida do Google

    // Coordenadas da Fundação Matias Machline
    const latitude = -3.1342842;
    const longitude = -59.9793014;

    // Atualiza o src do iframe com o mapa embutido
    mapa.src = `https://www.google.com/maps/embed/v1/view?key=${chaveAPI}&center=${latitude},${longitude}&zoom=17&maptype=satellite`;
 