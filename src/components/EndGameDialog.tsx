import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogCloseButton,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogOverlay,
    Text,
} from "@chakra-ui/react";
import React, { useRef } from "react";

interface Props {
    isOpen: boolean;
    onClose: () => void;
}

const EndGameDialog = ({ isOpen, onClose }: Props) => {
    const cancelRef = useRef<HTMLButtonElement>(null);

    return (
        <AlertDialog
            motionPreset="slideInBottom"
            leastDestructiveRef={cancelRef}
            isOpen={isOpen}
            onClose={onClose}
            size={"sm"}
            isCentered
        >
            <AlertDialogOverlay />

            <AlertDialogContent background={"palette.100"}>
                <AlertDialogCloseButton />
                <AlertDialogHeader>
                    <Text align={"center"}>
                        quit?
                    </Text>
                </AlertDialogHeader>
                <AlertDialogBody>
                    <Text align={"center"}>
                        progress will be lost
                    </Text>
                </AlertDialogBody>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default EndGameDialog;
