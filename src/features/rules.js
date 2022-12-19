import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';

const rules = () => {
    const handlePaypal = () => {
        window.location = "https://www.paypal.com/donate/?hosted_button_id=XXXXX";
    }

    return (
        <div className='rules-container'>
            <Container maxWidth="lg">
                <div className="entry-content">
                    <h3>GENERAL RULES</h3>
                    <ul>
                        <li>You can enter your predictions up to two (2) hours before the start of the tournament (the scheduled kick off time of the first match).</li>
                        <li>Participants are allowed to join up to the start of the tournament (the scheduled kick off time of the first match).</li>
                        <li>Prediction entries and modifications will be accepted up to the scheduled kick off time of the first match</li>
                        <li>Points will be granted as follows (Default Point Awards) when predictions match Results and Home/Away Goals:
                            <ul>
                                <li>Match Outcome (winner/loser, tie): +3 points</li>
                                <li>Home Goals:&nbsp;+2 extra points</li>
                                <li>Away Goals: +2 extra points</li>
                                <li>If Match Outcome is not predicted correctly, Home Goals and Away Goals extra points are forfeited.</li>
                                <li>Elimination Matches (round of 16, quarter-finals, semi-finals, third place, and final): the Match Result used for point calculations is the final score before penalty kicks (including overtime if present).<br />
                                    Point award examples:<p></p>
                                    <ul>
                                        <li><strong>Prediction</strong>: [3-1], <strong>Match Result</strong>: [0-2], <strong>Points awarded</strong>: +0<br />
                                            [Prediction does not match Match Outcome].</li>
                                        <li><strong>Prediction</strong>: [3-1],&nbsp;<strong>Match Result</strong>: [3-4] or [0-1],&nbsp;<strong>Points awarded</strong>: +0<br />
                                            [Prediction does not match Match Outcome, Home/Away Goals points forfeited].</li>
                                        <li><strong>Prediction</strong>: [3-1], <strong>Match Result</strong>: [3-4], <strong>Points awarded</strong>: +0<br />
                                            [Prediction does not match Match Outcome, forfeits Home Goals points].</li>
                                        <li><strong>Prediction</strong>: [3-1], <strong>Match Result</strong>: [2-0], <strong>Points awarded</strong>: +3<br />
                                            [Prediction matches Match Outcome (+3) but unsuccessful Home or Away Goals (+0)].</li>
                                        <li><strong>Prediction</strong>: [3-1], <strong>Match Result</strong>: [3-0] or [2-1], <strong>Points awarded</strong>: +5<br />
                                            [Prediction matches Match Outcome (+3) and one of Home or Away Goals (+2)].</li>
                                        <li><strong>Prediction</strong>: [3-1], <strong>Match Result</strong>: [3-1], <strong>Points awarded</strong>: +7<br />
                                            [Prediction matches Match Outcome (+3) as well as Home and Away Goals(+4)].</li>
                                    </ul>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <div id="donate-button">
                                <p>To make it interesting, your participation requires a donation of $XX.00, using the button below. The winner will get the rest (accumulated per participant), people with no donation will be removed when the turnament starts.</p>
                                <p>Winner takes all, no second or third place. Winner is the person with the higher number of points, if a draw happes, the person with more exact results with in the elimination brackets wins.</p>
                                <p><b>To start click [User Matches] from the menu above.</b></p>
                                <Button variant="contained" endIcon={<SendIcon />} onClick={handlePaypal}>Donate</Button>
                                <p><a href="https://www.paypal.com/webapps/mpp/merchant-fees" target="_new">PayPal comission details <b>here</b></a> under <i>[Receiving and Sending Donations]</i></p>
                            </div>
                        </li>
                    </ul>
                    <h3>TIE BREAKERS</h3>
                    <p>When any two or more players have scored the same number of points at the end of the competition in a Quiniela, Tie Breakers provide a means of deciding the final table standings.</p>
                    <h5>TIE BREAKERS AND PRIZE AWARDS</h5>
                    <ul>
                        <li>In case of a Point Tie in the final Quiniela Table, the Tie Breakers for Table Standings&nbsp; and Prize distribution in order of importance are:
                            <ol>
                                <li>Total number of Match Outcome successful predictions.</li>
                                <li>Total number of successful goal predictions (both home and away).</li>
                            </ol>
                        </li>
                    </ul>
                </div>
            </Container>
        </div>
    )
}

export default rules;