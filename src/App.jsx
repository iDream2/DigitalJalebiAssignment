import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
function App() {
  const [posts, setPosts] = useState([])
  const [query, setQuery] = useState('')

  const fetchUsers = (searchQuery = '') => {
    const url = searchQuery ? `https://dummyjson.com/users/search?q=${searchQuery}`: 'https://dummyjson.com/users'

    fetch(url, {
      method : 'GET'
    } ).then((response) => response.json())
    .then((data) => {
      console.log(data)
      setPosts(data.users || []);
    } )
  }

  useEffect(() => {
    fetchUsers();
  },[])
  
  const handleSearch = (event) => {
    event.preventDefault();
    fetchUsers(query);
  }

  const limitedPosts = posts.slice(0, 10);
  
  return (
    <div className='container'>
      
    <form onSubmit={handleSearch}>
      <input type="text" value={query} onChange={(e)=> setQuery(e.target.value)} />
      <button type='submit'>Submit</button>
    </form>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Address</th>
          </tr>
        </thead>
        <tbody>
          {limitedPosts.map((post) => (
            <tr key={post.id}>
              <td>{post.id} </td>
              <td>{post.firstName} </td>
              <td>{post.lastName} </td>
              <td>{post.email} </td>
              <td>{post.address.address} </td>

            </tr>
          ) )}
        </tbody>
      </table>
      
      
    </div>
  )
}

export default App