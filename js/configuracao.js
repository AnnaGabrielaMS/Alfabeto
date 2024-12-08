window.onload = function() {
    aplicarConfiguracoes();
}

const VISUALIZAR = document.getElementById('visualizar-letras');

function salvarConfiguracoes() {
    const TAMANHO_LETRA = document.querySelector('input[name="letra"]:checked')?.value;
    const TIPO_LETRA = document.querySelector('input[name="tipo"]:checked')?.value;
    
    localStorage.setItem('letra', TAMANHO_LETRA);
    localStorage.setItem('tipo', TIPO_LETRA);

    aplicarConfiguracoes();

    window.location.href = 'index.html';
}

function aplicarConfiguracoes() {
    const TAMANHO_LETRA= localStorage.getItem('letra');
    const TIPO_LETRA = localStorage.getItem('tipo');
    const LETRAS = document.querySelectorAll('.fonteDaLetra');
    
    LETRAS.forEach(letra => {
        if (TAMANHO_LETRA === 'maiuscula') {
            letra.style.textTransform = 'uppercase';
        } else if (TAMANHO_LETRA === 'minuscula') {
            letra.style.textTransform = 'lowercase';
        }

        if (TIPO_LETRA === 'cursiva') {
            letra.classList.add('fonte-cursiva');
        } else {
            letra.classList.remove('fonte-cursiva');
        }
    });

    if (TAMANHO_LETRA) {
        document.querySelector(`input[name="letra"][value="${TAMANHO_LETRA}"]`).checked = true;
    }
    if (TIPO_LETRA) {
        document.querySelector(`input[name="tipo"][value="${TIPO_LETRA}"]`).checked = true;
    }
}

function letraCursiva(){
    VISUALIZAR.classList.add('fonte-cursiva');
}

function letraBastao(){
    VISUALIZAR.classList.remove('fonte-cursiva');
}

function letraMaiuscula(){
    VISUALIZAR.style.textTransform = 'uppercase';
}

function letraMinuscula(){
    VISUALIZAR.style.textTransform = 'lowercase';
}