import React, { Component } from 'react'
import {connect} from "react-redux"
//withRouter de redirect qua trang khac
import NumberFormat from 'react-number-format';

class ProductInfo extends Component {
    render() {
        let {data}=this.props
        return data && data[0] ? 
        <div className="box-product-info container row">
            <div className="product-slide-container col-lg-6">
                <div className=" product-img">
                    <img src={data[0].linkOfProductImage}/>
                </div>
            </div>
            <div className="info-product-detail col-lg-6">
                <div className=" product-detail-name my-1">
                    <h1>{data[0].productName}</h1>
                </div>
                <hr/>
                <div className="info-content    ">
                    <div className="brand-box">
                        <span>Thương hiệu : </span>
                        <span className="brand-name">{data[0].supplierName}</span>
                    </div>
                </div>
                <div className="priority-store">
                    <span>Giá tốt từ nơi bán: </span>
                    <div className="product-price-detail">
                        <NumberFormat value={data[0].price} displayType={'text'} thousandSeparator={true} suffix={' đ'} />
                    </div>
                    <div className="company-logo">
                        <img src = {data[0].companyImage} className="company-logo-image"/>
                    </div>
                    <div>
                        <a type="button" class="btn btn-outline-danger float-lg-right" href={data[0].hyperLink}> Đến nơi bán </a>
                    </div>
                    
                </div>
            </div>
        </div>: null
    }
}

const mapStateToProps=(state)=>{
    return {
        productDetail:state.productsReducer.productDetail
    }
}


export default connect(mapStateToProps,null)(ProductInfo);