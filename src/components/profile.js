/** @module ComponentsApp */
import React from 'react';
import {connect} from 'react-redux';
import IsAuth from './isAuth'
import {Utils} from '../utils'
import  { Redirect } from 'react-router-dom'

import {
    LOGOUT
}from '../constants/actionTypes'

/**
 * @class
 * Draw Login. A form to login
 */

 const logout = () => {
    Utils.deleteCookie('jwt')
 }

const mapDispatchToProps = dispatch =>({
    logout : () => 
        dispatch({type : LOGOUT , payload : logout()})
})
const mapStateToProps = state => ({
    ...state.isAuth
});

class Profile extends React.Component  {
    render() {
        const { isAuth , user , logout} = this.props
        if(!isAuth)
            return <Redirect to='/'  />
        return (
                <div className="loginForm">
                    <IsAuth />
                        <div display={user ? 'none' : 'block'}>
                            <h1>{user.cifnif}</h1>
                            <h1>{user.email}</h1>
                            <h1>{user.id_consumer}</h1>
                            <button onClick={logout}>Logout</button>
                        </div>
                </div>
        );
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Profile);