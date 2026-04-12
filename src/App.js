import React, { useContext, useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Routing from "./Router";
import Header from "./Components/Header/Header";
import { DataContext } from "./Components/DataProvider/DataProvider";
import { auth } from "./Utility/firebase";
import { type } from "./Utility/action.type";

function App() {
    const [{user}, dispatch] = useContext(DataContext);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((authUser) => {
            if (authUser) {
                dispatch({
                    type: type.SET_USER,
                    user: authUser,
                });
            } else {
                dispatch({
                    type: type.SET_USER,
                    user: null,
                });
            }
        });

        // Cleanup subscription on unmount
        return () => unsubscribe();
    }, [dispatch]);

    return (
        <Router>
            <Header />
            <Routing />
        </Router>
    );
}

export default App;
