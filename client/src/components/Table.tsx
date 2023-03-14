import React, { useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { deletePost, getPosts } from "../features/posts/postReducer";
import { useAppDispatch } from "../features/store";
import { useAppSelector } from "./../features/store";

const Table = () => {
  const { posts } = useAppSelector((state) => state.post);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const initApp = useCallback(async () => {
    await dispatch(getPosts());
  }, [dispatch]);

  useEffect(() => {
    initApp();
  }, [initApp]);

  return (
    <div className="pt-32 h-screen">
      {posts.length > 0 ? (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg px-10">
          <table className="w-full text-sm text-left font-semibold rounded-lg">
            <thead className="text-xs text-white uppercase bg-primary">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Nickname
                </th>
                <th scope="col" className="px-6 py-3">
                  Description
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
                <th scope="col" className="px-6 py-3">
                  Consequences
                </th>
              </tr>
            </thead>
            {posts &&
              posts.map((post) => (
                <tbody key={post.id}>
                  <tr className="bg-gray-50 border-b border-gray-700">
                    <th
                      scope="row"
                      className="px-6 py-4 font-semibold text-black whitespace-nowrap"
                    >
                      {post.nickname}
                    </th>
                    <td className="px-6 py-4">{post.description}</td>
                    <td className="px-6 py-4">
                      <button
                        className="font-normal text-blue-600 hover:text-primary hover:font-bold hover:border hover:border-primary hover:py-1 hover:px-2 hover:rounded-lg"
                        onClick={() =>
                          navigate(
                            `/editPost/${post.id}/${post.nickname}/${post.description}`
                          )
                        }
                      >
                        Edit
                      </button>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        className="font-normal text-secondary hover:text-danger hover:font-bold hover:border hover:border-danger hover:py-1 hover:px-2 hover:rounded-lg"
                        onClick={() => {
                          dispatch(deletePost(post.id));
                        }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                </tbody>
              ))}
          </table>
        </div>
      ) : (
        <div className="h-full w-full flex flex-col justify-center items-center text-xl font-bold text-primary">
          <p>Yowza! you have made no post yet.</p>
          <p>Click the icon on the top right to create one now!</p>
        </div>
      )}
    </div>
  );
};

export default Table;
