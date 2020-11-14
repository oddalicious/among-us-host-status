import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import { hostsSlice } from './hostsSlice'

const store = configureStore({
    reducer: {
        hosts: hostsSlice.reducer,
    },
    middleware: getDefaultMiddleware({
        immutableCheck: true,
        serializableCheck: true,
    }),
    devTools: false,
})

export default store
