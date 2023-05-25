import React, { useEffect, useState } from 'react';
import style from './TreeNode.module.scss'
import Checkbox from '../../Form/FormControls/Checkbox/Checkbox';
import IconArrow from '@/assets/icons/svg/arrow.svg'

const TreeNode = ({ node, onSelect, onExpand, expandedNodes, selectedNodes }) => {
  const isExpanded = expandedNodes.includes(node.id);
  const isSelected = selectedNodes.includes(node.id);

  const handleNodeClick = () => {
    onSelect(node.id);
  };

  const handleExpandClick = () => {
    onExpand(node.id);
  };

  return (
    <div>
        <div className={style.nodeContent}>
            {
                (node.children && node.children.length) ? (
                    <div className={style.collapseIcon} onClick={handleExpandClick}>
                        <img src={IconArrow} alt="arrow" />
                    </div>
                )
                : ''
            }
            <div className={style.checkbox}>
                <Checkbox 
                    checked={isSelected}
                    change={() => handleNodeClick()}
                />
            </div>
            <div className={style.nodeLabel}>
                <span>
                    {node.label ?? '-'}
                </span>
            </div>
        {/* {node.children && <button onClick={handleExpandClick}> {isExpanded ? 'Collapse' : 'Expand'} </button>} 
        {node.label} {isSelected ? ' (selected)' : ''}
        <button onClick={handleNodeClick} > select </button> */}
      </div>
      {isExpanded && node.children && (
        <ul>
          {node.children.map(child => (
            <li key={child.id}>
              <TreeNode
                node={child}
                onSelect={onSelect}
                onExpand={onExpand}
                expandedNodes={expandedNodes}
                selectedNodes={selectedNodes}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const MultiSelectTreeDropdown = ({ data, onSelectionChange }) => {
  const [expandedNodes, setExpandedNodes] = useState([]);
  const [selectedNodes, setSelectedNodes] = useState([]);

  const handleNodeSelect = nodeId => {
    const isSelected = selectedNodes.includes(nodeId);

    if (isSelected) {
      setSelectedNodes(selectedNodes.filter(id => id !== nodeId));
    } else {
      setSelectedNodes([...selectedNodes, nodeId]);
    }
  };

  const handleNodeExpand = nodeId => {
    const isExpanded = expandedNodes.includes(nodeId);

    if (isExpanded) {
      setExpandedNodes(expandedNodes.filter(id => id !== nodeId));
    } else {
      setExpandedNodes([...expandedNodes, nodeId]);
    }
  };

  const handleSelectionChange = () => {
    onSelectionChange(selectedNodes);
  };

  useEffect(() => {
    handleSelectionChange()
  },[selectedNodes])

  const renderTreeNodes = nodes => {
    return nodes.map(node => (
      <li key={node.id}>
        <TreeNode
          node={node}
          onSelect={handleNodeSelect}
          onExpand={handleNodeExpand}
          expandedNodes={expandedNodes}
          selectedNodes={selectedNodes}
        />
      </li>
    ));
  };

  return (
    <div>
      {/* handleSelectionChange */}
      <ul>{renderTreeNodes(data)}</ul>
    </div>
  );
};

export default MultiSelectTreeDropdown;
