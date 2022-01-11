import React from "react";
import { Provider } from "react-redux";
import { Route, Routes } from "react-router";
import "../assets/style/normalize.css";
import "../assets/style/style.scss";
import { ChooseSalad } from "./ChooseSalad";
import { CreateSalad } from "./CreateSalad";
import { Main } from "./Main";
import { OrderSalad } from "./OrderSalad";
import { dispatchMolecules, dispatchSalads, myCreateStore } from "./redux/myCreateStore";
import { SaladDetails } from "./SaladDetails";


const store = myCreateStore();
store.dispatch(dispatchMolecules);
store.dispatch(dispatchSalads);
export function App() {
    return (
        <Provider store={store}>
            <Routes>
                <Route path="/" element={<Main />} />
                <Route path="/choose-salad" element={<ChooseSalad />} />
                <Route path="/create-salad" element={<CreateSalad />} />
                <Route path="/salad-details/:id" element={<SaladDetails />} />
                <Route path="/order-salad" element={<OrderSalad />} />
            </Routes>
        </Provider>
    );
}

