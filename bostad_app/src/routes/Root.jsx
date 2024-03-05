
import Navbar from "../components/Navbar";

export default function Root() {
  return (
    <div>
      <Navbar />
      <div
        className="bg-cover h-screen"
        style={{ backgroundImage: "url('/almedalen-visby.jpg')" }}
      >
      </div>
      hello world
    </div>
  );
}
