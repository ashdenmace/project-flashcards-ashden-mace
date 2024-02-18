import React, {useState, useEffect} from "react"
import {useParams, useHistory} from "react-router-dom"
import {readDeck, updateDeck} from "../utils/api/index"

function EditDeck () {
    const blankDeck = {
        id: "",
        name: "",
        description: ""
    }

    const {deckId} = useParams()
    const [deck, setDeck] = useState(blankDeck)
    const history = useHistory()

    function submitHandler(event) {
        event.preventDefault()
        const abortController = new AbortController()
        async function update () {
            try{
                const response = updateDeck(deck, abortController.signal )
                history.push(`/decks/${deckId}`)
                return response
            } catch (error){
                console.log(error)
            }
            return () => {
                abortController.abort()
            }
        }
        update()
       
    }

    function changeHandler ({target}) {
        setDeck({...deck, [target.name]: target.value})
    }
    
    
    useEffect(() => {
        const abortController = new AbortController()
        async function loadDeck (){
            try{
                const response = await readDeck(deckId, abortController.signal)
                setDeck(response)
               
            }catch (error){
                console.log(error)
            }
            return () => {
                abortController.abort()
            }
            
        }
        loadDeck()
    }, [deckId])

    function cancelHandler() {
        history.push("/")
    }


    return (
        <div>
            <nav aria-label="breadcrumb">
                <ol class="breadcrumb">
                    <li class="breadcrumb-item"><a href="/">Home</a></li>
                    <li class="breadcrumb-item"><a href={`/decks/${deck.id}`}>{`${deck.name}`}</a></li>
                    <li class="breadcrumb-item active" aria-current="page">Edit</li>
                </ol>
            </nav>
            <div>
                <h1>Edit Deck</h1>
               
                <form onSubmit={submitHandler}>
                    <label className="form-label">Name</label>
                    <input className="form-control" onChange={changeHandler}type="text" id="name" name="name" value={deck.name} ></input>
                    <label className="form-label">Description</label>
                    <textarea className="form-control" onChange={changeHandler} id="description" name="description" value={deck.description}></textarea>
                    <div>
                        <button onClick={cancelHandler} className="btn btn-secondary">Cancel</button>
                        <button type="submit" className="btn btn-primary mx-2 my-3">Submit</button>
                    </div>
                </form>

            </div>
        </div>
       
    )
}

export default EditDeck