import React, { useMemo } from "react";
import HierarchicalTableRow from "./HierarchicalTableRow";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  TableContainer
} from "@mui/material";

const HierarchicalTable = ({
  data,
  inputs,
  setInput,
  handlePercent,
  handleValue
}) => {
  const grandTotal = useMemo(
    () => data.reduce((sum, node) => sum + node.value, 0),
    [data]
  );

  return (
    <TableContainer component={Paper} sx={{ width: "100%" }}>
      <Table sx={{ minWidth: "100%" }}>
        <TableHead>
          <TableRow>
            <TableCell><strong>Label</strong></TableCell>
            <TableCell><strong>Value</strong></TableCell>
            <TableCell><strong>Input</strong></TableCell>
            <TableCell><strong>Allocation %</strong></TableCell>
            <TableCell><strong>Allocation Val</strong></TableCell>
            <TableCell><strong>Variance %</strong></TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {data.map((node) => (
            <HierarchicalTableRow
              key={node.id}
              node={node}
              level={0}
              inputs={inputs}
              setInput={setInput}
              handlePercent={handlePercent}
              handleValue={handleValue}
            />
          ))}

          <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
            <TableCell><strong>Grand Total</strong></TableCell>
            <TableCell><strong>{grandTotal}</strong></TableCell>
            <TableCell colSpan={4} />
          </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default HierarchicalTable;
