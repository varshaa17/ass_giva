import React, { Component } from 'react'

class HeaderComponent extends Component {
    constructor(props) {
        super(props)

        this.state = {
                 
        }
    }

    render() {
        return (
            <div>
                <header>
                    <nav className="navbar navbar-expand-md navbar-dark bg-dark" style={{ paddingLeft: "10px"}}>
                    <div><a className="navbar-brand">Product Management App</a></div>
                    </nav>
                </header>
            </div>
        )
    }
}

export default HeaderComponent
