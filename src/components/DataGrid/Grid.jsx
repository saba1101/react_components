// import { DataGrid } from 'devextreme-react/data-grid';

// const Grid = ({
//     data,
// }) => {
//     return (
//         <div className="gridWrapper __dx-grid_component_datagrid">
//             <DataGrid
//                 dataSource={data}
//                 keyExpr={'id'}
//             />
//         </div>
//     )
// }


// export default Grid

// <style lang="scss">

// .dx_grid_prefix{
//   position: relative;

//   .confingure_column_wrapper{
//     position: sticky;
//     right: 0.4375rem;
//     top: 0.4375rem;
//     z-index: 9999;
//     margin-bottom: -2.625rem;
//     margin-left: calc(100% - (2.25rem + 0.9375rem));
//   }
// }

//   .dx-datagrid-headers{
//     position: sticky;
//     top: 0;
//     z-index: 999;
//   }

//   .update-actions{
//     *{
//       user-select: none;
//     }
//     padding: 0.3125rem;
//     cursor: pointer;
//   }

//   // .dx-datagrid-focus-overlay{
//   //   border: none !important;
//   // }

//   .dx-command-edit{
          
//     a{
//       text-decoration: none !important;
//       background-color: transparent !important;
//       color: $secondary_black;
//       font-weight: 500;
//     }
// }

// .dx_grid_prefix{
//   &.dark{
//     .dx-datagrid-content{
//       table{
//         border-left: 0.0625rem solid #23282A !important;
//         border-right: 0.0625rem solid #23282A !important;
//       }
//     }
//     .dx-datagrid-rowsview{
//       border-top: none !important;
//     }
//     .dx-filter-menu{
//       padding: 0 !important;
//     }

//     td{
//       border-top: none !important;
//     }

//     .dx-collection{
//       // background: rgba($primary_black,.9) !important;
//       background: #151C21;
//       margin-bottom: 0;
//       padding: 0.75rem 0.625rem;
//     }

//     .dx-texteditor-input{
//       background: rgba($primary_black,.6) !important;
//       color: #ffffff;
//     }

//     .dx-datagrid-content{
//       background: #1B1B1B !important;
//     }
//     .dx-header-row{
//       background: #262C30 !important;

//       td{
//         padding: 0.9375rem 0.4375rem;
//         color: $white !important;
//         font-weight: 500;
//       }
//     }

//     .dx-master-detail-cell,.gridcell{
//       background-color: $primary_black !important;
//     }

//     tbody{
//       .dx-datagrid-group-opened,.dx-datagrid-group-closed{
//         font-size: 1.1875rem;
//       }
//       *{
//         text-align: left !important;
//       }
//       .dx-command-select{
//         text-align: center !important;
//       }

//       td{
//         vertical-align: middle !important;
//         padding: 0.9375rem 0.4375rem !important;
//         border-bottom: 0.0625rem solid rgba($secondary_black,1) !important;
//         border-left: none !important;
//         border-right: none !important;
//         color: $primary_black !important;
//         font-weight: 400;
//       }

//       .dx-datagrid-text-content{
//         float: left !important;
//       }

//       .dx-column-indicators{
//         float: none !important;
//         margin-left: 0.625rem;
//       }
//       .dx-row:not(.dx-header-row,.dx-freespace-row,.dx-master-detail-cell,.dx-datagrid-filter-row){
//         background: #151C21;
//         td{
//           color: #F9FAFA !important;
//         }
//         &:hover{
//           background: #1E2224 !important;
//         }
//       }
//       .dx-datagrid-filter-row .dx-texteditor-input,.dx-texteditor,.dx-dropdowneditor-icon{
//         background: #2A3032 !important;
//         color: #fff;
//       }
//       .dx-dropdowneditor-icon{
//         &::before{
//           color: rgba(#fff,.7);
//         }
//       }
//       .dx-selection{
//         td{
//           background: rgba($secondary_black,.6) !important;
//         }
//       }
//       .dx-row-focused{
//         td{
//           background-color: #23353A !important;
//           color: #F9FAFA !important;
//           .update-actions{
//             filter: invert(100%) sepia(100%) saturate(0%) hue-rotate(69deg) brightness(103%) contrast(102%);
//           }
//         }
//         .dx-datagrid-group-opened,.dx-datagrid-group-closed{
//           color: $white !important;
//           font-size: 1.1875rem;
//         }
//         .dx-master-detail-cell,.gridcell{
//           background-color: $primary_black !important;
//         }
//         .edit,.delete{
//           > img{
//             // filter: invert(100%) sepia(100%) saturate(0%) hue-rotate(195deg) brightness(142%) contrast(101%) !important;
//           }
//         }
//       }
//       .dx-freespace-row{
//         background: #262C30 !important;
//         &:hover{
//           background: #262C30 !important;
//         }
//       }
//     }
//     .dx-datagrid-pager{
//       background: #151C21 !important;
//       div{
//         color: #BCBCBC !important;
//       }
//       .dx-selection{
//         background: $secondary_black !important;
//       }
//     }
//   }

