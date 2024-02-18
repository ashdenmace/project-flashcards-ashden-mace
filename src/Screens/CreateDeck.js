import React, {useState} from "react"
import {useHistory} from "react-router-dom"
import {createDeck} from "../utils/api/index"

function CreateDeck() {
    const history = useHistory()
    const blankState = { name: "" , description: ""}
    const [newDeck, setNewDeck] = useState(blankState)

    function changeHandler ({target}) {
        setNewDeck({...newDeck, [target.name]: target.value })

    }
    function cancelHandler () {
        history.push("/")
    }
    async function submitHandler (event){
        const abortController = new AbortController()
        try{
            event.preventDefault()
            const response = await createDeck({...newDeck}, abortController.signal)
            history.push("/")
        }catch(error){
            console.log(error)
        }
        return () => {
            abortController.abort()
        }

    }
    return (
        <div>
            <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
                <li class="breadcrumb-item"><a href="/">Home</a></li>
                <li class="breadcrumb-item active" aria-current="page">Create Deck</li>
            </ol>
            </nav>
            <div>
                <h2>Create Deck</h2>
                <form onSubmit={submitHandler}>
                    <label className="form-label">Name</label>
                    <input onChange={changeHandler} name="name" type="text" id="name" className="form-control my-1" placeholder="Deck Name"></input>
                    <label className="form-label my-2">Description</label>
                    <textarea onChange={changeHandler} name="description" type="text" id="description" className="form-control" placeholder="Brief Description of the deck"></textarea>
                    <div>
                        <button onClick={cancelHandler} className="btn btn-secondary">Cancel</button>
                        <button type="submit" className="btn btn-primary mx-2 my-3">Submit</button>
                    </div>
                   
                </form>

                
            </div>
        </div>
    )
}

export default CreateDeck