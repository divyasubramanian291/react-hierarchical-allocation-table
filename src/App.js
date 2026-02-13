import React, { useState, useEffect } from "react";
import initialData from "./data/initialData";
import HierarchicalTable from "./components/HierarchicalTable";
import {
  clone,
  updateNode,
  recalcParentValues,
  distributeToChildren,
  round
} from "./utils/treeHelpers";

import {
  Container,
  Typography,
  Button,
  Box,
  Snackbar,
  Alert
} from "@mui/material";

function App() {
  const [data, setData] = useState(() => {
    const saved = localStorage.getItem("hierarchicalData");
    return saved ? JSON.parse(saved) : initialData;
  });

  const [inputs, setInputs] = useState({});

  const [toast, setToast] = useState({
    open: false,
    message: "",
    severity: "success"
  });

  useEffect(() => {
    localStorage.setItem("hierarchicalData", JSON.stringify(data));
  }, [data]);

  const setInput = (id, value) => {
    setInputs((prev) => ({ ...prev, [id]: value }));
  };

  const showToast = (message, severity) => {
    setToast({
      open: true,
      message,
      severity
    });
  };

  const handlePercent = (id) => {
    const percent = parseFloat(inputs[id]);

    if (isNaN(percent) || percent <= 0) {
      showToast("Please enter a valid positive number", "error");
      return;
    }

    let updated = clone(data);

    updated = updateNode(updated, id, (node) => {
      const newValue = round(node.value + (node.value * percent) / 100);

      if (node.children) {
        return distributeToChildren(node, newValue);
      }

      return { ...node, value: newValue };
    });

    updated = recalcParentValues(updated);
    setData(updated);

    setInputs((prev) => {
      const updatedInputs = { ...prev };
      delete updatedInputs[id];
      return updatedInputs;
    });

    showToast("Updated successfully", "success");
  };

  const handleValue = (id) => {
    const newVal = parseFloat(inputs[id]);

    if (isNaN(newVal) || newVal <= 0) {
      showToast("Please enter a valid positive number", "error");
      return;
    }

    let updated = clone(data);

    updated = updateNode(updated, id, (node) => {
      if (node.children) {
        return distributeToChildren(node, round(newVal));
      }

      return { ...node, value: round(newVal) };
    });

    updated = recalcParentValues(updated);
    setData(updated);

    setInputs((prev) => {
      const updatedInputs = { ...prev };
      delete updatedInputs[id];
      return updatedInputs;
    });

    showToast("Updated successfully", "success");
  };

  const resetData = () => {
    localStorage.removeItem("hierarchicalData");
    setData(initialData);
    showToast("Data reset successfully", "info");
  };

  return (
    <Container maxWidth={false} disableGutters sx={{ mt: 3, px: 4 }}>
      <Typography variant="h5" align="center" gutterBottom>
        Hierarchical Sales Table
      </Typography>

      <Box display="flex" justifyContent="center" mb={2}>
        <Button
          variant="contained"
          color="error"
          onClick={resetData}
          sx={{
            borderRadius: "20px",
            textTransform: "none",
            transition: "0.3s",
            "&:hover": {
              transform: "scale(1.05)"
            }
          }}
        >
          Reset
        </Button>
      </Box>

      <HierarchicalTable
        data={data}
        inputs={inputs}
        setInput={setInput}
        handlePercent={handlePercent}
        handleValue={handleValue}
      />

      <Snackbar
        open={toast.open}
        autoHideDuration={3000}
        onClose={() => setToast({ ...toast, open: false })}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          severity={toast.severity}
          onClose={() => setToast({ ...toast, open: false })}
          sx={{ width: "100%" }}
        >
          {toast.message}
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default App;
