import '@/views/ViewsCommon/common.scss'
import { useRef, useState } from 'react'
import PropsDoc from '@/localComponents/PropsDoc.jsx'
import TreeNodeDropdown from '@/components/Reusable/Tree/TreeNode.jsx'
import { Data } from '@/utils/Data.js'
const TreeNodeView = () => {
    const [renderFlag,setRenderFlag] = useState(false)
    const [data,setData] = useState(Data.Tree)
    const [treeData,setTreedata] = useState(Data.TreeExtended)
    const [SelectedNodes,setSelectedNodes] = useState([])

    const handleSelectionChange = selectedNodes => {
        setSelectedNodes(selectedNodes)
      };

    const propsList =[
        {
            title: 'Props Name',
            description: 'Description',
            type: 'Type',
            example: 'Example',
            header: true
        },
        {
            title: 'data',
            description: 'TreeNode Data',
            type: 'Array / Tree JSON',
        },
        {
            propType:'event',
            title: 'onSelectionChange',
            description: 'Returns Selection Array',
            type: 'function',
        },
    ]

    const componentTypes = useRef(
        [
            {
                title: 'Recursive Tree Nodes',
            },
        ]
    )

    return (
        <div className="docs__components_preview">
            <div className="docs__components_label">
                <h1>
                    Component Import Name : <span> TreeNode </span>
                </h1>
            </div>
            <div className="docs__component_wrapper comp__button">
                {
                    componentTypes && componentTypes.current.map((c,ind) => {
                        return (
                            <div 
                                className="docs__single_component" 
                                key={ind}
                            >
                                {
                                    c.title && (
                                        <h5>
                                            {c.title}
                                        </h5>
                                    )
                                }
                                <TreeNodeDropdown 
                                    data={treeData}
                                    onSelectionChange={handleSelectionChange}
                                />

                            </div>
                        )
                    })
                }

            </div>

            <div className="docs__component_static_preview_props">
                <PropsDoc propsList={propsList} />
            </div>
        </div>
    )
}

export default TreeNodeView
