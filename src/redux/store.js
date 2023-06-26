import { configureStore } from "@reduxjs/toolkit";
import ThemeStore from "@/redux/Theme/ThemeStore";
export default configureStore({
  reducer: {
    ThemeStore: ThemeStore
  }
});
