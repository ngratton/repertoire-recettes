import template from '../utils/avecTemplateHtml.js'
import ingredient from './Ingredient.js'
import etape from './Etape.js'

export default Vue.component('recette', template({
    template: 'components/recette.html',
    data() {
        return {
            id_recette: null,
            image: '',
            titre: '',
            etapes: [],
            ingredients: [],
            temps_preparation: '',
            temps_cuisson: '',
            temps_attente: '',
            temps_total: '',
            se_congele: null,
            commentaires: [],
            nb_votes: '',
            peutVoter: true,
            etoiles: null,
            etapeActive: null,
            lien_recette: '',
            toutesCategories: [],
            categories: [],
            rendement: '',
        }
    },
    mounted() {
        this.id_recette = this.$route.params.id
        this.getRecettes(this.id_recette)
        this.getVotes(this.id_recette)
    },
    methods: {
        getRecettes(id_recette) {
            const URL = 'http://mysql.julienduranleau.com/synthese/recettes.json'
            fetch(URL).then(resp => {
                resp.json().then(data => {
                    data.recettes.forEach(recette => {
                        if ( recette.id == id_recette ) {
                            this.image = recette.image
                            this.titre = recette.titre
                            this.etapes = recette.preparation
                            this.ingredients = recette.ingredients
                            this.temps_preparation = this.convertirTemps(recette.temps_preparation)
                            this.temps_cuisson = this.convertirTemps(recette.temps_cuisson)
                            this.temps_attente = this.convertirTemps(recette.temps_attente)
                            this.se_congele = recette.se_congele
                            this.commentaires = recette.commentaires
                            this.temps_total = this.convertirTemps(
                                recette.temps_preparation +
                                recette.temps_cuisson +
                                recette.temps_attente
                            )
                            this.etoiles = recette.etoiles
                            this.lien_recette = recette.source
                            this.categorie_index = recette.categories
                            this.rendement = recette.resultat
                            document.title = recette.titre + ' | Recettes Client-Serveur | Nicholas Gratton (0270256)'
                            this.getCategories()
                        }
                    })
                })
            })
        },
        getVotes(id) {
            const URL = `http://mysql.julienduranleau.com/synthese/votes/vote.php?id=${id}`
            fetch(URL).then(resp => {
                resp.json().then(data => {
                    this.nb_votes =  data.data
                    if(window.localStorage.getItem('recetteVote' + this.id_recette)) {
                        this.peutVoter = false
                    }
                })
            })
        },
        getCategories() {
            return new Promise((resolve, reject) => {
                    const URL = 'http://mysql.julienduranleau.com/synthese/categories.json'
                    fetch(URL).then(resp => {
                        resp.json().then(data => {
                            this.toutesCategories = data.categories
                            this.filtrerCategories(this.categorie_index)
                        })
                    })
            })
        },
        filtrerCategories(categories) {
            categories.forEach(categorie => {
                this.categories.push(this.toutesCategories[categorie])
            })
        },
        ajoutVote() {
            const URL = 'http://mysql.julienduranleau.com/synthese/votes/vote.php'
            const options = {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    'id': this.id_recette,
                })
            }
            fetch(URL, options).then(resp => {
                resp.json().then(data => {
                    this.getVotes(this.id_recette)
                    window.localStorage.setItem('recetteVote' + this.id_recette, false)
                })
            })
        },
        etapePrepActive(no_etape) {
            this.etapeActive = no_etape
        },
        convertirTemps(tempsMin) {
            if (tempsMin == null) {
                return null
            } else {
                let h = Math.floor(tempsMin / 60)
                if(h > 0) {
                    let m = tempsMin % 60
                    if (m == 0) { return `${h} H` } else { return `${h} H ${m}` }
                } else {
                    return `${tempsMin} MIN`
                }
            }
        },
    }, // Methods
    watch: {
        '$route.params.id'() {
            this.id_recette = this.$route.params.id
            this.getRecettes(this.$route.params.id)
            this.getVotes(this.$route.params.id)
        }
    },
}))