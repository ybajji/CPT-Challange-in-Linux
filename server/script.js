var divs = document.querySelectorAll('.par');
var condition = document.querySelectorAll('.exercice')

const webtopIframe = document.getElementById("webtop-iframe");
const divFinale = document.getElementById("final");


const joinSessionForm = document.getElementById("join-session-form");
const portInput = document.getElementById("port-input");



// get next and previous the buttons
var nextButton = document.getElementById('next');
var backButton = document.getElementById('back');

// next button click event
nextButton.addEventListener('click', function () {
  var currentDiv = document.querySelector('.par.show');
  var nextDiv = currentDiv.nextElementSibling;
  
  if (nextDiv) {
    var condition = currentDiv.querySelectorAll('.exercise');
    var exerciseElement = condition[0];

    if (exerciseElement) {
      var expectedValue = 'perfekt!'; // Ändere dies auf den erwarteten Wert
      var inputValue = document.getElementById('question1').value;

      if (inputValue == expectedValue) {
        currentDiv.classList.remove('show');
        nextDiv.classList.remove('hidden');
        currentDiv.classList.add('hidden');
        nextDiv.classList.add('show');
      } else {
        alert('Falsche Antwort');
        return; // Stoppe die Ausführung, um das nächste div nicht anzuzeigen
      }
    }
    if(currentDiv==divFinale){
      alert("the the lesson is over")
    }
      else {
      currentDiv.classList.remove('show');
      nextDiv.classList.remove('hidden');
      currentDiv.classList.add('hidden');
      nextDiv.classList.add('show');
    }
  }
});


// previous button click event
backButton.addEventListener('click', function () {
  // go to the previous ".par" element
  var currentDiv = document.querySelector('.par.show');
  var prevDiv = currentDiv.previousElementSibling;
  var firstPar= document.getElementById("par1");
  if(firstPar==currentDiv){
    alert("you can't back ")
  }
  else if(prevDiv) {
    prevDiv.classList.remove('hidden');
    currentDiv.classList.add('hidden');
    currentDiv.classList.remove('show');
    prevDiv.classList.add('show');
  }
});


joinSessionForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const portNumber = portInput.value;

  // Set the port number as a cookie
  document.cookie = `portNum=${portNumber}`;

  webtopIframe.src = `http://localhost:${portNumber}`;
});

// Retrieve the port number from the cookie when the page is loaded
const portNumCookie = document.cookie
  .split(';')
  .find(cookie => cookie.trim().startsWith('portNum='));

if (portNumCookie) {
  const portNumber = portNumCookie.split('=')[1];
  webtopIframe.src = `http://localhost:${portNumber}`;
}


