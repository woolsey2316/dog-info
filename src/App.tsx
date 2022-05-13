import { useState } from 'react'
import { useAppDispatch, useAppSelector } from './app/hooks'
import { useFetchBreedsQuery } from './features/dogs/dogs-slice-api'
import './App.css'

function App() {
  const count = useAppSelector((state) => state.counter.value)
  const dispatch = useAppDispatch()

  const [numDogs, setNumbDogs] = useState(10)
  const { data = [], isFetching } = useFetchBreedsQuery(numDogs)

  return (
    <div className="App">
      <header className="App-header">
        <div>
          <p>dogs to fetch:</p>
          <select onChange={(e) => setNumbDogs(Number(e.target.value))}>
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
            <option value="100">100</option>
          </select>
        </div>
        <div>
          <p>Number of dogs fetched: {data.length} </p>
          { isFetching && <div>loading dogs...</div>}
          { !isFetching &&
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Breed Group</th>
                <th>Picture</th>
                <th>Bred for</th>
                <th>Weight</th>
                <th>Origin</th>
                <th>Life Span</th>
              </tr>
            </thead>
            <tbody>
              {
                data.map((breed) => (
                  <tr key={breed.id}>
                    <td>{breed.name}</td>
                    <td>{breed.breed_group}</td>
                    <td>
                      <img src={breed.image.url} alt={breed.name} height={250}></img>
                    </td>
                    <td>{breed.bred_for}</td>
                    <td>{breed.weight.metric}kg</td>
                    <td>{breed.origin}</td>
                    <td>{breed.life_span}</td>
                  </tr>
                ))
              }
            </tbody>
          </table>
          }
        </div>
      </header>
    </div>
  )
}

export default App
