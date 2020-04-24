import template from '../utils/avecTemplateHtml.js'

export default Vue.component('etape', template({
    template: 'components/etape.html',
    props: [
        'txt_etape',
        'no_etape'
    ],
    data() {
        return {
            estActif: false,
        }
    },
    mounted() {
        this.$root.$on('toggleActif', (index) => {
            // Si miniature n'est pas celle cliquée ET si miniature actif, la désactiver
            if (this.no_etape != index && this.estActif) {
                this.estActif = !this.estActif
            }
        })  
    },
    methods: {
        activerEtape() {
            this.estActif = !this.estActif
            this.$root.$emit('toggleActif', this.no_etape)
        },
    },
}))