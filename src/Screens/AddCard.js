import React, {useState, useEffect} from "react"
import {useHistory, useParams } from "react-router-dom"
import {readDeck, createCard} from "../utils/api/index"

function AddCard() {
    const {deckId} = useParams()
    const blankCard = {front: "", back: "" , deckId: deckId}
    const [newCard, setNewCard] = useState(blankCard)
    const [deck, setDeck]=useState({})
    const history = useHistory()

    useEffect(() => {
        async function loadDeck(){
            const abortController = new AbortController()
            try{
                const response = await readDeck(deckId, abortController.signal)
                setDeck(response)
            } catch (error){
                console.log(error)
            }
            return () => {
                abortController.abort()
            }
        }
        loadDeck()
    },[deckId])

    function changeHandler({target}){
        setNewCard({...newCard, [target.name]: target.value})
    }

    async function submitHandler (event) {
        event.preventDefault()
        const abortController = new AbortController()
        try{
            const response = await createCard(deckId, newCard, abortController.signal)
            history.go(0)
            setNewCard(blankCard)
            return response
        }catch (error){
            console.log(error)
        }
    }

    function doneHandler (event) {
        history.push(`/decks/${deckId}`)
    }

    return (
        <div>
            <nav aria-label="breadcrumb">
                <ol class="breadcrumb">
                    <li class="breadcrumb-item"><a href="/">Home</a></li>
                    <li class="breadcrumb-item"><a href={`/decks/${deckId}`}>{deck.name}</a></li>
                    <li class="breadcrumb-item active" aria-current="page">Add Card</li>
                </ol>
            </nav>
            <div>
                <h3>{deck.name}: Add Card</h3>
                <form onSubmit={submitHandler}>
                    <div className="my-2">
                        <label>Front</label>
                        <textarea onChange={changeHandler} name="front"className="form-control" placeholder="Front side of card"></textarea>
                    </div>
                    <div>
                        <label>Back</label>
                        <textarea onChange={changeHandler} name="back"className="form-control" placeholder="Back side of card"></textarea>
                    </div>
                    <div className="my-4">
                        <button onClick={doneHandler}className="btn btn-secondary">Done</button>
                        <button type="submit" className="btn btn-primary mx-2">Save</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddCard;