/** TODO
 * Notizen Spalte pro Ereignis
 * Sychrnoisierung der Ereignisse über Datenbank
 * Schiedsrichter bezogene Ereignisse
 * Freiwürfe
 * Statistik (Anzahl Ereignisse gesamt)
 * Protokoll Statisitk plus
 * Zugriff auf ein Spiel von mehreren Zugängen (Videoschiedsrichter, Beobachter, Schiedsrichter[nach dem Spiel], Vereine)
 * Zugriffsbeschränkung mit Anmeldungen
 * Unterschiedlich Zugriffe mit unterschiedlichen Funktionen (Beobachter: Tag und Notizen, Videoschiedsrichter: Protokoll Tags, Notizen, Tagbeobachter, Spielerstellen,...)
 * Videoplayer der die Videodatei anzeigt (mChapters)
 * Springen in Videodatei zu Zeistempel aus Ereignis Liste (mChapters)
 * Platzierung von Werbung in der Platform
 * Landingpage Informationen zu Funktionen, Bezahlung, Login, Registrierung, Bezahlung
 * Premium Zugang für Mannschaften und Schiedsrichter - Basis, eigene Spiele Plus, alle Spiele Premium
 * Absichern der Datei nach Spielende als CSV
 * 
 * Spieler- und Spieldaten aus Onlineprotokoll über Erieignissablauf abgleichen Spieler ID als Zugang zu eigenen Szenen
 * */ 


let startTime;
let running = false;
let timerInterval;
let tagCounter = 1; //Counter für Tags
let abschnittCounter = 1; //Counter für Abschnitte
let stürmerFoulCounter = 1; //Counter für Stürmerfauls
let ausschlussCounter = 1; //Counter für Ausschlüsse
let strafwurfCounter = 1; //Counter für Strafwürfe
let videoPlayer;
let ereignisCounter = 1; //Counter für Ereignisse
let stürmerFoulCounterSchiedsrichterEins = 0;
let ausschlussCounterSchiedsrichterEins = 0;
let strafwurfCounterSchiedsrichterEins = 0;
let stürmerFoulCounterSchiedsrichterZwei = 0;
let ausschlussCounterSchiedsrichterZwei = 0;
let strafwurfCounterSchiedsrichterZwei = 0;
let auszeitCounterHeim = 0;
let torCounterHeim = 0;
let auszeitCounterGast = 0;
let torCounterGast = 0;

//Persöhnliche Fehler Heim

let anzahlPersFehlerEinsHeim = 0;
let anzahlPersFehlerZweiHeim = 0;
let anzahlPersFehlerDreiHeim = 0;
let anzahlPersFehlerVierHeim = 0;
let anzahlPersFehlerFünfHeim = 0;
let anzahlPersFehlerSechsHeim = 0;
let anzahlPersFehlerSiebenHeim = 0;
let anzahlPersFehlerAchtHeim = 0;
let anzahlPersFehlerNeunHeim = 0;
let anzahlPersFehlerZehnHeim = 0;
let anzahlPersFehlerElfHeim = 0;
let anzahlPersFehlerZwölfHeim = 0;
let anzahlPersFehlerDreizehnHeim = 0;

//Persöhnliche Fehler Gast

let anzahlPersFehlerEinsGast = 0;
let anzahlPersFehlerZweiGast = 0;
let anzahlPersFehlerDreiGast = 0;
let anzahlPersFehlerVierGast = 0;
let anzahlPersFehlerFünfGast = 0;
let anzahlPersFehlerSechsGast = 0;
let anzahlPersFehlerSiebenGast = 0;
let anzahlPersFehlerAchtGast = 0;
let anzahlPersFehlerNeunGast = 0;
let anzahlPersFehlerZehnGast = 0;
let anzahlPersFehlerElfGast = 0;
let anzahlPersFehlerZwölfGast = 0;
let anzahlPersFehlerDreizehnGast = 0;

