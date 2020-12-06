import React, { useState, useEffect } from 'react';
import {
	StyleSheet,
	Text,
	View,
	TouchableOpacity,
} from 'react-native';

function timeDifference(current, previous) {

    var rDate = new Date(previous);
    rDate.setDate(rDate.getDate() + 1);
    var exactDate = ('0'+(rDate.getDate())).slice(-2)+'/'+('0'+(rDate.getMonth()+1)).slice(-2)+'/'+rDate.getFullYear();
    
    var msPerMinute = 60 * 1000;
    var msPerHour = msPerMinute * 60;
    var msPerDay = msPerHour * 24;
    var msPerMonth = msPerDay * 30;
    var msPerYear = msPerDay * 365;

    var elapsed = current - previous;

    if (elapsed < msPerMinute) {
         return Math.round(elapsed/1000) + ' seconds ago';   
    }

    else if (elapsed < msPerHour) {
         return Math.round(elapsed/msPerMinute) + ' minutes ago';   
    }

    else if (elapsed < msPerDay ) {
         return Math.round(elapsed/msPerHour ) + ' hours ago';   
    }

    else if (elapsed < msPerMonth) {
        if(Math.round(elapsed/msPerDay) < 7){
           return Math.round(elapsed/msPerDay) + ' days ago'; 
        }else{
            exactDate; 
        }
           
    }
}

function ProductItem({item}) {

    const [price, setPrice] = useState('');
    const [date, setDate] = useState('');

    useEffect(()=>{
        console.log('ok prod')
        console.log(item)

        let formatedPrice = item.price
        formatedPrice /= 100
        formatedPrice.toLocaleString("en-US", {style:"currency", currency:"USD"})
        setPrice(formatedPrice)

        console.log('date');
        console.log(item.date);

        const publishDate = new Date(item.date);
        console.log(publishDate)
        console.log(timeDifference(new Date(), publishDate));

        setDate(timeDifference(new Date(), publishDate))

    }, [])

    return(
        <>
            <View style={styles.itemContainer}>
                <Text style={[styles.itemFace, {fontSize: item.size}]}>{item.face}</Text>
            </View>
            <Text style={styles.itemPrice}>Price: ${price}</Text>
            <Text style={styles.itemPrice}>Published: {date}</Text>
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