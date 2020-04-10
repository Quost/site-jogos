frontend-nanodegree-arcade-game
===============================

Students should use this [rubric](https://review.udacity.com/#!/projects/2696458597/rubric) for self-checking their submission. Make sure the functions you write are **object-oriented** - either class functions (like Player and Enemy) or class prototype functions such as Enemy.prototype.checkCollisions, and that the keyword 'this' is used appropriately within your class and class prototype functions to refer to the object the function is called upon. Also be sure that the **readme.md** file is updated with your instructions on both how to 1. Run and 2. Play your arcade game.

For detailed instructions on how to get started, check out this [guide](https://docs.google.com/document/d/1v01aScPjSWCCWQLIpFqvg3-vXLH2e8_SZQKC8jNO0Dc/pub?embedded=true).

# Projeto de Fliperama Clássico
Para jogar basta abrir o arquivo index.html localizado na pasta raiz.

## O que é
É um jogo básico onde o jogador deve chegar até o rio sem ser atingido por nenhum inimigo.

## Como jogar
Utilize as setas do teclado para movimentar o personagem. O jogador pode se movimentar para cima, baixo, direita e esquerda.

## Desafio
Chegar até o rio sem ser atingido por nenhum inimigo. O jogador receberá pontos extras ao coletar os cristais no caminho. Os inimigos movimentam-se em diferentes velocidades. Caso o personagem seja atingido por algum inimigo, o jogo será reiniciado.

## Pontuação
* 10 pontos por chegar até o rio;
* 20 pontos por cada cristal coletado;

## Como construi o jogo
* Utilizei HTML (Canvas) e CSS para estruturar o cenário;
* Adicionei todos os elementos do jogo no JavaScript, como personagem, inimigo, cristais e cenário;
* Adicionei um contador de pontos na parte superior da tela;