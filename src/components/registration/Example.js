import React, { useState, useEffect } from 'react'
import { from, of, merge, BehaviorSubject, Observable } from 'rxjs'
import { map, delay, mergeMap, debounceTime, filter, distinctUntilChanged } from 'rxjs/operators'

const useObservable = (observable, setter) => {
    useEffect(() => {
        let subscription = observable.subscribe(res => setter(res))
        return () => {
            subscription.unsubscribe()
        }
    }, [observable, setter])
}
const getPokemonByName = async name => {
    const {results: allPokemons} = await fetch('https://pokeapi.co/api/v2/pokemon/?limit=1000')
    .then(result => result.json())
    return allPokemons.filter(pokemon => pokemon.name.includes(name))
}

const searchSubject$ = new BehaviorSubject('')
const searchResult$ = searchSubject$.pipe(
    filter(val => {
        console.log(val)
        return val > 4
    }),
    distinctUntilChanged(),
    mergeMap(name => {
        console.log("name", name)
        return from(getPokemonByName(name))
    })
)



function Example() {
    const [search, setSearch] = useState("")
    const [results, setResults] = useState([])

    useObservable(searchResult$, setResults)

    const handleSearchChange = value => {
        setSearch(value)
        searchSubject$.next(value)
    }
    return (
        <div>
            <input onChange={e => handleSearchChange(e.target.value)} value={search}/>
           <div>{JSON.stringify(results, null, 2)}</div>
        </div>
    )
}

export default Example