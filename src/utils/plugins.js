import DevelModal from '../plugins/DevelModal.vue'
import DevelToast from '../plugins/DevelToast.vue'
const Plugins = {
    install(Vue, options) {
        Vue.component(DevelModal.name, DevelModal)
        Vue.component(DevelToast.name, DevelToast)
    }
}

export default Plugins
