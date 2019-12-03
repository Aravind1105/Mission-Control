import React from 'react';
import { connect } from 'react-redux';
import ProductsToolbar from './components/ProductsToolbar';
import ProductsContent from './components/ProductsContent';
import { loadProductsSaga } from './actions/productActions';

class ProductsMainPage extends React.Component {
    constructor(props) {
        super(props);

    }
    componentWillMount() {
        this.props.loadProducts();
    }
    render() {
        return (
            <>

                <ProductsToolbar />
                <ProductsContent />


            </>
        );
    }
}

const mapDispatchToProps = dispatch => ({
    loadProducts: () => dispatch(loadProductsSaga()),

});

export default
    connect(
        null,
        mapDispatchToProps,
    )(ProductsMainPage)

