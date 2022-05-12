import { useState } from 'react'
import { useAppDispatch, useAppSelector } from './app/hooks'
import { incremented, amountAdded } from './features/counter/counter-slice'
import { useFetchBreedsQuery } from './features/dogs/dogs-slice-api'
import logo from './logo.svg'
import './App.css'

function App() {
  const count = useAppSelector((state) => state.counter.value)
  const dispatch = useAppDispatch()

  const [numDogs, setNumbDogs] = useState(10)
  const { data = [], isFetching } = useFetchBreedsQuery(numDogs)

  function handleClick () {
    dispatch(amountAdded(3))
  }
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Hello Vite + React!</p>
        <p>
          <button type="button" onClick={handleClick}>
            count is: {count}
          </button>
        </p>
        <div>
          <p>dogs to fetch:</p>
          <select value={numDogs} onChange={(e) => setNumbDogs(Number(e.target.value))}>
            <option value={"5"}></option>
            <option value={"10"}></option>
            <option value={"15"}></option>
            <option value={"20"}></option>
          </select>
        </div>
        <div>
          <p>number of dogs fetched: {data.length} </p>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Picture</th>
              </tr>
            </thead>
            <tbody>
              {
                data.map((breed) => (
                  <tr key={breed.id}>
                    <td>{breed.name}</td>
                    <td>
                      <img src={breed.image.url} alt={breed.name} height={250}></img>
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
        <p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
          {' | '}
          <a
            className="App-link"
            href="https://vitejs.dev/guide/features.html"
            target="_blank"
            rel="noopener noreferrer"
          >
            Vite Docs
          </a>
        </p>
      </header>
    </div>
  )
}

export default App
