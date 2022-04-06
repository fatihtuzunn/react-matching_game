import { useContext, useEffect, useState } from 'react';
import './App.css';
import SingleCard from "./components/SingleCard.js";

const cardImages=[
  {"src": "/img/helmet-1.png", matched: false},
  {"src": "/img/potion-1.png", matched: false},
  {"src": "/img/ring-1.png", matched: false},
  {"src": "/img/scroll-1.png", matched: false},
  {"src": "/img/shield-1.png", matched: false},
  {"src": "/img/sword-1.png", matched: false}
];


function App() {

  const [cards, setCards] = useState([])
  const [turns, setTurns] = useState(0)
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);

  const shuffleCards = () => {
    // dublicate images
    const shuffledCards=[...cardImages,...cardImages]
    .sort(()=> Math.random()-0.5)
    .map((card)=>({...card, id: Math.random()}))
    
    setCards(shuffledCards)
    setTurns(0)
  }

  //secimi yakaladık
  const handleChoice = (card)=>{
    console.log(card.src)
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
  }

  //secilen iki itemin es olup olmadigini denetle
  useEffect(()=>{
    if (choiceOne && choiceTwo) {
      if (choiceOne.src === choiceTwo.src) {
        console.log("eslesti");
        resetTurn();
      }else{
        console.log("eslesmedi");
        resetTurn();
      }
    }
  }, [choiceOne, choiceTwo])

  //secilenleri yenile deneme sayisini arttir
  const resetTurn = ()=>{
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns(prevTurns => prevTurns+1)
  }

  return (
    <div className="App">
      <h1>Match GAmE  </h1>
      <button onClick={shuffleCards}>New Game</button>


      <div className="card-grid">
        {cards.map(card=>(
         
          <SingleCard 
          key={card.id} 
          card={card}
          handleChoice={handleChoice}
           />
        ))}
      </div>
    </div>
  );
}

export default App;
