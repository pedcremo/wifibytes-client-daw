/** @module ComponentsApp */
import React from 'react';
import {PropTypes} from 'prop-types'

/**
 * @class
 * Draw Login. A form to login
 */
class UserChoice extends React.Component  {
    /**
     * @constructor
     */
    constructor(props) {
        super(props);
    }
    componentDidMount(){
    }
    render() {
        return(
            <div>
               <div>
                   <h2>{this.context.t('personalData-notifyModal-title')}</h2>
                   <div className="selectionButtons">
                        <button onClick={()=>this.props.choice("login")}>{this.context.t('personalData-notifyModal-choiceLogin')}</button>
                        <button onClick={()=>this.props.choice("none")}>{this.context.t('personalData-notifyModal-choiceNone')}</button>
                        <button onClick={()=>this.props.choice("register")}>{this.context.t('personalData-notifyModal-choiceRegister')}</button>
                    </div>
                </div>
            </div>
        )
    }
}

UserChoice.contextTypes = {
    t: PropTypes.func.isRequired
}

export default UserChoice;
