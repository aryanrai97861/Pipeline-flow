import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline, Box } from "@mui/material";
import { PipelineToolbar } from "./toolbar";
import { PipelineUI } from "./ui";
import { SubmitButton } from "./submit";
import { theme } from "./theme";
import { ReactFlowProvider } from "reactflow";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ReactFlowProvider>
        <div
          style={{
            minHeight: "100vh",
            borderRadius: "32px",
            background:
              "radial-gradient(ellipse at top left, #7B2FF2 0%, #F357A8 40%, #0F1117 100%)",
            padding: "24px",
            boxSizing: "border-box",
            margin: "0 auto",
            maxWidth: "98vw",
          }}
        >
          <Box
            sx={{
              height: "100vh",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <PipelineToolbar />
            <PipelineUI />
            <SubmitButton />
          </Box>
        </div>
      </ReactFlowProvider>
    </ThemeProvider>
  );
}

export default App;
