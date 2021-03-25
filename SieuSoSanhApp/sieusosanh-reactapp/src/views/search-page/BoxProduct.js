import React, { Component } from 'react';
import {connect} from "react-redux";
//withRouter de redirect qua trang khac
import * as action from "../../redux/actions";
import {withRouter} from "react-router-dom";
import NumberFormat from 'react-number-format';

class BoxProduct extends Component {
    GoToDetail=()=>{
        let {data}=this.props
        let id = data.productID
        let name = data.productName
        this.props.getProductDetail(id)
        this.props.getListSameProducts(id)
        this.props.history.push(`/product/${name}`)
    }

    componentWillUnmount(){
        let {data}=this.props
        let id = data.productID
    }

    render() {
        let {data}=this.props;
        return (
            <div className="col-lg-4">
                <div className="box-product">
                    <div className="product-img">
                        
                        <img src={data.linkOfProductImage} atl={data.productName} />
                    </div>
                    <div className=" btn-sosanhgia text-center " onClick={this.GoToDetail}>
                        <div>So sánh giá</div>
                    </div>
                    <div className=" product-detail product-name text-center my-1">{data.productName}</div>
                    <div className=" product-detail product-price text-center"><NumberFormat value={data.price} displayType={'text'} thousandSeparator={true} suffix={' đ'} /></div>
                </div>
            </div>
        )
    }
}

const mapDispatchToProps=(dispatch)=>{
    return {
        getProductDetail: (id)=>{
            dispatch(action.getProductDetail(id))
        },
        getListSameProducts: (productID)=>{
            dispatch(action.getListSameProducts(productID))
        }
    }
}

export default withRouter(connect(null,mapDispatchToProps)(BoxProduct));