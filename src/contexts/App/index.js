import * as React from 'react';
import { Auth } from 'aws-amplify';
import { listUserPoints, listMatchesResults } from "../../graphql/queries";
import { API } from "aws-amplify";

const AppContext = React.createContext([]);

const actions = {
    LOGIN: 'LOGIN',
    LOGOUT: 'LOGOUT',
    LOAD_USERS: 'LOAD_USERS',
    LOAD_USER_MATCHES: 'LOAD_USER_MATCHES',
};

/**
 * Intial State for AppContext
 */
const initialState = {
    user: {},
    users: [],
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
        case actions.LOGOUT: {
            return { ...state, user: action.payload };
        }
        case actions.LOAD_USERS: {
            return { ...state, users: action.payload };
        }
        case actions.LOAD_USER_MATCHES: {
            return { ...state, userMatches: action.payload };
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
        try {
            const user = await Auth.currentAuthenticatedUser();
            dispatch({ type: actions.LOGIN, payload: user })
        } catch(e) {
            console.log(e);
        }
    }

    const Logout = () => {
        dispatch({ type: actions.LOGOUT, payload: {} })
    }

    const fetchParticipants = async () => {
        const filter = { and: [
            { Active: { eq: true } }, 
            { Group: { eq: process.env.REACT_APP_GROUP } },
            { Year: { eq: 2022 } }
        ] };

        const apiData = await API.graphql({ query: listUserPoints, variables: { filter } });
        const userList = apiData.data.listUserPoints.items;
        const activeUsers = userList.filter(m => m.Active);

        const users = activeUsers.map(u => {
            return {
                id: u.id,
                name: u.UserName,
                totalPoints: u.Total,
            }
        });

        dispatch({ type: actions.LOAD_USERS, payload: users })
    }

    const fetchUserMatches = async () => {
        const apiData = await API.graphql({ query: listMatchesResults });
  
        const userMatches = apiData.data.listMatchesResults.items;
        const matches = userMatches.filter(m => m.UserName === appState.user.username);
        matches.sort((a, b) => a.Match.Order - b.Match.Order);
    
        const rows = matches.length ? matches.map(m => {
          return {
            id: m.id,
            Match: m.Match.Order,
            TeamA: m.Match.TeamA,
            ScoreA: m.ScoreA,
            TeamB: m.Match.TeamB,
            ScoreB: m.ScoreB,
            Location: m.Match.Location,
            Date: m.Match.Schedule
          }
        }) : [];
        
        dispatch({ type: actions.LOAD_USER_MATCHES, payload: rows })
      }

    return {
        appState,
        dispatch,
        getUserInfo,
        Logout,
        fetchParticipants,
        fetchUserMatches
    };
};

export { AppProvider, useApp };