//Score
let anzahlToreHeim = 0;
let anzahlToreGast = 0;

// Get elements from DOM
const startBtn = document.getElementById('startBtn');
const stopBtn = document.getElementById('stopBtn');
const resetBtn = document.getElementById('resetBtn');
const tagSt = document.getElementById('tagSt');
const tagA = document.getElementById('tagA');
const tagS = document.getElementById('tagS');
const tagBtn = document.getElementById('tagBtn');
const tagStartA = document.getElementById('tagStartA')
const tagEndeA = document.getElementById('tagEndeA')
const timer = document.getElementById('timer');
const tagTable = document.getElementById('tagTable');
const videoContainer = document.getElementById('videoContainer');
const scoreBtnHeim = document.getElementById('scoreHeim');
const scoreBtnGast = document.getElementById('scoreGast');

// Event listeners for buttons
startBtn.addEventListener('click', startTimer);
stopBtn.addEventListener('click', stopTimer);
resetBtn.addEventListener('click', resetTimer);
tagBtn.addEventListener('click', tagTime);
tagSt.addEventListener('click', tagStürmerfoul);
tagA.addEventListener('click', tagAusschluss);
tagS.addEventListener('click', tagStrafwurf);
tagStartA.addEventListener('click', tagStartAbschnitt);
tagEndeA.addEventListener('click', tagEndeAbschnitt);
scoreBtnHeim.addEventListener('click', scoreHeim);
scoreBtnGast.addEventListener('click', scoreGast);

//add score function Heim
//
function scoreHeim() {
    if (running) {
        anzahlToreHeim++;
        const currentTime = new Date().toLocaleTimeString();
        const row = tagTable.insertRow(1);
        const timeCell = row.insertCell(0);
        const tagCell = row.insertCell(1);
        const playerCell = row.insertCell(2);
        const noteCell = row.insertCell(3);
        timeCell.textContent = '[' + `${timer.textContent}` + '.00000]'; // Get current time from timer element
        tagCell.textContent = `${anzahlToreHeim}` + ' : ' + `${anzahlToreGast}`; // Placeholder for tag, you can customize this
        //noteCell.textContent = '-'; // Placeholder for tag, you can customize this


        // Add CSS class to score row
        //row.classList.add('ausschluss');
        }
    }

//add score function Heim
//
function scoreGast() {
    if (running) {
        anzahlToreGast++;
        const currentTime = new Date().toLocaleTimeString();
        const row = tagTable.insertRow(1);
        const timeCell = row.insertCell(0);
        const tagCell = row.insertCell(1);
        const playerCell = row.insertCell(2);
        const noteCell = row.insertCell(3);
        timeCell.textContent = '[' + `${timer.textContent}` + '.00000]'; // Get current time from timer element
        tagCell.textContent = `${anzahlToreHeim}` + ' : ' + `${anzahlToreGast}`; // Placeholder for tag, you can customize this
        //noteCell.textContent = '-'; // Placeholder for tag, you can customize this


        // Add CSS class to score row
        //row.classList.add('ausschluss');
        }
    }
// add event listener for keydup then arrow key is hit
// Arrowup = Tag
document.addEventListener('keyup', function(event) {
    if (event.code === 'ArrowUp') {
        tagTime();
    }
});
// add event listener for keyup then t key is hit
// Key t = tagStürmerfoul
document.addEventListener('keyup', function(event) {
    if (event.code === 'KeyT') {
        tagStürmerfoul();
    }
});

// add event listener for keyup then e key is hit
// Key e = tagAusschluss
document.addEventListener('keyup', function(event) {
    if (event.code === 'KeyE') {
        tagAusschluss();
    }
});

// add event listener for keyup then p key is hit
// Key p = tagStrafwurf
document.addEventListener('keyup', function(event) {
    if (event.code === 'KeyP') {
        tagStrafwurf();
    }
});

