import React from 'react';
import AddButton from '../cart/AddButton';
/**
 * Draw legal texts
 */
class Articles extends React.Component{

    /** render  */
    render() {
        return (
            <div className="card-columns m-5">
                {this.props.articles.map(itemArticle => (
                    <div className="card text-center" key={itemArticle.referencia} style={{backgroundColor: `rgba(255, 255, 255, 0.8)`}}>
                    <img className="card-img-top" src={itemArticle.imagen} />
                    <div className="card-body">
                        <p className="card-text">{itemArticle.descripcion_breve}</p>
                        <p className="card-text"><span className="display-4">{itemArticle.pvp}€</span> IVA Incl.</p>

                    </div>
                    <div className="card-footer bg-light"><a href="#" className="btn btn-primary">View details</a>
                    <AddButton id={itemArticle.referencia} price={itemArticle.pvp} description={itemArticle.descripcion_breve} text={"buy"}/>
                    </div>
                </div>
                ))}
            </div>
        )
    }
}

export default Articles;
