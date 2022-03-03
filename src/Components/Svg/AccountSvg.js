import React from "react";

const AccountSvg = ({ color }) => {
  return (
    <svg
      width="26"
      className={`${color} fill-current transition-all`}
      height="26"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M6.5 11.375h8.938V13H6.5v-1.625Zm0 4.063h10.563v1.624H6.5v-1.625Z" />
      <path d="M22.75 3.25H3.25a1.625 1.625 0 0 0-1.625 1.625v16.25A1.625 1.625 0 0 0 3.25 22.75h19.5a1.625 1.625 0 0 0 1.625-1.625V4.875A1.625 1.625 0 0 0 22.75 3.25Zm0 1.625V6.5H3.25V4.875h19.5Zm-19.5 16.25v-13h19.5v13H3.25Z" />
    </svg>
  );
};

export default AccountSvg;
