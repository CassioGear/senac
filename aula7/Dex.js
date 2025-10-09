  var imagens = [
        "1.jpg",
        "2.jpg",
        "3.png",
    ];

    var indice = 0;

    var banner = document.getElementById('banner');

    function mostrarImagem(){
        banner.src = imagens[indice];
    }
    function Ir(){
         //incrementar o indice
        indice++;
        if(indice >= imagens.length){
            indice = 0;
        }
        mostrarImagem();
    }
    function Voltar(){
        indice--;
        if(indice < 0){
            indice = imagens.length - 1;
        }
        mostrarImagem();
    }
