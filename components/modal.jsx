export default function MyModal({ children }) {
  return (
    <div className=" cursor-default absolute top-0 left-0 w-full h-full backdrop-brightness-50 flex justify-center items-center">
      {children}
    </div>
  );
}
