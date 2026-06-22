import { useState, useEffect } from "react";

const GitHubSearch = () => {
  
  const [username, setUsername] = useState("")
  const [userdata, setUserdata] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  

  const fetchUser = async () => {
    setLoading(true)
    setError("")

    try {
      const res = await fetch(`https://api.github.com/users/${username}`)
      const data = await res.json()

      if (data.message === "Not Found") {
        setError("User not found")
        setUserdata(null)
      } else {
        setUserdata(data)
      }

    } catch (err) {
      setError("Something went wrong")
    } finally {
      setLoading(false)
    }

  }


  return(
    <div className="flex flex-col w-100 gap-5 m-4 p-2 mx-auto">

      <input className="border p-2 rounded-2xl" type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Enter GitHub username" />

      <button className="bg-blue-900 hover:bg-blue-950 cursor-pointer text-white w-30 p-2 rounded-3xl mx-auto active:scale-95" onClick={fetchUser}>Search</button>

          {loading && <p className="text-3xl text-gray-400 text-center">Loading...</p>}
          {error && <p className="text-3xl text-red-400 text-center">{error}</p>}
          {userdata && (
            <div className="flex flex-col gap-1 justify-center items-center border-2 p-2 rounded-xl">
              <img className="h-50 w-50 rounded-md bg-gray-100" src={userdata.avatar_url} alt={userdata.name} width={100} />
              <h2>{userdata.name}</h2>
              <p>{userdata.bio}</p>
              <p>Public Repos: {userdata.public_repos}</p>
            </div>
          )}

    </div>
  )
};

export default GitHubSearch;