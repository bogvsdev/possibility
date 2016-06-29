import React from "react";
import $ from 'jquery';

/**
 * Main class of app
 *
 * @description 
 * Has to properly generate and show result with animation
 * 
 * @method generate new percent
 * @method random
 * @method clear filed
 * @method 
 * 
 */
export default class Layout extends React.Component {
  constructor(){
    super()

    this.state = {
      percent: this.random(),
    }

  }

  //random between 0 and 100
  random(){
    return Math.floor(Math.random() * (100 - 0 + 1)) + 0;
  }

  generate(e) {
    e.preventDefault();

    //check if field has something
    if( $('#qu').val().length == 0 ){
      return;
    }else{
      //regenerate percent and save field value
      var prev = $('#qu').val();
      this.clearField(false);
      $('#qu').val(prev);
    }

    //block submition
    $('#btn').prop('disabled', true);
    $('#qu').prop('disabled', true);

    var $span = $('#result').find('span'),
        percent = this.state.percent, //@note holds prev value
        newPercent = 0,
        height = $span.next().height(), //height of the liquid block
        px = (1 * height) / 100, //1% in pixels
        pxls = height; //initial val of % in pxls

    // console.log('generate' + percent);
    //reset color
    $span.next().css('background', 'rgba(221, 0, 0, 0.82)');

    var interval = setInterval(function(){
        //add 1% in px from current value of this.state.percent in pxls http://localhost:1000/
        pxls -= px;
        $span.next().css('bottom', '-'+pxls+'px');

        //stop animation if bottom reached
        if(newPercent == percent){
          $('#btn').prop('disabled', false);
          $('#qu').prop('disabled', false);
          clearInterval(interval);
          return;
        }
        //substruct percent value
        newPercent+=1;
        $span.text(newPercent+'%');

        if(newPercent <= 55 && newPercent >= 20){
          $span.next().css('background', 'rgba(255, 214, 0, 0.77)');
        }else if(newPercent >= 56){
          $span.next().css('background', 'rgba(100, 221, 23, 0.65)');
        }
        
      }, 50);
  }

  clearField(animation = true){
    //generate new percent, but in this method state has previous value
    this.setState({percent: this.random()});
    var $field = $('#qu');
    //check if field has something
    if( $field.val().length > 0 ){
      //reset field
      $field.val('');

      var $span = $('#result').find('span'),
        percent = this.state.percent,
        newPercent = percent,
        height = $span.next().height(), //height of the liquid block
        px = (1 * height) / 100, //1% in pixels
        pxls = height - Math.floor((percent * height) / 100); //% in pixels @note not visible bottom: -131px, visile 0px
      
      // console.log('clearField percent' + percent);

      if (animation) {
        //set liquid to current percent state
        $span.next().css('bottom', '-'+pxls+'px');
        // define animation interval. Substructs % and adds pxls
        var interval = setInterval(function(){
          //add 1% in px from current value of this.state.percent in pxls
          pxls += px;
          $span.next().css('bottom', '-'+pxls+'px');

          //stop animation if bottom reached
          if(newPercent == 0){
            $span.next().css('background', 'rgba(221, 0, 0, 0.82)');
            clearInterval(interval);
            return;
          }
          //substruct percent value
          newPercent-=1;
          $span.text(newPercent+'%');
          
        }, 5);
      }
    }else if($field.val().length === 0 && $('.liquid').prev().text() !== '0%'){ //idle case
      $span.next().css('bottom', '-131px'); //hide
      $span.next().css('background', 'rgba(221, 0, 0, 0.82)'); //reset color
      $span.text('0%');
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