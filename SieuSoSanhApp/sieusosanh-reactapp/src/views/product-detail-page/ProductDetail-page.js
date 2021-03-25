import React, { Component } from 'react'
import IndexHeader from "../../components/Headers/IndexHeader"
import ProductInfo from "../product-detail-page/ProductInfo";
import PriceTable from "./PriceTable"
import {connect} from "react-redux";
import * as action from "../../redux/actions/index";

class ProductDetailPage extends Component{
    renderProductDetail=()=>{
        return (
            <ProductInfo
            data={this.props.productDetail}/>
        )
    }

    renderSameProducts=()=>{
        let {productDetail} = this.props
        if(this.props.listSameProducts.length>0){
            return this.props.listSameProducts.map((item, index)=>{
                return (
                    <PriceTable
                    key = {index}
                    data={item}/>
                )
            })
        }
    }

    render() {
        return(
            <div className="container product-detail-page">
                <div className="container product-info">
                    {this.renderProductDetail()}
                </div>
                <div className="container">
                    <hr/>
                </div>
                <div className="container price-table">
                    <div className="price-table-title">
                        <h2>Bảng giá bán</h2>
                    </div>
                    <div>
                        <ul className="list-same-products">
                            {this.renderSameProducts()}
                        </ul>
                    </div>
                </div>
                <div className="container">
                    <div>
                        <div className="text-center title">
                            <h1>Thông tin hữu ích</h1>
                        </div>
                        <hr/>
                        <div>
                            <p>
                                <strong>Tivi</strong>, hay còn gọi là vô tuyến truyền hình, là hệ thống điện tử viễn thông có khả năng thu nhận tín hiệu sóng và tín hiệu qua đường cáp để chuyển thành hình ảnh và âm thanh.

                                Có thể nói, từ những dòng tivi thông thường cho đến nay, chúng ta đã có cơ hội tiếp cận những chiếc Smart tivi được xem là bước đột phá trong công nghệ truyền hình. Đình đám nhất ở sân chơi này là các tên tuổi Samsung, LG, Sony, Panasonic,…

                                Dựa theo công nghệ và tính năng, Tivi được chia thành bốn loại chính gồm Tivi Ultra HD, Tivi 3D, Smart Tivi và Tivi màn hình LED thông thường.
                            </p>
                            <p>
                                <strong>Tivi LED </strong>là cách gọi nói chung của những loại Tivi sử dụng công nghệ hiển thị hình ảnh thông thường, đảm nhiệm chức năng duy nhất là hiển thị hình ảnh được cung cấp từ các loại anten hay đầu phát.

                                Nếu như trước đây, khi nhắc đến Tivi thường có 3 sự lựa chọn là Tivi LCD, Tivi Plasma và Tivi LED thì hiện nay, Tivi LED đã gần như không có đối thủ trên thị trường.

                                Tiết kiệm điện năng, tần số quét cao, hình ảnh mượt mà, màu sắc hiển thị trung thực và đẹp là những điểm nổi trội của Tivi LED.
                            </p>
                            <p>
                            <strong>Smart tivi</strong> là cách gọi thông dụng của loại Tivi thông minh có khả năng tương thích cao với các nền tảng dịch vụ được cung cấp trên nền internet.

Khả năng tương thích kém, giao diện chưa thực sự thân thiện là những điểm yếu có thể nhìn thấy của một chiếc Smart Tivi.

Với mức giá cao, Smart Tivi sẽ là sản phẩm phù hợp với những người yêu thích công nghệ và có sự dư dả về mặt tài chính.
                            </p>
                            
                            <p>
                            <strong>Tivi 3D:</strong> là thiết bị hỗ trợ khả năng hiển thị hình ảnh dưới dạng 3D. Về mặt công nghệ, Tivi 3D được chia làm 2 loại là Tivi 3D chủ động và Tivi 3D bị động.

Điểm yếu của những chiếc Tivi 3D là giá thành đắt đỏ, yêu cầu thêm phụ kiện là kính 3D hay nguồn phát.
                            </p>
                            
                            <p>
                            <strong>Tivi Ultra HD:</strong> hay Tivi độ nét siêu cao là tên gọi chung của dòng sản phẩm có màn hình hiển thị với độ phân giải lên tới 4K.

Thách thức lớn nhất chính là nội dung và giá bán, cụ thể là chưa có nhiều nội dung đạt đến độ phân giải 4K để có thể thưởng thức trên tivi 4K, đồng thời, giá thành là quá cao so với mặt bằng thu nhập của Việt Nam.
                            </p>
                            
                        </div>
                    
                    </div>
                </div>
            </div>
            
        )
    }
}

const mapStateToProps=(state)=>{
    return {
        productDetail:state.productsReducer.productDetail,
        listSameProducts:state.productsReducer.listSameProducts
    }
}

const mapDispatchToProps=(dispatch)=>{
    return {
        getListSameProducts:(productName)=>{
            dispatch(action.getListSameProducts(productName))
        }
    } 
}

export default connect(mapStateToProps,mapDispatchToProps)(ProductDetailPage);