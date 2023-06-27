import { useState, useEffect } from 'react'
import ListHeader from './components/ListHeader'
import ListItem from './components/ListItem'
import Auth from './components/Auth'
import { useCookies } from 'react-cookie'

const App = () => {
  const [cookies, setCookie, removeCookie] = useCookies(null)
  const authToken = cookies.AuthToken
  const userEmail = cookies.Email
  const [tasks, setTasks] = useState(null)

  const getData = async () => {
    try {
      console.log(`${process.env.REACT_APP_SERVERURL}/todos/${userEmail}`)
      const response = await fetch(`${process.env.REACT_APP_SERVERURL}/todos/${userEmail}`)
      const  json = await response.json()
      setTasks(json)
    } catch (error) {
      console.error('error', error)
    }
  }

  useEffect(() => {
    if (authToken) {
      getData()
    }
  }, [])

  console.log(tasks)

  // Sort by date
  const sortedTasks = tasks?.sort((a, b) => new Date(a.date)- new Date(b))

  return (
    <div className="app">
      {!authToken && <Auth />}
      {authToken && (
        <>
          <ListHeader listName={'Holiday tick list'} getData={getData} />
          <p>
            Welcome back {userEmail}
          </p>
          {sortedTasks?.map((task) => <ListItem key={task.id} task={task} getData={getData} />)}
        </>
      )}
      
    </div>
  )
}

export default App
