/** @module ComponentsApp */
import React from 'react';
import {connect} from 'react-redux';

/**
 * @class
 * @desc Draw Contracts text information
 */
class SignPad extends React.Component {
  /**
   * @param {*} props
   */
  constructor(props) {
    super(props);
    /**
     * Set the default state from the canvas to check is
     * the canvas is empty
     */
    this.state = {
      defaultCanvas: '',
    };
  }

  /**
   * After the component is mounted set all the properties
   * for the canvas to draw
   */
  componentDidMount() {
    const canvas = document.getElementById('paint');
    const ctx = canvas.getContext('2d');
    /**
     * Set the width and the height for the canvas
     */
    canvas.width = 500;
    canvas.height = 250;

    const mouse = {x: 0, y: 0};

    /* Mouse Capturing Work */
    canvas.addEventListener('mousemove', function(e) {
      mouse.x = e.pageX - this.offsetLeft;
      mouse.y = e.pageY - this.offsetTop;
    }, false);

    /* Drawing on Paint App */
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';

    ctx.strokeStyle = '#000';

    canvas.addEventListener('mousedown', function(e) {
      ctx.beginPath();
      ctx.moveTo(mouse.x, mouse.y);

      canvas.addEventListener('mousemove', onPaint, false);
    }, false);

    canvas.addEventListener('mouseup', function() {
      canvas.removeEventListener('mousemove', onPaint, false);
    }, false);

    const onPaint = () => {
      ctx.lineTo(mouse.x, mouse.y);
      ctx.stroke();
    };

    /**
     * Set the state of the canvas to check after if is empty
     */
    this.setState({
      defaultCanvas: canvas.toDataURL(),
    });
  }

  /** Clear the pad */
  handleClear() {
    const canvas = document.getElementById('paint');
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  /** Checking if the user sign the contract, converting
   *  the paint in png and sending to the father */
  handleSave() {
    const can = document.getElementById('paint');
    const img = new Image();

    /**
     * If the state of the default canvas is the same that
     * the canvas after click on save we show an error instead
     * send the image in png to the father component
     */
    if (can.toDataURL() === this.state.defaultCanvas) {
      alert('Canvas is blank');
    } else {
      img.src = can.toDataURL('image/png');
      this.props.onReciveSign(img.src);
    }
  }

  /**
   * @desc The canvas where the useres sign
   * @return {DOMElement}
   */
  render() {
    const style = {
      border: '1px solid #969696',
      background: '#BFBFBF',
      marginLeft: 'auto',
      marginRight: 'auto',
      display: 'block',
    };

    return (
      <section className="section">
        <div className="container">
          <div id="sketch" className="mb-4">
            <canvas id="paint" style={style}></canvas>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-danger"
              onClick={() => this.handleClear()}>
              {this.props.translate.t('btn-clear')}
            </button>
            <button type="button" className="btn btn-primary"
              onClick={() => this.handleSave()}>
              {this.props.translate.t('btn-save')}
            </button>
          </div>
        </div>
      </section>
    );
  }
}

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps)(SignPad);

