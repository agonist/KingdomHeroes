// Message.js
import React, {useMemo} from "react";
import {animated, useTransition} from "react-spring"
import {Typography} from "@mui/material";


interface MessageProps {
    message: string; // required
}

const Message = ({message}: MessageProps) => {
    const items = useMemo(
        () =>
            message.split("").map((letter, index) => ({
                item: letter,
                key: `${letter}${index}`
            })),
        [message]
    );


    const transitions = useTransition(items, {
        trail: 35,
        from: {display: 'none'},
        enter: {display: ''}
    });


    return (
        < Typography variant={"body1"} textAlign={"start"} lineHeight={1}>
            {
                transitions((styles, {item, key}) => (
                    <animated.span key={key} style={styles}>
                        {item}
                    </animated.span>
                ))
            }
        </ Typography>
    );
}


export default Message;
