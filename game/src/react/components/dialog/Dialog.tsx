// DialogBox.js
import {useCallback, useEffect, useState} from "react";
import Message from "./Message";
import {makeStyles} from "@mui/styles";
import {IconButton, Stack, Typography} from "@mui/material";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import {CustomColor} from "../../MuiTheme";

const useStyles = makeStyles((theme) => ({
    dialogMessage: () => ({
        fontSize: '12px',
        textTransform: 'uppercase',
    }),


    dialogBox: () => ({
        backgroundColor: CustomColor.darkBg,
        border: "solid",
        borderWidth: "8px",
        borderImageSlice: 1,
        borderImageSource: 'linear-gradient(to bottom, #579AF7, #092274)',
        padding: 15
    }),

    dialogTitle: () => ({
        fontSize: "medium",
        fontWeight: "bold",
        marginBottom: 15
    }),

    dialogFooter: () => ({
        cursor: "pointer",
        fontSize: "small",
        marginTop: 15,
        textAlign: "end"
    })

}));


interface DialogBoxProps {
    messages: string[],
    title: string,
    onClose: () => void
}

const DialogBox = ({messages, title, onClose}: DialogBoxProps) => {
    const [currentMessage, setCurrentMessage] = useState(0);
    const classes = useStyles();

    const handleClick = useCallback(() => {
        if (currentMessage < messages.length - 1) {
            setCurrentMessage(currentMessage + 1);
        } else {
            setCurrentMessage(0);
            onClose()
        }
    }, [onClose, currentMessage, messages.length]);


    useEffect(() => {
        const handleKeyPressed = (e: any) => {
            if (['Enter', 'Space', 'Escape'].includes(e.code)) {
                handleClick();
            }
        };
        window.addEventListener('keydown', handleKeyPressed);

        return () => window.removeEventListener('keydown', handleKeyPressed);
    }, [handleClick]);


    return (
        <Stack className={classes.dialogBox} width={600} height={150}>
            <Stack width={"100%"} alignItems={"flex-start"}>
                <Typography variant={"h4"} color={CustomColor.fontYellow}>{title}</Typography>
                <Message message={messages[currentMessage]}/>
            </Stack>
            <Stack height={"100%"} justifyContent="flex-end"
                   alignItems="flex-end">
                <IconButton aria-label="next" onClick={handleClick} sx={{color: "white"}}>
                    <ArrowForwardIcon/>
                </IconButton>
            </Stack>
        </Stack>

    );
};
export default DialogBox;
