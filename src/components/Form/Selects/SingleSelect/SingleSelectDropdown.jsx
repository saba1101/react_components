import './SingleSelectDropdown.scss'
import IconArrow from '@/assets/icons/svg/arrow.svg'

const SingleSelectDropdown = ({
    label,
}) => {
    return (
        <div className="component-single-select-wrapper">
            <div className="select-container">
                <div className="label">
                    <span> { label ?? 'Label' } </span>
                </div>
                <div className="selected-option">

                </div>
                <div className="collapse-action">

                </div>
            </div>
            <div className="collapsable-options">
                <ul>

                </ul>
            </div>
        </div>
    )
}

export default SingleSelectDropdown