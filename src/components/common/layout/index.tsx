
import React from "react";
import SelectLanguage from "../selectLanguage";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface Props {
  children: React.ReactNode;
}
const LoginLayout: React.FC<Props> = ({ children }) => {

  return (
    <main className="p-[30px]">
      <section className=" flex max-[990px]:flex-col justify-center items-center  gap-[114px] ">
        <section className='w-full max-w-[400px] flex flex-col justify-center'>
          <figure className="flex justify-center">
            <img src="/images/scope.png" alt="scope" width={300} height={60} />
          </figure>
          {children}
          <div className="w-full flex justify-center mt-[124px]">
            <SelectLanguage />
          </div>
        </section>
        <figure className="">
          <img className="" src="/images/architecture.png" alt="scope" width={708} height={708} />
        </figure>
      </section>
      <ToastContainer />
    </main>
  );
}

export default LoginLayout
