// Store/Reducers/Monreducer.js
const initialState = {
    destination: {
        latitude: 0,
        longitude: 0
    }
}
function getDestination(state = initialState, action) {
    switch (action.type) {
        case 'TALENCE':
            return {
                destination:{
                    latitude:44.808529,
                    longitude:-0.593583
                }
            }
        case 'MONTAIGNE':
            return {
                destination:{
                    latitude:44.795366,
                    longitude:-0.616307
                }
            }
        case 'CARREIRE':
            return {
                destination:{
                    latitude:44.825793,
                    longitude:-0.606012
                }
            }
        case 'VICTOIRE':
            return {
                destination:{
                    latitude:44.831236,
                    longitude:-0.571001
                }
            }
        case 'BASTIDE':
            return {
                destination:{
                    latitude:44.845049,
                    longitude:-0.557719
                }
            }
        default:
            return state
    }
}
export default getDestination