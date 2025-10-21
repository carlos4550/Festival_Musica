document.addEventListener('DOMContentLoaded', function(){
    iniciarApp();
});

function iniciarApp() {
    navegacionFija();
    crearGaleria();
    scrollNav();
}

function navegacionFija(){
    const barra = document.querySelector('.header');
    const sobreFestival = document.querySelector('.sobre-festival');

    window.addEventListener('scroll', function(){
        if( sobreFestival.getBoundingClientRect().bottom < 0 ){
            barra.classList.add('fijo');
        }else{
            console.log("No aun....");
        }
    })
}

function scrollNav(){
    const enlaces = document.querySelectorAll('.navegacion-principal a');
    enlaces.forEach( enlace => {
        enlace.addEventListener('click', function(e){
            e.preventDefault();
            // console.log(e.target.attributes.href);
            const seccionScroll = e.target.getAttribute('href'); // Obtener el valor del atributo href
            const seccion = document.querySelector(seccionScroll);
            seccion.scrollIntoView({ behavior: "smooth"});
        });
    });
}

function crearGaleria(){
    const galeria = document.querySelector('.galeria-imagenes');

    for(let i = 1; i<=12; i++){
        // imagen.onclick = mostrarImagen(i);
        const imagen = document.createElement('picture');
        imagen.innerHTML = `
        <source srcset="build/imagen/thumb/${i}.avif" type="image/avif">
        <source srcset="build/imagen/thumb/${i}.webp" type="image/webp">
        <img src="build/imagen/thumb/${i}.jpg" alt="Imagen Vocalista">
        `;
        imagen.onclick = function(){
            mostrarImagen(i);
        }
        galeria.appendChild(imagen);
    }
}

function mostrarImagen(_imagen){
    const imagen = document.createElement('picture');
    imagen.innerHTML = `
    <source srcset="build/imagen/grande/${_imagen}.avif" type="image/avif">
    <source srcset="build/imagen/grande/${_imagen}.webp" type="image/webp">
    <img src="build/imagen/grande/${_imagen}.jpg" alt="Imagen Vocalista">
    `;
    //Crea el Overlay con la imagen
    const overlay = document.createElement("div");
    overlay.appendChild(imagen);
    overlay.classList.add('overlay');
    overlay.onclick = function(){
        const body = document.querySelector('body');
        body.classList.remove('fijar-body');
        overlay.remove();
    }

    //Crea el boton para cerrar la imagen
    const cerrarFoto = document.createElement("p");
    cerrarFoto.textContent = "X";
    cerrarFoto.classList.add('btn-cerrar');
    cerrarFoto.onclick = function(){
        const body = document.querySelector('body');
        body.classList.remove('fijar-body');
        overlay.remove();
    }
    overlay.appendChild(cerrarFoto);
    //Añadirlo al html
    const body = document.querySelector('body');
    body.appendChild(overlay);
    body.classList.add('fijar-body');
}