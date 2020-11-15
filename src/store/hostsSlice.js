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
    },
})

const hostsInGuild = (state, guildId) =>
    hostsSelector.selectAll(state).filter((host) => host.guildId === guildId)

const { hostAdded, hostRemoved } = hostsSlice.actions

export {
    hostsSlice,
    hostAdded,
    hostRemoved,
    hostsInGuild,
}
