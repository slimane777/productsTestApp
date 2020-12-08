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

  render() {
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