import { useEffect, useState } from 'react';
import './App.css';
import SingleCard from "./components/SingleCard.js";

const cardImages=[
  {"src": "/img/hera.png", matched: false},
  {"src": "/img/anubis.png", matched: false},
  {"src": "/img/gargoyle.png", matched: false},
  {"src": "/img/horus.png", matched: false},
  {"src": "/img/pegasus.png", matched: false},
  {"src": "/img/poseidon.png", matched: false}
];


function App() {

  const [cards, setCards] = useState([])
  const [turns, setTurns] = useState(0)
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);

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
    //console.log(card.src)
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
    
  }

  //secilen iki itemin es olup olmadigini denetle
  useEffect(()=>{
    
    if (choiceOne && choiceTwo) {
      setDisabled(true)
      if (choiceOne.src === choiceTwo.src) {
        //console.log("eslesti");
        setCards(prevCards => {
          return prevCards.map(card => {
            if (card.src === choiceOne.src) {
              return {...card, matched: true}
            }else{
              return card
            }
          })
        })
        resetTurn();
      }else{
        //console.log("eslesmedi");
        setTimeout(() => resetTurn(), 600); 
      }
    }
  }, [choiceOne, choiceTwo, resetTurn])

  //secilenleri yenile deneme sayisini arttir
  const resetTurn = ()=>{
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns(prevTurns => prevTurns+1)
    setDisabled(false)
    if(turns===10){
      shuffleCards()
      alert("Kaybettin!")
    }
 
  }

  //game starts auto
  useEffect(() => {
    shuffleCards()
    
  }, []);
  
  


  return (
    <div className="App">
      <p>10 el hakkınız var. <br />Deneme: {turns}</p>
      


      <div className="card-grid">
        {cards.map(card=>(
         
          <SingleCard 
          key={card.id} 
          card={card}
          handleChoice={handleChoice}
          flipped={card === choiceOne || card === choiceTwo || card.matched}
          disabled={disabled}

           />
        ))}
      </div>
      <button onClick={shuffleCards}>RESTART</button>
    </div>
  );
}

export default App;
