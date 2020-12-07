import React, { Component } from 'react'
import * as action from "../../redux/actions/index"
import {connect} from "react-redux"
import {withRouter} from "react-router-dom"

class ListBrand extends Component {
    GoToListProductsByBrandName=()=>{
        if(this.props && this.props.listSuppliersByCategoryCode){
            let temp = this.props.listSuppliersByCategoryCode
            let categoryCode = temp[0].categoryCode
            let {data} = this.props
            this.props.getListProductsByBrandName(categoryCode, data.supplierName)
            this.props.history.push(`/${categoryCode}/${data.supplierName}`)
        }
    }
    
    render() {
        if(this.props){
            let {data} = this.props
            let {list} = this.props.listProductsByCategory
            return (<li onClick={()=>this.GoToListProductsByBrandName()}>
                    {data.supplierName} ({data.quantityProduct})
                </li>
            )
        }
    }
}

const mapDispatchToProps=(dispatch)=>{
    return {
        getListProductsByBrandName:(categoryCode, supplierID) =>{
            dispatch(action.getListProductsByBrandName(categoryCode, supplierID))
        }
    }
}

const mapStateToProps=(state)=>{
    return {
        listSuppliersByCategoryCode:state.productsReducer.listSuppliersByCategoryCode,
        listProductsByCategory:state.productsReducer.listProductsByCategory,
        listProductsByBrandName:state.productsReducer.listProductsByBrandName
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ListBrand))