let playerName = ""; //Ny global variabel för att spara spelar namnet
let totalScore = 0; // Håller reda på spelarens totala poäng
let roundScore = 0; // Håller reda på poängen för den aktuella omgången
let roundCount = 1; // Håller reda på antalet omgångar. Spelet börjar på omgång 1.
let gameOver = false; // Håller reda på om spelet är över

const dice = document.querySelectorAll(".die"); // Väljer alla tärningar
const rollButton = document.querySelector("#roll-button"); // Väljer Kasta Tärning-knappen
console.log(rollButton);  // Lägger till detta för att se om knappen är korrekt vald
const freezeButton = document.querySelector("#freeze-button"); // Väljer Frys Poäng-knappen
const totalScoreDisplay = document.querySelector("#total-score"); // Väljer var totalpoängen ska visas
const roundScoreDisplay = document.querySelector("#round-score"); // Visar omgångens poäng
const roundNumberDisplay = document.querySelector("#round-number"); // Visar omgångsnumret
const gameMessage = document.querySelector("#game-message"); // Visar spelets slutmeddelande
const playAgainButton = document.querySelector("#play-again-button"); // Väljer Spela Igen-knappen



// Hanterar namn på spelaren
const form = document.querySelector(".form-container"); // Väljer och sparar ner form-container i en variabel
const nameInput = document.querySelector("#name"); // Väljer och sparar ner namn id i en variabel
const nameDisplay = document.querySelector("#name-display"); // Väljer och sparar ner namnvisning id i en variabel



nameDisplay.classList.add("hidden"); // Gömmer namnvisningen från början genom att lägga till stilregeln

//Här är en funktion för att visa popup-meddelande om inte namn skrivs in
function showPopup(message) {
  console.log("Popup visas:", message); // Testar om det fungerar

  //Väljer id för popup och popup-message i html och sparar det i variabler
  const popup = document.querySelector("#popup");
  const popupMessage = document.querySelector("#popup-message");

  //Använder textContent  här för att jag vill endast ändra textinneållet och lägger till det meddelande som kommer in som parameter.
  popupMessage.textContent = message;
  //Tar bort stilregel för popup-meddelandet så att den visas
  popup.classList.remove("hidden");

  // Döljer meddelandet efter 2,5 sekunder
  setTimeout(() => {
    popup.classList.add("hidden");
  }, 2500);
}

//Här registreras ett händelse som en submit händelse på formet. Detta sker när man skriver in namnet som skickar det.
form.addEventListener("submit", (event) => {
    event.preventDefault(); // Förebygger standardbeteendet för formens "submit", vilket är att skicka formuläret och ladda om sidan.


    playerName = nameInput.value.trim();//Sparar ned namnet som skrivs in i input-fältet. med trim() bortser man från mellanslag.
    console.log("Spelarnamn:", playerName); // Lägger till denna logg för att se om en spelarnamn har sparats ned

    
    // Här visas spelarens namn (i fetstil) genom att använda template literals där den infogas i HTML-koden. Här används därför innerHTML.
    nameDisplay.innerHTML = `Spelare: <strong>${playerName}</strong>`;
    nameInput.value = ""; //  Här tömms inputfältet efter att namnet har skrivits
    


    // Döljer hela form-sektionen (input och knapp) när man har skickat namnet. Där visas  istället namnet
    form.classList.add("hidden"); 
    nameDisplay.classList.remove("hidden");



});

// Här är en funktion som slumpar en tärning
function rollDice() {
    if (gameOver) return; // Om spelet är över gör inget. Alltså kastas tärningen inte.

    console.log("Knappen har klickats!");// Logg för att se om tärningen klickades

    // Tar bort alla tidigare visade sidor och animationer
    dice.forEach(die => {
        die.classList.remove("spin"); // Ta bort snurr-klassen
        die.style.display = "none"; // Döljer tärningen
    });

    // Slumpar ett nummer mellan 1 och 6
    const randomNumber = Math.floor(Math.random() * 6) + 1;
    console.log(`Slumpat nummer: ${randomNumber}`);
    
    // Skapar den korrekta selektorn baserat på det slumpade numret
    const selectedDie = document.querySelector(`.die.${getDieClass(randomNumber)}`);
    
    // Om den slumpade tärningen inte finns loggas ett meddelande
    if (!selectedDie) {
        console.log("Vald tärning finns inte.");
        return;
    }

    // Visra den slumpade sidan och applicerar snurranimation
    selectedDie.style.display = "flex";
    selectedDie.classList.add("spin");

    // Om spelarens tärning visar en etta nollställs omgångens poäng
    if (randomNumber === 1) {
        roundScore = 0;
        roundScoreDisplay.textContent = `Omgångens Poäng: ${roundScore}`;
        console.log("Slår en etta! Omgångens poäng är nu 0.");

        roundCount++;
        roundNumberDisplay.textContent = `Omgång: ${roundCount}`;
    } else {
        roundScore += randomNumber; // Lägger till det slumpade värdet till omgångens poäng
        roundScoreDisplay.textContent = `Omgångens Poäng: ${roundScore}`;
    }
}

