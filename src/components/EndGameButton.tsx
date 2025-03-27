import { Center, Image, Tooltip } from "@chakra-ui/react";
import CloseIcon from "../assets/ic_close.svg";

const EndGameButton = () => {
    return (
        <Center boxSize={"30px"}>
            {/* <Tooltip label={"end game"}> */}
                <Image
                    cursor="pointer"
                    opacity={0.8}
                    boxSize="24px"
                    transition="all 0.2s ease-in-out"
                    _hover={{ opacity: 1, transform: "scale(1.2)" }}
                    src={CloseIcon}
                />
            {/* </Tooltip> */}
        </Center>
    );
};

export default EndGameButton;
