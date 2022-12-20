import { createContext, useReducer } from "react";
import PropTypes from "prop-types";

const initialState = {
    isOpen: false,
};

const handlers = {
    SHOW_DRAWER: (state, action) => {
        return {...state, isOpen: true};
    },
    HIDE_DRAWER: (state, action) => {
        return {...state, isOpen: false};
    },
    TOGGLE_DRAWER: (state, action) => {
        return {...state, isOpen: !state.isOpen}
    }
}

const reducer = (state, action) =>
    handlers[action.type] ? handlers[action.type](state, action) : state;

const DrawerContext = createContext({
    ...initialState,
    showDrawer: () => true,
    hideDrawer: () => true,
    toggleDrawer: () => true,
});

DrawerProvider.propTypes = {
    children: PropTypes.node,
};

function DrawerProvider({children}) {
    const [state, dispatch] = useReducer(reducer, initialState);

    function showDrawer() {
        dispatch({
            type: "SHOW_DRAWER"
        });
    }
    function hideDrawer() {
        dispatch({
            type: "HIDE_DRAWER"
        });
    }

    function toggleDrawer() {
        dispatch({
            type: "TOGGLE_DRAWER"
        });
    }

    return (
        <DrawerContext.Provider
            value={{
                ...state,
                showDrawer,
                hideDrawer,
                toggleDrawer
            }}
        >
            {children}
        </DrawerContext.Provider>
    )
}

export {DrawerContext, DrawerProvider};
