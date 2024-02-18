import React from "react";
import Header from "./Header";
import NotFound from "./NotFound";
import Home from "../Screens/Home"
import CreateDeck from "../Screens/CreateDeck"
import Study from "../Screens/Study"
import Deck from "../Screens/Deck"
import EditDeck from "../Screens/EditDeck"
import AddCard from "../Screens/AddCard"
import EditCard from "../Screens/EditCard"
import {Switch, Route} from "react-router-dom"

function Layout() {
  return (
    <>
      <Header />
      <div className="container">
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/decks/new">
            <CreateDeck/>
          </Route>
          <Route path="/decks/:deckId/study">
            <Study />
          </Route>
          <Route path="/decks/:deckId/edit">
            <EditDeck/>
          </Route>
          <Route path="/decks/:deckId/cards/:cardId/edit">
            <EditCard/>
          </Route>
          <Route path="/decks/:deckId/cards/new">
            <AddCard/>
          </Route>
          <Route path="/decks/:deckId">
            <Deck />
          </Route>
          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </div>
    </>
  );
}

export default Layout;
