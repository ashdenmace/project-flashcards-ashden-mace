import React, {useState, useEffect} from "react"
import {useHistory, useParams } from "react-router-dom"
import {readDeck, createCard} from "../utils/api/index"
import CardForm from "./CardForm"

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
            </div>
            <div>
                <CardForm submitHandler={submitHandler} card={newCard} changeHandler={changeHandler}/>
            </div>
        </div>
    )
}

export default AddCard;