import React, { useEffect, useState } from 'react';
import style from './TreeNode.module.scss';
import Checkbox from '../../Form/FormControls/Checkbox/Checkbox';
import IconArrow from '@/assets/icons/svg/arrow.svg';
import MainButton from '@/components/Form/Button/MainButton.jsx';

const TreeNode = ({ node, onSelect, onExpand, expandedNodes, selectedNodes,SearchValue }) => {
  // const isExpanded = expandedNodes.includes(node.itemNodeID);
  const [isExpanded, setIsExpanded] = useState(expandedNodes.includes(node.itemNodeID));
  const isSelected = selectedNodes.some((el) => el.itemNodeID === node.itemNodeID);

  const handleNodeClick = () => {
    onSelect(node);
  };

  const handleExpandClick = () => {
    onExpand(node.itemNodeID);
    setIsExpanded(state => !state)
  };

  useEffect(() => {
    if (node && node.selected) {
      handleNodeClick(node);
    }
  }, [node]);

  const handleRecursiveSelect = () => {
    if (isSelected) {
      const unselectChildren = (node) => {
        onSelect(node);
        if (node.children && node.children.length > 0) {
          node.children.forEach((child) => {
            unselectChildren(child);
          });
        }
      };

      unselectChildren(node);
    } else {
      const selectChildren = (node) => {
        onSelect(node);
        if (node.children && node.children.length > 0) {
          node.children.forEach((child) => {
            selectChildren(child);
          });
        }
      };

      selectChildren(node);
    }
  };

  const SetNodeVisibilityState = (searchString) => {
    let visible = true

    if(!searchString || searchString.trim() == ''){
      visible = true
      return visible
    }

    if(searchString && 
        node.label.toLowerCase().split(' ').join('').trim().includes(searchString.toLowerCase().split(' ').join('').trim())
      ){
        visible = true
      }else{
        visible = false
      }


    return visible
  }

  // useEffect(() => {
  //   if (SearchValue && SearchValue.length) {
  //     setIsExpanded(true);
  //   }
  // }, [SearchValue]);

  return (
    <div className={
      SetNodeVisibilityState(SearchValue) ? style.visible : style.hidden
    }>
      <div className={style.nodeContent}>
        {node.children && node.children.length ? (
          <div
            className={`${style.collapseIcon} ${isExpanded ? style.expanded : ''}`}
            onClick={handleExpandClick}
          >
            <img src={IconArrow} alt="arrow" />
          </div>
        ) : (
          ''
        )}
        <div className={style.checkbox}>
          <Checkbox checked={isSelected} change={handleRecursiveSelect} />
        </div>
        <div className={style.nodeLabel}>
          <span>{node.label ?? '-'}</span>
        </div>
      </div>
      {node.children && (
        <ul
          className={`
            ${isExpanded ? style.expanded : style.collapsed}
            ${node.children ? style.withChildren : ''}
          `}
        >
          {node.children.map((child) => (
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

const TreeNodeDropdown = ({ data, onSelectionChange,SearchValue, WithApply,Apply }) => {
  const [expandedNodes, setExpandedNodes] = useState([]);
  const [selectedNodes, setSelectedNodes] = useState([]);

  const handleNodeSelect = (node) => {
    const selectNodeAndChildren = (node, isSelected) => {
      if (isSelected) {
        setSelectedNodes((prevSelectedNodes) => [...prevSelectedNodes, node]);
      } else {
        setSelectedNodes((prevSelectedNodes) =>
          prevSelectedNodes.filter((el) => el.itemNodeID !== node.itemNodeID)
        );
      }
      if (node.children && node.children.length > 0) {
        node.children.forEach((child) => {
          selectNodeAndChildren(child, isSelected);
        });
      }
    };

    const isSelected = selectedNodes.some((el) => el.itemNodeID === node.itemNodeID);

    if (isSelected) {
      selectNodeAndChildren(node, false);
    } else {
      selectNodeAndChildren(node, true);
    }
  };

  const handleNodeExpand = (nodeId) => {
    const isExpanded = expandedNodes.includes(nodeId);

    if (isExpanded) {
      setExpandedNodes((prevExpandedNodes) => prevExpandedNodes.filter((id) => id !== nodeId));
    } else {
      setExpandedNodes((prevExpandedNodes) => [...prevExpandedNodes, nodeId]);
    }
  };

  const handleSelectionChange = () => {
    onSelectionChange(selectedNodes);
  };

  const handleSelectAll = () => {
    const flattenNodes = (nodes) => {
      let flattened = [];
      nodes.forEach((node) => {
        flattened.push(node);
        if (node.children && node.children.length > 0) {
          flattened = flattened.concat(flattenNodes(node.children));
        }
      });
      return flattened;
    };

    const allNodes = flattenNodes(data);
    setSelectedNodes(allNodes);
  };

  const handleClearAll = () => {
    setSelectedNodes([]);
  };

  useEffect(() => {
    handleSelectionChange();
  }, [selectedNodes]);

  const renderTreeNodes = (nodes) => {
    return nodes.map((node) => (
      <li key={node.itemNodeID}>
        <TreeNode
          node={node}
          onSelect={handleNodeSelect}
          onExpand={handleNodeExpand}
          expandedNodes={expandedNodes}
          selectedNodes={selectedNodes}
          SearchValue={SearchValue}
        />
      </li>
    ));
  };

  return (
    <div>
      <ul>{renderTreeNodes(data)}</ul>
      <div className={style.bottomActions}>
        <div className={style.selectActions}>
          <div className={style.selectAll} onClick={handleSelectAll}>
            <span>Select All</span>
          </div>
          <div className={style.clearAll} onClick={handleClearAll}>
            <span>Clear All</span>
          </div>
        </div>
        {
          WithApply && (
            <div className={style.apply}>
              <MainButton
                label={'APPLY'}
                type={'background'}
                size={'small'}
                customStyle={{ background: '#00ADEE', width: '100%' }}
                onClick={() => Apply()}
              />
            </div>
          )
        }
      </div>
    </div>
  );
};

export default TreeNodeDropdown;
