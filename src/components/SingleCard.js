import "./SingleCard.css";

function SingleCard({ card, handleChoice, flipped, disabled }) {

  const handleClick = () => {
    if (!disabled) {
      handleChoice(card);
    }

  }

  return (
    <div className='card' key={card.id}>
      <div className={flipped ? "flipped" : ""}>
        <img className='front' src={card.src} alt="front" />
        <img
          className='back'
          src="/img/cover.png"
          alt="back"
          onClick={handleClick}

        />
      </div>

    </div>
  )
}

export default SingleCard