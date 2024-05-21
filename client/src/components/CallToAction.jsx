import { Button } from "flowbite-react";

export default function CallToAction() {
  return (
    <div className="flex flex-col sm:flex-row p-3 border border-teal-500 gap-2 justify-center items-center rounded-tl-3xl rounded-br-3xl text-center">
      <div className="flex-1 flex flex-col justify-center">
        <h2 className="text-2xl">Want to learn about ReactJS?</h2>
        <p className="text-gray-500 my-2">
          Click below to enroll in the world's best ReactJS course ever. You
          will learn each and everything about ReactJS.
        </p>
        <Button
          gradientDuoTone="purpleToPink"
          className="rounded-tl-md
         rounded-bl-none"
        >
          Learn More
        </Button>
      </div>
      <div className="p-7 flex-1">
        <img
          src="https://miro.medium.com/v2/1*y6C4nSvy2Woe0m7bWEn4BA.png"
          alt=""
        />
      </div>
    </div>
  );
}
