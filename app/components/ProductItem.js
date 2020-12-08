import React, { useState, useEffect } from 'react';
import {
	StyleSheet,
	Text,
	View,
	Image,
} from 'react-native';
import { BASE_URL } from '../constants';

function timeDifference(current, previous) {

    // getting the exact date to use when its older than a week
    var rDate = new Date(previous);
    rDate.setDate(rDate.getDate() + 1);
    var exactDate = ('0'+(rDate.getDate())).slice(-2)+'/'+('0'+(rDate.getMonth()+1)).slice(-2)+'/'+rDate.getFullYear();
    
    // needed for comparing
    var msPerMinute = 60 * 1000;
    var msPerHour = msPerMinute * 60;
    var msPerDay = msPerHour * 24;
    var msPerMonth = msPerDay * 30;
    var msPerYear = msPerDay * 365;

    // getting the difference
    var elapsed = current - previous;

    // comparing to know what to display
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
            return exactDate; 
        }
           
    }
}

function ProductItem({item, index}) {

    const [price, setPrice] = useState('');
    const [date, setDate] = useState('');

    useEffect(()=>{

        // formatting the price from cent to dollar 
        let formatedPrice = item.price
        formatedPrice /= 100
        formatedPrice.toLocaleString("en-US", {style:"currency", currency:"USD"})
        setPrice(formatedPrice)

        // calling timeDifference() function to format the date
        const publishDate = new Date(item.date);
        setDate(timeDifference(new Date(), publishDate))

    }, [])

    // show add once every 20 items, used math random + index to totally randomize the add 
    if(index % 20 == 0 && index != 0){

       return ( 
            <View style={[styles.itemContainer, {backgroundColor: '#d0e8f2', overflow: 'hidden'}]}>

                <Image 
                    source={{uri: BASE_URL+'/ads/?r='+(Math.floor(Math.random()*1000)+index)}} 
                    resizeMode='cover'
                    style={{
                        width: '100%', height: '100%',
                    }}
                />
                <Text style={styles.add}>add</Text>

            </View>
        )
    }
    return(
        <View style={styles.itemContainer}>
            <View style={styles.faceContainer}>
                <Text style={[styles.itemFace, {fontSize: item.size}]}>{item.face}</Text>
            </View>
            <Text style={styles.itemPrice}>Price: ${price}</Text>
            <Text style={styles.itemDate}>Published: {date}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    itemContainer: {
      borderRadius: 5,
      padding: 10,
      height: 150,
      backgroundColor: '#f6f6f6'
    },
    faceContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        flexGrow: 1
    },
    itemFace: {
      color: '#aaaaaa',
      fontWeight: '600',
    },
    itemPrice: {
      fontWeight: '600',
      fontSize: 14,
      color: '#393e46',
    },
    itemDate: {
        fontWeight: '600',
        fontSize: 12,
        color: '#aaaaaa',
    },
    add: {
        fontSize: 8, borderWidth: 0.5, borderColor: 'white',
        borderRadius: 10, padding: 5, alignSelf: 'flex-end',
        color: 'white',
        position: 'absolute', top: 10, right: 10
    }
  });
    
export default ProductItem