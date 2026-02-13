import React from "react";

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
          ((node.value - node.originalValue) / node.originalValue) *
          100
        ).toFixed(2);

  return (
    <>
      <tr>
        <td style={{ paddingLeft: `${level * 20}px` }}>
          {level > 0 && "-- "} {node.label}
        </td>

        <td>{node.value}</td>

        <td>
          <input
            type="number"
            value={inputs[node.id] || ""}
            onChange={(e) => setInput(node.id, e.target.value)}
          />
        </td>

        <td>
          <button onClick={() => handlePercent(node.id)}>
            Allocation %
          </button>
        </td>

        <td>
          <button onClick={() => handleValue(node.id)}>
            Allocation Val
          </button>
        </td>

        <td>{variance}%</td>
      </tr>

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
