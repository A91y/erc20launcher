import Form from "@/components/Form";
import Footer from "@/components/Footer";
import { Toaster } from "@/components/ui/toaster"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen justify-between">
      <div> </div>
      <div className="flex justify-center items-center px-4">
        <Form />
        <Toaster />
      </div>
      <Footer />
    </div>
  );
}
