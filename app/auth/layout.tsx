import Image from "next/image";
import bg from "@/public/bg.svg";


const AuthLayout = ({children}: {children: React.ReactNode}) => {
    return ( 
        <div className="h-full flex items-center justify-center">
                 <Image
        src={bg}
        alt="background"
        quality={100}
        fill
        sizes="100vw"
        style={{
          objectFit: "cover",
        }}
        className="opacity-10 pointer-events-none"
      />

            {children}
        </div>
     );
}
 
export default AuthLayout;