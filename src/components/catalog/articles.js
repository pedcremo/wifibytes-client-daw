import React from 'react';
import AddButton from '../cart/AddButton';
import {PropTypes} from 'prop-types';
/**
 * @desc Component Articles paint articles
 */
class Articles extends React.Component {
  /**
   * @desc Render paints articles
   * @return {DOMElement}
   */
  render() {
    return (
      <div className="card-columns m-5">
        {this.props.articles.map((itemArticle) => (
          <div className="card text-center" key={itemArticle.referencia}
            style={{backgroundColor: `rgba(255, 255, 255, 0.8)`}}>
            <img className="card-img-top" src={itemArticle.imagen}/>
            <div className="card-body">
              <p className="card-text">{itemArticle.descripcion_breve}</p>
              <p className="card-text">
                <span className="display-4">
                  {itemArticle.pvp}€
                </span> IVA Incl.</p>
            </div>
            <div className="card-footer bg-light">
              <a href="#" className="btn btn-primary">View details</a>
              <AddButton
                item={
                  {
                    id: itemArticle.referencia,
                    price: itemArticle.pvp,
                    description: itemArticle.descripcion_breve,
                    imagen: itemArticle.imagen}}
                text={this.context.t('buy')}/>
            </div>
          </div>
        ))}
      </div>
    );
  }
}
Articles.contextTypes = {
  t: PropTypes.func.isRequired,
};

export default Articles;
