/** @module settings profile */
import React from 'react';
import PersonalInfo from './settings/personalInfo';
import Directions from './settings/directions';
import Facturation from './settings/facturation';
import ChangePassword from './settings/changePassword';
import Subscripcion from './settings/subscripcion';
import { Card } from 'semantic-ui-react';

class Settings extends React.Component{
  render(){
    return (
      <Card.Group itemsPerRow={3}>
        <PersonalInfo />
        <Directions />
        <Facturation />
        <ChangePassword />
        <Subscripcion />
      </Card.Group>
    )
  }
}
export default Settings;
