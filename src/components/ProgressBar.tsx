import { Progress } from "@chakra-ui/react";
import ms from "ms";
import { useEffect, useState } from "react";

interface Props {
    fraction: number;
}

const ProgressBar = ({fraction}: Props) => {

    const percentage = fraction * 100;
    const animation = "width 1s linear";

    return (
        <Progress
            borderRadius="full"
            border="2px"
            height="16px"
            borderColor="palette.100"
            width="100%"
            value={percentage}
            transition={animation}
            sx={{
                "& > div": {
                    transition: animation,
                },
            }}
        />
    );
};

export default ProgressBar;