// En funktion för att mappa ett nummer till den rätta tärningsklassen
function getDieClass(number) {
    switch(number) {
        case 1: return 'one';
        case 2: return 'two';
        case 3: return 'three';
        case 4: return 'four';
        case 5: return 'five';
        case 6: return 'six';
        default: return '';
    }
}

// Här är en funktion för att frysa poängen och lägga till omgångens poäng till totalen
function freezePoints() {
    if (gameOver) return; // Om spelet är över görs inget. Då kan man inte frysa poängen

    totalScore += roundScore; // Lägger till omgångens poäng till totalen
    roundScore = 0; // Nollställer omgångens poäng
    totalScoreDisplay.textContent = `Total Poäng: ${totalScore}`; // Visar den nya totala poängen
    roundScoreDisplay.textContent = `Omgångens Poäng: ${roundScore}`; // Visar omgången s poäng
    console.log(`Poäng frysta! Ny total: ${totalScore}`);// Loggar jag totalpoängen.

    // Ökar omgångsnummer och visar det
    roundCount++;
    roundNumberDisplay.textContent = `Omgång: ${roundCount}`;

    // Kontrollera om spelet är över, alltså att den totala poängen  är 100 eller mer.
    if (totalScore >= 100) {
        gameOver = true;
        //Visas ett ett meddelande om att man har vunnit. Här används innerHTML då jag använder <strong> (fetstil), alltså infogar jag taggar inte bara textinnehåll.
        gameMessage.innerHTML = `Grattis <strong>${playerName}!</strong> Spelet är avslutat och du har vunnit! <br> Totalt poäng: ${totalScore} på ${roundCount} omgångar.`;
        // Visar Spela Igen-knappen genom att ta bort .hidden-klassen
        playAgainButton.classList.remove("hidden");
        
        
        
    }
}

// Funktion för att starta om spelet
function restartGame() {
  totalScore = 0;
  roundScore = 0;
  roundCount = 1;
  gameOver = false;

  totalScoreDisplay.textContent = `Total Poäng: ${totalScore}`;
  roundScoreDisplay.textContent = `Omgångens Poäng: ${roundScore}`;
  roundNumberDisplay.textContent = `Omgång: ${roundCount}`;
  gameMessage.textContent = "";

  // Gömmer Spela Igen-knappen genom att lägga till .hidden-klassen
  playAgainButton.classList.add("hidden");


  
}

// Lägg till en klickhändelse på kasta tärning-knappen
rollButton.addEventListener("click", () => {
  console.log("Klick registrerat!"); // Loggar knapptryckningen
    if(!playerName){
      showPopup("Du måste skriva in ditt namn innan du kastar tärningen!"); //Popup-meddelande om inget namn finns
      return;
    }
    rollDice(); // Anropar funktionen att kasta tärningen när knappen klickas;
});

// Lägger till en klickhändelse på frys poäng-knappen
freezeButton.addEventListener("click", () => {
  console.log("Freeze-knapp klickad");//Loggar knapptryckningen
    if(!playerName){
      console.log("Inget namn angivet – visar popup"); //Loggar om att det saknas namn.
      showPopup("Du måste skriva in ditt namn innan du kan frysa poäng!") //Popup-meddelande om inget namn finns
      return;
    }
    freezePoints(); // Anropar funktionen när knappen klickas
});

// Lägger till en klickhändelse på spela igen-knappen
playAgainButton.addEventListener("click", () => {
  restartGame(); // Anropar funktionen för att starta om spelet
  // Visar form-sektionen igen
  form.classList.remove("hidden");
  nameDisplay.classList.add("hidden");

  //Tömmer  spelarens namn och namnvisningen på sidan när spelet startar om
  nameDisplay.innerHTML = "";
  playerName= "";


});
