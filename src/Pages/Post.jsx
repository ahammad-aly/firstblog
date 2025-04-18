import React, { useState, useEffect } from "react";
import { Button, Container } from "../componet";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import parse from "html-react-parser";
import service from "../appwrite/config";

function Post() {
  const [post, setPost] = useState([]);
  const { slug } = useParams();
  const navigate = useNavigate();
  const userD = useSelector((state) => state.user.userData);
  const isauther = post ? post.indexId === userD.$id : false;

  useEffect(() => {
    if (slug) {
      service.getPost(slug).then((post) => {
        if (post) {
          setPost(post);
        } else {
          navigate("/");
        }
      });
    }
  }, [slug]); // Removed navigate

  const delPost = async () => {
    if (!post) return; // Prevents accessing properties of null
    return await service.deletePost(post.$id).then((status) => {
      if (status) {
        service.deletFile(post.featureimg);
        navigate("/");
      }
    });
  };

  return post ? (
    <div className="py-8">
      <Container>
        {isauther && (
          <div className="absolute right-6 top-6 z-10">
            <Link to={`/edit-post/${post.$id}`}>
              <Button bgColor="bg-green-500" className="mr-3">
                Edit
              </Button>
            </Link>
            <Button bgColor="bg-red-500" onClick={delPost}>
              Delete
            </Button>
          </div>
        )}
        <div className="w-full p-2 flex justify-center border rounded-xl mb-4 relative">
          <img
            src={service.filePreview(post.featureimg)}
            alt={post.title}
            className="rounded-xl"
          />
        </div>
        <div className="w-full mb-6">
          <h2 className="text-2xl font-bold">{post.title}</h2>
        </div>
        {/* <div className="browser-css">{parse(post.content)}</div>/ */}
      </Container>
    </div>
  ) : null;
}

export default Post;
