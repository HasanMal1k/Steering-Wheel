import { getMakeData } from "../utils/InventoryStore"


function useTest() {
    setTimeout(() => {
        const data = getMakeData('Fanatec')
        console.log('Make Data:', data)
    }, 10000)
}

export default useTest