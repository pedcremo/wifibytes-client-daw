/** @module ComponentsApp */
import React from 'react';
import {Utils} from '../utils';
import {connect} from 'react-redux';
import {getCurrentRateDetails} from '../actions/currentRateDetailsActions';
import {PropTypes} from 'prop-types';

class RateDetail extends React.Component {
  constructor(props) {
    super(props);
    // console.error(props)
  }

  componentDidMount() {
    this.props.dispatch(getCurrentRateDetails(this.props.idRate));
  }


  /** render  */
  render() {
    /* const isLoading = this.state.isLoading; */
    const {error, loading, details} = this.props;

    if (error) {
      return (<div>Error! </div>);
    }

    if (loading) {
      return (<div>Loading...</div>);
    }

    if (details) {
      if (details.length > 0) {
        console.log('yess', details);
        return (
          <section id="tarifa" >
            <div className="header-tarifa" style={{background: details[0].color.hexadecimal}}>
              <div className="row text-white text-center">
                <div className="col-md-12 no-padding p-5">
                  <h2 className="pretitulo" >{details[0].pretitulo }</h2>
                  <h1 className="display-4" >{details[0].nombretarifa } <span className="text-dark" >{details[0].precio }{this.context.t('home-euros-month') }</span></h1>
                </div>
              </div>
            </div>
            <table className="tableRateDetails">
              <thead>
                <tr>
                  <td>
                    <img src={details[1][1].caja_1_icono} />
                  </td>
                  <td>
                    <img src={details[1][1].caja_2_icono} />
                  </td>
                  <td>
                    <img src={details[1][1].caja_3_icono} />
                  </td>
                  <td>
                    <img src={details[1][1].caja_4_icono} />
                  </td>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <h3 dangerouslySetInnerHTML={{__html: details[1][1].caja_1_titulo}}></h3>
                    <p dangerouslySetInnerHTML={{__html: details[1][1].caja_1_texto}}></p>
                  </td>
                  <td>
                    <h3 dangerouslySetInnerHTML={{__html: details[1][1].caja_2_titulo}}></h3>
                    <p dangerouslySetInnerHTML={{__html: details[1][1].caja_2_texto}}></p>
                  </td>
                  <td>
                    <h3 dangerouslySetInnerHTML={{__html: details[1][1].caja_3_titulo}}></h3>
                    <p dangerouslySetInnerHTML={{__html: details[1][1].caja_3_texto}}></p>
                  </td>
                  <td>
                    <h3 dangerouslySetInnerHTML={{__html: details[1][1].caja_4_titulo}}></h3>
                    <p dangerouslySetInnerHTML={{__html: details[1][1].caja_4_texto}}></p>
                  </td>
                </tr>
              </tbody>
            </table>
          </section>
        );
      } else {
        return ('');
      }
    }
  }
}

RateDetail.contextTypes = {
  t: PropTypes.func.isRequired,
};

/* export default RateDetail; */
const mapStateToProps = (state) => ({
  details: state.currentRateDetails.items,
  loading: state.currentRateDetails.loading,
  error: state.currentRateDetails.error,
});

export default connect(mapStateToProps)(RateDetail);
