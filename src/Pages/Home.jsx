import React, {useState, useEffect} from 'react'
import service from '../appwrite/config'
import {Container, PostCard} from '../componet'

function Home() {
  const [posts, setPosts] = useState([])
  useEffect(() => {
    if(posts){
      service.getPosts().then((post)=>{
        setPosts(post)
      })
    }
  }, [])
  if(posts.length === 0){
    return (<div className="w-full py-8 mt-4 text-center">
      <Container>
        <div className="flex flex-wrap">
          <div className="p-2 w-full">
            <h2 className="text-2xl font-bold hover:text-gray-500">
              Login to read posts
            </h2>
          </div>
        </div>
      </Container>
    </div>)
  }
  return (
    <div className="w-full py-8">
      <Container>
        <div className="flex flex-wrap">
          {posts.map((post)=>{
            <PostCard {...post}/>
          })}
        </div>
      </Container>
    </div>
  )
}

export default Home