// Start timer
function startTimer() {
    if (!running) {
        startTime = new Date().getTime();
        running = true;
        timerInterval = setInterval(updateTimer, 1000);
    }
}
// Stop timer
function stopTimer() {
    if (running) {
        clearInterval(timerInterval);
        running = false;
    }
}

// Reset timer
function resetTimer() {
    stopTimer();
    timer.textContent = '00:00:00';
}

// Update timer
function updateTimer() {
    const currentTime = new Date().getTime();
    const elapsedTime = currentTime - startTime - 10000; //-10000 ist die Verzögerung für den Tag
    const hours = Math.floor(elapsedTime / 3600000);
    const minutes = Math.floor((elapsedTime % 3600000) / 60000);
    const seconds = Math.floor((elapsedTime % 60000) / 1000);
    timer.textContent = `${padTime(hours)}:${padTime(minutes)}:${padTime(seconds)}`;
}

// Pad time with leading zeros
function padTime(time) {
    return String(time).padStart(2, '0');
}

// Tag time
function tagTime() {
    if (running) {
        const currentTime = new Date().toLocaleTimeString();
        const row = tagTable.insertRow(1);
        const timeCell = row.insertCell(0);
        const tagCell = row.insertCell(1);
        const playerCell = row.insertCell(2);
        const noteCell = row.insertCell(3);
        timeCell.textContent ='[' + `${timer.textContent}` + '.00000]'; // Get current time from timer element
        tagCell.textContent = `${tagCounter}` + ' Tag'; // Placeholder for tag, you can customize this
        //noteCell.textContent = '-'; // Placeholder for tag, you can customize this
        tagCounter++;

        // Add CSS class to tagged row
        row.classList.add('tagged');
        }
    }

// Tag Stürmerfoul
function tagStürmerfoul() {
    if (running) {
        const currentTime = new Date().toLocaleTimeString();
        const row = tagTable.insertRow(1);
        const timeCell = row.insertCell(0);
        const tagCell = row.insertCell(1);
        const playerCell = row.insertCell(2);
        const noteCell = row.insertCell(3);
        timeCell.textContent = '[' + `${timer.textContent}` + '.00000]'; // Get current time from timer element
        tagCell.textContent = `${stürmerFoulCounter}` + ' Stürmerfoul'; // Placeholder for tag, you can customize this
        //noteCell.textContent = '-'; // Placeholder for tag, you can customize this
        stürmerFoulCounter++;

        // Add CSS class to tagged row
        row.classList.add('stürmerfaul');
        }
    }

// Tag Ausschluss
function tagAusschluss() {
    if (running) {
        const currentTime = new Date().toLocaleTimeString();
        const row = tagTable.insertRow(1);
        const timeCell = row.insertCell(0);
        const tagCell = row.insertCell(1);
        const playerCell = row.insertCell(2);
        const noteCell = row.insertCell(3);
        timeCell.textContent = '[' + `${timer.textContent}` + '.00000]'; // Get current time from timer element
        tagCell.textContent = `${ausschlussCounter}` + ' Ausschluss'; // Placeholder for tag, you can customize this
        //noteCell.textContent = '-'; // Placeholder for tag, you can customize this
        ausschlussCounter++;

        // Add CSS class to tagged row
        row.classList.add('ausschluss');
        }
    }

// Tag Strafwurf
function tagStrafwurf() {
    if (running) {
        const currentTime = new Date().toLocaleTimeString();
        const row = tagTable.insertRow(1);
        const timeCell = row.insertCell(0);
        const tagCell = row.insertCell(1);
        const playerCell = row.insertCell(2);
        const noteCell = row.insertCell(3);
        timeCell.textContent = '[' + `${timer.textContent}` + '.00000]'; // Get current time from timer element
        tagCell.textContent = `${strafwurfCounter}` + ' Strafwurf'; // Placeholder for tag, you can customize this
        //noteCell.textContent = '-'; // Placeholder for tag, you can customize this
        strafwurfCounter++;  

        // Add CSS class to tagged row
        row.classList.add('strafwurf');
        }
    }

