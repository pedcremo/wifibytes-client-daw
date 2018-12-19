import React from 'react';
import {Utils} from "../utils";
/** Class to draw a carousel in body tag using vegas jquery plugin.
 * We get images from endpoint datos_empresa textos section
 * specifically textos with key that match jumbotron
 * In each text item we have key, content, image and lang fields
 * We filter by lang too
*/
class VegasCarousel extends React.Component {
    
    constructor(props) {
        super(props);
        this.state= {
          slidesBack : {},
          isLoading : true,
          index : 0,
          url : "x"
        };
        this.before = this.before.bind(this);
        this.next = this.next.bind(this);
    }

  componentDidMount(){
      let slides = this.props.vegas;
<<<<<<< HEAD
      if(slides != null){
        let slidesBack = slides.textos.filter((itemText) => {
          return itemText.key.match(/jumbotron/i) && itemText.lang == Utils.getUserLang();
        }).map((item) =>{
          return {src : item.image,content:item.content};
        });
        this.setState({
          slidesBack : slidesBack,
          isLoading : false,
          url : window.location.href.split('/')[4]
        });
      }
=======
    
      let slidesBack = slides.textos.filter((itemText) => {
        return itemText.key.match(/jumbotron/i) && itemText.lang == Utils.getUserLang();
      }).map((item) =>{
        return {src : item.image,content:item.content};
      });
      this.setState({
        slidesBack : slidesBack,
        isLoading : false
      });
>>>>>>> 9035c3b941e26149e02ba4d92795cfb48ca0f3b1
  }

  componentWillUnmount(){
    try{
      $("body").vegas("destroy");
    }catch(e){
<<<<<<< HEAD

=======
      console.log(e);
>>>>>>> 9035c3b941e26149e02ba4d92795cfb48ca0f3b1
    }
  }

  before (){
    $("body").vegas("pause");
    $("body").vegas("previous");
    let index = this.state.index -1;
    if(index < 0){
      this.setState({
        index : this.state.slidesBack.length - 1
      });
    }else{
      this.setState({
        index : index
      });
    }
  }
  next(){
    $("body").vegas("pause");
    $("body").vegas("next");
    let index = this.state.index + 1;
    if(index >= this.state.slidesBack.length){
      this.setState({
        index : 0
      });
    }else{
      this.setState({
        index : index
      });
    }
  }

    render(){
        
      if(this.state.slidesBack.length > 0){
        let data = this.state.slidesBack;
        let that = this;
        $('body').vegas({
<<<<<<< HEAD
             delay: 15000,
             timer: false,
             transition: "fade",
             transitionDuration: 3000,
             slides: data,
             walk: function (index, slideSettings) {
                    that.setState({
                      index: index
                    });
             }

       });
       if(this.state.url == ""){
         return(
            <div className="row home-banner text-center text-white p-4"  style={{backgroundColor: "rgba(0,0,0,0.6)"}}>
                <div key="previous" className="col-sm-1" onClick={this.before}>
                  <i className="fas fa-3x fa-angle-left"></i>
=======
            delay: 15000,
            timer: false,
            transition: "fade",
            transitionDuration: 3000,
            slides: data,
            walk: function (index, slideSettings) {
                    that.setState({
                        index: index
                    });
            }

        });

        return(
            <div className="row home-banner text-center text-white p-4"  style={{backgroundColor: "rgba(0,0,0,0.6)"}}>
                <div key="previous" className="col-sm-1" onClick={this.before}>
                <i className="fas fa-3x fa-angle-left"></i>
>>>>>>> 9035c3b941e26149e02ba4d92795cfb48ca0f3b1
                </div>
                <div className="col-sm-10" dangerouslySetInnerHTML={{__html: this.state.slidesBack[this.state.index].content}}>
                </div>
                <div key="next" className="col-sm-1" onClick={this.next}>
<<<<<<< HEAD
                   <i className="fas fa-3x fa-angle-right"></i>
                </div>
            </div>
          )
        }else{
          return null;
        }
=======
                <i className="fas fa-3x fa-angle-right"></i>
                </div>
            </div>
        )
>>>>>>> 9035c3b941e26149e02ba4d92795cfb48ca0f3b1
    }else{
      return null;
    }
  }
}
export default VegasCarousel;
