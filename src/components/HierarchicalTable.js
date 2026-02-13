import React, { useMemo } from "react";
import HierarchicalTableRow from "./HierarchicalTableRow";

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
    <table>
      <thead>
        <tr>
          <th>Label</th>
          <th>Value</th>
          <th>Input</th>
          <th>Allocation %</th>
          <th>Allocation Val</th>
          <th>Variance %</th>
        </tr>
      </thead>
      <tbody>
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

        <tr className="grand">
          <td>Grand Total</td>
          <td>{grandTotal}</td>
          <td colSpan="4"></td>
        </tr>
      </tbody>
    </table>
  );
};

export default HierarchicalTable;
