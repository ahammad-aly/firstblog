import React, {useState, useEffect } from 'react'
import {Button, Container} from '../componet'
import {Link, useParams, useNavigate} from 'react-router-dom'
import {useSelector} from 'react-redux'
import parse from 'html-react-parser'
import service from '../appwrite/config'

function Post() {
  const [post, setPost] = useState(null)
  const {slug} = useParams()
  const navigate = useNavigate()
  const userD = useSelector((state)=> state.user)
  const isauther = post && userD ? post.indexId === userD.$id : false
  useEffect(()=>{
    if(slug){
      console.log(`post ka params hain slug se ${slug}`)
      service.getPost(slug).then((post)=> {
        if(post){
          setPost(post)
        }else{
          navigate("/")
        }
      })
    }
  },[slug, navigate])
  const delPost = ()=>{
    service.deletePost(post.$id).then((status) => {
      if(status){
        service.deletFile(post.featureImage)
        navigate('/')
      }
    })
  }
  console.log(`all post he ye ${post}`)
  return post ? (
    <div className="py-8">
      <Container>
        <div className="w-full p-2 flex justify-center border rounded-xl mb-4 relative">
          <img
          src={service.filePreview(post.featureimg)}
          alt={post.title}
          className="rounded-xl"
          />
          {isauther && (
            <div className="absolute right-6 top-6">
              <Link to={`/edite-post/${post.$id}`}>
                <Button bgColor='bg-green-500' className="mr-3">Edite</Button>
              </Link>
              <Button bgColor='bg-red-500' onClick={delPost}>Delete</Button>
            </div>
          )}
        </div>

        <div className="w-full mb-6">
          <h2 className="text-2xl font-bold">{post.title}</h2>
        </div>
        <div className="browser-css">
        {parse(post.content)}
        </div>
      </Container>
    </div>
  ) : null
}

export default Post