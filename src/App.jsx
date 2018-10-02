import React, { Component } from 'react';
import './App.css';

import { Button } from './components/Button';
import { Input } from './components/Input';
import { ClearButton } from './components/ClearButton';
import * as math from 'mathjs';

const parser = math.parser();
function round(value, decimals) {
	return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals);
  }
class App extends Component {
  constructor(props) {
	  super(props);
	  this.state = {
		input: '',
		precision: 20
	  };
  }
  solveTrig = val => {
	   var prev = this.state.input[this.state.input.length-1];
	  if (val === 'cos' || val === 'sin' || val === 'tan' || val === 'cot') {
		this.setState({input: val+'('});
	  }
  }
  addToInput = val => {
	 
	  if (val === 'X') {
		val = "*";  
	  }
	  if (isNaN(val) && isNaN(this.state.input[this.state.input.length-1])){
	  this.setState({input: this.state.input}); 
			   }
  	  else {
	  this.setState({input: this.state.input + val});
	  }
  }
  handleEqual = () => {
	  if (isNaN(this.state.input[this.state.input.length-1])) {
	  this.setState({input: this.state.input}); 		  
	  }
	  else if (~this.state.input.indexOf('sin(') || ~this.state.input.indexOf('cos(') || ~this.state.input.indexOf('tan(') || ~this.state.input.indexOf('cot(') ) {
		  	this.setState({input: round(parser.eval(this.state.input + ' deg)'), this.state.precision)});
	  	}
	  else {	  
	  this.setState({input: round(parser.eval(this.state.input), this.state.precision)});
	  }
	 
  }
  render() {
    return (
      <div className="app">
        <div className="calc-wrapper">
			<Input input={this.state.input}></Input>
        	<div className="row">
				<Button handleClick={this.addToInput}>1</Button>
				<Button handleClick={this.addToInput}>2</Button>
				<Button handleClick={this.addToInput}>3</Button>
				<Button handleClick={this.addToInput}>+</Button>
			</div>
			<div className="row">
				<Button handleClick={this.addToInput}>4</Button>
				<Button handleClick={this.addToInput}>5</Button>
				<Button handleClick={this.addToInput}>6</Button>
				<Button handleClick={this.addToInput}>X</Button>
			</div>
			<div className="row">
				<Button handleClick={this.addToInput}>7</Button>
				<Button handleClick={this.addToInput}>8</Button>
				<Button handleClick={this.addToInput}>9</Button>
				<Button handleClick={this.addToInput}>/</Button>
			</div>
			<div className="row">
				<Button handleClick={this.addToInput}>.</Button>
				<Button handleClick={this.addToInput}>0</Button>
				<Button handleClick={() => {this.handleEqual()}}>=</Button>
				<Button handleClick={this.addToInput}>-</Button>
			</div>
			<div className="row">
				<Button handleClick={this.solveTrig}>sin</Button>
				<Button handleClick={this.solveTrig}>cos</Button>
				<Button handleClick={this.solveTrig}>tan</Button>
				<Button handleClick={this.solveTrig}>cot</Button>
			</div>
			<div className="row">
				<input id="prec" type="number" min="1" max="20" placeholder="*precision 1...20" onChange={()=>{this.setState({precision: document.getElementById('prec').value})}} style={{"width":"100%"}}/>
			</div>
			<div className="row">
				<ClearButton handleClear={() => {this.setState({input: ""})}}>Clear<img src="assets/clear.png" style={{"maxWidth":"30px"}}/></ClearButton>
			</div>
        </div>
      </div>
    );
  }
}

export default App;