
/** @module ComponentsApp */
import React from 'react';
import {Utils} from '../../utils';
import {PropTypes} from 'prop-types';

/**
 * @class
 * Draw families on catalog
 */
class Families extends React.Component {
  /** render */
  render() {
    for (const prop in this.props.familia) {
      if (Array.isArray(this.props.familia[prop])) {
        var currentFamily = <div className="families pt-4 pb-4 pr-0 pl-0 m-0 text-white" style={{background: this.props.familia[prop][0].color.hexadecimal}}>
          <img className="float-left" src={this.props.familia[prop][0].imagen_cabecera} />
          <h3>{this.props.familia[prop][0].pretitulo}</h3>
          <h1 className="display-1">{this.props.familia[prop][0].titulo}</h1><br /><br />
          <h3 dangerouslySetInnerHTML={{__html: this.props.familia[prop][0].texto_cabecera}} className="families-text"></h3>
          <h1 className="display-3">{this.props.familia[prop][0].precio_cabecera} € IVA Inc.</h1>
          <h3 dangerouslySetInnerHTML={{__html: this.props.familia[prop][0].subtexto_cabecera}}></h3>
        </div>;
        var families = this.props.familia[prop].map((itemFamily, index) => {
          return <li className="nav-item" key={itemFamily.codfamilia}>
            <a id="change-family" className='nav-link {index==0?"active":""}' data-toggle="pill" href={'#catalog/' + itemFamily.codfamilia}><img width="32px" height="32px" src={itemFamily.icono} />{itemFamily.nombre}</a>
          </li>;
        });
      }
    }
    return (
      <span>
        {currentFamily}
        <div className="grid row">
          <div className="col">
            <h1 className="text-center">{this.context.t('catalog-our-articles')}</h1>
            <h2 className="text-center">{this.context.t('catalog-change-family')}</h2>
          </div>
        </div>
        <ul className="nav-families nav nav-pills mb-3" id="pills-tab" role="tablist">
          {families}
        </ul>
      </span>
    );
  }
}

Families.contextTypes = {
  t: PropTypes.func.isRequired,
};

export default Families;