// Tag Start Abschnitt
function tagStartAbschnitt() {
    if (running) {
        const currentTime = new Date().toLocaleTimeString();
        const row = tagTable.insertRow(1);
        const timeCell = row.insertCell(0);
        const tagCell = row.insertCell(1);
        const playerCell = row.insertCell(2);
        const noteCell = row.insertCell(3);
        timeCell.textContent = '[' + `${timer.textContent}` + '.00000]'; // Get current time from timer element
        tagCell.textContent = `${abschnittCounter}` + '. Abschnitt Start'; // Placeholder for tag, you can customize this
        //noteCell.textContent = '-'; // Placeholder for tag, you can customize this

        // Add CSS class to tagged row
        row.classList.add('startAbschnitt');
        }
    }

    // Tag Ende Abschnitt
function tagEndeAbschnitt() {
    if (running) {
        const currentTime = new Date().toLocaleTimeString();
        const row = tagTable.insertRow(1);
        const timeCell = row.insertCell(0);
        const tagCell = row.insertCell(1);
        const playerCell = row.insertCell(2);
        const noteCell = row.insertCell(3);
        timeCell.textContent = '[' + `${timer.textContent}` + '.00000]'; // Get current time from timer element
        tagCell.textContent = `${abschnittCounter}` + '. Abschnitt Ende'; // Placeholder for tag, you can customize this
        //noteCell.textContent = '-'; // Placeholder for tag, you can customize this
        abschnittCounter++;

        // Add CSS class to tagged row
        row.classList.add('endeAbschnitt');
        }
    }

//change team name in h2 nameHeim with click on button with prompt
document.getElementById('changeNameHeim').addEventListener('click', changeNameHeim);
function changeNameHeim() {
    let teamNameHeim = prompt("Bitte geben Sie den Namen der Heimmannschaft ein", "Heimmannschaft");
    if (teamNameHeim != null) {
        document.getElementById("nameHeim").innerHTML = teamNameHeim;
    }
}

//change team name in h2 nameGast with click on button with prompt
document.getElementById('changeNameGast').addEventListener('click', changeNameGast);
function changeNameGast() {
    let teamNameGast = prompt("Bitte geben Sie den Namen der Gastmannschaft ein", "Gastmannschaft");
    if (teamNameGast != null) {
        document.getElementById("nameGast").innerHTML = teamNameGast;
    }
}

// Saves table content into an text file the file has following format
document.getElementById('saveBtn').addEventListener('click', saveTags);
function saveTags() {
    let csvContent = "data:text/csv;charset=utf-8,";
    let rows = document.querySelectorAll('table tr');
    //add row to csv with content <@TimeScale:44100>
    csvContent += "<@TimeScale:44100>\r\n";
    csvContent += "<@Start>";
    rows.forEach(function(rowArray){
        let row = [];
        rowArray.querySelectorAll('td').forEach(function(cell){
            row.push(cell.innerText);
        });
        //join with tabs
        csvContent += row.join("\t") + "\r\n";
    }); 
    csvContent += "<@End>";
    var encodedUri = encodeURI(csvContent);
    //download txt file add .txt to the end of the file name
    var link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    //use team names as file name
    // get team names
    let team1 = document.getElementById("nameHeim").innerHTML;
    let team2 = document.getElementById("nameGast").innerHTML;
    link.setAttribute("download", team1 + " gegen " + team2 + ".txt");
    document.body.appendChild(link); // Required for FF
    link.click();
}

// delete last row
var deleteBtn = document.getElementById('deleteBtn');
deleteBtn.addEventListener('click', deleteLastRow);
function deleteLastRow() {
    tagTable.deleteRow(1);
}

//add note in last row
var noteBtn = document.getElementById('noteBtn');
noteBtn.addEventListener('click', addNote);
function addNote() {
    var note = prompt("Bitte Notiz eingeben");
    var table = document.getElementById("tagTable");
    var row = table.rows[1];
    var cell = row.cells[3];
    cell.innerHTML = note;
}
// add event listener for keyup then n key is hit
// Key n = note last tag
document.addEventListener('keyup', function(event) {
    if (event.code === 'KeyN') {
        addNote();
    }
});

