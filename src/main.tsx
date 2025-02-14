import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";

const colors = {
    palette: {
        500: "#598392",
        100: "#060631",
    },
};

const theme = extendTheme({
    colors,
    components: {
        Progress: {
            baseStyle: {
                filledTrack: {
                    bg: "palette.100",
                },
                track: {
                    bg: "palette.500",
                },
            },
        },
    },
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <ChakraProvider theme={theme}>
            <App />
        </ChakraProvider>
    </React.StrictMode>
);
