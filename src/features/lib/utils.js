
import { API } from "aws-amplify";  
import { listMatches } from "../../graphql/queries";
import { listMatchesResults, listUserPoints } from "../../graphql/queries";
import { createMatchesResults as createResult, 
    deleteMatchesResults as deletResults, 
    deleteUserPoints, 
    createUserPoints,
    updateUserPoints,
} from "../../graphql/mutations";

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

export const generateScores = async (userName) => {
    const userFilter = { and: [
        { Group: { eq: process.env.REACT_APP_GROUP } },
        { UserName: { eq: userName } },
        { Year: { eq: process.env.REACT_APP_YEAR } }
    ]};
    // remove existing results
    const userResultsData = await API.graphql({ query: listMatchesResults, variables: { filter: userFilter } });
    const userResults = userResultsData.data.listMatchesResults.items;
    for (const r in userResults) {
        await API.graphql({
            query: deletResults,
            variables: { input: { id: userResults[r].id } },
        });
    };

    // create new results
    const matchesData = await API.graphql({ query: listMatches, variables: { filter: { and: [
        { Year: { eq: process.env.REACT_APP_YEAR } }
    ]}} });
    const matches = matchesData.data.listMatches.items;
    for (const m in matches) {
        const data = {
            matchesResultsMatchId: matches[m].id,
            ScoreA: 0,
            ScoreB: 0,
            UserName: userName,
            Active: true,
            Group: process.env.REACT_APP_GROUP,
        };
        await API.graphql({
            query: createResult,
            variables: { input: data },
        });
    };

    // delete user points
    const usersData = await API.graphql({ query: listUserPoints, variables: { filter: userFilter } });
    const users = usersData.data.listUserPoints.items;
    if (users.length) {
        await API.graphql({
            query: deleteUserPoints,
            variables: { input: { id: users[0].id } },
        });
    }

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
};

export const calculateUserPoints = async (userName) => {
    // get all users
    const usersData = await API.graphql({ query: listUserPoints, variables: { filter: { and: [
        { Group: { eq: process.env.REACT_APP_GROUP } },
        { Year: { eq: process.env.REACT_APP_YEAR } }
    ]} }});
    const users = usersData.data.listUserPoints.items;

    // compare user matches with real matches, and accumulate points
    for (const u in users) {
        const user = users[u];
        const userMatchesData = await API.graphql({ query: listMatchesResults, variables: { filter: { and: [
            { Group: { eq: process.env.REACT_APP_GROUP } },
            { UserName: { eq: user.UserName } },
            { Year: { eq: process.env.REACT_APP_YEAR } }
        ]}}});

        const userMatches = userMatchesData.data.listMatchesResults.items;
        let totalPoints = 0;
        for (const m in userMatches) {
            totalPoints += calculatePoints(userMatches[m]);
        }

        // save points to user
        await API.graphql({
            query: updateUserPoints,
            variables: { input: { id: user.id, Total: totalPoints } }
        });
    }

    return true;
}

export const getAllScores = async (flag) => {
    const filter = { and: [
        { Year: { eq: process.env.REACT_APP_YEAR } },
        { Group: { eq: process.env.REACT_APP_GROUP } },
        { Active: { eq: true } },
    ]};

    const matchesData = await API.graphql({ query: listMatchesResults, variables: { filter } });
    const matches = matchesData.data.listMatchesResults.items;
    return matches;
}
