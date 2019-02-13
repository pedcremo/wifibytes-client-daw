/** @module ComponentsApp */
import React from 'react';
import { connect } from 'react-redux';

/**
 * @class
 * Draw Login. A form to login
 */

const mapDispatchToProps = (dispatch) => ({});
const mapStateToProps = (state) => ({});

class InicioProfile extends React.Component {
	constructor(props) {
		super(props);
	}
	render() {
		return <main>InicioProfile</main>;
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(InicioProfile);
