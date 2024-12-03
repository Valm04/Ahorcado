const personajesMarvel = {
    "Iron Man": {
        descripcion: "Un genio millonario que se convierte en superhéroe gracias a una armadura de alta tecnología que él mismo diseñó."
    },
    "Thor": {
        descripcion: "El dios del trueno de Asgard, conocido por su martillo mágico, Mjolnir, y por ser un guerrero valiente."
    },
    "Hulk": {
        descripcion: "Un científico que, al ser expuesto a radiación gamma, se transforma en un gigante verde con una increíble fuerza descomunal."
    },
    "Capitan America": {
        descripcion: "Un soldado mejorado con un suero experimental que le otorga fuerza, agilidad y resistencia excepcionales, y es líder de los Vengadores."
    },
    "Black Panther": {
        descripcion: "Rey de Wakanda, un país africano avanzado tecnológicamente. Usando un traje especial, lucha como el Pantera Negra para proteger su nación."
    },
    "Spider Man": {
        descripcion: "Un joven que obtiene poderes arácnidos tras ser mordido por una araña radiactiva. Es conocido por su agilidad y su sentido arácnido."
    },
    "Viuda Negra": {
        descripcion: "Una exespía rusa y experta en artes marciales, miembro de los Vengadores que lucha por la justicia."
    },
    "Doctor Strange": {
        descripcion: "Un neurocirujano que se convierte en el Hechicero Supremo, luchando contra las fuerzas mágicas para proteger el multiverso."
    },
    "Ant Man": {
        descripcion: "Un superhéroe con la habilidad de reducir su tamaño y aumentar su fuerza, usando un traje especial."
    },
    "Guardianes de la Galaxia": {
        descripcion: "Un grupo de héroes inadaptados, liderados por Star-Lord, que luchan para salvar el universo."
    }
};

const personajesDCEU = {
    "Superman": {
        descripcion: "Un hombre con habilidades sobrehumanas, originario de Krypton, conocido como el Hombre de Acero."
    },
    "Batman": {
        descripcion: "Un millonario de Gotham City que lucha contra el crimen como el Caballero Oscuro, utilizando su ingenio y recursos tecnológicos."
    },
    "Wonder Woman": {
        descripcion: "Una amazona guerrera con poderes divinos, defensora de la justicia y la paz."
    },
    "Aquaman": {
        descripcion: "El rey de Atlantis, con habilidades acuáticas y la capacidad de hablar con criaturas marinas."
    },
    "The Flash": {
        descripcion: "Un hombre con la habilidad de moverse a supervelocidad, conocido por su rapidez y valentía."
    },
    "Cyborg": {
        descripcion: "Un héroe mitad humano, mitad máquina, que usa sus habilidades cibernéticas para luchar contra el crimen."
    },
    "Green Lantern": {
        descripcion: "Un miembro de los Green Lantern Corps, un ejército de héroes con anillos de poder que les otorgan habilidades extraordinarias."
    },
    "Shazam": {
        descripcion: "Un joven que, al pronunciar la palabra mágica 'Shazam', se convierte en un poderoso superhéroe."
    },
    "Harley Quinn": {
        descripcion: "Una ex-psiquiatra convertida en villana y antiheroína, conocida por su relación con el Joker."
    },
    "Joker": {
        descripcion: "Un villano maniaco y psicópata, conocido por su obsesión con Batman y su deseo de caos."
    }
};

let categoria_Seleccionada = null;
let palabrita = '';
let errores = 0;
let aciertos = 0;


const marvelBtn = document.getElementById('marvelBtn');
const dceuBtn = document.getElementById('dceuBtn');
const jugarBtn = document.getElementById('jugar');
const imagen = document.getElementById('imagen');
const resultado = document.getElementById('resultado');
const boton_letras = document.querySelectorAll("#letras button");
const musica= document.getElementById('musicaFondo');


marvelBtn.addEventListener('click', () => {
    categoria_Seleccionada = personajesMarvel;
    jugarBtn.disabled = false;
    dceuBtn.disabled = true;
    marvelBtn.disabled = true;
    musica.play();
});

dceuBtn.addEventListener('click', () => {
    categoria_Seleccionada = personajesDCEU;
    jugarBtn.disabled = false;
    dceuBtn.disabled = true;
    marvelBtn.disabled = true;
    musica.play();
});

jugarBtn.addEventListener('click', comenzar);

function comenzar() {
    errores = 0;
    aciertos = 0;
    juegoTerminado = false; // Reiniciar el estado del juego
    imagen.src = `img/img1.png`;
    jugarBtn.disabled = true;
    palabrita = obtenerPalabra(categoria_Seleccionada);
    console.log(palabrita);

    // Mostrar la descripción de la palabra seleccionada
    const descripcionElemento = document.getElementById('descripcion');
    descripcionElemento.textContent = categoria_Seleccionada[palabrita].descripcion;

    const contenedorPalabra = document.getElementById('adivinar_palabra');
    contenedorPalabra.innerHTML = ''; // Limpiar el contenedor antes de agregar los spans

    // Crear los spans para cada letra de la palabra
    for (let i = 0; i < palabrita.length; i++) {
        const span = document.createElement('span');
        
        if (palabrita[i] === ' ') {
            span.textContent = ' ';
            span.classList.add('no-borde');
        }
        contenedorPalabra.appendChild(span);
    }

    // Asignar evento de clic a los botones de letras
    boton_letras.forEach((boton) => {
        boton.addEventListener('click', click_letra);
    });
}


function obtenerPalabra(categoria) {
    const palabras = Object.keys(categoria);
    const aleatoria = Math.floor(Math.random() * palabras.length);
    return palabras[aleatoria];
}

function click_letra(event) {

    const span = document.querySelectorAll("#adivinar_palabra span");
    const boton_clickeado = event.target;
    boton_clickeado.disabled = true;

    const letra_clickeada = boton_clickeado.innerHTML.toLowerCase();
    const palabra = palabrita.toLowerCase();

    let acierto = false;

    for (let i = 0; i < palabra.length; i++) {
        if (letra_clickeada === palabra[i]) {
            span[i].innerHTML = palabrita[i];
            acierto = true;
            aciertos++;
        }
    }

    // Si la letra no es correcta, incrementa los errores
    if (!acierto) {
        errores++;
        imagen.src = `img/img${errores + 1}.png`;
    }

    
    if (errores === 7) {
        boton_letras.forEach((boton) => {
            boton.disabled = true;
        });
        alert('Perdiste');
        
        reiniciarJuego();  
    
       
    } else if (aciertos === palabrita.replace(/\s+/g, '').length) {
        setTimeout(() => {
            alert('¡Ganaste!');
            reiniciarJuego();
        }, 100);
        
    }
}


function reiniciarJuego() {
   
    boton_letras.forEach((boton) => {
        boton.disabled = false;  
    });

    imagen.src = 'img/img1.png';
    jugarBtn.disabled = true;  
    marvelBtn.disabled = false;
    dceuBtn.disabled = false;

    const contenedorPalabra = document.getElementById('adivinar_palabra');
    contenedorPalabra.innerHTML = '';
    const descripcionElemento = document.getElementById('descripcion');
    descripcionElemento.textContent = '';

    errores = 0;
    aciertos = 0;
    categoria_Seleccionada = null;
    palabrita = '';
    juegoTerminado = false; 
}
