import template from '../utils/avecTemplateHtml.js'

export default Vue.component('accueil', template({
    template: 'components/accueil.html',
    data() {
        return {
            recettes: [],
        }
    },
    created() {
        this.getRecettes()
    },
    mounted() {
    },
    methods: {
        getRecettes() {
            const URL = 'http://mysql.julienduranleau.com/synthese/recettes.json'
            fetch(URL).then(resp => {
                resp.json().then(data => {
                    this.recettes = data.recettes
                })
            })
        }
    },
}))