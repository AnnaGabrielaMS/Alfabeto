window.onload = function() {
    aplicarConfiguracoes();
}

function mudarLetra() {
    const tamanhoLetra = document.querySelector('input[name="letra"]:checked')?.value;
    const tipoLetra = document.querySelector('input[name="tipo"]:checked')?.value;
    
    localStorage.setItem('letra', tamanhoLetra);
    localStorage.setItem('tipo', tipoLetra);

    aplicarConfiguracoes();
}

function aplicarConfiguracoes() {
    const tamanhoLetra = localStorage.getItem('letra');
    const tipoLetra = localStorage.getItem('tipo');
    const textos = document.querySelectorAll('.fonteDaLetra');
    
    textos.forEach(texto => {
        if (tamanhoLetra === 'maiuscula') {
            texto.style.textTransform = 'uppercase';
        } else if (tamanhoLetra === 'minuscula') {
            texto.style.textTransform = 'lowercase';
        }

        if (tipoLetra === 'cursiva') {
            texto.classList.add('fonte-cursiva');
        } else {
            texto.classList.remove('fonte-cursiva');
        }
    });
}