import React, { useState, useEffect } from 'react';
import {
	StyleSheet,
	Text,
	View,
	TouchableOpacity,
} from 'react-native';

function ProductItem({item}) {

    const [price, setPrice] = useState('') 

    useEffect(()=>{
        console.log('ok prod')
        console.log(item)

        let formatedPrice = item.price
        formatedPrice /= 100
        formatedPrice.toLocaleString("en-US", {style:"currency", currency:"USD"})
        setPrice(formatedPrice)

    }, [])

    return(
        <>
        <View style={styles.itemContainer}>
            <Text style={[styles.itemFace, {fontSize: item.size}]}>{item.face}</Text>
            
            {/* <Text style={styles.itemPrice}>Date: {item.date}</Text> */}
        </View>
        <Text style={styles.itemPrice}>Price: ${price}</Text>
        </>
    )
}

const styles = StyleSheet.create({
    itemContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 5,
      padding: 10,
      height: 150,
      backgroundColor: '#f6f6f6'
    },
    itemFace: {
      color: '#aaaaaa',
      fontWeight: '600',
    },
    itemPrice: {
      fontWeight: '600',
      fontSize: 12,
      color: '#aaaaaa',
    },
  });
    
export default ProductItem