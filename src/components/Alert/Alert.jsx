import React from "react";

const Alert = ({ color }) => {
  return (
    <div className="mx-auto flex justify-center p-5">
      <div
        className={
          "text-white w-6/12 text-center px-6 py-4 border-0 rounded relative mb-4 bg-" +
          color +
          "-500"
        }
      >
        <span className="text-xl inline-block mr-5 align-middle">
          <i className="fas fa-bell" />
        </span>
        <span className="inline-block align-middle mr-8">
          <b className="capitalize">Cenovnik uspesno kreiran</b>
        </span>
      </div>
    </div>
  );
};

export default Alert;