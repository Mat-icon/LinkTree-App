import Image from "next/image";

const StartBanner: React.FC = ()=> {
    return(
        <>
        <div className="w-full bg-gray-50 h-auto p-10 rounded-lg flex flex-col items-center justify-center space-y-6">
        <Image
          src="/images/Group 273.png"
          alt="logo"
          width={250}
          height={37}
          className=""
        />

        <h2 className=" md:text-3xl w-full text-center text-2xl font-bold">Let&apos;s get you started</h2>
        <p className="w-full md:w-8/12 text-gray-400 text-center text-sm">
          Use the “Add new link” button to get started. Once you have more than
          one link, you can reorder and edit them. We&apos;re here to help you share
          your profiles with everyone!
        </p>
      </div>
      </>
    );
}


export default StartBanner;