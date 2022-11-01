
import { API } from "aws-amplify";  
import { listMatches } from "../../graphql/queries";
import { listMatchesResults, listUserPoints } from "../../graphql/queries";
import { createMatchesResults as createResult, 
    deleteMatchesResults as deletResults, 
    deleteUserPoints, 
    createUserPoints } from "../../graphql/mutations";

export const generateScores = async (userName) => {
    const resultsData = await API.graphql({ query: listMatchesResults });
    const results = resultsData.data.listMatchesResults.items;
    for (const r in results) {
        await API.graphql({
            query: deletResults,
            variables: { input: { id: results[r].id } },
        });
    };

    const matchesData = await API.graphql({ query: listMatches });
    const matches = matchesData.data.listMatches.items;
    for (const m in matches) {
        const data = {
            matchesResultsMatchId: matches[m].id,
            ScoreA: 0,
            ScoreB: 0,
            UserName: userName,
            Group: 'plutotv',
        };
        await API.graphql({
            query: createResult,
            variables: { input: data },
        });
    };

    const usersData = await API.graphql({ query: listUserPoints });
    const users = usersData.data.listUserPoints.items;
    const user = users.find(u => u.UserName === userName)
    if (user) {
        await API.graphql({
            query: deleteUserPoints,
            variables: { input: { id: user.id } },
        });
    }
    const data = {
        UserName: userName,
        Total: 0,
        Active: true,
        Group: 'plutotv',
    };
    await API.graphql({
        query: createUserPoints,
        variables: { input: data },
    });
}