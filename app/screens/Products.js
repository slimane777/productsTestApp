import React, { useState, useEffect } from 'react';
import {
	StyleSheet,
	Text,
	View,
	ActivityIndicator,
} from 'react-native';
import {connect} from "react-redux";
import { FlatGrid } from 'react-native-super-grid';
import ProductItem from '../components/ProductItem';
import SortOptions from '../components/SortOptions';
import * as productsActions from '../actions/products';
import { bindActionCreators } from 'redux';

function App(props) {

    const [offset, setOffset] = useState(1);

    useEffect(()=>{

        // get products
        props.actions.getProducts(offset, 20, '');

    }, [offset])

    function clear(offset) {
        // clear filters
        setOffset(offset);
      }

    const renderFooter = () => {
        // display this when there is no more data
        if(props?.endReached){
            return (
                <Text style={styles.endMessage}>
                    ~ end of catalogue ~
                </Text>
            )
        }

        // display loader
        return (
          
          <View style={styles.footer}>
            {props?.loadingMore ? (
                <View style={styles.loader}>
                    <ActivityIndicator
                        color="black"
                        style={{margin: 15}} />
                    <Text style={styles.loaderText}>
                        Loading...
                    </Text>
                </View>
            ) : null}
          </View>
        );
      };

    return(
        <View style={{ width: '100%', height: '100%' }}>
            <Text style={styles.title}>Products</Text>

            <View style={styles.filters}>
                <Text style={styles.sort}>Sort by</Text>
                <SortOptions props={props}  onClear={clear}/>
            </View>

            {
                // when loading first time
                props?.loading ?
                    <View style={styles.loading}>
                        <ActivityIndicator size='large' color='#393e46' />
                    </View>
                :
                    <FlatGrid
                        itemDimension={130}
                        data={props.products}
                        style={styles.gridView}
                        spacing={10}
                        renderItem={({ index, item }) => (
                            <ProductItem item={item} index={index} />
                        )}
                        ListFooterComponent={()=>renderFooter()}
                        onEndReached={()=>{
                            // update offset as long as the data keep coming
                            if(!props?.endReached){
                                setOffset(offset+1);
                            }
                        }}
                        onEndReachedThreshold={0.01}
                        
                    />
            }
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
    },
    sort: {
        fontSize: 17,
        fontWeight: '600',
        color: '#393e46',
        flex: 1,
    },
    filters: {
        flexDirection: 'row', alignItems: 'center',
        paddingHorizontal: 15, 
    },
    loading: {
        flex: 1, alignItems: 'center', justifyContent: 'center',
        marginBottom: 20,
        padding: 20
    },
    loader: {
        alignItems: 'center'
    },
    loaderText: {
        color: 'black',
        fontSize: 15,
        textAlign: 'center',
    },
    endMessage: {
        textAlign: 'center', fontSize: 17, 
        padding: 20, color: 'black', fontWeight: '600',
    }
});

const mapStateToProps = state => ({
    products: state.products.products,
    loading: state.products.loading,
    loadingMore: state.products.loadingMore,
    endReached: state.products.endReached,
});

const ActionCreators = Object.assign(
    {},
    productsActions,
  );
  const mapDispatchToProps = dispatch => ({
    actions: bindActionCreators(ActionCreators, dispatch),
  });
    
export default connect(mapStateToProps,mapDispatchToProps)(App)