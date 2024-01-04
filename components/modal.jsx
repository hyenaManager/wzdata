export default function MyModal({ children }) {
  return (
    <div className=" cursor-default z-50 fixed top-0 left-0 w-full h-full backdrop-brightness-50 flex justify-center items-center">
      {children}
    </div>
  );
}
