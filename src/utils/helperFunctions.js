import { bus } from '../root'

const helperFunctions = {
    install(Vue, options) {
        Vue.mixin({
            methods: {
                mixinsSortList () {

                    const args = (arguments.length === 1 ? [arguments[0]] : Array.apply(null, arguments))
                    const list = args.shift()

                    return list.sort((a, b) => {
                        const name_a = a.name.toUpperCase()
                        const name_b = b.name.toUpperCase()
                        if ( name_a < name_b ) return - 1
                        if ( name_a > name_b ) return 1
                        return 0
                    })
                },
                empty (data) {

                    if (typeof(data) == 'number' || typeof(data) == 'boolean') return false
                    if (typeof(data) == 'undefined' || data === null) return true
                    if (typeof(data.length) != 'undefined') return data.length == 0

                    let count = 0
                    for (let i in data) {
                        if (data.hasOwnProperty(i)) count++
                    }
                    return count == 0
                },

                mixinsToggleModal() {
                    const args = (arguments.length === 1 ? [arguments[0]] : Array.apply(null, arguments))

                    const modal = args.shift() || undefined

                    if(!args[0]) {
                        bus.$emit('toggleModal', modal )
                        return true
                    }

                    const validationRules = args.shift() || null
                    const data            = args.shift() || null
                    let invalid = false
                    let errorMessage = []

                    const self = this
                    Object.keys(data).forEach( key => {
                        if ( key !== '_id' && key !== '__v' ) {
                            if( validationRules[key].required ) {

                                if ( self.empty( data[key] ) ) {
                                    invalid = true
                                    key = key.split("_")[0]
                                    errorMessage.push(key + ' field must be filled out')
                                }
                                if( validationRules[key].type === 'Number' ) {
                                    data[key] = (data[key]/1)
                                    if( data[key] !== data[key] ) {
                                        invalid = true
                                        key = key.split("_")[0]
                                        errorMessage.push(key + ' should be in digits')
                                    }
                                }
                            }
                        }
                    })

                    if (invalid) {
                        bus.$emit('setResponse', errorMessage.join(', ') )
                        setTimeout(()=> { bus.$emit('setResponse', '') }, 4000)
                    }

                    if (!invalid) {
                        bus.$emit('toggleModal', modal)
                        return true
                    }
                }
            }
        })
    }
}

export default helperFunctions
