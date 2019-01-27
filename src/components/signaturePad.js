/** @module ComponentsApp */
import React from 'react';
import { connect } from "react-redux";
import SignaturePad from 'react-signature-pad-wrapper';
import { throws } from 'assert';

/**
 * @class
 * Draw Contracts text information
 */
class SignPad extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          showPad: false,
          defaultCanvas: ""
        };
    }

    componentDidMount() {
        let canvas = document.getElementById('paint');
        let ctx = canvas.getContext('2d');
        
        let sketch = document.getElementById('sketch');
        let sketch_style = getComputedStyle(sketch);
        canvas.width = 500;
        canvas.height = 250;

        let mouse = {x: 0, y: 0};
        
        /* Mouse Capturing Work */
        canvas.addEventListener('mousemove', function(e) {
            mouse.x = e.pageX - this.offsetLeft;
            mouse.y = e.pageY - this.offsetTop;
        }, false);

        /* Drawing on Paint App */
        ctx.lineJoin = 'round';
        ctx.lineCap = 'round';

        ctx.strokeStyle = "#000";
        
        canvas.addEventListener('mousedown', function(e) {
            ctx.beginPath();
            ctx.moveTo(mouse.x, mouse.y);
        
            canvas.addEventListener('mousemove', onPaint, false);
        }, false);
        
        canvas.addEventListener('mouseup', function() {
            canvas.removeEventListener('mousemove', onPaint, false);
        }, false);
        
        let onPaint = function() {
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();
        };

        this.setState({
            defaultCanvas: canvas.toDataURL()
        })
    }

    /**Clear the pad */
    handleClear() {
        let canvas = document.getElementById('paint');
        let ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }

    /**Checking if the user sign the contract, converting the paint in svg and sending to the father */
    handleSave() {
        let can = document.getElementById('paint');
        let img = new Image();

        if(can.toDataURL() === this.state.defaultCanvas) {
            alert('Canvas is blank');
        } else {
            img.src = can.toDataURL("image/png");
            this.props.onReciveSign(img.src);
        }
    }

    /**Render */
    render() {
        const style={
            border: "1px solid #969696", 
            background : "#BFBFBF", 
            marginLeft: "auto", 
            marginRight: "auto", 
            display: "block"
        }

        return (
            <section className="section">
                <div className="container">
                    <div id="sketch">
                        <canvas id="paint" style={style}></canvas>
                    </div>
                    <button onClick={() => this.handleClear()}>Clear</button>
                    <button onClick={() => this.handleSave()}>Save</button>
                </div>
            </section>
        )
    }
}

const mapStateToProps = state => ({
});

export default connect(mapStateToProps)(SignPad);

