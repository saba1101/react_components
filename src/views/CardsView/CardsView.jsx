import '@/views/ViewsCommon/common.scss'
import { useRef, useState } from 'react'
import PropsDoc from '@/localComponents/PropsDoc.jsx'
import Card from '@/components/Cards/SingleCard/Card.jsx'
import Info from '@/assets/svgComponents/Info.jsx'
import { useDispatch, useSelector } from "react-redux"

const CardsView = () => {
    const Theme = useSelector(state => state.ThemeStore)
    const [renderFlag,setRenderFlag] = useState(false)
    const Actions = [
        {
            label: 'Edit',
            type: 'edit',
            icon: () => null,
        },
        {
            label: 'Delete',
            type: 'delete',
            icon: () => null,
            event: (type,data) => {console.log(type,data)}
        }
    ]

    const propsList =[
        {
            title: 'Props Name',
            description: 'Description',
            type: 'Type',
            example: 'Example',
            header: true,
        },

        {
            title: 'mode',
            description: 'Card Mode, customTemplate = bottom content slot',
            type: 'String/Default multipleItems',
            example: "choose one from (multipleItems,singleItem,customTemplate)"
        },
        {
            title: 'id',
            description: 'Card ID',
            type: 'Number/String',
            example: ""
        },
        {
            title: 'title',
            description: 'Card Title',
            type: 'String',
            example: ""
        },
        {
            title: 'subTitle',
            description: 'Card Sub Title',
            type: 'String',
            example: ""
        },
        {
            title: 'description',
            description: 'Card Description',
            type: 'String',
            example: ""
        },
        {
            title: 'items',
            description: 'if Card mode is multipleItems use items props',
            type: 'Array of Strings',
            example: "['Item1, Item2, Item3,.....']"
        },
        {
            title: 'itemsCount',
            description: 'custom hidden items Count',
            type: 'String/Number',
        },
        {
            title: 'item',
            description: 'if Card mode is singleItem use item props, which is object and must include label, icon(React Component,function), selected(Boolean)',
            type: 'Object',
            example: `{
                label: 'Games',
                icon: Info,
                selected: true,
            }`
        },
        {
            title: 'actions',
            description: 'card custom Actions',
            type: 'Array',
            example: `
                [
                    {
                        label: 'Delete',
                        type: 'delete',
                        icon: () => icon(),
                        (rawSvg: Boolean, if svg is raw string and not react component,)
                        event: (type,data) => {....}
                    }
                ]
            `
        },
        {
            title: 'actionsVisible',
            description: 'Actions Dropdown Controller',
            type: 'Boolean',
            example: ""
        },
        {
            title: 'alignActions',
            description: 'align action Position',
            type: 'String',
            example: "right | left ... default is left"
        },
        {
            propType:'event',
            title: 'onExpand',
            description: 'returns actionsVisible State Boolean',
            type: 'function',
            example: ""
        },
        {
            propType:'event',
            title: 'onToggleChange',
            description: 'returns Toggle Selected State Boolean',
            type: 'function',
            example: ""
        },
        {
            propType:'event',
            title: 'onClick',
            description: 'returns event When card is clicked, if id is provided in props, id will be returned',
            type: 'function',
            example: ""
        },
        {
            propType:'event',
            title: 'onDelete',
            description: 'returns event from Default Custom Actions',
            type: 'function',
            example: `
                onDelete={ (type,id) => {....} }
            `
        },
        {
            propType:'event',
            title: 'onEdit',
            description: 'returns event from Default Custom Actions',
            type: 'function',
            example: `
                onEdit={ (type,id) => {....} }
            `
        },

    ]

    const componentTypes = useRef(
        [
            {
                title: 'Default Card',
                subTitle: 'Card Sub Title',
                description: 'Card Description',
                items: ['Floort 3 - In/Out','item - 4 In/Out','item - 4 In/Out','item - 4 In/Out','item - 4 In/Out'],
                // actions: JSON.parse(JSON.stringify(Actions)),
                actionsVisible: false,
                id:1,
            },
            {
                mode: "singleItem",
                title: 'With Single Item Mode',
                subTitle: 'Card Sub Title',
                description: 'Card Description',
                item: {
                    label: 'Games',
                    icon: Info,
                    selected: true,
                },
                actions: JSON.parse(JSON.stringify(Actions)),
                actionsVisible: false,
                id:1,
            },
            {
                mode: "singleItem",
                title: 'Long Texts, Overflowed Texts',
                subTitle: '"But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No',
                description: 'complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No',
                item: {
                    label: 'Games',
                    icon: Info,
                    selected: true,
                },
                actions: JSON.parse(JSON.stringify(Actions)),
                actionsVisible: false,
                id:1,
            },
            {
                mode: "multipleItems",
                title: 'Without SubTitle',
                description: 'complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No',
                items: ['Floort 3 - In/Out','item - 4 In/Out','item - 4 In/Out','item - 4 In/Out','item - 4 In/Out'],
                actions: JSON.parse(JSON.stringify(Actions)),
                actionsVisible: false,
                id:1,
            },
            {
                mode: "multipleItems",
                title: 'With Color',
                description: 'complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No',
                items: ['Floort 3 - In/Out','item - 4 In/Out','item - 4 In/Out','item - 4 In/Out','item - 4 In/Out'],
                actions: JSON.parse(JSON.stringify(Actions)),
                alignActions:"right",
                actionsVisible: false,
                id:1,
                color: '#EA8DC5'
            },
        ]
    )

    return (
        <div className="docs__components_preview">
            <div className="docs__components_label">
                <h1>
                    Component Import Name : <span> Card </span>
                </h1>
            </div>
            <div className="docs__component_wrapper">
                {
                    componentTypes && componentTypes.current.map((c,ind) => {
                        return (
                            <div 
                                className="docs__single_component" 
                                key={ind}
                            >

                            <Card
                                mode={c.mode}
                                title={c.title}
                                subTitle={c.subTitle}
                                description={c.description}
                                items={c.items}
                                item={c.item}
                                actions={c.actions}
                                onExpand={(state) => (c.actionsVisible = state,setRenderFlag(state => !state))}
                                onOutsideClick={(state) => (c.actionsVisible = state,setRenderFlag(state => !state))}
                                actionsVisible={c.actionsVisible}
                                id={c.id}
                                onToggleChange={(state) => (c.item.selected = state,setRenderFlag(state => !state))}
                                color={c.color}
                                alignActions={c.alignActions}
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

export default CardsView
