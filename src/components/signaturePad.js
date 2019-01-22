/** @module ComponentsApp */
import React from 'react';
import { connect } from "react-redux";
import SignaturePad from 'react-signature-pad-wrapper';

/**
 * @class
 * Draw Contracts text information
 */
class SignPad extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          showPad: false
        };
    }

    handleClear() {
        this.signaturePad.instance.clear();
    }

    handleSave() {
        if (this.signaturePad.isEmpty()) {
            // eslint-disable-next-line no-alert
            alert('Please provide a signature first.');
        } else {
            let data = this.signaturePad.toDataURL('image/svg+xml');
            this.props.onReciveSign(atob(data.split(',')[1]))
            this.setState({ showPad: true });
        }
    }

    renderSignaturePad() {

        return (                               
            <div className="columns">
                <div className="column is-10-tablet is-offset-1-tablet is-8-desktop is-offset-2-desktop">
                    <div className="card">
                        <div className="card-content">
                            <div className="content">
                                <SignaturePad redrawOnResize={true} ref={ref => this.signaturePad = ref} />
                            </div>
                        </div>
                        <footer className="card-footer">
                            <button className="card-footer-item" onClick={this.handleClear.bind(this)}>
                                Clear
                            </button>
                            <button className="card-footer-item" onClick={this.handleSave.bind(this)}>
                                Save
                            </button>
                        </footer>
                    </div>
                </div>
            </div>
        );
    }

    /**Render */
    render() {
        return (
            <section className="section">
                <div className="container">
                {
                    !this.state.showPad?
                        this.renderSignaturePad()
                    :
                        null
                }
                    
                </div>
            </section>
        )
    }
}

const mapStateToProps = state => ({
});

export default connect(mapStateToProps)(SignPad);

