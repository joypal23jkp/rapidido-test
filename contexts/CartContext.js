import PropTypes, { func } from "prop-types";
import { createContext, useEffect, useReducer, useState } from "react";


const initialState = {
    isInitialized: false,
    hasItem: false,
    itemCount: 0,
    totalPrice: 0,
    items: [],
    cartToken: null,
};

function getInitialState() {
    const cartItems = localStorage.getItem('cart_items')
    return cartItems ? JSON.parse(cartItems) : initialState;
}

const updateLocalStorage = (payload, key = 'cart_items') => {
  localStorage.setItem(key, JSON.stringify(payload));
};

const getLocalStorageItems = () => JSON.parse(localStorage.getItem("cart_items"));


const handlers = {
    INITIALIZE: (state, action) => {
        const { cartToken } = action.payload;
        const newState = {
            ...state,
            isInitialized: true,
            cartToken,
        };

        return getInitialState();
    },
    ADD_ITEM: (state, action) => {
        const { item } = action.payload;

        const newState = {...state, items: [...state.items, item]};
        updateLocalStorage(newState);

        return getLocalStorageItems()
    },
    REMOVE_ITEM: (state, action) => {

        const {row_id} = action.payload;

        const oldItems = [...state.items];

        const Item = oldItems.find(item => parseInt(item.row_id) === parseInt(row_id));

        const newItems = state.items.filter(item => parseInt(item.row_id) !== parseInt(Item.row_id));
        const newState = {...state, items: newItems};
        updateLocalStorage(newState);
        return getLocalStorageItems();
    },
    UPDATE_CART: (state, action) => {
        const hasItem = state.items.length > 0 ;
        const itemCount = state.items.length;
        const totalPrice = state.items.reduce((carry, item) => carry + (item.price * item.quantity), 0);
        const newState = {...state, hasItem, itemCount, totalPrice};
        updateLocalStorage(newState)
        return getLocalStorageItems();
    },
    UPDATE_QUANTITY: (state, action) => {
        const {id, operator, quantity = 1} = action.payload
        const newItems = state.items.map(item => {
            if(parseInt(item.id) !== parseInt(id)) {
                return item;
            }
            if(operator === '+') {
                item.quantity = parseInt(item.quantity) + parseInt(quantity);
            }
    
            if(operator === '-') {
                item.quantity = parseInt(item.quantity) - parseInt(quantity);
            }
            return item
        });

        const newState = {...state, items: newItems};

        updateLocalStorage(newState)
        
        return getLocalStorageItems();

    },
    CLEAR_CART: (state, action) => {
        const newState = {...state,
            itemCount: 0,
            totalPrice: 0,
            hasItem: false,
            items: [],
        };
        updateLocalStorage(newState)
        return getLocalStorageItems();
    },
};


const reducer = (state, action) =>
  handlers[action.type] ? handlers[action.type](state, action) : state;

const CartContext = createContext({
    ...initialState,
    addItem: () => Promise.resolve(),
    removeItem: () => Promise.resolve(),
    clearCart: () => Promise.resolve(),
    updateCart: () => Promise.resolve(),
    updateQuantity: () => Promise.resolve(),
});



CartProvider.propTypes = {
    children: PropTypes.node,
};



function CartProvider({children}) {
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {

        const initialize = async () => {
            
            try {

                dispatch({
                    type: 'INITIALIZE',
                    payload: {
                        ...state
                    }
                });

            } catch(error) {}
        };

        initialize();

    }, [])

    const addItem = async (item) => {
        dispatch({
            type: 'ADD_ITEM',
            payload: {
                item
            }
        });
        dispatch({type: "UPDATE_CART"});
    };
    const removeItem = async (rowId) => {
        dispatch({
            type: "REMOVE_ITEM",
            payload: {
                row_id: rowId
            }
        });
        dispatch({type: "UPDATE_CART"});
    };
    const clearCart  = async () => {
        dispatch({
            type: "CLEAR_CART"
        });
    };
    const updateCart = async () => {};
    const updateQuantity = async (id, operator, quantity = 1) => {
        dispatch({
            type: "UPDATE_QUANTITY",
            payload: {
                id,
                operator,
                quantity
            }
        })
        dispatch({type: "UPDATE_CART"});
    }


    return (
        <CartContext.Provider value={{
            ...state,
            addItem,
            removeItem,
            clearCart,
            updateCart,
            updateQuantity
        }}>
            {children}
        </CartContext.Provider>
    );
    
}


export { CartContext, CartProvider };