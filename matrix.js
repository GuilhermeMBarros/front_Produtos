
/* =====================================
   MATRIX DIGITAL RAIN
===================================== */

// Capturar o Canvas
const canvas = document.getElementById("matrix");
const ctx = canvas.getContext("2d");

// Caracteres da animação
const caracteres =
    "アカサタナハマヤラワ0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";

// Configurações
const tamanhoFonte = 17;

let colunas = 0;
let gotas = [];


/* =====================================
   CONFIGURAR CANVAS
===================================== */

function ajustarCanvas() {

    const escala = Math.min(
        window.devicePixelRatio || 1,
        2
    );

    canvas.width = window.innerWidth * escala;
    canvas.height = window.innerHeight * escala;

    canvas.style.width = window.innerWidth + "px";
    canvas.style.height = window.innerHeight + "px";

    ctx.setTransform(escala, 0, 0, escala, 0, 0);

    colunas = Math.ceil(
        window.innerWidth / tamanhoFonte
    );

    gotas = [];

    for (let i = 0; i < colunas; i++) {

        gotas.push({
            y: Math.random() * window.innerHeight / tamanhoFonte,
            velocidade: 0.5 + Math.random() * 1.5
        });

    }

}


/* =====================================
   DESENHAR CARACTERES
===================================== */

function desenharMatrix() {

    // Criar o efeito de rastro
    ctx.fillStyle = "rgba(0, 0, 0, 0.06)";

    ctx.fillRect(
        0,
        0,
        window.innerWidth,
        window.innerHeight
    );

    ctx.font = tamanhoFonte + "px monospace";
    ctx.textBaseline = "top";

    for (let i = 0; i < gotas.length; i++) {

        const x = i * tamanhoFonte;
        const y = gotas[i].y * tamanhoFonte;

        const caractere = caracteres[
            Math.floor(Math.random() * caracteres.length)
        ];

        // Brilho verde
        ctx.shadowBlur = 10;
        ctx.shadowColor = "#00ff66";

        // Cabeça branca da gota
        ctx.fillStyle = "#ffffff";

        ctx.fillText(
            caractere,
            x,
            y
        );

        // Corpo verde
        ctx.fillStyle = "#00ff66";

        ctx.fillText(
            caracteres[
                Math.floor(Math.random() * caracteres.length)
            ],
            x,
            y - tamanhoFonte
        );

        ctx.shadowBlur = 0;

        // Movimento vertical
        gotas[i].y += gotas[i].velocidade;

        // Reiniciar quando chegar ao final
        if (
            gotas[i].y * tamanhoFonte > window.innerHeight &&
            Math.random() > 0.97
        ) {

            gotas[i].y = -Math.random() * 30;

            gotas[i].velocidade =
                0.5 + Math.random() * 1.5;

        }

    }

}


/* =====================================
   ANIMAÇÃO
===================================== */

function animar() {

    desenharMatrix();

    requestAnimationFrame(animar);

}


/* =====================================
   INICIALIZAÇÃO
===================================== */

if (canvas && ctx) {

    ajustarCanvas();

    window.addEventListener(
        "resize",
        ajustarCanvas
    );

    animar();

    console.log("Matrix iniciada com sucesso!");

} else {

    console.error(
        "Erro: Canvas Matrix não encontrado!"
    );

}
