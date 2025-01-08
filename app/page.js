import Image from "next/image";
import HomeImage from "./homePic.jpg"
export default function Home() {
  return (
    <>
    <div style={{ position: "relative", width: "100%", height: "100vh" }}>
        <Image 
          src={HomeImage}
          alt="Description" 
          layout="fill" 
          objectFit="cover" 
          priority
        />
      </div>
    </>
  );
}
