import React from 'react'
import ShoppingList from './shoppinglist.js'

class Content extends React.Component {
    render() {
        return(
            <ShoppingList name="张三"></ShoppingList>
        );
    }
}

export default Content;