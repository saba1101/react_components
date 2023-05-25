import React, { useEffect, useState } from 'react';
import style from './TreeNode.module.scss'
import Checkbox from '../../Form/FormControls/Checkbox/Checkbox';
import IconArrow from '@/assets/icons/svg/arrow.svg'

const TreeNode = ({ node, onSelect, onExpand, expandedNodes, selectedNodes }) => {
  const isExpanded = expandedNodes.includes(node.itemNodeID);
  const isSelected = selectedNodes.some(el => el.itemNodeID === node.itemNodeID)
//   const isSelected = selectedNodes.includes(node.itemNodeID);

  const handleNodeClick = () => {
    onSelect(node);
  };

  const handleExpandClick = () => {
    onExpand(node.itemNodeID);
  };

  useEffect(() => {
    if(node && node.selected){
        handleNodeClick(node)
    }
  },[node])

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
      </div>
      {node.children && (
        <ul
            className={`
                ${isExpanded ? style.expanded : style.collapsed}
                ${node.children ? style.withChildren : ''}
            `}
        >
          {node.children.map(child => (
            <li 
                className={`
                    ${isSelected ? style.selected : ''}
                `} 
                key={child.itemNodeID}
            >
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
      <li key={node.itemNodeID}>
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
