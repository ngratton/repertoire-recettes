import accueil from './components/Accueil.js'
import recette from './components/Recette.js'

export default new VueRouter({
    routes: [
        { 
            path: '/',
            name: 'accueil',
            component: accueil,
            meta: { title: 'Recettes Client-Serveur | Nicholas Gratton (0270256)' }
        },
        { 
            path: '/recette/:id/',
            name: 'recette',
            component: recette,
        },
    ],
    path: '*', redirect: '/',
})