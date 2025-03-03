import useNumGridStore from "../../state-management/numGridStore";
import { Text, Button } from "@chakra-ui/react";

const EndScreen = () => {
    const score = useNumGridStore((s) => s.state.score);
    const totalQuestions = useNumGridStore(
        (s) => s.state.config!.totalQuestions
    );

    const percentage = Math.round((score / totalQuestions) * 100);

    return (
        <>
            <Text>{`score: ${percentage}%`}</Text>
            <Button background="palette.100" onClick={() => {}}>
                replay?
            </Button>
        </>
    );
};

export default EndScreen;
