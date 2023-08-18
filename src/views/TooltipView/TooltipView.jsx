import '@/views/ViewsCommon/common.scss'
import { useRef, useState } from 'react'
import TooltipLabel from '@/components/Tooltip/Tooltip.jsx'
import PropsDoc from '@/localComponents/PropsDoc.jsx'

const SearchView = () => {

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
            title: 'children',
            description: 'Wrap you ELEMENT inside <TooltipLabel> ELEMENT </TooltipLabel>',
            type: 'Slot',
        },
        {
            title: 'label',
            description: 'Tooltip Label',
            type: 'String',
        },
        {
            title: 'color',
            description: 'Tooltip Background Color',
            type: 'String',
        },
        {
            title: 'placement',
            description: 'Tooltip placement / Default is Auto',
            type: 'String',
            example: 'left | right | top | topLeft | topRight | bottom | bottomLeft | bottomRight'
        },
        {
            title: 'trigger',
            description: 'Tooltip Trigger Actions / Default is Hover',
            type: 'Array',
            example: 'hover | focus | click | contextMenu'
        },
        {
            title: 'zIndex',
            description: 'Customize zIndex',
            type: 'Number',
        },
    ]

    const componentTypes = useRef(
        [
            {
                title: 'Default Small Text Tooltip',
                label: 'Default Small Text Tooltip',
                // color: '',
                // trigger:'',
            },
            {
                title: 'Default Long Text Tooltip',
                label: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?"',
                // color: '',
                // trigger:'',
            },
            {
                title: 'Modified Placement left',
                label: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?"',
                placement:'left'
                // color: '',
                // trigger:'',
            },
            {
                title: 'Modified Color Tooltip',
                label: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.',
                color: '#3FC699',
                // trigger:'',
            },
            {
                title: 'Trigger on Click',
                label: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.',
                trigger:['click'],
            },
        ]
    )

    return (
        <div className="docs__components_preview">
            <div className="docs__components_label">
                <h1>
                    Component Import Name : <span>Tooltip</span>
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

                            <TooltipLabel 
                                color={c.color} 
                                label={c.label}
                                trigger={c.trigger}
                                placement={c.placement}
                            >
                                <h2>
                                    {c.title}
                                </h2>
                            </TooltipLabel>

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

export default SearchView
