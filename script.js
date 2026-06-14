let indice = 0;
let aciertos = 0;
let errores = 0;
let respuestaSeleccionada = null;

let tiempo = 7200; // 2 horas
let temporizador;

function iniciarExamen() {
    seleccionarPreguntasAleatorias();


    document.getElementById("inicio").style.display = "none";
    document.getElementById("examen").style.display = "block";

    mostrarPregunta();
    iniciarTemporizador();
}

function mostrarGrafica(){

    const ctx =
    document.getElementById(
        "graficaResultados"
    );

    new Chart(ctx,{

        type:"doughnut",

        data:{

            labels:[
                "Aciertos",
                "Errores"
            ],

            datasets:[{

                data:[
                    aciertos,
                    errores
                ]

            }]

        }

    });

}

function mostrarPregunta() {

    let p = preguntas[indice];

    document.getElementById("pregunta").innerText =
        p.pregunta;

    document.getElementById("contador").innerText =
        `Pregunta ${indice + 1} de ${preguntas.length}`;

    let opciones = document.getElementById("opciones");

    opciones.innerHTML = "";

    p.opciones.forEach((opcion, i) => {

        let boton = document.createElement("button");

        boton.classList.add("opcion");

        boton.innerText = opcion;

        boton.onclick = () => {

            document
                .querySelectorAll(".opcion")
                .forEach(btn => {
                    btn.classList.remove("seleccionada");
                });

            boton.classList.add("seleccionada");

            respuestaSeleccionada = i;
        };

        opciones.appendChild(boton);
    });

    actualizarBarra();

    const pregunta =
        document.getElementById("pregunta");

    pregunta.classList.remove("fade");

    void pregunta.offsetWidth;

    pregunta.classList.add("fade");

}

function guardarProgreso(){

    localStorage.setItem(
        "progresoExamen",
        JSON.stringify({
            indice,
            aciertos,
            errores,
            tiempo
        })
    );

}

function cargarProgreso(){

    let datos =
    localStorage.getItem(
        "progresoExamen"
    );

    if(datos){

        let progreso =
        JSON.parse(datos);

        indice =
        progreso.indice;

        aciertos =
        progreso.aciertos;

        errores =
        progreso.errores;

        tiempo =
        progreso.tiempo;

    }

}

function siguientePregunta(){

    if(respuestaSeleccionada===null){
        alert("Selecciona una respuesta");
        return;
    }

    if(
        respuestaSeleccionada===
        preguntas[indice].correcta
    ){

        aciertos++;

        actualizarEstadisticas();

    }else{

        errores++;

        actualizarEstadisticas();

    }

    respuestaSeleccionada=null;

    indice++;

    if(indice<preguntas.length){

        mostrarPregunta();

    }else{

        finalizarExamen();

    }

}

function actualizarBarra() {

    let porcentaje =
        ((indice + 1) / preguntas.length) * 100;

    document.getElementById("progreso").style.width =
        porcentaje + "%";
}

function iniciarTemporizador() {

    temporizador = setInterval(() => {

        tiempo--;

        let horas =
            Math.floor(tiempo / 3600);

        let minutos =
            Math.floor((tiempo % 3600) / 60);

        let segundos =
            tiempo % 60;

        document.getElementById("temporizador").innerText =
            `${horas.toString().padStart(2, '0')}:${minutos.toString().padStart(2, '0')}:${segundos.toString().padStart(2, '0')}`;

        if (tiempo <= 300) {

            document.getElementById("temporizador").style.color = "#ff5c8a";
        }

        if (tiempo <= 0) {

            clearInterval(temporizador);

            finalizarExamen();
        }

    }, 1000);
}
function actualizarEstadisticas(){

    document.getElementById(
        "aciertosBox"
    ).innerText =
    `✔ Aciertos: ${aciertos}`;

    document.getElementById(
        "erroresBox"
    ).innerText =
    `✖ Errores: ${errores}`;

}


function lanzarConfeti(){

    confetti({
        particleCount: 250,
        spread: 180,
        origin: { y: 0.6 }
    });

}

window.onload = ()=>{

setTimeout(()=>{

document.getElementById(
"loader"
).style.display =
"none";

},2500);

};

function seleccionarPreguntasAleatorias() {

    preguntas = [...preguntas]
        .sort(() => Math.random() - 0.5)
        .slice(0,120);

}

function finalizarExamen() {

    clearInterval(temporizador);

    document.getElementById("examen").style.display = "none";

    let porcentaje =
        ((aciertos / preguntas.length) * 100).toFixed(2);

    let historial =
        JSON.parse(
            localStorage.getItem("historial")
        ) || [];

    historial.push({

        nombre:
            document.getElementById("nombre").value,

        calificacion:
            porcentaje,

        fecha:
            new Date().toLocaleString()

    });

    localStorage.setItem(
        "historial",
        JSON.stringify(historial)
    );

    let mensaje = "";
    let emoji = "";

    if (porcentaje >= 90) {

        mensaje = "🏆 Excelente desempeño";
        emoji = "🏆";

    } else if (porcentaje >= 80) {

        mensaje = "🌟 Muy buen resultado";
        emoji = "🌟";

    } else if (porcentaje >= 70) {

        mensaje = "📚 Buen intento";
        emoji = "📚";

    } else {

        mensaje = "💖 Necesitas estudiar un poco más";
        emoji = "💖";

    }

    let html = `
    
    <div class="resultado-final">
    
        <h2>${emoji} Resultado Final</h2>
        
        <p><strong>Aciertos:</strong> ${aciertos}</p>

        <p><strong>Errores:</strong> ${errores}</p>

        <p><strong>Calificación:</strong> ${porcentaje}%</p>

        <p>${mensaje}</p>
    `;

    if (porcentaje >= 80) {

        lanzarConfeti();

        html += `

        <div class="felicidades">

            🏆 ¡FELICIDADES! 🏆

            <br><br>

            Has aprobado exitosamente el examen.

            <br>

            Tu certificado está disponible para descarga.

            <br><br>

            <button
                class="btn-certificado"
                onclick="generarCertificado(${porcentaje})">

                📜 Descargar Certificado

            </button>

        </div>

        `;

    }

        html += `
<p>
🚨 Abandonos:
${abandonos}
</p>
`;
    html += `</div>`;

    document.getElementById("resultado").innerHTML = html;

    document.getElementById("resultado").style.display = "block";

    mostrarGrafica();



}

let abandonos = 0;

document.addEventListener(

"visibilitychange",

()=>{

if(
document.hidden
){

abandonos++;

alert(
`⚠ No abandones el examen.
Intentos: ${abandonos}`
);

}

}
);
