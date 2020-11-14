import { createEntityAdapter, createSlice } from '@reduxjs/toolkit'

const hostsAdapter = createEntityAdapter()
const hostsSelector = hostsAdapter.getSelectors((state) => state.hosts)

const hostsByGuild = hostsAdapter.getSelectors((state, guildId) =>
    state.hosts.filter(host.guildId === guildId)
)

const hostsSlice = createSlice({
    name: 'hosts',
    initialState: hostsAdapter.getInitialState(),
    reducers: {
        hostAdded: (state, action) => {
            const { _id } = action.payload
            action.payload.id = _id
            hostsAdapter.addOne(state, action.payload)
        },
        hostRemoved: (state, action) => {
            const { _id } = action.payload
            action.payload.id = _id
            hostsAdapter.removeOne(state, action.payload)
        },
        hostUpdated: (state, action) => {
            const { partyId } = action.payload
            const { _id } = action.payload
            const host = state.entities[_id]
            if (host && host.partyId !== partyId) {
                host.partyId = partyId
            }
        },
    },
})

const { hostAdded, hostRemoved } = hostsSlice.actions

export { hostsSelector, hostsByGuild, hostsSlice, hostAdded, hostRemoved }
