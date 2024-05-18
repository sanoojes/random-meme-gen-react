import { ReactNode } from "react";

type CardProps = {
  children?: ReactNode;
};
const Card = ({ children }: CardProps) => {
  return (
    <section className='flex w-11/12 max-w-screen-md border-2 border-neutral-800 bg-neutral-900 rounded-md p-2 justify-center items-center'>
      {children}
    </section>
  );
};

export default Card;
