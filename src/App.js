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
import "./App.css";

function App() {
  const [data, setData] = useState(() => {
    const saved = localStorage.getItem("hierarchicalData");
    return saved ? JSON.parse(saved) : initialData;
  });

  const [inputs, setInputs] = useState({});

  useEffect(() => {
    localStorage.setItem("hierarchicalData", JSON.stringify(data));
  }, [data]);

  const setInput = (id, value) => {
    setInputs((prev) => ({ ...prev, [id]: value }));
  };

  const handlePercent = (id) => {
    const percent = parseFloat(inputs[id]);
    if (isNaN(percent)) return;

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
  };

  const handleValue = (id) => {
    const newVal = parseFloat(inputs[id]);
    if (isNaN(newVal)) return;

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
  };

  const resetData = () => {
    localStorage.removeItem("hierarchicalData");
    setData(initialData);
  };

  return (
    <div className="container">
      <h2>Hierarchical Sales Table</h2>
      <button onClick={resetData} className="reset">
        Reset
      </button>
      <HierarchicalTable 
        data={data}
        inputs={inputs}
        setInput={setInput}
        handlePercent={handlePercent}
        handleValue={handleValue}
      />
    </div>
  );
}

export default App;
