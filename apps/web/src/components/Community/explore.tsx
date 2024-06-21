import Feed from './Feed';
const Explore = ({ posts }: any) => {
  return (
    <>
      <div className="" id="popular">
        <div> People are joining these communities (10)</div>
        <div className="flex items-center justify-between gap-2">
          <button className="bg-grey-300 h-6 w-6 rounded-full">{'<'}</button>
          <div className="shadow-l relative h-96 w-full overflow-hidden rounded-2xl bg-red-400 pr-2">
            <img
              alt="Photography"
              className="h-full w-full object-cover"
              src="https://via.placeholder.com/400x300"
            />
            <div className="absolute left-0 top-0 flex space-x-2 p-2">
              <span className="rounded-full bg-gray-700 px-2 py-1 text-xs text-white">
                ART
              </span>
              <span className="rounded-full bg-gray-700 px-2 py-1 text-xs text-white">
                DESIGN
              </span>
            </div>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <img
                alt="Icon"
                className="mb-2 rounded-full border-4 border-white"
                src="https://via.placeholder.com/60"
              />
              <div className="overlay mb-2 w-48 rounded-full bg-gray-400 bg-opacity-30 py-1 text-center text-lg font-bold text-white">
                Photography
              </div>
              <div className="overlay w-48 rounded-full bg-gray-400 bg-opacity-30 py-1 text-center text-sm text-white">
                721 Members
              </div>
            </div>
            <div className="w-full rounded-3xl bg-yellow-100">image 2</div>
          </div>
          <div className="relative h-96 w-full overflow-hidden rounded-2xl bg-red-400 pl-2 shadow-lg">
            <img
              alt="Photography"
              className="h-full w-full object-cover"
              src="https://via.placeholder.com/400x300"
            />
            <div className="absolute left-0 top-0 flex space-x-2 p-2">
              <span className="rounded-full bg-gray-700 px-2 py-1 text-xs text-white">
                ART
              </span>
              <span className="rounded-full bg-gray-700 px-2 py-1 text-xs text-white">
                DESIGN
              </span>
            </div>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <img
                alt="Icon"
                className="mb-2 rounded-full border-4 border-white"
                src="https://via.placeholder.com/60"
              />
              <div className="overlay mb-2 w-48 rounded-full bg-gray-400 bg-opacity-30 py-1 text-center text-lg font-bold text-white">
                Car Gurus
              </div>
              <div className="overlay w-48 rounded-full bg-gray-400 bg-opacity-30 py-1 text-center text-sm text-white">
                503 Members
              </div>
            </div>
            <div className="w-full rounded-3xl bg-yellow-100">image 2</div>
          </div>
          <button className="h-6 w-6 rounded-full bg-gray-300">{'>'}</button>
        </div>
      </div>

      <Feed posts={posts} />
    </>
  );
};
export default Explore;
