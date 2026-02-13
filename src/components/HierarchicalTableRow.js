import React from "react";
import {
  TableRow,
  TableCell,
  Button,
  TextField
} from "@mui/material";

const HierarchicalTableRow = ({
  node,
  level,
  inputs,
  setInput,
  handlePercent,
  handleValue
}) => {
  const variance =
    node.originalValue === 0
      ? 0
      : (
          ((node.value - node.originalValue) /
            node.originalValue) *
          100
        ).toFixed(2);

  const inputValue = inputs[node.id];

  const hasError =
    inputValue !== undefined &&
    (isNaN(inputValue) || inputValue <= 0);

  return (
    <>
      <TableRow hover>
        <TableCell sx={{ pl: level * 4 }}>
          {node.label}
        </TableCell>

        <TableCell>{node.value}</TableCell>

        <TableCell>
          <TextField
            size="small"
            type="number"
            value={inputValue || ""}
            onChange={(e) => setInput(node.id, e.target.value)}
            error={hasError}
            helperText={hasError ? "Enter positive number" : ""}
          />
        </TableCell>

        <TableCell>
          <Button
            variant="contained"
            size="small"
            onClick={() => handlePercent(node.id)}
            sx={{
              borderRadius: "20px",
              textTransform: "none",
              transition: "0.3s",
              "&:hover": {
                transform: "scale(1.08)"
              }
            }}
          >
            Allocation %
          </Button>
        </TableCell>

        <TableCell>
          <Button
            variant="outlined"
            size="small"
            onClick={() => handleValue(node.id)}
            sx={{
              borderRadius: "20px",
              textTransform: "none",
              transition: "0.3s",
              "&:hover": {
                transform: "scale(1.08)"
              }
            }}
          >
            Allocation Val
          </Button>
        </TableCell>

        <TableCell>{variance}%</TableCell>
      </TableRow>

      {node.children &&
        node.children.map((child) => (
          <HierarchicalTableRow
            key={child.id}
            node={child}
            level={level + 1}
            inputs={inputs}
            setInput={setInput}
            handlePercent={handlePercent}
            handleValue={handleValue}
          />
        ))}
    </>
  );
};

export default HierarchicalTableRow;
