'use client'

import useFetchHub from './useFetchHub'
import useFetchHubAdapter from './useFetchHubAdapter'
import useFetchKnobs from './useFetchKnobs'
import useFetchProtocolBoard from './useFetchProtocolBoard'
import useFetchSteeringWheel from './useFetchSteeringWheel'
import useFetchWiringHarness from './useFetchWiringHarness'

function useFetchShopifyProducts() {

    useFetchHub()
    useFetchProtocolBoard()
    useFetchWiringHarness()
    useFetchHubAdapter()
    useFetchSteeringWheel()
    useFetchKnobs()

}

export default useFetchShopifyProducts