import { ReactNode, useState } from "react";
import OverlayComponent from "../components/OverlayComponent";

interface OverlayState {
    show: boolean;
    component?: ReactNode;
}

const useOverlay = (
    overlayDurationMillis: number
): [OverlayState, (text: string, children?: ReactNode) => void] => {
    const [overlayState, setOverlay] = useState<OverlayState>({
        show: false,
    });

    const triggerOverlay = (text: string, children?: ReactNode) => {
        // console.log("overlay called");

        const component = <OverlayComponent text={text} children={children}/>;
        setOverlay({ show: true, component: component });
        // console.log(text);

        setTimeout(() => {
            setOverlay({ show: false });
        }, overlayDurationMillis);
    };

    return [overlayState, triggerOverlay];
};

export default useOverlay;
