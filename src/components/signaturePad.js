import React from 'react';
import { connect } from "react-redux";
import SignaturePad from 'react-signature-pad-wrapper';

class SignPad extends React.Component {
    handleClear() {
        this.signaturePad.instance.clear();
    }

    handleSave() {
        if (this.signaturePad.isEmpty()) {
            // eslint-disable-next-line no-alert
            alert('Please provide a signature first.');
        } else {
            window.open(this.signaturePad.toDataURL());
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

    render() {
        return (
            <section className="section">
                <div className="container">
                    {this.renderSignaturePad()}
                </div>
            </section>
        )
    }
}

const mapStateToProps = state => ({
});

export default connect(mapStateToProps)(SignPad);

