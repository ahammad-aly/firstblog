import React, { useState, useEffect } from "react";
import { Container, PostForm } from "../componet";
import service from "../appwrite/config";
import { useNavigate, useParams } from "react-router-dom";

function Edite() {
  const [post, setPost] = useState(null);
  const navigate = useNavigate();
  const { slug } = useParams();
  useEffect(() => {
    if (slug) {
      service.getPost(slug).then((post) => {
        setPost(post);
      });
    } else {
      navigate("/");
    }
  }, [slug, navigate]);
  return post ? (
    <div className="py-8">
      <Container>
        <PostForm post={post} />
      </Container>
    </div>
  ) : null;
}

export default Edite;
