import React, {useState} from 'react';
import {Slider} from '@material-ui/core';
import { Component } from 'react';

export default class SliderFilter extends Component{
    constructor(props) {
        super(props);
        this.state = { 
            maxSize: 100000000,
            val: [0, 100000000]
            
        };

        //
        this.updateRange = this.updateRange.bind(this);
        this.callMultiFunction = this.callMultiFunction.bind(this);
    }

    updateRange(e,data){    
        this.setState({val: data});
    }

    callMultiFunction = (e, data) => {
        // let min = this.state.val[0];
        // let max = this.state.val[1];
        this.updateRange(e, data);
        this.props.priceMapping(data);
    }

    render(){
        let max = this.state.maxSize;
        return(
            <div className="slider-filter-box">
                <Slider 
                    className="slider-filter"
                    value ={this.state.val}
                    onChange = {this.callMultiFunction}
                    max = {max}
                    step = {1000000}
                    />
            </div>
        );
    }
}