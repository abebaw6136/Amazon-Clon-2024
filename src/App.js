import React, { useContext, useEffect } from "react";
import Routing from "./Router";
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
        <Routing />
    );
}

export default App;