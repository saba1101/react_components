const Checkmark = (props) => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 8 7"
        {...props}
      >
        <path
          fill="#fff"
          fillRule="evenodd"
          d="M6.039.43A1.11 1.11 0 017.556.201c.483.342.588.998.234 1.466L4.431 6.1a1 1 0 01-1.492.115L.317 3.677a1.023 1.023 0 01.002-1.483 1.113 1.113 0 011.535.002l1.641 1.59L6.04.428z"
          clipRule="evenodd"
        ></path>
      </svg>
    );
  }
  
  export default Checkmark;
  