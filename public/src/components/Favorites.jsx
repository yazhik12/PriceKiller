import React from 'react';
import FavoriteItem from './FavoriteItem.jsx';
import NewFavoriteItem from './NewFavoriteItem.jsx';
import { connect } from 'react-redux';
import { submitSearch, setResultsPage } from '../actions/main_a.jsx';
import { deleteFavorite, deleteNewFavorite, postNewFavorites } from '../actions/favorites_a.jsx';

const mapStateToProps = (state) => {
  let username;
  if (state.auth.user) {
    username = state.auth.user.username;
  }
  return {
    username,
    favorites: state.favorites.favorites,
    newFavorites: state.favorites.newFavorites,
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    removeFavorite: (favorite, username) => {
      dispatch(deleteFavorite(favorite, username));
    },

    removeNewFavorite: (index) => {
      dispatch(deleteNewFavorite(index));
    },

    saveNewFavorites: (favorites, newFavorites, username) => {
      dispatch(postNewFavorites(favorites, newFavorites, username));
    }
  }
}

let Favorites = (props) => {
  let favoritesList;
  let newFavoritesList;
  let favoritesTitle;
  if (props.favorites) {
    if (props.favorites.length === 0) {
      favoritesTitle = 'No Favorites';
    } else {
      favoritesTitle = 'Favorites: ';
    }
    favoritesList = (
      <div className="container">
        <h3>{favoritesTitle}</h3>
          {props.favorites.map((favorite, key) => {
            return (<FavoriteItem key={key} favorite={favorite} username={props.username} removeFavorite={props.removeFavorite} />)
          })}
      </div>
    );
  }
  if (props.newFavorites.length !== 0) {
    newFavoritesList = (
      <div>
        <h3>New Favorites:</h3>
          {props.newFavorites.map((favorite, key) => {
            return (<NewFavoriteItem favorite={favorite} key={key} removeNewFavorite={props.removeNewFavorite} />)

          })}
        <a
          id="saveNewFavorites"
          className="button is-success is-small is-one-fifth"
          onClick={() => props.saveNewFavorites(props.favorites, props.newFavorites, props.username)}
        >
          Store New Favorite(s)
        </a>
      </div>
    );
  }

  return(
    <div >
      {favoritesList}
      {newFavoritesList}
    </div>
  );
}

Favorites = connect(mapStateToProps, mapDispatchToProps)(Favorites);

export default Favorites;