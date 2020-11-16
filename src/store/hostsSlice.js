import { createEntityAdapter, createSlice } from '@reduxjs/toolkit'

const hostsAdapter = createEntityAdapter()
const hostsSelector = hostsAdapter.getSelectors((state) => state.hosts)

const hostsSlice = createSlice({
    name: 'hosts',
    initialState: hostsAdapter.getInitialState(),
    reducers: {
        hostAdded: (state, action) => {
            hostsAdapter.addOne(state, action.payload)
        },
        hostRemoved: (state, action) => {
            hostsAdapter.removeOne(state, action.payload.id)
        },
        hostUpdated: (state, action) => {
            hostsAdapter.updateOne(state, action.payload)
        },
    },
})

const getHosts = (state) => hostsSelector.selectAll(state)
const getHostById = (state, id) => hostsSelector.selectById(state, id)

const { hostAdded, hostRemoved, hostUpdated } = hostsSlice.actions

export {
    hostsSlice,
    hostAdded,
    hostRemoved,
    hostUpdated,
    getHosts,
    getHostById,
}
