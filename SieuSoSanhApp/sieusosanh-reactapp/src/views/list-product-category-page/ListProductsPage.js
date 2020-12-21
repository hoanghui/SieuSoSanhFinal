import React, { Component } from 'react'
import { connect } from "react-redux"
import BoxProduct from "../search-page/BoxProduct"
import ListBrand from "./ListBrand"
import * as action from "../../redux/actions/index"
import { Paginator } from 'primereact/paginator';
import SliderFilter from '../../components/SliderFilter/SliderFilter'
import Accordion from 'react-bootstrap/Accordion';

class ListProductsPage extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            first: 1,
            rows: 10,
            min: 0,
            max: 100000000,
            sort: '',
            value: 'select'
        };
    }

    renderProductbox = () => {
        let { listProductsByCategory } = this.props;
        let sort = this.state.sort;
        if(sort !==''){
            listProductsByCategory.sort((a,b) => (this.state.sort === 'increase') ? (a.price > b.price ? 1:-1):(a.price < b.price ? 1:-1))
        }
        return listProductsByCategory.map((item, index) => {
            return (
                <BoxProduct
                    key={index}
                    data={item} />
            )
        })
    }

    renderListBrand = () => {
        if (this.props.listSuppliersByCategoryCode.length > 0) {
            return this.props.listSuppliersByCategoryCode.map((item, index) => {
                return (
                    <ListBrand
                        key={index}
                        data={item} />
                )
            })
        }
    }

    setMin(minPrice){
        this.setState({min: minPrice});
    }

    setMax(maxPrice){
        this.setState({max: maxPrice});
    }

    applyFilter = () => {
        let min = this.state.min;
        let max = this.state.max;
        if(max !== 0)
        {
            this.props.getListProductsByFilter(min, max);
        }
    }

    changePrice = (data) => {
        console.log("Change price filter");
        this.setState({min: data[0], max: data[1]})
        console.log(data[0]);
    }

    goToOwner = (category) => {
        this.props.history.push(`/${category}/page=1`)
    }

    changeOption = (event) => {
        this.setState({ sort: event.target.value});
        let opt = event.target.value;
        // if(opt === 'increase'){
        //     this.setState({ value: 'Giá tăng dần'});
        // } else{
        //     this.setState({ value: 'Giá giảm dần'});
        // }
    }

    // listProducts = () => {
    //     this.setState(state => {
    //             if(state.sort !==''){
    //                 state.productsReducer.listProductsByCategory.sort((a,b) => (state.sort === 'increase') ? (a.price < b.price ? 1:-1):(a.price > b.price))
    //             }
    //             return{
    //                 listProductsByCategory: state.productsReducer.listProductsByCategory,
    //             }
    //         })
    // }

    componentDidMount = () => {
        let name = this.props.match.params.name;
        let supplierName = this.props.match.params.supplierName;
        if (supplierName) {
            this.props.getListProductsByBrandName(name, supplierName)
            this.props.getListSuppliersByCategoryCode(name)
        }
        else {
            this.props.getListSuppliersByCategoryCode(name)
            this.props.getListProductsByCategory(name, this.state.first)
        }
    }

    render() {
        let { listProductsByCategory } = this.props
        if (listProductsByCategory && listProductsByCategory[0]) {
            console.log(this.state.sort);
        }
        return (
            listProductsByCategory && listProductsByCategory[0] ?
                <div className="search-page">
                    <div className='container'>
                        <div className="keyword-info py-4 text-center result" onClick={() => this.goToOwner(listProductsByCategory[0].categoryCode)}>
                            {listProductsByCategory[0].categoryName}
                        </div>
                    </div>
                    <div className="container">
                        <div className="product-filter-sort">
                            <label>
                                <span>Sắp xếp</span>
                                <select onChange={this.changeOption} className="form-control" value={this.state.sort}>
                                    <option value="select">Chọn đi nà</option>
                                    <option value="increase">Giá tăng dần</option>
                                    <option value="decrease">Giá giảm dần</option>
                                </select>
                            </label>
                        </div>
                    </div>
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-3">
                                {/* <div>
                                    <a className="btn toggle-button" data-toggle="collapse" data-target="#collapseElements">
                                        <strong >Thương hiệu</strong>
                                    </a>
                                    <ul className="list-brand collapse" id="collapseElements">
                                        {this.renderListBrand()}
                                    </ul>
                                </div> */}
                                <div className="brand">
                                    <Accordion defaultActiveKey="0">
                                        <div>
                                            <div className="brand-title">
                                                <Accordion.Toggle variant="link" eventKey="0" className="accordion">
                                                    <strong>Thương hiệu</strong>
                                                </Accordion.Toggle>
                                            </div>
                                            <Accordion.Collapse eventKey="0">
                                                <div>
                                                    <ul className="list-brand" >
                                                        {this.renderListBrand()}
                                                    </ul>
                                                </div>
                                            </Accordion.Collapse>
                                        </div>
                                    </Accordion>
                                </div>
                                <div className="filter-price">
                                <Accordion defaultActiveKey="1">
                                        <div>
                                            <div className="price-title">
                                                <Accordion.Toggle variant="link" eventKey="1" className="accordion">
                                                    <strong>Mức giá</strong>
                                                </Accordion.Toggle>
                                            </div>
                                            <Accordion.Collapse eventKey="1" className="slider-side">
                                                <div>
                                                    <SliderFilter
                                                        priceMapping={this.changePrice}
                                                    ></SliderFilter>
                                                    <form className="d-inline-flex">
                                                        <label className="text-filter">
                                                            <p className="text-center">Min</p>
                                                            <input type="text" name="min" className="text-min" onChange={e => this.setMin(e.target.value)} value={this.state.min} />
                                                        </label>
                                                        <label className="text-filter">
                                                            <p className="text-center">Max</p>
                                                            <input type="text" name="max" className="text-max" onChange={e => this.setMax(e.target.value)} value={this.state.max} />
                                                        </label>
                                                    </form>
                                                </div>
                                            </Accordion.Collapse>
                                        </div>
                                    </Accordion>
                                    <div className="text-center btn-apdung" onClick={() => this.applyFilter()}>
                                        <div>Áp dụng</div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-9" >
                                <div className="row product-list">
                                    {this.renderProductbox()}
                                </div>  
                            </div>
                        </div>
                        
                        <Paginator first={this.state.first} 
                                   rows={this.state.rows} 
                                   totalRecords={listProductsByCategory.length}
                                   onPageChange={(e) => this.setState({ first: e.first, rows: e.rows })}>   
                        </Paginator>
                    </div>
                </div> : null)
    }
}
const mapStateToProps = (state) => {
    return {
        listProductsByCategory: state.productsReducer.listProductsByCategory,
        listSuppliersByCategoryCode: state.productsReducer.listSuppliersByCategoryCode
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getListSuppliersByCategoryCode: (name) => {
            dispatch(action.getListSuppliersByCategoryCode(name))
        },
        getListProductsByCategory: (code, page) => {
            dispatch(action.getListProductsByCategory(code, page))
        },
        getListProductsByBrandName: (categoryCode, supplierName) => {
            dispatch(action.getListProductsByBrandName(categoryCode, supplierName))
        },
        getListProductsByFilter: (min, max) => {
            dispatch(action.getListProductsByFilter(min, max))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListProductsPage)
