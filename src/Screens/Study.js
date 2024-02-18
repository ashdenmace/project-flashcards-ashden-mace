import React, {useState, useEffect} from "react"
import {Link, useHistory, useParams} from "react-router-dom"
import {readDeck} from "../utils/api/index"


function Study() {
    const {deckId} = useParams();
    const [deck, setDeck] = useState({})
    const [cards, setCards] = useState([])
    const [isFlipped, setIsFlipped] = useState(false)
    const [currentCard, setCurrentCard] = useState(1)
    const history = useHistory();

    useEffect(() => {
        async function loadDeck(){
            const abortController = new AbortController();
            try{
                const response = await readDeck(deckId, abortController.signal)
                setDeck(response)
                setCards(response.cards)
                
    
            }catch (error){
                console.log(error)
            }
            return () => {
                abortController.abort()
            }
        }
       loadDeck()
    }, [deckId])

    function handleFlip() {
        setIsFlipped(!isFlipped)
    }

    function NotEnoughCards() {
        return (
            <div>
                <h2>Not enough cards</h2>
                <p>You need atleast 3 cards to study. There are {cards.length} cards in this deck.</p>
                <Link to={`/decks/${deck.id}/cards/new`}><button className="btn btn-primary">Add Cards</button></Link>
            </div>
        )
    }

    function NextCard () {

        const nextHandler = () => {
            setCurrentCard(currentCard + 1)
            setIsFlipped(false)
            if (currentCard === cards.length){
                const restart = window.confirm(`
                Restart Cards?
                Click cancel to return to the homepage`)
                if(restart){
                    setCurrentCard(1)
                    setIsFlipped(false)
                }else{
                    history.push("/")
                }
            } 
        }
        return (
            <div>
                <button className="btn btn-primary" onClick={nextHandler}>Next</button>
            </div>
        )
    }

    function CardView () {
        return (
            <div>
            {cards.map((card, index) => {
                if (index === currentCard - 1)
                return (<div className="card">
                            <div className="card-body">
                            <h5 className="card-title">Card {currentCard} of {cards.length}</h5>
                                {!isFlipped ? card.front : card.back}
                                <div className="d-flex my-2">
                                    <button className="btn btn-secondary mx-1"onClick={handleFlip}>Flip</button>
                                    {isFlipped ? <NextCard/> : null}
                                </div>
                            </div>
                        </div>
                        )
            })
            
            }
        </div>
    )
    }

    return (
        <div>
            <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
                <li class="breadcrumb-item"><a href="/">Home</a></li>
                <li class="breadcrumb-item"><a href={`/decks/${deck.id}`}>{`${deck.name}`}</a></li>
                <li class="breadcrumb-item active" aria-current="page">Study</li>
            </ol>
            </nav>

            <h1>{deck.name}: Study</h1>
            <div>
                {cards.length >= 3 ? <CardView/> : <NotEnoughCards/>}
            </div>  
        </div>
    )
}

export default Study