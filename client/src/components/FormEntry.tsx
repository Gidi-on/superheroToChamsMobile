import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createPost } from "../features/posts/postReducer";
import { useAppDispatch } from "../features/store";
import Header from "./Header";

interface FormValues {
  nickname: string;
  description: string;
}

const FormEntry: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  //handling form entry
  const [formValues, setFormValues] = useState<FormValues>({
    nickname: "",
    description: "",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(createPost(formValues));
    navigate("/home");
  };

  return (
    <>
      <Header />
      <div className="py-32">
        <div className="max-w-[30rem] p-10 mx-auto border border-primary">
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <p className="text-center font-bold text-4xl mb-10 text-primary">
                Create Post
              </p>
              <label
                htmlFor="nickname"
                className="block mb-2 text-lg font-bold text-gray-900"
              >
                Your nickname
              </label>
              <input
                type="text"
                id="nickname"
                name="nickname"
                placeholder="nickname"
                value={formValues.nickname}
                onChange={handleInputChange}
                className="block p-2.5 w-full text-lg text-black font-semibold bg-gray-100 rounded-lg border border-blue-500 border-gray-600 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label
                htmlFor="description"
                className="block mb-2 text-lg font-bold text-gray-900"
              >
                Your message
              </label>
              <textarea
                id="description"
                name="description"
                value={formValues.description}
                onChange={handleInputChange}
                placeholder="Leave a comment..."
                className="block p-2.5 w-full text-lg text-black font-semibold bg-gray-100 rounded-lg border border-blue-500 border-gray-600 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500"
              ></textarea>
            </div>
            <button
              className="border px-10 py-2 rounded-lg cursor-pointer bg-primary hover:bg-white hover:text-primary hover:border-primary text-white mt-10 mx-auto flex self-center"
              type="submit"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default FormEntry;
