import React, {createContext, useReducer} from "react";
import CharactersReducer from './reducers/CharactersReducer'


const initialState = {
    results: [],
    pageNumber: 0,
    currentTotal: 0,
    overallTotal: 0,
    searchPhrase:"",
    error: null
};

const Store = ({children}) => {
    const [state, dispatch] = useReducer(CharactersReducer, initialState);
    return (
        <Context.Provider value={[state, dispatch]}>
            {children}
        </Context.Provider>
    )
};

export const Context = createContext(initialState);
export default Store;