// add the number and heim in the spieler column than pressing the heim buttons
// get the number from the button
// get the heim or gast from the button
// get the last row
// get the spieler column
// add the number and heim or gast to the spieler column

var heimBtn1 = document.getElementById('heim1');
heimBtn1.addEventListener('click', addHeim1);
function addHeim1() {
    var table = document.getElementById("tagTable");
    var row = table.rows[1];
    var cell = row.cells[2];
    cell.innerHTML = "1 Heim";
}

var heimBtn2 = document.getElementById('heim2');
heimBtn2.addEventListener('click', addHeim2);
function addHeim2() {
    var table = document.getElementById("tagTable");
    var row = table.rows[1];
    var cell = row.cells[2];
    cell.innerHTML = "2 Heim";
}

var heimBtn3 = document.getElementById('heim3');
heimBtn3.addEventListener('click', addHeim3);
function addHeim3() {
    var table = document.getElementById("tagTable");
    var row = table.rows[1];
    var cell = row.cells[2];
    cell.innerHTML = "3 Heim";
}

var heimBtn4 = document.getElementById('heim4');
heimBtn4.addEventListener('click', addHeim4);
function addHeim4() {
    var table = document.getElementById("tagTable");
    var row = table.rows[1];
    var cell = row.cells[2];
    cell.innerHTML = "4 Heim";
}

var heimBtn5 = document.getElementById('heim5');
heimBtn5.addEventListener('click', addHeim5);
function addHeim5() {
    var table = document.getElementById("tagTable");
    var row = table.rows[1];
    var cell = row.cells[2];
    cell.innerHTML = "5 Heim";
}

var heimBtn6 = document.getElementById('heim6');
heimBtn6.addEventListener('click', addHeim6);
function addHeim6() {
    var table = document.getElementById("tagTable");
    var row = table.rows[1];
    var cell = row.cells[2];
    cell.innerHTML = "6 Heim";
}

var heimBtn7 = document.getElementById('heim7');
heimBtn7.addEventListener('click', addHeim7);
function addHeim7() {
    var table = document.getElementById("tagTable");
    var row = table.rows[1];
    var cell = row.cells[2];
    cell.innerHTML = "7 Heim";
}

var heimBtn8 = document.getElementById('heim8');
heimBtn8.addEventListener('click', addHeim8);
function addHeim8() {
    var table = document.getElementById("tagTable");
    var row = table.rows[1];
    var cell = row.cells[2];
    cell.innerHTML = "8 Heim";
}

var heimBtn9 = document.getElementById('heim9');
heimBtn9.addEventListener('click', addHeim9);
function addHeim9() {
    var table = document.getElementById("tagTable");
    var row = table.rows[1];
    var cell = row.cells[2];
    cell.innerHTML = "9 Heim";
}

var heimBtn10 = document.getElementById('heim10');
heimBtn10.addEventListener('click', addHeim10);
function addHeim10() {
    var table = document.getElementById("tagTable");
    var row = table.rows[1];
    var cell = row.cells[2];
    cell.innerHTML ="10 Heim";
}

var heimBtn11 = document.getElementById('heim11');
heimBtn11.addEventListener('click', addHeim11);
function addHeim11() {
    var table = document.getElementById("tagTable");
    var row = table.rows[1];
    var cell = row.cells[2];
    cell.innerHTML ="11 Heim";
}

var heimBtn12 = document.getElementById('heim12');
heimBtn12.addEventListener('click', addHeim12);
function addHeim12() {
    var table = document.getElementById("tagTable");
    var row = table.rows[1];
    var cell = row.cells[2];
    cell.innerHTML ="12 Heim";
}

