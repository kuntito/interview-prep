import { Progress } from "@chakra-ui/react";
import { useEffect, useRef } from "react";

interface Props {
    fraction: number;
}

const ProgressBar = ({fraction}: Props) => {

    const percentage = fraction * 100;
    const animation = "width 1s linear";

    const prevFractionRef = useRef(fraction);

    useEffect(() => {
        prevFractionRef.current = fraction;
    }, [fraction]);

    const isDecreasing = fraction < prevFractionRef.current;

    return (
        <Progress
            borderRadius="full"
            border="2px"
            height="16px"
            borderColor="palette.100"
            width="100%"
            value={percentage}
            transition={isDecreasing ? animation: 'none'}
            sx={{
                "& > div": {
                    transition: isDecreasing ? animation: 'none',
                },
            }}
        />
    );
};

export default ProgressBar;