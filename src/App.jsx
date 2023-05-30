import { useState } from 'react'
import { BrowserRouter,Routes,Route,Link} from 'react-router-dom'
import Sidebar from './localComponents/Sidebar/Sidebar.jsx'
import Home from './views/home/Home.jsx'
import Guide from "./views/Guide/Guide"
import FormView from "./views/FormView/FormViews.jsx"
import InputView from './views/FormView/InputView/InputView.jsx'
import SingleSelectDropdownView from './views/FormView/SingleSelectDropdownView/SingleSelectDropdownView.jsx'
import MultiSelectDropdownView from './views/FormView/MultiSelectDropdownView/MultiSelectDropdownView.jsx'
import ButtonsView from './views/ButtonsView/ButtonsView.jsx'
import CheckboxView from './views/FormView/CheckboxView/CheckboxView.jsx'
import RadioView from './views/FormView/RadioView/RadioView.jsx'
import ToggleView from './views/FormView/ToggleView/ToggleView.jsx'
import SearchView from './views/SearchView/SearchView.jsx'
import NotificationView from './views/NotificationView/NotificationView.jsx'
import ModalView from './views/ModalView/ModalView.jsx'
import GridView from './views/GridView/GridView.jsx'
import TreeNodeView from './views/TreeView/TreeNodeView.jsx'
import FileUploaderView from './views/FileUploaderView/FileUploaderView.jsx'

function App() {

  return (
    <>
      <BrowserRouter>
        <main className='content-wrapper-main-pages'>
            <div className="content_sidebar_navigation">
              <Sidebar />
            </div>
            <div className="content_main_wrapper">
              <Routes>
                <Route path={'/'} element={<Guide/>} />

                <Route path={'/FormView'} element={<FormView/>} />
                <Route path="/InputView" element={<InputView />} />
                <Route path="/SingleSelectDropdownView" element={<SingleSelectDropdownView />} />
                <Route path="/MultiSelectDropdownView" element={<MultiSelectDropdownView />} />
                <Route path="/ButtonsView" element={<ButtonsView />} />

                <Route path="/CheckboxView" element={<CheckboxView />} />
                <Route path="/RadioView" element={<RadioView />} />
                <Route path="/ToggleView" element={<ToggleView />} />

                <Route path="/SearchView" element={<SearchView />} />
                <Route path="/NotificationView" element={<NotificationView />} />

                <Route path="/FileUploaderView" element={<FileUploaderView />} />
                <Route path="/GridView" element={<GridView />} />
                <Route path="/ModalView" element={<ModalView />} />
                <Route path="/TreeNodeView" element={<TreeNodeView />} />


              </Routes>
            </div>
        </main>
      </BrowserRouter>
    </>
  )
}

export default App
