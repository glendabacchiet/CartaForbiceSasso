//Dichiarazioni delle variabili
const opzioniGioco = ['Carta', 'Forbice', 'Sasso'];
const icons = { "Carta": '🤚', "Forbice": '✌', "Sasso": '✊' };
const suoni = { "pareggio": 'Draw', "player": 'Win', "pc": 'GameOver' };

let modalitaGioco = ''; // Modalità di gioco predefinita

// Le 'regole del gioco'
const risultati = {
    'Carta': { 'Forbice': 'pc', 'Sasso': 'player' },
    'Forbice': { 'Carta': 'player', 'Sasso': 'pc' },
    'Sasso': { 'Carta': 'pc', 'Forbice': 'player' }
};

// Genera le opzioniGioco casuali del pc
function getSceltaComputer(opzioniGioco) {
    return opzioniGioco[Math.floor(Math.random() * opzioniGioco.length)];
    // .floor() > arrotonda verso il basso il numero
    // .random() * > ottieni un numero casuale nell'intervallo desiderato
}

// Imposta il punteggio a zero al caricamento della pagina
function setZero() {
    document.getElementById('punteggi-player').innerText = '0';
    document.getElementById('punteggi-pc').innerText = '0';
}

// Aggiorna i punteggi
function aggiornaPunteggio(risultato) {
    if (risultato === 'player'){
        document.getElementById('punteggi-player').innerText++;
    } else if (risultato === 'pc'){
        document.getElementById('punteggi-pc').innerText++;
    }
}

// Determina chi è il vincitore
function determinaVincitore(sceltaPlayer, sceltaComputer) {
    if (sceltaPlayer === sceltaComputer) {
        return 'pareggio';
    }
    return risultati[sceltaPlayer][sceltaComputer];
}

// Cambia i punteggi dopo ogni clic
function getResult(sceltaPlayer, sceltaComputer) {
    const risultato = determinaVincitore(sceltaPlayer, sceltaComputer);
    aggiornaPunteggio(risultato);
    return risultato;
}

// Fa vedere la modalità di gioco 'Player vs PC'
function getGiocoPlayervsPC() {
    modalitaGioco = 'Player vs PC';
    document.getElementById('gioco-div').style.display = 'flex';
    document.getElementById('contenitore-buttons').style.display = 'none';
    document.getElementById('buttons').style.display = 'flex';
}

// Inizia una nuova partita 'PC vs PC'
function startPCvsPC() {
    const sceltaPC1 = getSceltaComputer(opzioniGioco);
    const sceltaPC2 = getSceltaComputer(opzioniGioco);
    const risultato = getResult(sceltaPC1, sceltaPC2);
    showResult(sceltaPC1, sceltaPC2, risultato);
}

// Fa vedere la modalità di gioco 'PC vs PC'
function getGiocoPCvsPC(){
    modalitaGioco = 'PC vs PC';

    document.getElementById('buttons').style.display = 'none';
    document.getElementById('contenitore-buttons').style.display = 'none';
    document.getElementById('gioco-div').style.display = 'flex';
    document.getElementById('punteggioPlayer').innerText = 'PC1:';
    document.getElementById('punteggioPc').innerText = 'PC2:';
    
    startPCvsPC();
}

// Riprodurre i suoni
function playSound(event) {
    const audio = new Audio(`sounds/${event}.wav`)
    audio.play();
}

// Permette di visualizzare le opzioniGioco dei giocatori
function showResult(sceltaPlayer, sceltaComputer, risultato) {
    // Fa vedere l'icona scelta
    document.getElementById('mani').innerText = `${icons[sceltaPlayer]} ${icons[sceltaComputer]}`;
    let testoRisultato = '';
    let colore = '';
    
    // Verifica la modalità che è stata scelta per riprodurre i suoni corrispondenti
    if(modalitaGioco === 'PC vs PC' && risultato === 'pc'){
        playSound(suoni['player']);
    } else {
        playSound(suoni[risultato]);
    }

    // Cambia i colori dei testi ed i suoni a dipendere del risultato
    if (risultato === 'pareggio') {
        testoRisultato = 'Pareggio';
        colore = 'yellow';
    } else if (risultato === 'player'){
        testoRisultato = modalitaGioco === 'Player vs PC' ? 'Hai vinto!' : 'PC1 ha vinto!';
        colore = 'green';
    } else {
        testoRisultato = modalitaGioco === 'Player vs PC' ? 'Hai perso...' : 'PC2 ha vinto!';
        colore = modalitaGioco === 'Player vs PC' ? 'red' : 'green';
    }

    document.getElementById('risultato').innerText = testoRisultato;
    document.getElementById('risultato').style.color = colore;
}

// Funzione chiamata quando il giocatore fa una scelta, chiama le funzioni necessarie per far funzionare il gioco
function onClickCFS(sceltaPlayer) {
    const sceltaComputer = getSceltaComputer(opzioniGioco);
    const risultato = getResult(sceltaPlayer, sceltaComputer);
    showResult(sceltaPlayer, sceltaComputer, risultato);
}

// Inizia il gioco ad ogni clic sulle manine 
function playGame() {
    const cfsButtons = document.querySelectorAll('.cfsButton');
    cfsButtons.forEach(button => {
        button.addEventListener('click', () => {
            onClickCFS(button.value);
        });
    });
}

// Inizia una nuova partita
function nuovoGioco() {
    document.getElementById('risultato').innerText = '';
    document.getElementById('mani').innerText = '';

    if (modalitaGioco === 'Player vs PC') {
        setZero();
    } else {
        startPCvsPC();
    }
}

// Permette di cambiare tra le modalità di gioco
function cambiaModalita() {
    document.getElementById('gioco-div').style.display = 'none';
    document.getElementById('contenitore-buttons').style.display = 'flex';
    document.getElementById('risultato').innerText = '';
    document.getElementById('mani').innerText = '';
    setZero();
}

// Funzione di reset, per azzerare i punteggi
function resetGame() {
    setZero();
    document.getElementById('risultato').innerText = '';
    document.getElementById('mani').innerText = '';
}

// Inizializzazione del gioco
playGame();

// Chiamata delle funzione al clic dei pulsanti
document.getElementById('PlayerVsPCButton').addEventListener('click', getGiocoPlayervsPC);
document.getElementById('PCvsPCButton').addEventListener('click', getGiocoPCvsPC);
document.getElementById('resetButton').addEventListener('click', resetGame);
document.getElementById('cambiaModalita').addEventListener('click', cambiaModalita);
document.getElementById('nuovoGioco').addEventListener('click', nuovoGioco);