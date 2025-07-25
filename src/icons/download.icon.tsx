import { IconProps } from "@/types/type";

const Download04Icon = ({ strokeWidth = "1.5", svgProps }: IconProps) => (
    <svg xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        {...svgProps}>
        <path
            d="M12 14.5L12 4.5M12 14.5C11.2998 14.5 9.99153 
            12.5057 9.5 12M12 14.5C12.7002 14.5 14.0085 12.5057 14.5 12"
            stroke="currentColor"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round" />
        <path d="M20 16.5C20 18.982 19.482 19.5 17
         19.5H7C4.518 19.5 4 18.982 4 16.5"
            stroke="currentColor"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round" />
    </svg>
);

export default Download04Icon;