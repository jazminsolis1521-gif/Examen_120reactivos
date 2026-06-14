const logoSEP = new Image();
logoSEP.src = "sep.png";

const logoCBTIS = new Image();
logoCBTIS.src = "logo.png";

const logoDGETI = new Image();
logoDGETI.src = "dgeti.png";

function generarCertificado(calificacion){

    const { jsPDF } = window.jspdf;
    const pdf = new jsPDF();

    let nombre =
    document.getElementById("nombre").value;

    let fecha =
    new Date().toLocaleDateString("es-MX");

    let folio =
    "CBTIS204-" + Date.now();

    // =====================
    // MARCOS DORADOS
    // =====================

    pdf.setDrawColor(212,175,55);

    pdf.setLineWidth(2);

    pdf.rect(
        10,
        10,
        190,
        277
    );

    pdf.setLineWidth(1);

    pdf.rect(
        15,
        15,
        180,
        267
    );

    // =====================
    // LOGOS
    // =====================

    try{

        pdf.addImage(
            logoSEP,
            "PNG",
            18,
            18,
            25,
            25
        );

        pdf.addImage(
            logoCBTIS,
            "PNG",
            82,
            12,
            45,
            45
        );

        pdf.addImage(
            logoDGETI,
            "PNG",
            160,
            18,
            25,
            25
        );

    }catch(error){

        console.log(
            "Error cargando logos"
        );

    }

    // =====================
    // TITULO
    // =====================

    pdf.setTextColor(
        212,
        175,
        55
    );

    pdf.setFont(
        "times",
        "bolditalic"
    );

    pdf.setFontSize(26);

    pdf.text(
        "CERTIFICADO DE APROBACIÓN",
        105,
        72,
        {
            align:"center"
        }
    );

    // =====================
    // CBTIS
    // =====================

    pdf.setTextColor(
        70,
        70,
        70
    );

    pdf.setFont(
        "times",
        "bold"
    );

    pdf.setFontSize(18);

    pdf.text(
        "CBTIS No. 204",
        105,
        85,
        {
            align:"center"
        }
    );

    pdf.setFont(
        "times",
        "italic"
    );

    pdf.setFontSize(11);

    pdf.text(
        "Centro de Bachillerato Tecnológico Industrial y de Servicios No. 204",
        105,
        93,
        {
            align:"center"
        }
    );

    // =====================
    // SE HACE CONSTAR
    // =====================

    pdf.setFont(
        "times",
        "bold"
    );

    pdf.setFontSize(18);

    pdf.text(
        "SE HACE CONSTAR QUE",
        105,
        115,
        {
            align:"center"
        }
    );

    // =====================
    // NOMBRE
    // =====================

    pdf.setTextColor(
        90,
        60,
        140
    );

    pdf.setFont(
        "times",
        "bolditalic"
    );

    pdf.setFontSize(24);

    pdf.text(
        nombre.toUpperCase(),
        105,
        132,
        {
            align:"center"
        }
    );

    // =====================
    // TEXTO PRINCIPAL
    // =====================

    pdf.setTextColor(
        60,
        60,
        60
    );

    pdf.setFont(
        "times",
        "italic"
    );

    pdf.setFontSize(13);

    const texto = `
Alumno del Centro de Bachillerato Tecnológico Industrial y de Servicios No. 204  acreditó satisfactoriamente la evaluación correspondiente al Examen de 120 Reactivos, demostrando que tiene el conocimiento suficiente para poder obtener su título.

Este reconocimiento se expide como evidencia del desempeño alcanzado durante el proceso de evaluación.
`;

    const textoAjustado =
    pdf.splitTextToSize(
        texto,
        130
    );

    pdf.text(
        textoAjustado,
        40,
        155
    );

    // =====================
    // CALIFICACIÓN
    // =====================

    pdf.setTextColor(
        0,
        0,
        0
    );

    pdf.setFont(
        "times",
        "bold"
    );

    pdf.setFontSize(18);

    pdf.text(
        `Calificación obtenida: ${calificacion}%`,
        105,
        220,
        {
            align:"center"
        }
    );

    // =====================
    // FECHA
    // =====================

    pdf.setFontSize(12);

    pdf.text(
        `Fecha de emisión: ${fecha}`,
        25,
        250
    );

    // =====================
    // FOLIO
    // =====================

    pdf.text(
        `Folio: ${folio}`,
        25,
        260
    );

    // =====================
    // FIRMA
    // =====================

    pdf.line(
        120,
        240,
        180,
        240
    );

    pdf.setFontSize(12);

    pdf.text(
        "CBTIS No. 204",
        150,
        250,
        {
            align:"center"
        }
    );

    pdf.text(
        "Coordinación Académica",
        150,
        258,
        {
            align:"center"
        }
    );

    let urlValidacion =
`https://tuweb.com/verificar/${folio}`;

let qrDiv =
document.createElement("div");

new QRCode(qrDiv,{
    text:urlValidacion,
    width:120,
    height:120
});

setTimeout(()=>{

    let qrImg =
    qrDiv.querySelector("img");

    let qrData =
    qrImg.src;

    pdf.addImage(
        qrData,
        "PNG",
        20,
        215,
        30,
        30
    );

    pdf.save(
        `Certificado_CBTIS204_${nombre}.pdf`
    );

},500);
}
