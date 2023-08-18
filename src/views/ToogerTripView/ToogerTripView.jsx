import '@/views/ViewsCommon/common.scss'
import { useRef, useState } from 'react'
import PropsDoc from '@/localComponents/PropsDoc.jsx'
import ToogerTrip from '@/components/ToogerTrip/ToogerTrip.jsx'
import MainButton from '@/components/Button/MainButton.jsx'
import IconNotifier from '@/assets/svgComponents/IconNotifier.jsx'

const ToogerTripView = () => {

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
            description: 'Wrap Your Element inside <ToogerTrip> ELEMENT </ToogerTrip>',
            type: 'Slot',
        },
        {
            title: 'description',
            description: '',
            type: 'String',
        },
        {
            title: 'actionsTemplate',
            description: 'Component Has Default Actions,OverWrite it with actionsTemplate',
            type: 'Function/React Component',
        },
        {
            title: 'triggerClose',
            description: 'Trigger Close when Using actionsTemplate',
            type: 'Boolean',
        },
        {
            title: 'openPosition',
            description: 'Default is "bottom"',
            type: 'String',
            example: 'left | right | top | bottom'
        },
        {
            propType: 'event',
            title: 'onConfirm',
            description: 'Returns Event if actionsTemplate is null and Component is Using DefaultActions',
            type: 'Event',
            example: 'onConfirm={() => ...}'
        },
        {
            propType: 'event',
            title: 'onCancel',
            description: 'Returns Event if actionsTemplate is null and Component is Using DefaultActions',
            type: 'Event',
            example: 'onCancel={() => ...}'
        },
    ]

    const componentTypes = useRef(
        [
            {
                description: 'Lorem ipsum dolor sit amet, di os consectetur adipiscing elit, sed do eiusmod tempor incididunt ut fsil labore et dolore magna aliqua.',
                visible: false,
                openPosition: 'bottom',
                notifierIcon: true,
            },
            {
                description: 'Lorem ipsum dolor sit amet, di os consectetur adipiscing elit, sed do eiusmod tempor incididunt ut fsil labore et dolore magna aliqua.',
                visible: false,
                openPosition: 'left'
            },
            {
                description: 'Lorem ipsum dolor sit amet, di os consectetur adipiscing elit, sed do eiusmod tempor incididunt ut fsil labore et dolore magna aliqua.',
                visible: false,
                openPosition: 'right'
            },
            {
                description: 'Lorem ipsum dolor sit amet, di os consectetur adipiscing elit, sed do eiusmod tempor incididunt ut fsil labore et dolore magna aliqua.',
                visible: false,
                openPosition: 'top'
            },
            {
                description: 'Lorem ipsum dolor sit amet, di os consectetur adipiscing elit, sed do eiusmod tempor incididunt ut fsil labore et dolore magna aliqua.',
                visible: false,
                openPosition: 'bottom'
            },
            {
                description: 'Lorem ipsum dolor sit amet, di os consectetur adipiscing elit, sed do eiusmod tempor incididunt ut fsil labore et dolore magna aliqua.',
                visible: false,
                openPosition: 'bottom',
                notifierIcon: true,
                triggerClose: false,
                actionsTemplate: () => {
                    return (
                        <span
                            onClick={() => {
                                componentTypes.current[componentTypes.current.length - 1].triggerClose = !componentTypes.current[componentTypes.current.length - 1].triggerClose
                                setRenderFlag(state => !state)
                            }}
                            style={
                                {
                                    color : '#F16A6A',
                                    fontFamily: 'Roboto',
                                }
                            }
                        >
                            Custom Template
                        </span>
                    )
                }
            },
        ]
    )

    return (
        <div className="docs__components_preview">
            <div className="docs__components_label">
                <h1>
                    Component Import Name : <span>ToogerTrip</span>
                </h1>
            </div>
            <div className="docs__component_wrapper comp__toogerTrip">
                {
                    componentTypes && componentTypes.current.map((c,ind) => {
                        return (
                            <div 
                                className="docs__single_component" 
                                key={ind}
                            >

                            <ToogerTrip
                                description={c.description}
                                visible={c.visible}
                                openPosition={c.openPosition}
                                actionsTemplate={c.actionsTemplate}
                                triggerClose={c.triggerClose}
                                onConfirm={() => {
                                }}
                                onCancel={() => {
                                }}
                            >

                                {
                                    !c.notifierIcon ? (
                                        <MainButton 
                                            label={`Tooger Trip _${c.openPosition}`}
                                            type={'border'}
                                            size={'small'}
                                        />
                                    ): (
                                        <IconNotifier/>
                                    )
                                }
                            </ToogerTrip>                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     

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

export default ToogerTripView
