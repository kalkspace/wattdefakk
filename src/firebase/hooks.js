import * as firebase from 'firebase';
import { useEffect, useState } from "react";

export const useAnonymousAuth = () => {
    const [authState, setAuthState] = useState({
        'state': 'not_tried',
        'uid': null
    });
    useEffect(() => {
        firebase.auth().onAuthStateChanged(function (user) {
            if (user) {
                setAuthState({ 'state': 'success', user });
            } else {
                setAuthState({ 'state': 'not_tried', user: null });
            }
        });
        firebase.auth().signInAnonymously().catch(function (error) {
            setAuthState({ 'state': 'failure', user: null });
        });
        // TODO: deregister auth state handler
    }, []);
    return authState;
}
