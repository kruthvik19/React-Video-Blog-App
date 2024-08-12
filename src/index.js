import React from "react";
import { createRoot } from "react-dom/client";
import App from './App.js';
import "./index.css";

import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import { BrowserRouter as Router } from "react-router-dom";
import { theme } from "./theme";

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
    <ChakraProvider>
        <ColorModeScript initialColorMode={theme.config.initialColorMode}/>
        <Router>
            <App />
        </Router>
    </ChakraProvider>
);
