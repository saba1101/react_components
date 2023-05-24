import { useState } from "react"
import Input from "../../components/Form/Input/Input"
import './Home.scss'
import { Data } from "../../utils/Data"
import SingleSelectDropdown from "../../components/Form/Selects/SingleSelect/SingleSelectDropdown"
import MainButton from "../../components/Form/Button/MainButton"
import IconArrow from '@/assets/icons/svg/arrow.svg'
import Search from '../../components/Search/Search'
import Checkbox from "../../components/Form/FormControls/Checkbox/Checkbox"
import Toggle from "../../components/Form/FormControls/Toggle/Toggle"
import Radio from "../../components/Form/FormControls/Radio/Radio"
// import Tree from "../../components/Reusable/Tree/TreeNode"
import { createNotification } from "../../components/Notification/ToastNotification"

const Home  = () => {
    const [value,setValue]  = useState('')
    const [SelectedObj,setSelectedObj] = useState({})
    const [SelectedID,setSelectedID] = useState(17)
    const [SearchValue,setSearchValue] = useState('asfsfas')
    const [Checked,setChecked] = useState(true)
    const [CheckedToggle,setCheckedToggle] = useState(false)
    const [CheckedRadio,setCheckedRadio] = useState(false)
    
    const [treedata,setTreedata] = useState(Data.Tree)
    const [SelectedNodes,setSelectedNodes] = useState([])



    return (
        <div className="page-home-wrapper">
            {/* <div className="input-wrapper" style={{width: '365px'}}>
                <Input
                    onChange={(value) => setValue(value)}
                    value={value}
                    inputType="text"
                    size="medium"
                    label={'Input Label Placeholder'}
                    disabled={false}
                    isRequired={true}
                    msg={
                        {
                            type : 'error',
                            visible : false,
                            text : 'faasmfskfmaskfmasfafasfaklamkfa'
                        }
                    }
                />
            </div> */}

            <div className="select-wrapper margin" style={{width:'365px'}}>
                <SingleSelectDropdown 
                    label={'Select Option'}
                    size={'medium'}
                    isRequired={true}
                    data={Data.Plain}
                    selectedOptonID={SelectedID}
                    withFilter={false}
                    withClear={true}
                    closeOnSelect={false}
                    selected={(obj) => setSelectedObj(obj)}
                    msg={
                        {
                            type : 'error',
                            visible : false,
                            text : 'faasmfskfmaskfmasfafasfaklamkfa'
                        }
                    }
                />
            </div>

            {/* <div className="button-wrapper margin">
                <MainButton 
                    label={'Main Button'}
                    size={'medium'}
                    type={'background'}
                    disabled={false}
                    loading={true}
                />
            </div> */}

            {/* <div className="search-wrapper margin" style={{width: '240px'}}>
                <Search 
                    value={SearchValue}
                    change={(val) => setSearchValue(val)}
                    suggestions={['asd','dsfsa','gdsgsd','fsafmsakfmsafsmnas']}
                    withSuggestions={true}
                    size={'medium'}
                    placeholder={'Search...'}
                />
            </div> */}

            {/* <div className="checkbox-wrapper margin">
                <Checkbox
                    checked={Checked}
                    change={(state) => setChecked(state)}
                    disabled={false}
                    isRequired={false}
                    multipleChecked={false}
                />
            </div> */}

            {/* <div className="toggle-wrapper margin">
                <Toggle
                    checked={CheckedToggle}
                    change={(state) => setCheckedToggle(state)}
                    disabled={false}
                />
            </div> */}

            {/* <div className="radio-wrapper margin">
                <Radio 
                    checked={CheckedRadio}
                    change={(state) => setCheckedRadio(state)}
                    disabled={false}
                    isRequired={false}
                />
            </div> */}

            {/* <div className="tree-wrapper margin">
                <Tree 
                    data={treedata}
                    selectedItems={(arr) => setSelectedNodes(arr)}
                />
            </div> */}

            {/* <button
                onClick={() => {
                    createNotification('zdarova','success',3000,'top-right',3)
                }}
            >
                notify
            </button> */}

        </div>  
    )
}

export default Home