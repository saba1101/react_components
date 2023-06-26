import {  Tooltip } from 'antd';

const TooltipLabel = (
    {
        children,
        label,
        color,
        trigger,
        zIndex,
        placement
    }
) => {
    return (
        <Tooltip 
            title={label} 
            color={color} 
            destroyTooltipOnHide={true}
            trigger={trigger}
            zIndex={zIndex}
            placement={placement}
        >
            {children ? children : ''}
        </Tooltip>
    )
}

export default TooltipLabel