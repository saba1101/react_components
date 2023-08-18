import '@/views/ViewsCommon/common.scss'
import { useRef, useState } from 'react'
import PropsDoc from '@/localComponents/PropsDoc.jsx'
import SingleTag from '@/components/Tags/SingleTag/SingleTag.jsx'

const TagsView = () => {

    const [renderFlag,setRenderFlag] = useState(false)

    const propsList =[
        {
            title: 'Props Name',
            description: 'Description',
            type: 'Type',
            example: 'Example',
            header: true
        },
        {
            title: 'id',
            type: 'Any',
            description: 'Tag ID',
        },
        {
            title: 'type',
            type: 'String',
            description: 'Tag Defined Style',
            example: 'gray | red | purple | coolBlue | blue | yellow | green | hightContrast '
        },
        {
            title: 'withIcon',
            type: 'Boolean/Default True',
            description: 'Default Label Icon',
        },
        {
            title: 'allowDelete',
            type: 'Boolean',
            description: 'Delete Icon and Event',
        },
        {
            title: 'label',
            type: 'String',
            description: 'Tag Label',
        },
        {
            title: 'withTooltip',
            type: 'Boolean',
            description: 'Tooltip On Label Hover',
        },
        {
            title: 'tooltipText',
            type: 'String',
            description: 'Tooltip Text/Default Tag Label',
        },
        {
            title: 'disabled',
            type: 'Boolean',
        },
        {
            propType: 'event',
            title: 'onDelete',
            type: 'Event',
            description: 'Event On Delete, Returns ID if provided',
            example: 'onDelete={(id) => ....}'
        },
    ]

    const componentTypes = useRef(
        [
            {
                id: 1,
                type: 'gray',
                icon: '',
                withIcon: true, 
                allowDelete: true,
                label: 'This is Tag',
                size: 'medium',
            },
            {
                id: 2,
                type: 'red',
                icon: '',
                withIcon: true, 
                allowDelete: true,
                label: 'This is Tag',
                size: 'medium',
            },
            {
                id: 3,
                type: 'purple',
                icon: '',
                withIcon: true, 
                allowDelete: true,
                label: 'This is Tag',
                size: 'medium',
            },
            {
                id: 4,
                type: 'coolBlue',
                icon: '',
                withIcon: true, 
                allowDelete: true,
                label: 'This is Tag',
                size: 'medium',
            },
            {
                id: 5,
                type: 'blue',
                icon: '',
                withIcon: true, 
                allowDelete: true,
                label: 'This is Tag',
                size: 'medium',
            },
            {
                id: 6,
                type: 'yellow',
                icon: '',
                withIcon: true, 
                allowDelete: true,
                label: 'This is Tag',
                size: 'medium',
            },
            {
                id: 7,
                type: 'green',
                icon: '',
                withIcon: true, 
                allowDelete: true,
                label: 'This is Tag',
                size: 'medium',
            },
            {
                id: 8,
                type: 'hightContrast',
                icon: '',
                withIcon: true, 
                allowDelete: true,
                label: 'This is Tag',
                size: 'medium',
            },
        ]
    )

    return (
        <div className="docs__components_preview">
            <div className="docs__components_label">
                <h1>
                    Component Import Name : <span> Tag </span>
                </h1>
            </div>
            <div className="docs__component_wrapper comp__tags">
                {
                    componentTypes && componentTypes.current.map((c,ind) => {
                        return (
                            <div 
                                className="docs__single_component" 
                                key={ind}
                            >
                                <SingleTag
                                    id={c.id}
                                    type={c.type}
                                    icon={c.icon}
                                    withIcon={c.withIcon}
                                    allowDelete={c.allowDelete}
                                    label={c.label}
                                    size={c.size}
                                    withTooltip={true}
                                />
                            </div>
                        )
                    })
                }
                {
                    componentTypes && componentTypes.current.map((c,ind) => {
                        return (
                            <div 
                                className="docs__single_component" 
                                key={ind}
                            >
                                <SingleTag
                                    id={c.id}
                                    type={c.type}
                                    icon={c.icon}
                                    withIcon={false}
                                    allowDelete={c.allowDelete}
                                    label={c.label}
                                    size={c.size}
                                />
                            </div>
                        )
                    })
                }

                {
                    componentTypes && componentTypes.current.map((c,ind) => {
                        return (
                            <div 
                                className="docs__single_component" 
                                key={ind}
                            >
                                <SingleTag
                                    id={c.id}
                                    type={c.type}
                                    icon={c.icon}
                                    withIcon={false}
                                    allowDelete={false}
                                    label={c.label}
                                    size={c.size}
                                />
                            </div>
                        )
                    })
                }

                {
                    componentTypes && componentTypes.current.map((c,ind) => {
                        return (
                            <div 
                                className="docs__single_component" 
                                key={ind}
                            >
                                <SingleTag
                                    id={c.id}
                                    type={c.type}
                                    icon={c.icon}
                                    withIcon={false}
                                    allowDelete={false}
                                    label={c.label}
                                    size={c.size}
                                    disabled={true}
                                />
                            </div>
                        )
                    })
                }

                {
                    componentTypes && componentTypes.current.map((c,ind) => {
                        return (
                            <div 
                                className="docs__single_component" 
                                key={ind}
                            >
                                <SingleTag
                                    id={c.id}
                                    type={c.type}
                                    icon={c.icon}
                                    withIcon={c.withIcon}
                                    allowDelete={c.allowDelete}
                                    label={c.label}
                                    size={c.size}
                                    disabled={true}
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

export default TagsView
