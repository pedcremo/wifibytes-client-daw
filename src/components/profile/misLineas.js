/** @module ComponentsApp */
import React from 'react';
import { connect } from 'react-redux';
import { GET_LINEAS } from '../../constants/actionTypes';
import { Utils } from '../../utils';
import { Button, Header, Image, Modal } from 'semantic-ui-react';

/**
 * @class
 * Draw Login. A form to login
 */

const mapDispatchToProps = (dispatch) => ({
	onLoad: (id) => {
		dispatch({
			type: GET_LINEAS,
			payload: Utils.get(`/mobilscli/?userId=${id}`)
		});
	}
});
const mapStateToProps = (state) => ({
	...state.isAuth,
	...state.profile
});

class MisLineas extends React.Component {
	constructor(props) {
		super(props);
		this.props.onLoad(this.props.user.id_consumer);
	}
	render() {
		const { loading, lineas, lineasCount } = this.props;
		if (loading || !lineas) return <img className="loading" src="/styles/image/loading.svg" />;
		console.log(lineas);
		return (
			<main className="MisLineas">
				<h1>Mis Lineas</h1>
				<select>
					{lineas.map((linea) => {
						return (
							<option key={linea.id_mobilsclients}>
								{linea.mobil != '' ? linea.mobil : 'no tienes mobil'}
							</option>
						);
					})}
				</select>
			</main>
		);
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(MisLineas);
