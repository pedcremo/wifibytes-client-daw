import React from 'react';
import {Utils} from '../../utils';
import {PropTypes} from 'prop-types';

/**
 * Draw legal texts
 */
class Filters extends React.Component {
  constructor(props) {
    super(props);
    this.state = {selectedFilter: ''};
    this.handleChange = this.handleChange.bind(this);
  }
  /** render  */
  render() {
    const setFilters=[];
    for (const [key, value] of Object.entries(this.props.filters)) {
      const values =value.map((item) => {
        let selector;
        if (key=='marca') selector='Marca';
        else selector= 'num_'+key;
        return <option key={item.id}>{item[selector]}</option>;
      });
      setFilters.push( <div className="form-group" key={key}>
        <label htmlFor="{key}">{this.context.t('catalog-'+key)}:</label>
        <select className="form-control" id="{key}" onChange={this.handleChange}>
          {values}
        </select>

      </div>);
    }

    return (
      <div className="row">
        {setFilters}
      </div>
    );
  }

  handleChange(e) {
    this.setState({selectedFilter: e.target.value});
  }
}

Filters.contextTypes = {
  t: PropTypes.func.isRequired,
};

export default Filters;
