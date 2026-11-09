
/* =====================================
   ELEMENTOS DO HTML
===================================== */

const form = document.getElementById("produtoForm");

const foto = document.getElementById("foto");

const preview = document.getElementById("preview");

const criadoEm = document.getElementById("criadoEm");

const mensagem = document.getElementById("mensagem");


/* =====================================
   PREENCHER DATA E HORA
===================================== */

function preencherData() {

    const agora = new Date();

    const dataLocal = new Date(
        agora.getTime() -
        agora.getTimezoneOffset() * 60000
    );

    criadoEm.value = dataLocal
        .toISOString()
        .slice(0, 16);
}

preencherData();


/* =====================================
   PRÉ-VISUALIZAÇÃO DA IMAGEM
===================================== */

foto.addEventListener("change", function () {

    const arquivo = this.files[0];

    if (!arquivo) {

        preview.src = "";

        preview.style.display = "none";

        return;
    }

    if (!arquivo.type.startsWith("image/")) {

        alert("Selecione um arquivo de imagem válido.");

        this.value = "";

        preview.src = "";

        preview.style.display = "none";

        return;
    }

    const leitor = new FileReader();

    leitor.onload = function (e) {

        preview.src = e.target.result;

        preview.style.display = "block";
    };

    leitor.readAsDataURL(arquivo);

});


/* =====================================
   CADASTRAR PRODUTO
===================================== */

form.addEventListener("submit", function (event) {

    event.preventDefault();

    const produto = {

        nome: document.getElementById("nome").value,

        categoria: document.getElementById("categoria").value,

        descricao: document.getElementById("descricao").value,

        preco: parseFloat(
            document.getElementById("preco").value
        ),

        foto: foto.files[0] || null,

        criadoEm: criadoEm.value

    };


    // Exibir produto no console

    console.log("Produto cadastrado:", produto);


    // Mensagem de sucesso

    mensagem.style.color = "#16a34a";

    mensagem.textContent =
        "Produto cadastrado com sucesso!";


    // Limpar formulário

    form.reset();

    preview.src = "";

    preview.style.display = "none";

    preencherData();

});


/* =====================================
   LIMPAR FORMULÁRIO
===================================== */

form.addEventListener("reset", function () {

    mensagem.textContent = "";

    setTimeout(() => {

        preview.src = "";

        preview.style.display = "none";

        preencherData();

    }, 0);

});
