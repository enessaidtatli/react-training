import React, { Component } from 'react'

class Test extends Component {
    constructor(props){
        super(props);
        this.state = {
            a: 10
        }
        console.log('constructor');
    }

    componentDidMount = () => {
        //Api istekleri
        console.log("componentDidMount")
        this.setState({
            a: 20
        })
    }

    componentDidUpdate = (prevProps, prevState) => {
        console.log('componentDidUpdate/prevProps', prevProps)
        console.log('componentDidUpdate/prevState', prevState)
    }

    shouldComponentUpdate = (nextProps, nextState) => {
        console.log('shouldComponentUpdate/prevProps', nextProps)
        console.log('shouldComponentUpdate/prevState', nextState)
        return true;
    }
    
    

    render() {
        console.log('Render');
        return (
            <div>
                
            </div>
        )
    }
}
export default Test;