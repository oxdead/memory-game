document.addEventListener('DOMContentLoaded', () => {

  // json file of unique items ?
  const cardsOrigin = [
      {
          name: 'cards',
          img: 'src/images/fries.png'
      },
      {
          name: 'cheeseburger',
          img: 'src/images/cheeseburger.png'
      },
      {
          name: 'ice-cream',
          img: 'src/images/ice-cream.png'
      },
      {
          name: 'pizza',
          img: 'src/images/pizza.png'
      },
      {
          name: 'milkshake',
          img: 'src/images/milkshake.png'
      },
      {
          name: 'hotdog',
          img: 'src/images/hotdog.png'
      },
  ]


  const resultDisplay = document.querySelector('#result');
  const grid = document.querySelector('.grid');
  let cardsArray = []; // working array with doubled images
  let cardsChosen = []; // selected cards go here
  let cardsWon = []; // already guessed cards go here
  let triesCount = 0; // how many steps it took to beat the game
  let tempTimerHandle; // nevermind

  function checkForMatch() {

      const cards = document.querySelectorAll('img');
      const status = document.querySelector('#status');
      const oneId = cardsChosen[0].id;
      const twoId = cardsChosen[1].id;

      if(oneId === twoId)
      {
          status.style.color = '#EE2021';
          status.textContent = 'You have picked the same image!';
          cards[oneId].setAttribute('src', 'src/images/blank.png');
          cards[twoId].setAttribute('src', 'src/images/blank.png');
      }
      else if(cardsChosen[0].name === cardsChosen[1].name)
      {
          status.style.color = '#30BB00';
          status.textContent = 'You have found a match!';
          cards[oneId].setAttribute('src', 'src/images/white.png');
          cards[twoId].setAttribute('src', 'src/images/white.png');
          cards[oneId].removeEventListener('click', flipCard);
          cards[twoId].removeEventListener('click', flipCard);
          cardsWon.push(cardsChosen[0], cardsChosen[1]);
      }
      else
      {
          status.style.color = '#999900';
          status.textContent = 'Nope, try again!';
          cards[oneId].setAttribute('src', 'src/images/blank.png');
          cards[twoId].setAttribute('src', 'src/images/blank.png');
      }

      
      document.querySelector('#tries').textContent = ++triesCount; // updatete number of tries

      cardsChosen = []; // clear selected cards

      resultDisplay.textContent = `${cardsWon.length}/${cardsArray.length}`;
      
      if(tempTimerHandle) { clearTimeout(tempTimerHandle); } // clear previous handle to update timer properly
      if(cardsWon.length >= cardsArray.length) 
      {
          status.style.color = '#30BB00';
          status.textContent = 'Congratulations! You have won!';
      }
      else
      {
          tempTimerHandle = setTimeout(() => { status.textContent = ''; }, 2000); // clear info
      }

  }

  function flipCard() {
      let cardId = this.getAttribute('data-id');
      cardsChosen.push({name: cardsArray[cardId].name, id: cardId });
      this.setAttribute('src', cardsArray[cardId].img);
      if (cardsChosen.length === 2)
      {
          setTimeout(checkForMatch, 150);
      }
  }

  function createBoard() {
      for(let card of cardsOrigin) { cardsArray.push(card); } // fill array
      for(let card of cardsOrigin) { cardsArray.push(card); } // fill array again with the same cards

      cardsArray.sort(() => 0.5 - Math.random()); // shuffle an order of cards

      for (let i = 0; i < cardsArray.length; i++) {
          const card = document.createElement('img');
          card.setAttribute('src', 'src/images/blank.png');
          card.setAttribute('data-id', i);
          card.addEventListener('click', flipCard);
          grid.appendChild(card);
      }

      resultDisplay.textContent = `${cardsWon.length}/${cardsArray.length}`; // start guessed cards count
  }

  createBoard();

})