//   &.light{
//     .dx-datagrid-content{
//       table{
//         border-left: 0.0625rem solid #E9EBEC !important;
//         border-right: 0.0625rem solid #E9EBEC !important;
//       }
//     }
//     td{
//       border-top: none !important;
//     }
//     .dx-header-row{
//       background: #EBEBEB !important;
//       td{
//         padding: 0.9375rem 0.4375rem;
//         color: $primary_black !important;
//         font-weight: 500;
//       }
//     }
    
//     .dx-texteditor-input{
//       background: #F9F9F9;
//       border-radius: 0.375rem;
//     }

//     tbody{
//       .dx-datagrid-group-opened,.dx-datagrid-group-closed{
//         color: $primary_black !important;
//         font-size: 1.1875rem;

//       }
//       td{
//         &:first-child{
//           //padding-left: 1.5625rem !important;
//         }
//       }
//       *{
//         text-align: left !important;
//       }
//       .dx-command-select{
//         text-align: center !important;
//       }

//       .dx-row-inserted.dx-edit-row {
//         background: rgba($dark_blue,.05);
//       }

//       td{
//         vertical-align: middle !important;
//         padding: 0.9375rem 0.4375rem !important;
//         border-bottom: 0.0625rem solid #DFDFDF !important;
//         border-left: none !important;
//         border-right: none !important;
//         color: $primary_black !important;
//         font-weight: 400;
//       }

//       .dx-datagrid-text-content{
//         float: left !important;
//       }

//       .dx-column-indicators{
//         float: none !important;
//         margin-left: 0.625rem;
//       }
//       .dx-row:not(.dx-datagrid-filter-row,.dx-row-inserted.dx-edit-row){
//         ///// no hover 
//       }
//       .dx-datagrid-filter-row{
//         background: rgba(#EBEBEB,1);
//       }
//       .dx-dropdowneditor-icon{
//         &::before{
//           color: $secondary_black;
//         }
//       }
//       .dx-row-focused{
//         td{
//           //background-color: #F9F9F9 !important;
//           // background-color: #E7FAFF !important;
//           color: #15181A !important;

//           // .update-actions{
//           //   filter: invert(100%) sepia(100%) saturate(0%) hue-rotate(69deg) brightness(103%) contrast(102%);
//           // }
//         }
//         .dx-datagrid-group-opened,.dx-datagrid-group-closed{
//           // color: $white !important;
//           font-size: 1.1875rem;
//         }
//         .dx-master-detail-cell{
//           background: $white !important;
//         }
//         .edit,.delete{
//           > img{
//             // filter: invert(100%) sepia(100%) saturate(0%) hue-rotate(195deg) brightness(142%) contrast(101%) !important;
//           }
//         }
//       }
//       .dx-freespace-row{
//         background: $white !important;
//         &:hover{
//           background: $white !important;
//         }
//       }
//     }
//   }
//   .actions_wrapper{
//     display: flex;
//     align-items: center;
//     justify-content: flex-start;
//     gap: 1.25rem;
//     .edit,.delete{
//       cursor: pointer;
//       > img{
//         width: 1.25rem;
//       }
//     }
//   }
// }


// .row_style_modes{
//   &.light{
//     .dx-row{
//       &:nth-child(even){
//         background: #F9F9F9 !important; 
//       }
//     }
//   }

//   &.dark{
//     .dx-row{
//       &:nth-child(even){
//         background: #2835934D !important;
//       }
//     }
//   }

// }

// </style>