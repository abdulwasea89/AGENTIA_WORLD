import { LucideProps } from "lucide-react";

const Icons = {
    icon: (props: LucideProps) => (
        <svg {...props} width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4.10015 8.93079C3.58098 9.29022 3.52079 10.0349 3.9755 10.4731L6.48394 12.8902C6.82469 13.2185 7.34894 13.263 7.74022 12.9969L15.3149 7.84481C16.3321 7.15299 17.6685 7.15219 18.6864 7.84281L27.573 13.8718C28.1216 14.244 28.4502 14.8639 28.4502 15.5269V27.9361C28.4502 28.3006 28.1547 28.596 27.7903 28.596C27.4239 28.596 27.3305 29.1039 27.6729 29.2343L32.5997 31.1103C32.9859 31.2573 33.42 31.1434 33.5885 30.7661C33.7883 30.3187 34 29.6064 34 28.596V11.596L18.7031 1.16174C17.6772 0.461905 16.3261 0.466584 15.305 1.1735L4.10015 8.93079Z" fill="url(#paint0_linear_701_154)" />
            <path d="M0 13.8985C0 13.0239 1.04349 12.5707 1.68261 13.1677L5.09031 16.3508C5.49522 16.729 5.72509 17.2583 5.72509 17.8123V28.596H15.9381C16.1768 28.596 16.4135 28.6387 16.6371 28.7221L28.1905 33.0315C28.7125 33.2262 28.5729 34 28.0157 34H3C1.34315 34 0 32.6569 0 31V13.8985Z" fill="url(#paint1_linear_701_154)" />
            <defs>
                <linearGradient id="paint0_linear_701_154" x1="17" y1="0" x2="17" y2="34" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#EA580B" />
                    <stop offset="1" stopColor="#FB923C" />
                </linearGradient>
                <linearGradient id="paint1_linear_701_154" x1="17" y1="0" x2="17" y2="34" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#EA580B" />
                    <stop offset="1" stopColor="#FB923C" />
                </linearGradient>
            </defs>
        </svg>
    ),
    logo: (props: LucideProps) => (
        <svg {...props} width="162" height="34" viewBox="0 0 162 34" fill="none" xmlns="http://www.w3.org/2000/svg">
            <text
                    x="38"
                    y="20"
                    fontFamily="Arial, sans-serif"
                    fontSize="24"
                    fontWeight="bold"
                    fill="url(#paint2_linear_706_147)"
                    dominantBaseline="middle"
                    alignmentBaseline="middle"
                >
                    AEGNTIA WORLD
                </text>
            <defs>
                <linearGradient id="paint0_linear_706_147" x1="17" y1="0" x2="17" y2="34" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#EA580B" />
                    <stop offset="1" stopColor="#FB923C" />
                </linearGradient>
                <linearGradient id="paint1_linear_706_147" x1="17" y1="0" x2="17" y2="34" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#EA580B" />
                    <stop offset="1" stopColor="#FB923C" />
                </linearGradient>
                <linearGradient id="paint2_linear_706_147" x1="46" y1="17" x2="162" y2="17" gradientUnits="userSpaceOnUse">
                    <stop stopColor="white" />
                    <stop offset="1" stopColor="#999999" />
                </linearGradient>
            </defs>
        </svg>
    ),
};

export default Icons;
