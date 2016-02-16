import React from "react";
import $ from 'jquery';

export default class Layout extends React.Component {
  constructor(){
    super()

    this.state = {
      percent: this.random(),
      pixels: 0
    }

  }

  random(){
    return Math.floor(Math.random()*100);
  }

  generate(e) {
    e.preventDefault();
    this.setState({percent: this.random()});
    
    $('#btn').prop('disabled', true);
    $('#result').fadeIn(150);
    var i = 1, stop = this.state.percent, pxls = 131, pixels=0;
    
    if($('#qu').val().length>0){
      this.clearField();
    }

    var interval = setInterval(function(){
      var $span = $('#result').find('span');
      pxls -= 1.3;
      $span.next().css('bottom', '-'+pxls+'px');
      $span.text(i+'%');
      pixels = pxls;
      i++;
      if(pxls<110 && pxls >= 60){
        $span.next().css('background', 'rgba(255, 214, 0, 0.77)');
      }else if(pxls<95){
        $span.next().css('background', 'rgba(100, 221, 23, 0.65)');
      }

      if(i>=(stop+1)){
        $('#btn').prop('disabled', false);
        clearInterval(interval);
        return;
      }
    }, 50 * i);

    this.setState({pixels: pixels});
  }

  clearField(){
    var self = $('#qu');
    if($(self).val().length>0){
      // $(self).val('');
      var i = this.state.percent, stop = 1, pxls = 1.3;
      var interval = setInterval(function(){
      console.log(i, pxls);
        var $span = $('#result').find('span');
        pxls += 1.3;
        $span.next().css('bottom', '-'+pxls+'px');
        $span.text(i-stop+'%');
        stop++;
        if(i == (stop-1)){
          $span.next().css('background', 'rgba(221, 0, 0, 0.82)');
          clearInterval(interval);
          return;
        }
      }, 5);
    }
  }

  render() {
    return (
        <div>
          <h1>Ask for possibility</h1>
          <form action="#" method="post" id="f" onSubmit={this.generate.bind(this)}>
            <div className="row">
              <input type="text" name="qu" id="qu" onFocus={this.clearField.bind(this)} />
            </div>
            <div className="row">
              <input type="submit" id="btn" value="Check it out" />
            </div>
          </form>

          <div id="result">
            <h2>Possibility is </h2>
            <h2 className="percent">
              <span>0%</span>
              <div className="liquid"></div>
            </h2>
          </div>
        </div>
    );
  }
}