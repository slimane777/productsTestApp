import React, { useState, useEffect } from 'react';
import {
	StyleSheet,
	Text,
	View,
	TouchableOpacity,
	TextInput
} from 'react-native';
import {connect} from "react-redux";
import { FlatGrid } from 'react-native-super-grid';
import ProductItem from '../components/ProductItem';

function App(props) {

    const [products, setProducts] = useState([])

    useEffect(()=>{
        console.log('ok here')
        console.log(props)
        setProducts(props.products)
    }, [])

    return(
        <View style={{ width: '100%', height: '100%' }}>
            <Text style={styles.title}>Products</Text>
            <FlatGrid
                itemDimension={130}
                data={products}
                style={styles.gridView}
                // staticDimension={300}
                // fixed
                spacing={10}
                renderItem={({ item }) => (
                    <ProductItem item={item} />
                )}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    gridView: {
      marginTop: 10,
      flex: 1,
    },
    title: {
        fontSize: 30,
        fontWeight: '900',
        color: '#393e46',
        padding: 15
    }
});

const mapStateToProps = state => ({
    products: state.products.products,
});
    
export default connect(mapStateToProps,null)(App)