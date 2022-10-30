import * as React from 'react';
import { Auth } from 'aws-amplify';

const AppContext = React.createContext([]);

const actions = {
    LOGIN: 'LOGIN',
};

/**
 * Intial State for AppContext
 */
const initialState = {
    user: {},
    navigation: [
        {
            path: '/rules',
            title: 'Rules',
        },
        {
            path: '/matches',
            title: 'Matches',
        },
        {
            path: '/participants',
            title: 'Participants',
        },
        {
            path: '/user',
            title: 'User Matches',
        },
    ],
};

const reducer = (state, action) => {
    switch (action.type) {
        case actions.LOGIN: {
            return { ...state, user: action.payload };
        }
        case 'FAILED-LOGIN': {
            return { ...state, user: { status: action.payload.details } };
        }
        case 'NOT-AUTH-LOGIN': {
            return { ...state, user: action.payload };
        }
        case 'LOGOUT': {
            return { ...state, user: action.payload };
        }
        default: {
            throw new Error(`Unsupported action type: ${action.type}`);
        }
    }
};

const AppProvider = props => {
    const [appState, dispatch] = React.useReducer(reducer, initialState);
    const value = React.useMemo(() => [appState, dispatch], [appState]);
    return <AppContext.Provider value={value} {...props} />;
};

const useApp = () => {
    const context = React.useContext(AppContext);
    if (!context) {
        throw new Error('useApp must be used within an AppProvider');
    }

    const [appState, dispatch] = context;

    const getUserInfo = async () => {
        console.log('user info')
        const user = await Auth.currentAuthenticatedUser();
        dispatch({ type: actions.LOGIN, payload: user || {} })
    }

    return {
        appState,
        dispatch,
        getUserInfo,
    };
};

export { AppProvider, useApp };