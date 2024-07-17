import Form from "@/components/Form";
import Footer from "./Footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen justify-between">
      <div> </div>
      <div className="flex justify-center items-center px-4">
        <Form />
      </div>
      <Footer />
    </div>
  );
}
