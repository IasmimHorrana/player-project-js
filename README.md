# Player-JS

Um player de música construído do zero com JavaScript puro — sem frameworks, sem bibliotecas de lógica.

O objetivo desse projeto foi aprender na prática os principais conceitos de **manipulação do DOM** e **lógica de programação** com Vanilla JS.

---

## Proposta

Simular o comportamento de um player de música real (estilo Spotify), implementando cada funcionalidade manualmente para entender como o JavaScript interage com o HTML e controla elementos na tela.

---

## O que foi estudado

- Seleção e manipulação de elementos do DOM (`getElementById`, `textContent`, `style`, `classList`)
- Uso da API `<audio>` nativa do HTML5
- Eventos (`click`, `timeupdate`, `ended`, `loadedmetadata`)
- Manipulação de arrays e objetos (playlist, shuffle com Fisher-Yates)
- Lógica de estado (play/pause, shuffle on/off, repeat on/off, liked)
- Formatação de tempo em `HH:MM:SS` com `padStart`
- CSS custom properties (`--progress`) para barra de progresso dinâmica

---

## Etapas de criação

**1. Estrutura base**
Criação do HTML com os elementos essenciais: imagem do álbum, nome da música, artista, barra de progresso e controles.

**2. Playlist em objetos**
Cada música foi definida como um objeto JS com `songName`, `artistName`, `albumArt`, `audio` e `liked`. A playlist é um array desses objetos.

**3. Carregamento dinâmico**
A função `loadMusic()` atualiza a tela com os dados da música atual — imagem, título e artista.

**4. Play / Pause**
Controle do estado de reprodução via `audio.play()` e `audio.pause()`, com troca dinâmica de ícone.

**5. Navegação**
Lógica de `next` e `previous` com wrap-around (ao chegar no fim, volta ao início e vice-versa).

**6. Barra de progresso**
Atualização em tempo real via evento `timeupdate`. Clique na barra reposiciona a música (`jumpto`).

**7. Tempo atual e duração**
Formatação e exibição do tempo decorrido e total, atualizados via eventos do `<audio>`.

**8. Shuffle**
Embaralhamento da playlist com o algoritmo Fisher-Yates. Ao desativar, a ordem original é restaurada.

**9. Repeat**
Ao terminar a música, a função `nextOrRepeat()` verifica o estado do repeat — reinicia ou avança.

**10. Like**
Estado `liked` armazenado diretamente no objeto da música. Ícone e cor do botão refletem o estado atual.

---

## Tecnologias

- HTML5
- CSS3
- Vanilla JavaScript
- [Bootstrap Icons](https://icons.getbootstrap.com/)

---

## Como rodar

Clone o repositório e abra o `index.html` diretamente no navegador.

```bash
git clone https://github.com/IasmimHorrana/player-project-js
```
