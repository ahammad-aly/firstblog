import React, {useCallback, useEffect} from 'react'
import {useForm} from 'react-hook-form'
import {useNavigate} from 'react-router-dom'
import {useSelector} from 'react-redux'
import {Button, Input, Select, RTE} from './index'
import service from '../appwrite/config'

function PostForm({post}) {
    const userD = useSelector((state) => state.user)
    const {watch, handleSubmit, register, getValues, setValue, control} = useForm({
      defaultValues: {
        title: post?.title || "",
        content: post?.content || "",
        slug: post?.$id || "",
        status: post?.status || 'active'
      }
    })
    const navigate = useNavigate()

    const slugTransform = useCallback((value)=> {
      if(value && typeof value === "string"){
        return value
        .trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, "-")
      }
      return ""
    },[])

    useEffect(() => {
      const subscrition = watch((value, {name})=> {
        if(name === "title"){
          setValue("slug", slugTransform(value.title))
        }
      })
      return () => subscrition.unsubscribe()
    },[watch, slugTransform, setValue])

    async function postFile(data){
      if(post){
        const file = data.image[0] ? await service.uploadFile(data.image[0]) : null;
        if(file){
          await service.deletFile(post.featureimg)
        }
        const dbpost = await service.updatePost(post.$id,{...data, featureimg: file ? file.$id : undefined})
        if(dbpost){
          navigate(`/post/${dbpost.$id}`)
        }
      }else {
        const file = await service.uploadFile(data.image[0])
        if(file){
          const fileId = file.$id
          data.featureimg = fileId
          const dbpost = await service.createPost({...data})
          if(dbpost){
            navigate(`/post/${dbpost.$id}`)
          }
        }
      }
    }

  return (
    <form onSubmit={handleSubmit(postFile)} className="flex flex-wrap">
      <div className="w-2/3 px-2">
      <Input label="Title"
      placeholder="Title"
      className="mb-4"
      {...register("title", {
        required: true
      })}
      />
      <Input 
      label="Slug"
      placeholder="Slug"
      className="mb-4"
      {...register("slug", {
        required: true
      })}
      onInput={(e)=> {
        setValue('slug', slugTransform(e.currentTarget.value), {shouldValidate: true})
      }}
      />
      <RTE label="Content: "
      name="content"
      control={control}
      defaultValue={getValues('content')}
      />
      </div>
      <div className="w-1/3 px-2">
      <Input 
      label="Featureimg: "
      accept="image/png, image/jpg, image/jpeg, image/gif"
      {...register("image", {required: !post})}
      type="file"
      />
      {post && (
        <div className="w-full mb-4">
          <img
          src={service.filePreview(post.featureimg)}
          alt={post.title}
          className="rounded-lg"
          />
        </div>
      )}

      {/* <Select
      label="Status"
      options={['active', 'inactive']}
      className='mb-4'
      {...register("status", { required: true })}
      /> */}
      <Button className="w-full" bgColor={post ? "bg-green-500" : undefined} type="submit">{post ? "Update" : "Post" }</Button>
      </div>
    </form>
  )
}

export default PostForm