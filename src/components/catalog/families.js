
/** @module ComponentsApp */
import React from 'react';
import {PropTypes} from 'prop-types';
import {connect} from 'react-redux';
import {
  FILTER_FAMILY,
} from '../../actions/datosArticulosActions';

const mapDispatchToProps = (dispatch) => ({
  addFilter: (filter) => {
    dispatch({type: FILTER_FAMILY, payload: {filter}});
  },
});


class Families extends React.Component {
  
  componentWillMount(){
    this.filter = ev => { this.props.addFilter(ev) };
  }
  
  render() {
    return (
      <section>
        <div className="families pt-4 pb-4 pr-0 pl-0 m-0 text-white"
          style={{background: this.props.familia[0].color.hexadecimal}}>
          <img className="float-left" src={this.props.familia[0].imagen_cabecera} />
          <h3>{this.props.familia[0].pretitulo}</h3>
          <h1 className="display-1">{this.props.familia[0].titulo}</h1><br /><br />
          <h3 dangerouslySetInnerHTML={{__html: this.props.familia[0].texto_cabecera}} className="families-text"></h3>
          <h1 className="display-3">{this.props.familia[0].precio_cabecera} € IVA Inc.</h1>
          <h3 dangerouslySetInnerHTML={{__html: this.props.familia[0].subtexto_cabecera}}></h3>
        </div>
        <div className="grid row">
          <div className="col">
            <h1 className="text-center">{this.context.t('catalog-our-articles')}</h1>
            <h2 className="text-center">{this.context.t('catalog-change-family')}</h2>
          </div>
        </div>
        <ul className="nav-families nav nav-pills mb-3" id="pills-tab" role="tablist">
          {
            this.props.familia.map((itemFamily, index) => {
              return <li className="nav-item" key={itemFamily.codfamilia}>
                <a id="change-family" onClick={() =>this.filter(itemFamily.codfamilia)} className='nav-link {index==0?"active":""}' data-toggle="pill" href="#">
                  <img width="32px" height="32px" src={itemFamily.icono} />{itemFamily.nombre}
                </a>
              </li>;
            })
          }
        </ul>

      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  currentStep: state.currentCheckout.currentStep,
  steps: state.currentCheckout.steps,
  data: state.currentCheckout.data,
  loading: state.currentCheckout.loading,
  disabled: state.currentCheckout.disabled,
  items: state.cartReducer.items,
});

Families.contextTypes = {
  t: PropTypes.func.isRequired,
};

export default connect( mapStateToProps, mapDispatchToProps )(Families);
