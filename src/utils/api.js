const helperFunctions = {
    install(Vue, options) {
        Vue.mixin({
            methods: {
                apiSave() {
                    const args = (arguments.length === 1 ? [arguments[0]] : Array.apply(null, arguments))
                    const collection = args.shift() || null
                    const data       = args.shift() || null
                    const modal      = args.shift() || null

                    let obj = {}
                    Object.keys( data ).forEach( key => {
                        obj[key] = data[key]
                    })

                    this.$http.post(`${collection}/`, obj)
                        .then( res => {

                            if(res.body.model) {
                                this.$bus.$emit('setResponse', res.body.model + ' saved')
                                obj._id = res.body._id
                                this[collection].push(obj)
                                this.$bus.$emit('toggleModal', modal )
                            }
                            else
                                this.$bus.$emit('setResponse', res.body.message)
                            setTimeout( () => { this.$bus.$emit('setResponse', '') }, 4000)
                        })
                        .catch( err => {
                            this.$bus.$emit( 'setResponse', 'Connection error ' )
                            setTimeout( () => { this.$bus.$emit('setResponse', '') }, 4000 )
                        })
                },

                apiUpdate() {
                    const args       = (arguments.length === 1 ? [ arguments[0] ] : Array.apply( null, arguments ))
                    const collection = args.shift() || null
                    const data       = args.shift() || null
                    const id         = args.shift() || null
                    const modal      = args.shift() || null

                    let body = {}
                    Object.keys( data ).forEach( key => {
                        body[key] = data[key]
                    })

                    this.$http.put( `${collection}/${id}`, body )
                        .then( res => {
                            if(res.body.model) {
                                this.$bus.$emit('setResponse', res.body.model + ' updated')
                                this.$bus.$emit('toggleModal', modal )
                            }

                            else
                                this.$bus.$emit('setResponse', res.body.message)
                            setTimeout( () => { this.$bus.$emit( 'setResponse', '' ) }, 4000 )
                        })
                        .catch( err => {
                            this.$bus.$emit( 'setResponse', 'Connection error' )
                            setTimeout( () => { this.$bus.$emit('setResponse', '') }, 4000 )
                        })
                },

                apiDelete() {
                    const args       = (arguments.length === 1 ? [ arguments[0] ] : Array.apply( null, arguments ))
                    const collection = args.shift()
                    const id         = args.shift()
                    const index      = args.shift()

                    this.$http.delete(`${collection}/${id}`)
                        .then(res => {
                            this[collection].splice(index, 1)
                            this.$bus.$emit('setResponse', res.body.model + ' deleted')
                            setTimeout( () => { this.$bus.$emit('setResponse', '') }, 4000 )
                            this.$router.push({ path: collection })
                        }).catch(function(error){
                            this.$bus.$emit( 'setResponse', 'Connection error' )
                            setTimeout( () => { this.$bus.$emit('setResponse', '') }, 4000 )
                        })
                }
            }
        })
    }
}

export default helperFunctions
