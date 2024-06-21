import Post from './Post';

const Feed = ({ posts }: any) => {
  return (
    <div>
      <div>Community feed</div>
      <div className="rounded-lg bg-white p-4 shadow-md">
        {posts.map((post: { id: any }, index: any) => (
          <Post index={index} key={post.id} length={posts.length} post={post} />
        ))}
      </div>
    </div>
  );
};

export default Feed;
