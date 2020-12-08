import React, { useState, useEffect } from 'react';
import {
	StyleSheet,
	Text,
	View,
	TouchableOpacity,
} from 'react-native';

function SortOptions({props, onClear}) {

    const [sort, setSort] = useState('');

    const selectSort = (item) => {
        onClear(1)
        if(item == 'clear'){
            setSort('')
            props.actions.getProducts(1, 20, '')
        }else{
           setSort(item) 
           props.actions.getProducts(1, 20, item)
        }
        
    }

    return(
        <View style={styles.sortContainer}>
            <TouchableOpacity
                onPress={()=>selectSort('price')}
            >
                <Text style={[styles.sortItem, 
                    {
                        borderColor: sort == 'price'?'#0098ef':'#e8e8e8', 
                        backgroundColor: sort == 'price'?'#0098ef':'transparent',
                        color: sort == 'price'?'white':'#393e46',
                    }
                ]}>
                    Price
                </Text>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={()=>selectSort('size')}
            >
                <Text style={[styles.sortItem, 
                    {
                        borderColor: sort == 'size'?'#0098ef':'#e8e8e8', 
                        backgroundColor: sort == 'size'?'#0098ef':'transparent',
                        color: sort == 'size'?'white':'#393e46',
                    }
                ]}>
                    Size
                </Text>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={()=>selectSort('id')}
            >
                <Text style={[styles.sortItem, 
                    {
                        borderColor: sort == 'id'?'#0098ef':'#e8e8e8', 
                        backgroundColor: sort == 'id'?'#0098ef':'transparent',
                        color: sort == 'id'?'white':'#393e46',
                    }
                ]}>
                    ID
                </Text>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={()=>selectSort('clear')}
            >
                <Text style={[styles.sortItem, styles.clear, {backgroundColor: sort != ''?'tomato':'#e8e8e8'}]}>
                    Clear
                </Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    sortContainer: {
      flexDirection: 'row',
      alignItems: 'center'
    },
    sortItem: {
        padding: 7,
        marginLeft: 10, borderWidth: 1, overflow: 'hidden',
        borderRadius: 15, minWidth: 40, textAlign: 'center'
    },
    clear: {
        color: 'white',
        overflow: 'hidden',
        borderWidth: 0
    }
  });
    
export default SortOptions