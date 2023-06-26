import { useState,useEffect } from 'react'
import { BrowserRouter,Routes,Route,Link} from 'react-router-dom'
import Sidebar from '@/localComponents/Sidebar/Sidebar.jsx'
import { GlobalTheme } from './utils/Theme'
import ThemeSwitcher from '@/localComponents/Theme/ThemeSwticher'

import Guide from "@/views/Guide/Guide.jsx"
import FormView from "@/views/FormView/FormViews.jsx"
import InputView from '@/views/FormView/InputView/InputView.jsx'
import SingleSelectDropdownView from '@/views/FormView/SingleSelectDropdownView/SingleSelectDropdownView.jsx'
import MultiSelectDropdownView from '@/views/FormView/MultiSelectDropdownView/MultiSelectDropdownView.jsx'
import ButtonsView from '@/views/ButtonsView/ButtonsView.jsx'
import CheckboxView from '@/views/FormView/CheckboxView/CheckboxView.jsx'
import RadioView from '@/views/FormView/RadioView/RadioView.jsx'
import ToggleView from '@/views/FormView/ToggleView/ToggleView.jsx'
import SearchView from '@/views/SearchView/SearchView.jsx'
import NotificationView from '@/views/NotificationView/NotificationView.jsx'
import ModalView from '@/views/ModalView/ModalView.jsx'
import GridView from '@/views/GridView/GridView.jsx'
import TreeNodeView from '@/views/TreeView/TreeNodeView.jsx'
import FileUploaderView from '@/views/FileUploaderView/FileUploaderView.jsx'
import DatepickerView from '@/views/DatepickerView/DatepickerView.jsx'
import CardsView from '@/views/CardsView/CardsView'
import TooltipView from "@/views/TooltipView/TooltipView.jsx"
import {_isProd} from '@/utils/Helpers.js'

function App() {
  useEffect(() => {
    if(!window.localStorage.getItem('__theme_mode')) GlobalTheme()._createTheme()
    document.querySelector('body').classList.add(GlobalTheme()._getCurrentTheme())
  }, [])
  return (
    <>
      <BrowserRouter>
        <main className='content-wrapper-main-pages'>
            <ThemeSwitcher/>
            <div className="content_sidebar_navigation">
              <Sidebar />
            </div>
            <div className="content_main_wrapper">
              <Routes>
                <Route path={_isProd ? '/mc/' : '/'} element={<Guide/>} />

                <Route path={_isProd ? '/mc/FormView' : '/FormView'} element={<FormView/>} />

                <Route path={_isProd ? '/mc/InputView' : '/InputView'} element={<InputView />} />

                <Route path={_isProd ? '/mc/SingleSelectDropdownView' : '/SingleSelectDropdownView'} element={<SingleSelectDropdownView />} />

                <Route path={_isProd ? '/mc/MultiSelectDropdownView' : '/MultiSelectDropdownView'} element={<MultiSelectDropdownView />} />
                
                <Route path={_isProd ? '/mc/ButtonsView' : '/ButtonsView'} element={<ButtonsView />} />

                <Route path={_isProd ? '/mc/CheckboxView' : '/CheckboxView'} element={<CheckboxView />} />

                <Route path={_isProd ? '/mc/RadioView' : '/RadioView'} element={<RadioView />} />

                <Route path={_isProd ? '/mc/ToggleView' : '/ToggleView' } element={<ToggleView />} />

                <Route path={_isProd ? '/mc/SearchView' : '/SearchView'} element={<SearchView />} />

                <Route path={_isProd ? '/mc/NotificationView' : '/NotificationView'} element={<NotificationView />} />

                <Route path={_isProd ? '/mc/FileUploaderView' : '/FileUploaderView'} element={<FileUploaderView />} />

                <Route path={_isProd ? '/mc/GridView' : '/GridView'} element={<GridView />} />
                
                <Route path={_isProd ? '/mc/ModalView' : '/ModalView'} element={<ModalView />} />

                <Route path={_isProd ? '/mc/TreeNodeView' : '/TreeNodeView'} element={<TreeNodeView />} />

                <Route path={_isProd ? '/mc/DatePickerView' : '/DatePickerView'} element={<DatepickerView />} />

                <Route path={_isProd ? '/mc/CardsView' : '/CardsView'} element={<CardsView />} />

                <Route path={_isProd ? '/mc/TooltipView' : '/TooltipView'} element={<TooltipView />} />



              </Routes>
            </div>
        </main>
      </BrowserRouter>
    </>
  )
}

export default App
