import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  SafeAreaView,
  Text
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as productsActions from './actions/products';
import Products from './screens/Products';

class App extends Component {

  componentDidMount(){
    let { actions } = this.props;
    actions.getProducts(1, 10, '');
  }

  render() {

    const { products } = this.props;
    console.log('productsapp')
    console.log(products)
    return (
      <SafeAreaView styles={styles.container}>
            <Products />
      </SafeAreaView>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

const mapStateToProps = state => ({
  products: state.products.products,
});

const ActionCreators = Object.assign(
  {},
  productsActions,
);
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(ActionCreators, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(App)