// import { useState } from "react"
// import Input from "../../components/Form/Input/Input.jsx"
// import './Home.scss'
// import { Data } from "../../utils/Data.js"
// import SingleSelectDropdown from "../../components/Form/Selects/SingleSelect/SingleSelectDropdown.jsx"
// import MainButton from "@/components/Button/MainButton.jsx"
// import IconArrow from '@/assets/icons/svg/arrow.svg'
// import Search from '../../components/Search/Search.jsx'
// import Checkbox from "../../components/Form/FormControls/Checkbox/Checkbox.jsx"
// import Toggle from "../../components/Form/FormControls/Toggle/Toggle.jsx"
// import Radio from "../../components/Form/FormControls/Radio/Radio.jsx"
// // import Tree from "../../components/Reusable/Tree/TreeNode"
// import Grid from '../../components/DataGrid/Grid.jsx'
// import { createNotification } from "../../components/Notification/ToastNotification.js"
// import TreeNodeDropdown from "../../components/Reusable/Tree/TreeNode.jsx"
// import MultiSelect from "../../components/Form/Selects/MultiSelect/MultiSelect.jsx"

// const Home  = () => {
//     const [value,setValue]  = useState('')
//     const [SelectedObj,setSelectedObj] = useState({})
//     const [SelectedID,setSelectedID] = useState(17)
//     const [SearchValue,setSearchValue] = useState('asfsfas')
//     const [Checked,setChecked] = useState(true)
//     const [CheckedToggle,setCheckedToggle] = useState(false)
//     const [CheckedRadio,setCheckedRadio] = useState(false)
    
//     const [treeData,setTreedata] = useState(Data.Tree)
//     const [SelectedNodes,setSelectedNodes] = useState([])
//     const [gridData,setGridData] = useState(Data.Grid)

//     const handleSelectionChange = selectedNodes => {
//         setSelectedNodes(selectedNodes)
//       };

//     const idTemplate = (data) => {
//         return (
//             <pre>{data.data.id}</pre>
//         )
//     }

//     const masterDetailTemplate = (data) => {
//         return (
//             <h2>{data.data.data.first_name}</h2>
//         )
//     }

//     return (
//         <div className="page-home-wrapper">
//             {/* <div className="input-wrapper" style={{width: '365px'}}>
//                 <Input
//                     onChange={(value) => setValue(value)}
//                     value={value}
//                     inputType="text"
//                     size="medium"
//                     label={'Input Label Placeholder'}
//                     disabled={false}
//                     isRequired={true}
//                     msg={
//                         {
//                             type : 'error',
//                             visible : false,
//                             text : 'faasmfskfmaskfmasfafasfaklamkfa'
//                         }
//                     }
//                 />
//             </div> */}

//             {/* <div className="select-wrapper margin" style={{width:'365px'}}>
//                 <SingleSelectDropdown 
//                     label={'Select Option'}
//                     size={'medium'}
//                     isRequired={true}
//                     data={Data.Plain}
//                     selectedOptonID={SelectedID}
//                     withFilter={false}
//                     withClear={true}
//                     closeOnSelect={false}
//                     selected={(obj) => setSelectedObj(obj)}
//                     msg={
//                         {
//                             type : 'error',
//                             visible : false,
//                             text : 'faasmfskfmaskfmasfafasfaklamkfa'
//                         }
//                     }
//                 />
//             </div> */}

//             {/* <div className="button-wrapper margin">
//                 <MainButton 
//                     label={'Main Button'}
//                     size={'medium'}
//                     type={'background'}
//                     disabled={false}
//                     loading={true}
//                 />
//             </div> */}

//             {/* <div className="search-wrapper margin" style={{width: '240px'}}>
//                 <Search 
//                     value={SearchValue}
//                     change={(val) => setSearchValue(val)}
//                     suggestions={['asd','dsfsa','gdsgsd','fsafmsakfmsafsmnas']}
//                     withSuggestions={true}
//                     size={'medium'}
//                     placeholder={'Search...'}
//                 />
//             </div> */}

//             {/* <div className="checkbox-wrapper margin">
//                 <Checkbox
//                     checked={Checked}
//                     change={(state) => setChecked(state)}
//                     disabled={false}
//                     isRequired={false}
//                     multipleChecked={false}
//                 />
//             </div> */}

//             {/* <div className="toggle-wrapper margin">
//                 <Toggle
//                     checked={CheckedToggle}
//                     change={(state) => setCheckedToggle(state)}
//                     disabled={false}
//                 />
//             </div> */}

//             {/* <div className="radio-wrapper margin">
//                 <Radio 
//                     checked={CheckedRadio}
//                     change={(state) => setCheckedRadio(state)}
//                     disabled={false}
//                     isRequired={false}
//                 />
//             </div> */}

//             {/* <div className="tree-wrapper margin">
//                 <Tree 
//                     data={treedata}
//                     selectedItems={(arr) => setSelectedNodes(arr)}
//                 />
//             </div> */}

//             {/* <button
//                 onClick={() => {
//                     createNotification('zdarova','success',3000,'top-right',3)
//                 }}
//             >
//                 notify
//             </button> */}

//             {/* <div className="tree-wrapper margin" style={{width: '326px'}}>
//                 <TreeNodeDropdown
//                     data={treeData}
//                     onSelectionChange={handleSelectionChange}
//                 />
//             </div>

//             {
//                 SelectedNodes && (
//                     <ul>
//                         {SelectedNodes.map((el,ind) => (
//                             <li key={ind}> {el.label} </li>
//                         ))}
//                     </ul>
//                 )
//             } */}

//             {/* <div className="multiselect-wapper margin" style={{width: '326px'}}>
//                 <MultiSelect 
//                     data={treeData}
//                     change={handleSelectionChange}
//                     size={'medium'}
//                     disabled={false}
//                     msg={
//                         {
//                             type:'success',
//                             text: 'fasfasfasfa',
//                             visible: false,
//                         }
//                     }
//                 />
//             </div> */}

//             {/* {
//                 SelectedNodes && (
//                     <ul>
//                         {SelectedNodes.map((el,ind) => (
//                             <li key={ind}> {el.label} </li>
//                         ))}
//                     </ul>
//                 )
//             }  */}



//             <div className="grid-wrapper">
//                 <Grid 
//                     data={gridData}
//                     detailTemplate={masterDetailTemplate}
//                     withMasterDetail={false}
//                     theme={'light'}
//                     filterOptions={
//                         {
//                             headerFilter:true,
//                         }
//                     }
//                     customColumns={
//                         [
//                             {
//                                 columnKey: 'id',
//                                 columnName: 'ID',
//                                 template: idTemplate,
//                             },
//                             {
//                                 columnKey: 'first_name',
//                                 columnName: 'First Name',
//                             },
//                             {
//                                 columnKey: 'last_name',
//                                 columnName: 'Last Name',
//                             },
//                             {
//                                 columnKey: 'email',
//                                 columnName: 'Email',
//                             },
//                             {
//                                 columnKey: 'ip_address',
//                                 columnName: 'IP Address',
//                             },
//                             {
//                                 columnKey: 'car',
//                                 columnName: 'Car Model',
//                             }
//                         ]
//                     }
//                 />
//             </div>
            

//         </div>  
//     )
// }

// export default Home