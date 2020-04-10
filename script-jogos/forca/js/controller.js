/* eslint-disable eqeqeq */
/* eslint-disable default-case */
/* eslint-disable no-alert */
/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
const criaController = (jogo) => {
    const $entrada = $('.entrada');
    const $lacunas = $('.lacunas');

    const exibeLacunas = () => {
        $lacunas.empty();
        jogo.getLacunas().forEach((lacuna) => {
            $('<li>')
                .addClass('lacuna')
                .text(lacuna)
                .appendTo($lacunas);
        });
    };

    const mudaPlaceHolder = (texto) => {
        $entrada.attr('placeholder', texto);
    };

    const guardaPalavraSecreta = () => {
        try {
            jogo.setPalavraSecreta($entrada.val().trim());
            $entrada.val('');
            mudaPlaceHolder('Jogador 2, chute uma letra.');
            exibeLacunas();
        } catch (err) {
            alert(err.message);
        }
    };

    const reinicia = () => {
        jogo.reinicia();
        $lacunas.empty();
        mudaPlaceHolder('palavra secreta');
    };

    const leChute = () => {
        try {
            jogo.processaChute($entrada.val().trim().substr(0, 1));
            $entrada.val('');
            exibeLacunas();

            if (jogo.ganhouOuPerdeu()) {
                setTimeout(() => {
                    if (jogo.ganhou()) {
                        alert('Parabéns, você ganhou!');
                    } else if (jogo.perdeu()) {
                        alert('Que pena, tenta novamente');
                    }

                    reinicia();
                }, 200);
            }
        } catch (err) {
            alert(err.message);
        }
    };

    const inicia = () => {
        $entrada.keypress((event) => {
            if (event.which == 13) {
                switch (jogo.getEtapa()) {
                    case 1:
                        guardaPalavraSecreta();
                        break;
                    case 2:
                        leChute();
                        break;
                }
            }
        });
    };

    return {
        inicia,
    };
};