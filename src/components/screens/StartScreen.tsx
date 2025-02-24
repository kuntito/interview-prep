import { Button } from "@chakra-ui/react";
import React from "react";

interface Props {
    onStartGame: () => void;
}

const StartScreen = ({ onStartGame }: Props) => {
    return (
        <Button
            background="palette.100"
            onClick={() => {
                onStartGame()
            }}
        >
            start game
        </Button>
    );
};

export default StartScreen;
