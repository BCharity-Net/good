import React from 'react';
const Post = ({ index, length, post }: any) => {
  return (
    <React.Fragment key={post.id}>
      <div className="p-4">
        <div className="mb-4 flex items-center">
          <img
            alt={post.user.name}
            className="h-10 w-10 rounded-full"
            src={post.user.avatar}
          />
          <div className="ml-3">
            <div className="text-sm font-semibold">
              {post.user.name}{' '}
              <span className="text-gray-500">in {post.user.category}</span>
            </div>
            <div className="text-xs text-gray-500">{post.time}</div>
          </div>
        </div>
        {post.image && (
          <img
            alt="Post"
            className="mb-4 h-auto w-full rounded-lg"
            src={post.image}
          />
        )}
        <div className="mb-4 text-sm">{post.description}</div>
        <div className="flex items-center text-sm text-gray-500">
          <button className="mr-4 flex items-center">
            <div className="mr-1" />
            {post.likes} likes
          </button>
          <button className="flex items-center">
            <div className="mr-1" />
            {post.comments} comments
          </button>
        </div>
      </div>
      {index < length - 1 && <hr className="my-6 border-gray-300" />}
    </React.Fragment>
  );
};

export default Post;
