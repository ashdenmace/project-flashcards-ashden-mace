import React, {useState, useEffect} from "react";
import {Link, useParams, useHistory, useRouteMatch} from "react-router-dom"
import {readDeck, deleteDeck, deleteCard} from "../utils/api/index"


function Deck () {
    const [deck, setDeck] = useState({})
    const [cards, setCards] = useState([])
    const history = useHistory()
    const {deckId} = useParams()
    const {url} = useRouteMatch()

    useEffect(() => {
        async function fetchData() {
            const abortController = new AbortController()
            try{
                const response = await readDeck(deckId, abortController.signal)
                setDeck(response)
                setCards(response.cards)
            } catch (error) {
                console.log(error)
            }
            return () => {
                abortController.abort()
            }
        }
        fetchData()
        
    }, [deckId])

    async function deleteHandlerDeck(deck) {
        const abortController = new AbortController()
        if( window.confirm("Delete this deck? You will not be able to recover from it")){
            try{
                history.push("/")
                return await deleteDeck(deckId, abortController.signal)
            } catch (error) {
                console.log(error)
            }
            return () => {
                abortController.abort();
            }
        }
       
    }

    async function deleteHandlerCard(card) {
        if (
            window.confirm(
                `Delete this card? You will not be able to recover it`
            )
        ) {
            const abortController = new AbortController();
            try {
                const response = await deleteCard(card.id, abortController.signal)
                history.go(0);
                return response
            } catch (error) {
                console.error("Something went wrong", error);
            }
            return () => {
                abortController.abort();
            };
        }
    }

    return (
        <div className="container">
            <nav aria-label="breadcrumb">
                <ol class="breadcrumb">
                    <li class="breadcrumb-item"><a href="/">Home</a></li>
                    <li class="breadcrumb-item active" aria-current="page">{deck.name}</li>
                </ol>
          </nav>

          <div>
            <h3>{deck.name}</h3>
            <div>{deck.description}</div>
            <div className="my-2">
                <Link to={`${url}/edit`}><button className="btn btn-secondary">Edit</button></Link>
                <Link to={`${url}/study`}><button className="btn btn-primary mx-1">Study</button></Link>
                <Link to={`${url}/cards/new`}><button className="btn btn-primary">Add Cards</button></Link>
                <button onClick={deleteHandlerDeck} className="btn btn-danger float-right">Delete</button>
            </div>
            <div className="my-4">
                <h3>Cards</h3>
                    {
                        cards.map((card) => (
                            <div className="card" key={card.id}>
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col">{card.front}</div>
                                        <div className="col">
                                            {card.back}
                                            <div className="float-right my-2">
                                                <Link to={`${url}/cards/${card.id}/edit`}><button className="btn btn-secondary">Edit</button></Link>
                                                <button onClick={() => deleteHandlerCard(card)}className="btn btn-danger mx-2">Delete</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
            </div>
          </div>

        </div>
    )
}

export default Deck;