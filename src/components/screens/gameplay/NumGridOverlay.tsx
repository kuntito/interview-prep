import { Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import GameEndStatus from "../../../models/GameEndStatus";
import useAppStore from "../../../state-management/appStore";
import useGamePlayStore from "../../../state-management/gamePlayStore";
import OverlayComp from "./OverlayComp";

interface Props {
    beforeDismissOverlay: () => void;
    onGameOver: () => void;
}

const NumGridOverlay = ({ beforeDismissOverlay, onGameOver }: Props) => {
    const gameEndStatus = useGamePlayStore((s) => s.state.endStatus);

    const overlayDurationMillis = useAppStore(
        (s) => s.state.config.overlayDurationMillis
    );

    const [show, setShow] = useState(false);
    useEffect(() => {
        console.log(`game end status is ${gameEndStatus}`);
        
        if (gameEndStatus) {            
            setShow(true);
            setTimeout(() => {
                setShow(false);

            }, overlayDurationMillis);

            // just before the overlay disappears
            setTimeout(() => {
                if (gameEndStatus === GameEndStatus.GameOver) {
                    onGameOver();
                } else {
                    beforeDismissOverlay();
                }
            }, overlayDurationMillis * 0.8);
            
        }
    }, [gameEndStatus]);

    const content = gameEndStatus ? getContent(gameEndStatus) : "";

    return show ? <OverlayComp>{content}</OverlayComp> : "";
};

export default NumGridOverlay;

const getContent = (gameEndStatus: GameEndStatus) => {
    switch (gameEndStatus) {
        case GameEndStatus.CorrectAnswer: {
            return (
                <>
                    <Text>correct!</Text>
                </>
            );
        }
        case GameEndStatus.TimeUp: {
            return (
                <>
                    <Text>time up!</Text>
                </>
            );
        }
        case GameEndStatus.GameOver: {
            return (
                <>
                    <Text>game over!</Text>
                </>
            );
        }
    }
};
