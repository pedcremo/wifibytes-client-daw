import {connect} from 'react-redux';
import React from 'react';
import  { Redirect } from 'react-router-dom'

class IsAuth extends React.Component  {
    constructor(props){
        super(props)
        this.props.authed()
    }
    render() {
        const {isAuth} = this.props
        if(isAuth)
            return <Redirect to='/'  />
        return(
            <span></span>
        )
    }
}

const mapDispatchToProps = dispatch =>({
    authed: () => 
        dispatch({type:null,isAuth : true}),
})
const mapStateToProps = state => ({
    ...state.isAuth
});

export default connect(mapStateToProps,mapDispatchToProps)(IsAuth);
