// import { useEffect, useState } from "react";
// import style from './TreeNode.module.scss'
// import IconArrow from '@/assets/icons/svg/arrow.svg'
// import Checkbox from "../../Form/FormControls/Checkbox/Checkbox";

// const Tree = ({ data,selectedItems}) => {
    
//     const [SelectedNodes,setSelectedNodes] = useState([])

//     const syncNode = (selected,obj) => {
//         if(selected){
//             setSelectedNodes([...SelectedNodes,obj])

//         }else{
//             setSelectedNodes(
//                 SelectedNodes.filter(el => el.id !== obj.id)
//             )
//         }
//         selectedItems(SelectedNodes)
//     }

//   return (
//     <ul>
//       {data.map((node,ind) => (
//         <TreeNode
//             key={ind} 
//             node={node}
//             selectedNodes={SelectedNodes}
//             nodeUpdate={(state,obj) => syncNode(state,obj)}
//             selectedItems={(arr) => selectedItems(arr)}
//         />
//       ))}
//     </ul>
//   );
// };

// const TreeNode = ({ node,selectedNodes,nodeUpdate }) => {
//   const hasChildren = node.children && node.children.length > 0;
//   const [expanded, setExpanded] = useState(false);
//   const [NodeSelected,setNodeSelected] = useState(false)

//   useEffect(() => {
//     if(selectedNodes.some(el => el.id === node.id)){
//         setNodeSelected(true)
//     }else{
//         setNodeSelected(false)
//     }
//   },[node])

//   const toggleExpand = () => {
//     setExpanded(!expanded);
//   };

//   const NodeSelectionChange = (state) => {
//     setNodeSelected(state)
//     nodeUpdate(state,node)
//   }

//   return (
//     <li>
//         <div className={style.nodeContent}>
//             {
//                 hasChildren && (
//                     <div className={ `${style.collapseIcon} ${expanded ? style.expanded : ''} `} onClick={toggleExpand}>
//                         <img src={IconArrow} alt="" />
//                     </div>
//                 )
//             }

//             <div className={style.checkbox}>
//                 <Checkbox 
//                     checked={NodeSelected}
//                     change={(state) => NodeSelectionChange(state)}
//                 />
//             </div>

//             <span>
//                 {node.label}
//             </span>
//         </div>
//         {hasChildren && expanded && (
//             <Tree data={node.children} />
//         )}
//     </li>
//   );
// };

// export default Tree;
