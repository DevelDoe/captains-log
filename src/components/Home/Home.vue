<template>
    <div id="home">
        <div class="trade-routes">
            <h2>Trade Routes</h2>
            <ul>
                <li v-for="( r, i ) in comResources">
                    {{ r.name }}:
                    <span v-for="(trade_route, i) in r.trade_routes">
                        <div v-if="trade_route.sell.length">
                            <div v-for="( route, i ) in trade_route.sell">
                                <span :title="trade_route.buy_name">{{ trade_route.abbr }}</span> -> <span :title="route.sell_name">{{ route.abbr }}</span>: {{ comMargin(route.sell, trade_route.buy) }}
                            </div>
                        </div>
                    </span>
                </li>
            </ul>
        </div>
        <!-- <div class="resources-buy">
            <h2>BUY</h2>
            <HomeResourceBuy v-for="(r, i) in comLocationResourcesBuy" :key="i" :resource="r" />
        </div>
        <div class="resources-sell">
            <h2>SELL</h2>
            <HomeResourceSell v-for="(r, i) in comLocationResourcesSell" :key="i" :resource="r" />
        </div> -->
    </div>
</template>

<script>
// import HomeResourceSell from './HomeResourceSell.vue'
// import HomeResourceBuy from './HomeResourceBuy.vue'
export default {
    props: [ 'resources', 'locations' ],
    computed: {
        comResources() {
            let comResources = []
            this.resources.forEach( resource => {
                let comResource = {}
                comResource._id = resource._id
                comResource.name = resource.name
                comResource.locations_sell = []
                comResource.locations_buy = []
                comResource.trade_routes = []

                // Locations Sell
                this.locations.forEach( location => {
                    let comLocation = {}
                    comLocation._id = location._id

                    if( location.name.length > 6) {
                        var splitStr = location.name.toLowerCase().split(' ')
                        for (var i = 0; i < splitStr.length; i++) {
                            var isnum = /^\d+$/.test(splitStr[i])
                            if(isnum) splitStr[i] = splitStr[i]
                            else splitStr[i] = splitStr[i].charAt(0).toUpperCase()
                        }
                        comLocation.abbr = splitStr.join('')
                    } else {
                        comLocation.abbr = location.name
                    }

                    comLocation.name = location.name

                    location.resources.forEach( locationResource => {
                        if( locationResource.resource_id === comResource._id  && locationResource.sell) {
                            comLocation.sell = locationResource.sell
                            comResource.locations_sell.push(comLocation)
                        }
                    })
                })

                // Locations Buy
                this.locations.forEach( location => {
                    let comLocation = {}
                    comLocation._id = location._id

                    if( location.name.length > 6) {
                        var splitStr = location.name.toLowerCase().split(' ')
                        for (var i = 0; i < splitStr.length; i++) {
                            var isnum = /^\d+$/.test(splitStr[i])
                            if(isnum) splitStr[i] = splitStr[i]
                            else splitStr[i] = splitStr[i].charAt(0).toUpperCase()
                        }
                        comLocation.abbr = splitStr.join('')
                    } else {
                        comLocation.abbr = location.name
                    }

                    comLocation.name = location.name

                    location.resources.forEach( locationResource => {
                        if( locationResource.resource_id === comResource._id  && locationResource.buy) {
                            comLocation.buy = locationResource.buy
                            comResource.locations_buy.push(comLocation)
                        }
                    })
                })

                // Trade Routes
                this.locations.forEach( location => {

                    location.resources.forEach( locationResource => {
                        if( locationResource.resource_id === comResource._id && locationResource.buy ) {
                            let route = {
                                sell: []
                            }

                            if( location.name.length > 6) {
                                var splitStr = location.name.toLowerCase().split(' ')
                                for (var i = 0; i < splitStr.length; i++) {
                                    var isnum = /^\d+$/.test(splitStr[i])
                                    if(isnum) splitStr[i] = splitStr[i]
                                    else splitStr[i] = splitStr[i].charAt(0).toUpperCase()
                                }
                                route.abbr = splitStr.join('')
                            } else {
                                route.abbr = location.name
                            }

                            route.buy_name = location.name
                            route.buy      = locationResource.buy

                            this.locations.forEach( loca => {
                                loca.resources.forEach( locaResource => {

                                    if( locaResource.resource_id === comResource._id && locaResource.sell ) {
                                        let sell = {}
                                        if( loca.name.length > 6) {
                                            var splitStr = loca.name.toLowerCase().split(' ')
                                            for (var i = 0; i < splitStr.length; i++) {
                                                var isnum = /^\d+$/.test(splitStr[i])
                                                if(isnum) splitStr[i] = splitStr[i]
                                                else splitStr[i] = splitStr[i].charAt(0).toUpperCase()
                                            }
                                            sell.abbr = splitStr.join('')
                                        } else {
                                            sell.abbr = loca.name
                                        }
                                        sell.sell_name = loca.name
                                        sell.sell = locaResource.sell
                                        route.sell.push(sell)
                                    }

                                })
                            })
                            comResource.trade_routes.push(route)
                        }

                    })


                })

                comResources.push(comResource)



            })
            return comResources || null
        }
    },
    methods: {
        comMargin(sell, buy) {
            let res = sell - buy
            return this.mixFormatPrice(res)
        }
    },
    components: {
        // HomeResourceSell,
        // HomeResourceBuy
    }
}
</script>
