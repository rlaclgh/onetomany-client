export default function Home() {
  return (
    <div className="w-[100%] h-[100%] m-0 flex justify-center align-middle">
      {/* left */}
      <div className="hidden bg-red-100 lg:block lg:min-h-screen lg:w-[calc(80%-450px)] "></div>

      {/* center */}
      <div className="max-w-[450px] bg-blue min-h-screen flex-1 lg:m-auto"></div>

      {/* right */}
      <div className="hidden bg-red-100 lg:block min-h-screen w-1/5"></div>
    </div>
  );
}