function IconTagLabel({stroke}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="17"
      height="16"
      fill="none"
      viewBox="0 0 17 16"
    >
      <path
        stroke={stroke}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M3.28 10.2l3.02 3.02a3.187 3.187 0 004.5 0l2.927-2.927a3.187 3.187 0 000-4.5L10.7 2.78a3.167 3.167 0 00-2.4-.927l-3.333.16a2.576 2.576 0 00-2.46 2.447l-.16 3.333c-.04.9.3 1.774.933 2.407z"
      ></path>
      <path
        stroke={stroke}
        strokeLinecap="round"
        strokeWidth="1.5"
        d="M6.833 8a1.667 1.667 0 100-3.333 1.667 1.667 0 000 3.333z"
      ></path>
    </svg>
  );
}

export default IconTagLabel;
