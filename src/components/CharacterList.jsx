import { useEffect, useState } from "react"
import Character from "./Character"

function NavPage({ page, setPage }) {
    return (
        <header className="d-flex justify-content-between align-items-center">
            <p>Page: {page} </p>
            <div>{
                page > 1 && <button className="btn btn-primary btn-sm" onClick={() => {
                    setPage(page - 1)
                }}>Before Page</button>
            }
                <button className="btn btn-primary btn-sm ms-2"
                    onClick={() => {
                        if (page < 42) {
                            setPage(page + 1)
                        }
                    }}>
                    Next Page
                </button>
            </div>
        </header>
    )
}

function CharacterList() {
    const [characters, setCharacters] = useState([])
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1)

    useEffect(() => {
        async function fetchData() {
            const response = await fetch(`https://rickandmortyapi.com/api/character/?page=${page}`)
            const data = await response.json()
            setLoading(false)
            setCharacters(data.results)
        }
        fetchData()
    }, [page])

    return (
        <div className="container">
            <NavPage page={page} setPage={setPage} />
            {
                loading ? <h1>Loading...</h1> : (
                    <div className="row">
                        {characters.map((character) => {
                            return (
                                <div className="col-md-4" key={character.id}>
                                    <Character character={character} />
                                </div>
                            )
                        })}
                    </div>
                )
            }
        </div>
    )
}

export default CharacterList