import Image from "next/image";
import React from "react";

const Empty = () => {
  return (
    <div className="shadow-empty p-5  flex items-center justify-center bg-background rounded-xl">
      <div className="py-[26px] md:py-[62px] bg-background flex flex-col items-center justify-center gap-6 md:gap-10">
        <Image
          src={"/images/illustration-empty.svg"}
          width={124.77}
          height={80}
          alt="empty"
          className="h-[80px] md:w-[249.53px] md:h-[160px]"
        />
        <div className="md:w-[488px] text-center flex flex-col gap-6">
          <h2 className="text-[24px] md:text-heading-md font-bold">
            Let&apos;s get you started
          </h2>
          <p>
            Use the “Add new link” button to get started. Once you have more
            than one link, you can reorder and edit them. We&apos;re here to
            help you share your profiles with everyone!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Empty;
