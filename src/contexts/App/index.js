import * as React from 'react';
const AppContext = React.createContext([]);

/**
 * Intial State for AppContext
 */
const initialState = {
    user: {
        isAuthenticated: false,
    },
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
        {
            path: '/admin',
            title: 'admin Matches',
        },
    ],
};

const reducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN': {
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

    return {
        appState,
        dispatch,
    };
};

export { AppProvider, useApp };