import React from 'react';

import {Utils} from "../utils";

class HomeBanner extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      content : {},
      isLoading : true,
      currentPage: 0
    }
  }
  componentDidMount(){
    let that = this;
    Utils.get("/datos_empresa").then(function(response){
      let slidesBack = response.textos.filter((itemText) => {
        return itemText.key.match(/jumbotron/i) && itemText.lang == Utils.getUserLang();
      }).map((item) =>{
        return {src : item.image,content:item.content};
      });
      that.setState({
        content : slidesBack,
        isLoading : false
      });
    }).catch(function(error){
      console.log("Failded!", error);
    });
  }
  before(){
    $("body").vegas("pause");
    $("body").vegas("previous");
  }
  next(){
    $("body").vegas("pause");

    $("body").vegas("next");
  }
  render(){
    console.log(this.state.content);
    if(this.state.content.length > 0){
      return(
        <div>
          <div key="previous" className="col-sm-1" onClick={this.before}>
            <i className="fas fa-3x fa-angle-left"></i>
          </div>
          <div className="col-sm-10">
              {this.state.content[this.state.currentPage].content}
          </div>
          <div key="next" className="col-sm-1" onClick={this.next}>
             <i className='fas fa-3x fa-angle-right'></i>
          </div>
      </div>
      )
    }else{
      return null;
    }
  }
}
export default HomeBanner;
