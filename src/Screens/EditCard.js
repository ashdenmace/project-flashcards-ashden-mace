import React, {useState, useEffect} from "react"
import {useHistory, useParams} from "react-router-dom"
import {readDeck, readCard, updateCard} from "../utils/api/index"


function EditCard() {
    const {deckId} = useParams()
    const {cardId} = useParams()
    const history = useHistory()
    const [deck, setDeck] = useState({})
    const [card, setCard] = useState({})

    useEffect(() => {
        async function loadDeck (){
            const abortController = new AbortController()
            try{
                const response = await readDeck(deckId, abortController.signal)
                setDeck(response)
            } catch(error){
                console.log(error)
            } return () => {
                abortController.abort()
            }
        }
        loadDeck()
    }, [deckId])

    useEffect(() => {
        async function loadCard (){
            const abortController = new AbortController()
            try{
                const response = await readCard(cardId, abortController.signal)
                setCard(response)
            } catch(error){
                console.log(error)
            } return () => {
                abortController.abort()
            }
        }
        loadCard()
    }, [cardId])

    function changeHandler ({target}){
        setCard({...card, [target.name]: target.value})
    }

    async function submitHandler (event){
        event.preventDefault()
        const abortController = new AbortController()
        try{
            const response = await updateCard(card, abortController.signal)
            history.push(`/decks/${deckId}`)
            return response
        }catch (error){
            console.log(error)
        }
    }

    function cancelHandler () {
        history.push(`/decks/${deckId}`)
    }

    return (
        <div>
            <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
                <li class="breadcrumb-item"><a href="/">Home</a></li>
                <li class="breadcrumb-item"><a href={`/decks/${deckId}`}>{` Deck ${deck.name}`}</a></li>
                <li class="breadcrumb-item active" aria-current="page">{`Edit Card ${cardId}`}</li>
            </ol>
            </nav>
            <div>
                <h3>Edit Card</h3>
                <form onSubmit={submitHandler}>
                    <div className="my-2">
                        <label>Front</label>
                        <textarea onChange={changeHandler} name="front"className="form-control" value={card.front}></textarea>
                    </div>
                    <div>
                        <label>Back</label>
                        <textarea onChange={changeHandler} name="back"className="form-control" value={card.back}></textarea>
                    </div>
                    <div className="my-4">
                        <button onClick={cancelHandler}className="btn btn-secondary">Cancel</button>
                        <button type="submit" className="btn btn-primary mx-2">Submit</button>
                    </div>
                </form>
            </div>
            
        </div>
    )
}

export default EditCard;