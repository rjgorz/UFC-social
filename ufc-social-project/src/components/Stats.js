import React from "react";
import { Statistic } from 'semantic-ui-react';

function Stats({ fighter }) {
    const { division, reign, description } = fighter;
    const { style, stance, height, nickname, record, defences } = description;

    return (
        <>
            <Statistic.Group horizontal size='tiny'>
                <Statistic>
                    <Statistic.Value>{division}</Statistic.Value>
                    <Statistic.Label>DIVISION</Statistic.Label>
                </Statistic>
                <Statistic>
                    <Statistic.Value>{reign}</Statistic.Value>
                    <Statistic.Label>TITLE REIGN</Statistic.Label>
                </Statistic>
                <Statistic>
                    <Statistic.Value>{record}</Statistic.Value>
                    <Statistic.Label>RECORD</Statistic.Label>
                </Statistic>
                <Statistic>
                    <Statistic.Value>{defences}</Statistic.Value>
                    <Statistic.Label>TITLE DEFENCE</Statistic.Label>
                </Statistic>
            </Statistic.Group>
            <Statistic.Group horizontal size='tiny'>
                
                
            </Statistic.Group>
            <ul>
                <li><p><em>Style: {style}</em></p></li>
                <li><p><em>Stance: {stance}</em></p></li>
                <li><p><em>Height: {height}</em></p></li>
                <li><p><em>Nickname: {nickname}</em></p></li>
            </ul>
        </>
    );
}

export default Stats;