import React, { useState, useEffect } from 'react';
import service from '../appwrite/config';
import { Container, PostCard } from '../componet';

function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    service.getPosts().then((posts) => {
      setPosts(posts.documents);
      console.log(`post document : ${posts.documents}`);
    });
  }, []);

  if (posts.length === 0) {
    return (
      <div className="w-full py-8 mt-4 text-center">
        <Container>
          <div className="flex flex-wrap">
            <div className="p-2 w-full">
              <h2 className="text-2xl font-bold hover:text-gray-500">
                Login to read posts
              </h2>
            </div>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="w-full py-8">
      <Container>
        <div className="flex flex-wrap">
          {posts?.map((post) => {
            return <div key={post.$id} className='p-2 w-1/4'>
                <PostCard {...post} />
                </div>;
          })}
        </div>
      </Container>
    </div>
  );
}

export default Home;