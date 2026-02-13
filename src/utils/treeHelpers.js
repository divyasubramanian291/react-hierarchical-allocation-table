export const round = (num) => Math.round(num * 100) / 100;

export const clone = (data) => JSON.parse(JSON.stringify(data));

export const recalcParentValues = (nodes) => {
  return nodes.map((node) => {
    if (node.children) {
      const updatedChildren = recalcParentValues(node.children);
      const total = updatedChildren.reduce((sum, c) => sum + c.value, 0);
      return { ...node, value: round(total), children: updatedChildren };
    }
    return node;
  });
};

export const updateNode = (nodes, id, callback) => {
  return nodes.map((node) => {
    if (node.id === id) {
      return callback(node);
    }

    if (node.children) {
      return {
        ...node,
        children: updateNode(node.children, id, callback)
      };
    }

    return node;
  });
};

export const distributeToChildren = (node, newValue) => {
  if (!node.children) return { ...node, value: newValue };

  const total = node.children.reduce((sum, c) => sum + c.value, 0);

  const updatedChildren = node.children.map((child) => {
    const ratio = child.value / total;
    const updatedValue = round(ratio * newValue);
    return distributeToChildren(child, updatedValue);
  });

  return { ...node, value: newValue, children: updatedChildren };
};
