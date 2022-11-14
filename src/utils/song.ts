
import { SongRoot } from "../../typings/dataTypes"
import { store } from "../state"
import actions from "../state/actions"

export const convertTosuitable = (country: any, artist: any, lyric: any) => {
    //console.log(country)
    let allArtist: SongRoot[] = []
    for (let a in artist) {

        let singleA = artist[a]

        for (let s in singleA) {

            let oneArtist = singleA[s]

            for (let o in oneArtist) {

                let one = oneArtist[o]
                let Obj: SongRoot = {
                    id: one?.id,
                    artistName: one?.artistname,
                    country: country[s]?.name,
                    gender: a,
                    image: one?.url,
                    album: one?.contribution,
                    mode: one.pop ? one.pop : 0,
                    root: parseInt(s)
                }
                allArtist.push(Obj)

            }
        }
    }
    allArtist.sort((a, b) => (a.country > b.country) ? 1 : ((b.country > a.country) ? -1 : 0))
    
    store.dispatch(actions.user.saveUser({
        artist: allArtist,
        naats:lyric
    }))
    return allArtist;
}
export const SortArtist = (allArtist: SongRoot[]) => {
    let sortArtists = [...allArtist]
    return sortArtists.sort((a, b) => (a.mode < b.mode) ? 1 : ((b.mode < a.mode) ? -1 : 0))
}