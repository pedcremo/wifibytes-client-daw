/** @module ComponentsApp */
import React from 'react';
import Articles from './articles';
import Families from '../catalog/families';
import Filters from './filters';
import { connect } from 'react-redux';
import { getDatosArticulos } from '../../actions/datosArticulosActions';

const mapDispatchToProps = (dispatch) => ({
  getDatos: () => { dispatch(getDatosArticulos()); },
});

/**
 * @class
 * Draw article catalog that could be filtered by article family
 */
class Catalog extends React.Component {
  
  componentDidMount(){
    this.props.getDatos();
  }

  /** render  */
  render() {
    const {error, loading, datosArticulos} = this.props;

    if (error) {
      return (<div>Error! {error.message}</div>);
    }

    if (loading) {
      return (<div>Loading...</div>);
    }
    if (datosArticulos && datosArticulos.length > 0) {
      return (
        <span className="catalog">
          <Families familia={datosArticulos[0].results} />
          <Filters filters={datosArticulos[1]} />
          <Articles
            articles={ 
              this.props.datosFilter.length > 0 ?
              this.props.datosArticulos[2].results.filter(el => el.codfamilia == this.props.datosFilter) :
                datosArticulos[2].results
            }/>
        </span>
      );
    } else {
      return ('');
    }
  }
}

const mapStateToProps = (state) => ({
  datosArticulos: state.datosArticulos.items,
  loading: state.datosArticulos.loading,
  error: state.datosArticulos.error,
  datosFilter: state.datosArticulos.filter,
});

export default connect(mapStateToProps, mapDispatchToProps)(Catalog);
