import React, { Component } from 'react'

export default class Filter extends Component {
    render() {
        return (
            <div className="row">
                <div className="col-md-4">
                    {this.props.count} products found
                </div>
                <div className="col-md-4">
                    <label>
                        Order By
                    <select className="form-control" 
                        value={this.props.short} 
                        onChange={this.props.hanndleChangeSort}>
                        <option value="">Select</option>
                        <option value="lowest">Lowest to highest</option>
                        <option value="highest">highest to lowest</option>
                    </select>
                    </label>
                </div>
                <div className="col-md-4">
                <label>
                        Filter Size
                    <select className="form-control" 
                        value={this.props.size} 
                        onChange={this.props.handleChangeSize}>
                        <option value="">ALL</option>
                        <option value="x">XS</option>
                        <option value="s">S</option>
                        <option value="m">M</option>
                        <option value="l">L</option>
                        <option value="xl">XL</option>
                        <option value="xll">XXL</option>
                    </select>
                    </label>
                </div>
            </div>
        )
    }
}
