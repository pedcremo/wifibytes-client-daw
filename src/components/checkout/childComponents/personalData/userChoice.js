/** @module ComponentsApp */
import React from 'react';
import {Utils} from '../../../../utils';

/**
 * @class
 * Draw Login. A form to login
 */
class UserChoice extends React.Component {
  /**
     * @constructor
     */
  constructor(props) {
    super(props);
  }
  componentDidMount() {
  }
  render() {
    return (
      <div>
        <div>
          <h2>{Utils.translate('personalData-notifyModal-title')}</h2>
          <div className="selectionButtons">
            <button onClick={()=>this.props.choice('login')}>{Utils.translate('personalData-notifyModal-choiceLogin')}</button>
            <button onClick={()=>this.props.choice('none')}>{Utils.translate('personalData-notifyModal-choiceNone')}</button>
            <button onClick={()=>this.props.choice('register')}>{Utils.translate('personalData-notifyModal-choiceRegister')}</button>
          </div>
        </div>
      </div>
    );
  }
}
export default UserChoice;
