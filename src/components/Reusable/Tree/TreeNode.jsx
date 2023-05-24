import { useEffect, useState } from "react";
import style from './TreeNode.module.scss'
import IconArrow from '@/assets/icons/svg/arrow.svg'
import Checkbox from "../../Form/FormControls/Checkbox/Checkbox";

const Tree = ({ data }) => {

    const syncNode = (state,id) => {

    }

  return (
    <ul>
      {data.map((node,ind) => (
        <TreeNode key={ind} node={node} nodeUpdate={(state,id) => syncNode(state,id)} />
      ))}
    </ul>
  );
};

const TreeNode = ({ node,nodeUpdate }) => {
  const hasChildren = node.children && node.children.length > 0;
  const [expanded, setExpanded] = useState(false);
  const [NodeSelected,setNodeSelected] = useState(node.selected)

  useEffect(() => {
    setNodeSelected(node.selected)
  },[node])

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  const NodeSelectionChange = () => {
    setNodeSelected(state)
    nodeUpdate(state,node.id)
  }

  return (
    <li>
        <div className={style.nodeContent}>
            {
                hasChildren && (
                    <div className={ `${style.collapseIcon} ${expanded ? style.expanded : ''} `} onClick={toggleExpand}>
                        <img src={IconArrow} alt="" />
                    </div>
                )
            }

            <div className={style.checkbox}>
                <Checkbox 
                    checked={NodeSelected}
                    change={(state) => NodeSelectionChange(state}
                />
            </div>

            <span>
                {node.label}
            </span>
        </div>
        {hasChildren && expanded && (
            <Tree data={node.children} />
        )}
    </li>
  );
};

export default Tree;
