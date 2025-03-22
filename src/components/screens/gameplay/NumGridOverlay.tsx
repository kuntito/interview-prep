import React, { useEffect, useState } from "react";
import useGamePlayStore, {
    GameEndStatus,
} from "../../../state-management/gamePlayStore";
import { Text } from "@chakra-ui/react";
import OverlayComp from "./OverlayComp";
import useAppStore from "../../../state-management/appStore";

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
    }
};

const NumGridOverlay = () => {
    const gameEndStatus = useGamePlayStore((s) => s.state.gameEndStatus);

    const overlayDurationMillis = useAppStore(
        (s) => s.state.config.overlayDurationMillis
    );

    const [show, setShow] = useState(false);
    useEffect(() => {
        if (gameEndStatus) {            
            setShow(true);
            setTimeout(() => {
                setShow(false);

            }, overlayDurationMillis);
            
        }
    }, [gameEndStatus]);

    const content = gameEndStatus ? getContent(gameEndStatus) : "";

    return show ? <OverlayComp>{content}</OverlayComp> : "";
};

export default NumGridOverlay;
