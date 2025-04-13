import { SignUp } from "@clerk/nextjs";
import BgGradient from "@/components/common/bg-gradient";
export default function Page() {
  return (
    <section className="bg-white py-6 sm:py-12 h-screen flex justify-center items-center lg:min-h-[40vh]  ">
      <BgGradient />
      <div className="py-12 lg:py-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <SignUp />
      </div>
    </section>
  );
}
