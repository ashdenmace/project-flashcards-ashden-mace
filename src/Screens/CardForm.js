import React from "react"
import {useHistory, useParams, useRouteMatch } from "react-router-dom"

function CardForm ({submitHandler, card, changeHandler }) {
    const history = useHistory()
    const {deckId} = useParams()
    const {url} = useRouteMatch()

    
    function cancelHandler () {
        history.push(`/decks/${deckId}`)
    }
    
    return (
        <form onSubmit={submitHandler}>
            <div className="my-2">
                <label>Front</label>
                <textarea onChange={changeHandler} name="front" className="form-control" placeholder="Front side of card"value={card.front}></textarea>
            </div>
            <div>
                <label>Back</label>
                <textarea onChange={changeHandler} name="back" className="form-control" placeholder="Back side of card"value={card.back}></textarea>
                <div className="my-4">
                    <button onClick={cancelHandler}className="btn btn-secondary">{url.includes("new") ? "Done" : "Cancel" }</button>
                    <button type="submit" className="btn btn-primary mx-2">{url.includes("new") ? "Save" : "Submit"}</button>
                </div>
            </div>    
        </form>
    )
}

export default CardForm