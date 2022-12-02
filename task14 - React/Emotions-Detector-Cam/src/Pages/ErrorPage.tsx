import {
  isRouteErrorResponse,
  useNavigate,
  useRouteError,
} from "react-router-dom";

import { Box, Button, Typography } from "@mui/material";
import { blue } from "@mui/material/colors";

export default function Error() {
  const error = useRouteError();
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "90vh",
        backgroundColor: blue[500],
      }}
    >
      <Typography variant="h1" style={{ color: "white" }}>
        {isRouteErrorResponse(error) && (
          <div>
            <h1>Oops!</h1>
            <h2>{error.status}</h2>
            <p>{error.statusText}</p>
            {error.data?.message && <p>{error.data.message}</p>}
            <Button onClick={() => navigate("/")} variant="contained">
              Go home
            </Button>
          </div>
        )}
      </Typography>
    </Box>
  );
}