var heimBtn13 = document.getElementById('heim13');
heimBtn13.addEventListener('click', addHeim13);
function addHeim13() {
    var table = document.getElementById("tagTable");
    var row = table.rows[1];
    var cell = row.cells[2];
    cell.innerHTML ="13 Heim";
}
//Gast spieler Buttons
var gastBtn1 = document.getElementById('gast1');
gastBtn1.addEventListener('click', addGast1);
function addGast1() {
    var table = document.getElementById("tagTable");
    var row = table.rows[1];
    var cell = row.cells[2];
    cell.innerHTML = "1 Gast";
}

var gastBtn2 = document.getElementById('gast2');
gastBtn2.addEventListener('click', addGast2);
function addGast2() {
    var table = document.getElementById("tagTable");
    var row = table.rows[1];
    var cell = row.cells[2];
    cell.innerHTML ="2 Gast";
}

var gastBtn3 = document.getElementById('gast3');
gastBtn3.addEventListener('click', addGast3);
function addGast3() {
    var table = document.getElementById("tagTable");
    var row = table.rows[1];
    var cell = row.cells[2];
    cell.innerHTML ="3 Gast";
}

var gastBtn4 = document.getElementById('gast4');
gastBtn4.addEventListener('click', addGast4);
function addGast4() {
    var table = document.getElementById("tagTable");
    var row = table.rows[1];
    var cell = row.cells[2];
    cell.innerHTML ="4 Gast";
}

var gastBtn5 = document.getElementById('gast5');
gastBtn5.addEventListener('click', addGast5);
function addGast5() {
    var table = document.getElementById("tagTable");
    var row = table.rows[1];
    var cell = row.cells[2];
    cell.innerHTML ="5 Gast";
}

var gastBtn6 = document.getElementById('gast6');
gastBtn6.addEventListener('click', addGast6);
function addGast6() {
    var table = document.getElementById("tagTable");
    var row = table.rows[1];
    var cell = row.cells[2];
    cell.innerHTML ="6 Gast";
}

var gastBtn7 = document.getElementById('gast7');
gastBtn7.addEventListener('click', addGast7);
function addGast7() {
    var table = document.getElementById("tagTable");
    var row = table.rows[1];
    var cell = row.cells[2];
    cell.innerHTML ="7 Gast";
}

var gastBtn8 = document.getElementById('gast8');
gastBtn8.addEventListener('click', addGast8);
function addGast8() {
    var table = document.getElementById("tagTable");
    var row = table.rows[1];
    var cell = row.cells[2];
    cell.innerHTML ="8 Gast";
}

var gastBtn9 = document.getElementById('gast9');
gastBtn9.addEventListener('click', addGast9);
function addGast9() {
    var table = document.getElementById("tagTable");
    var row = table.rows[1];
    var cell = row.cells[2];
    cell.innerHTML ="9 Gast";
}

var gastBtn10 = document.getElementById('gast10');
gastBtn10.addEventListener('click', addGast10);
function addGast10() {
    var table = document.getElementById("tagTable");
    var row = table.rows[1];
    var cell = row.cells[2];
    cell.innerHTML ="10 Gast";
}

var gastBtn11 = document.getElementById('gast11');
gastBtn11.addEventListener('click', addGast11);
function addGast11() {
    var table = document.getElementById("tagTable");
    var row = table.rows[1];
    var cell = row.cells[2];
    cell.innerHTML ="11 Gast";
}

var gastBtn12 = document.getElementById('gast12');
gastBtn12.addEventListener('click', addGast12);
function addGast12() {
    var table = document.getElementById("tagTable");
    var row = table.rows[1];
    var cell = row.cells[2];
    cell.innerHTML ="12 Gast";
}

var gastBtn13 = document.getElementById('gast13');
gastBtn13.addEventListener('click', addGast13);
function addGast13() {
    var table = document.getElementById("tagTable");
    var row = table.rows[1];
    var cell = row.cells[2];
    cell.innerHTML ="13 Gast";
}
