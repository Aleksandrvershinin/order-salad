import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { fetchMolecules, fetchSalads } from "../api";
import { addMolecules, addSalads } from "./typeActions";

const initState = {
    salads: [],
    molecules: []
}

const rootReducer = (state = initState, action) => {
    switch (action.type) {
        case addSalads:
            return {
                ...state, salads: action.value
            }
        case addMolecules:
            return {
                ...state, molecules: action.value
            }

        default:
            return state
    }
}

export function myCreateStore() {
    const store = createStore(
        rootReducer,
        composeWithDevTools(
            applyMiddleware(thunk)
        )
    );
    return store
}
export async function dispatchSalads(dispatch) {
    try {
        const salads = await fetchSalads();
        if (salads.success) {
            dispatch({ type: addSalads, value: salads.result })
        }
    } catch (error) {
        console.log(error);
    }
}
export async function dispatchMolecules(dispatch) {
    try {
        const molecules = await fetchMolecules();
        if (molecules.success) {
            dispatch({ type: addMolecules, value: molecules.result })
        }
    } catch (error) {
        console.log(error);
    }
}