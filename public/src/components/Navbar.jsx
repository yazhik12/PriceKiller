import React, { Component, PropTypes} from 'react';
import { connect } from 'react-redux';
import { setUserState, userLogout } from '../actions/main_a.jsx';
import { setFavorites } from '../actions/favorites_a';
import Login from './Login.jsx';
import Signup from './Signup.jsx';
import Logout from './Logout.jsx';
import Search from './Search.jsx';
import Favorites from './Favorites';
import Notifications from './Notifications.jsx';
import Sidebar from './Sidebar.jsx';
import Preferences from './Preferences.jsx';
import Auth0 from "auth0-lock";
import Auth from "../../../Auth/Auth.js";
import axios from 'axios';
import Redirect from 'react-router-dom';
const Lock = require('../../../Auth/Auth.js').lock;

import { Route, Link } from 'react-router-dom';
const auth = new Auth;

const mapStateToProps = (state) => {
  return {
    userState: state.userState,
    favorites: state.favorites.favorites,
    auth: auth
  };
}

const mapDispatchToProps = (dispatch) => {
  return {
    setUserState: (user) => {
      dispatch(setUserState(user))
    },
    userLogout: () => {
      dispatch(userLogout())
    },
    setFavorites: (favorites) => {
      dispatch(setFavorites(favorites))
    }
  }
}

class Navbar extends Component {

  componentWillMount() {
    setTimeout(function(){
      if (auth.isAuthenticated()) {

        let localProfile = JSON.parse(localStorage.getItem('profile'));
      }
      if (!auth.isAuthenticated()) {
        console.log(Date.now())
        Lock.show();
      }
    }, 1000)
  }

  componentDidMount() {
    // debugger;
    let self = this;
    auth.handleAuthentication().then(({data}) => {
      // console.log('PLEASE ====>', data)
      self.props.setUserState(data); 
      self.props.setFavorites(data.favorites);
      // axios.get(`/api/auth/signup/${JSON.parse(localStorage.getItem('profile')).email}`)
      //   .then((res) => {
      //     console.log(res.body);
      // })
    })

    Lock.on('authorization_error', function(error) {
      console.log('authorization_error', error);
    });
  }

  activateModal(e) {
    e.preventDefault();
    $('.modal').addClass('is-active')
  }

  activateMenu(e) {
    $('.navbar-menu').toggleClass('is-active')
  }


  render() {
    // let self = this;
    let profilePhoto = localStorage.profile ? <img className="image is-128x128" src={JSON.parse(localStorage.profile).picture} /> : null;
    return(
      <div>
        <div>
        <nav className="navbar is-transparent">
          <div className="navbar-brand">
            <a className="navbar-item" href="pricekiller.herokuapp.com">
              <img src="https://s3-us-west-1.amazonaws.com/hackreactor27/pricekiller_logov1.png" alt="Pricekiller, kill your prices" width="112" height="28"/>
            </a>
            <button
              className="button navbar-burger"
              data-target="navbarExampleTransparentExample"
              onClick={(e) => {this.activateMenu(e)}}
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>

          <div id="navbarExampleTransparentExample" className="navbar-menu">
            <div className="navbar-start">
              <div>
              <a className="navbar-item" href="/">
                Home
              </a>
              <div className="navbar-item has-dropdown is-hoverable">
                <Link
                  className="navbar-link"
                  to="/"
                  onClick={(e) => {this.activateMenu(e)}}
                >
                  Navigation
                </Link>
                <div className="navbar-dropdown is-boxed">
                  <Link
                    className="navbar-item"
                    to="/search"
                    onClick={(e) => {this.activateMenu(e)}}
                  >
                    Search
                  </Link>
                  <Link
                    className="navbar-item"
                    to="/favorites"
                    onClick={(e) => {this.activateMenu(e)}}
                  >
                    Favorites
                  </Link>
                  <Link
                    className="navbar-item"
                    to="/chart"
                    onClick={(e) => {this.activateMenu(e)}}
                  >
                    Chart
                  </Link>
                  <Link
                    className="navbar-item"
                    to="/"
                    onClick={(e) => {this.activateMenu(e)}}
                  >
                    Getting Started
                  </Link>
                  <Link
                    className="navbar-item"
                    to="/"
                    onClick={(e) => {this.activateMenu(e)}}
                  >
                    Who We Are
                  </Link>
                  <hr className="navbar-divider"/>
                  <a
                    className="navbar-item"
                    href=""
                    onClick={(e) => {this.activateModal(e)}}
                  >
                    Preferences
                  </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </nav>
        <hr/>
      </div>
      <Preferences />
      <Notifications/>
      <Sidebar
        sidebar={this.props}
      />
      <Preferences />
    </div>
    )
  }
}

Navbar = connect(mapStateToProps, mapDispatchToProps)(Navbar);

export default Navbar;
