import template from '../utils/avecTemplateHtml.js'

export default Vue.component('ingredient', template({
    template: 'components/ingredient.html',
    props: [
        'ingredient'
    ],
    data() {
        return {
            estUtilise: false,
        }
    },
    mounted() {

    },
    methods: {
        cocher() {
            this.estUtilise = !this.estUtilise
        },
    },
}))