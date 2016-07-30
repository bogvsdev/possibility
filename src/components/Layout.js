import React from "react";
import $ from 'jquery';
import { connect } from "react-redux";
import { generate_value } from "../actions/randAction";


@connect((store)=>{
  return {
    rand: store.rand //getting rand value
  };
})

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

    this.newVal = 0;
    this.oldVal = 0;
  }

  componentDidMount(){
    //generate new value to wipe out initial val
    this.props.dispatch(generate_value());
  }

  componentWillUpdate(prevProps, prevState){
    this.newVal = prevProps.rand;
    console.log("new val = ",this.newVal);
  }

  componentDidUpdate(prevProps, prevState){
    this.oldVal = prevProps.rand;
    console.log("old val = ",this.oldVal);
  }

  generate(e) {
    e.preventDefault();    
    //generate new value
    this.props.dispatch(generate_value());

    //check if field has something
    if( !$('#qu').val().length ){
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
        percent = this.props.rand, //@note holds prev value
        newPercent = 0,
        height = $span.next().height(), //height of the liquid block
        px = (1 * height) / 100, //1% in pixels
        pxls = height, //initial val of % in pxls
        liquid = $span.next(); //liquid block

    //reset color
    liquid.css({
      'background':'rgba(221, 0, 0, 0.82)'
    });

    var interval = setInterval(function(){
        //add 1% in px from current value of this.props.rand in pxls http://localhost:1000/
        pxls -= px;

        liquid.css({
          'bottom':'-'+pxls+'px'
        });

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
          liquid.css('background', 'rgba(255, 214, 0, 0.77)');
        }else if(newPercent >= 56){
          liquid.css('background', 'rgba(100, 221, 23, 0.65)');
        }
        
      }, 50);
  }

  clearField(animation = true){
    //generate new percent, but in this method state has previous value
    var $field = $('#qu');
    //check if field has something
    if( $field.val().length > 0 ){
      //reset field
      $field.val('');

      var $span = $('#result').find('span'),
        percent = ($span.text() === '0%')? 0 : this.oldVal,//if text is entered and status 0% reset percrent
        height = $span.next().height(), //height of the liquid block
        px = (1 * height) / 100, //1% in pixels
        pxls = height - Math.floor((percent * height) / 100), //% in pixels @note not visible bottom: -131px, visile 0px
        liquid = $span.next();
      
      if (animation) {
        //set liquid to current percent state
        liquid.css({
          'bottom':'-'+pxls+'px'
        });

        // define animation interval. Substructs % and adds pxls
        var interval = setInterval(function(){
          //add 1% in px from current value of this.props.rand in pxls
          pxls += px;

          liquid.css({
            'bottom':'-'+pxls+'px'
          });
          
          //stop animation if bottom reached
          if(percent == 0){
            liquid.css('background', 'rgba(221, 0, 0, 0.82)'); //red
            clearInterval(interval);
            return;
          }
          //substruct percent value
          percent-=1;
          $span.text(percent+'%');
          
        }, 5);
      }


    }else if($field.val().length === 0 && $('.liquid').prev().text() !== '0%'){ //idle case
      liquid.css('bottom', '-131px'); //hide
      liquid.css('background', 'rgba(221, 0, 0, 0.82)'); //reset color
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