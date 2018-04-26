const helperFunctions = {
    install(Vue, options) {
        Vue.mixin({
            methods: {

                mixKeySrt( arr, k ) {

                    Array.prototype.keySort = function(key, desc){
                        this.sort(function(a, b) {
                            var result = desc ? (a[key] < b[key]) : (a[key] > b[key])
                            return result ? 1 : -1
                        })
                        return this
                    }
                    return arr.keySort(k)
                },

                mixNumSrt(numbers) {
                    return list.sort((a, b) => {
                        return a - b;
                    })
                },

                mixinsValidate() {
                    const args = (arguments.length === 1 ? [arguments[0]] : Array.apply(null, arguments))

                    const validationRules = args.shift() || null
                    const data            = args.shift() || null
                    const collection      = args.shift() || null
                    let invalid = false
                    let errorMessage = []

                    const self = this
                    Object.keys(data).forEach( key => {
                        if ( key !== '_id' && key !== '__v' ) {
                            if( validationRules[key].required ) {


                                if ( self.empty( data[key] ) ) {
                                    invalid = true
                                    errorMessage.push(key.split("_")[0] + ' field must be filled out. ')
                                }

                                if( validationRules[key].unique ) {
                                    if( !invalid ) {
                                        let duplicate = this.isDuplicate(collection, data[key])
                                        if( duplicate ) {
                                            invalid = true
                                            errorMessage.push(key.split("_")[0] + ' must be unique. ')
                                        }

                                    }
                                }

                                if( !invalid ) {
                                    if( validationRules[key].type === 'Number' ) {
                                        data[key] = (data[key]/1)
                                        if( data[key] !== data[key] ) {
                                            invalid = true
                                            errorMessage.push(key.split("_")[0] + ' should be in digits. ')
                                        }
                                    }
                                }
                            }
                        }
                    })

                    if (invalid) {
                        this.$bus.$emit('setResponse', errorMessage.join(', ') )
                        setTimeout(()=> { this.$bus.$emit('setResponse', '') }, 4000)
                        return errorMessage
                    }

                    if (!invalid) {
                        return 'true'
                    }
                },

                empty(data) {

                    if (typeof(data) == 'number' || typeof(data) == 'boolean') return false
                    if (typeof(data) == 'undefined' || data === null) return true
                    if (typeof(data.length) != 'undefined') return data.length == 0

                    let count = 0
                    for (let i in data) {
                        if (data.hasOwnProperty(i)) count++
                    }
                    return count == 0
                },

                isDuplicate(collection, value ) {

                    var names = this[collection].map(function(item){ return item.name.toLowerCase() })
                    var duplicate = names.some(function(name){
                        return name === value.toLowerCase()
                    });
                    return duplicate
                },

                mixFormatPrice( value ) {
                    return (value/1).toFixed(2)
                },

                mixFltrBy( filter, name, checked ) {
                    if( checked ) {
                        this[filter].push( name )
                    } else {
                        let index = this[filter].indexOf(name)
                        this[filter].splice(index, 1)
                    }
                },


            }
        })
    }
}

export default helperFunctions
