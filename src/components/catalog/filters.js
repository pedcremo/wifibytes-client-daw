import React from 'react';
import {Utils} from "../../utils";

/**
 * Draw legal texts
 */
class Filters extends React.Component{

    constructor(props) {
        super(props);
        this.state = {selectedFilter: '' };
        this.handleChange = this.handleChange.bind(this);
    }
    /** render  */
    render() {
        console.log("FILTERS",this.props.filters);
        let setFilters=[];
        for (let [key, value] of Object.entries(this.props.filters)) {
            let values =value.map((item) => {
                let selector;
                if (key=="marca") selector="Marca";
                else selector= "num_"+key;
                return <option key={item.id}>{item[selector]}</option>;
            });
            setFilters.push( <div className="form-group" key={key}>
                <label htmlFor="{key}">{Utils.translate("catalog-"+key)}:</label>
                <select className="form-control" id="{key}" onChange={this.handleChange}>
                    {values}
                </select>
               
            </div>);
        }

        return (
            <div className="row">
                {setFilters}
            </div>
        )     
    }

    handleChange(e) {
        this.setState({ selectedFilter: e.target.value });
        console.log(this.state);
    }
    
}

export default Filters; 