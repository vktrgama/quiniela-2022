
import { API } from "aws-amplify";  
import { listMatches } from "../../graphql/queries";
import { listMatchesResults, listUserPoints } from "../../graphql/queries";
import { 
    createUserPoints,
    updateUserPoints,
} from "../../graphql/mutations";
import moment from 'moment';
import { Today } from "@mui/icons-material";
import asyncBatch from 'async-batch';

const resultsLimit = { limit: 4000 };

const calculatePoints = (userMatch) => {
    let totalPoints = 0;
    const isHomeWinner = userMatch.ScoreA - userMatch.ScoreB >= 0;
    const isRealHomeWinner = userMatch.Match.ScoreA - userMatch.Match.ScoreB >= 0;
    // Prediction: [3-1], Match Result: [2-0]
    if(isHomeWinner && isRealHomeWinner) {
        totalPoints += 3;
    }
    // Prediction: [3-1], Match Result: [3-0] or [2-1],
    if (userMatch.ScoreA === userMatch.Match.ScoreA || userMatch.ScoreB === userMatch.Match.ScoreB) {
        totalPoints += 2;
    }
    // Prediction: [3-1], Match Result: [3-1],
    if (userMatch.ScoreA === userMatch.Match.ScoreA && userMatch.ScoreB === userMatch.Match.ScoreB) {
        totalPoints += 2;
    }

    return totalPoints;
};

export const getUserScores = async (userName) => {
    let userFilter = {
        and: [
            { Group: { eq: process.env.REACT_APP_GROUP } },
            { UserName: { eq: userName } },
            { Year: { eq: process.env.REACT_APP_YEAR } },
    ]};

    // remove existing results
    const userResultsData = await API.graphql({ query: listMatchesResults, variables: { filter: userFilter, ...resultsLimit } });
    const userResults = userResultsData.data.listMatchesResults.items;
    return [...userResults];
}

export const initUserPoints = async (userName) => {
    // delete user points
    const usersData = await API.graphql({ query: listUserPoints, variables: { filter: {
        and: [
            { Group: { eq: process.env.REACT_APP_GROUP } },
            { UserName: { eq: userName } },
            { Year: { eq: process.env.REACT_APP_YEAR } },
        ]} } });

    const users = usersData.data.listUserPoints.items;
    if (users.length === 0) {
        // init user points
        const data = {
            UserName: userName,
            Total: 0,
            Active: true,
            Group: process.env.REACT_APP_GROUP,
        };
        await API.graphql({
            query: createUserPoints,
            variables: { input: data },
        });
    }
};

export const calculateUserPoints = async () => {
    // get all users
    const usersData = await API.graphql({ query: listUserPoints, variables: { filter: { and: [
        { Group: { eq: process.env.REACT_APP_GROUP } },
        { Year: { eq: process.env.REACT_APP_YEAR } }
    ]} }});
    const users = usersData.data.listUserPoints.items;

    const Parallelism = 2;
    const asyncMethod = async (user) => {
        const userMatchesData = await API.graphql({ query: listMatchesResults, variables: { filter: { and: [
            { Group: { eq: process.env.REACT_APP_GROUP } },
            { UserName: { eq: user.UserName } },
            { Year: { eq: process.env.REACT_APP_YEAR } }
            ]}, ...resultsLimit
        }});

        const userMatches = userMatchesData.data.listMatchesResults.items;
        let totalPoints = 0;
        for (const m in userMatches) {
            const matchDate = moment(userMatches[m].Match.Schedule, "DD-MMM-YY");
            const today = moment(Today);
            if (today.diff(matchDate) >= 0) {
                totalPoints += calculatePoints(userMatches[m]);
                console.log('calculate points', totalPoints)
            };
        }

        // save points to user
        await API.graphql({
            query: updateUserPoints,
            variables: { input: { id: user.id, Total: totalPoints } }
        });
    };

    await asyncBatch(users, asyncMethod, Parallelism);

    return true;
}

export const getAllScores = async () => {
    const filter = { and: [
        { Year: { eq: process.env.REACT_APP_YEAR } },
        { Active: { eq: true } },
    ]};

    const matchesData = await API.graphql({ query: listMatches, variables: { filter, limit: 200 } });
    const matches = matchesData.data.listMatches.items;
    matches.sort((a, b) => a.Order - b.Order);
    return [...matches];
}
