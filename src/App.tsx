import { useEffect, useState } from "react";
import { MemeType } from "./types/types";
import Card from "./components/Card";

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<MemeType>();
  const [isClicked, setIsClicked] = useState(false);

  const toggleIsClicked = () => {
    setIsClicked((prev) => !prev);
  };

  const fetchMemes = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("http://meme-api.com/gimme");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const result = await response.json();
      setData(result);
      setIsLoading(false);
      console.log(result);
    } catch (error) {
      console.error("Error fetching memes:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    function triggerEvent() {
      fetchMemes();
    }
    triggerEvent();
  }, [isClicked]);

  return (
    <>
      <button
        type='button'
        className='absolute top-4 right-2 bg-neutral-800 hover:bg-neutral-700 focus:outline-none font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center me-2 transition-colors z-50'
        onClick={() => {
          open(
            `https://github.com/sanoojes` + import.meta.env.BASE_URL,
            "SingleSecondaryWindowName"
          );
        }}
      >
        <svg
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 24 24'
          width='2rem'
          height='2rem'
          fill='#fff'
        >
          <path d='M10.9,2.1c-4.6,0.5-8.3,4.2-8.8,8.7c-0.6,5,2.5,9.3,6.9,10.7v-2.3c0,0-0.4,0.1-0.9,0.1c-1.4,0-2-1.2-2.1-1.9 c-0.1-0.4-0.3-0.7-0.6-1C5.1,16.3,5,16.3,5,16.2C5,16,5.3,16,5.4,16c0.6,0,1.1,0.7,1.3,1c0.5,0.8,1.1,1,1.4,1c0.4,0,0.7-0.1,0.9-0.2 c0.1-0.7,0.4-1.4,1-1.8c-2.3-0.5-4-1.8-4-4c0-1.1,0.5-2.2,1.2-3C7.1,8.8,7,8.3,7,7.6C7,7.2,7,6.6,7.3,6c0,0,1.4,0,2.8,1.3 C10.6,7.1,11.3,7,12,7s1.4,0.1,2,0.3C15.3,6,16.8,6,16.8,6C17,6.6,17,7.2,17,7.6c0,0.8-0.1,1.2-0.2,1.4c0.7,0.8,1.2,1.8,1.2,3 c0,2.2-1.7,3.5-4,4c0.6,0.5,1,1.4,1,2.3v3.3c4.1-1.3,7-5.1,7-9.5C22,6.1,16.9,1.4,10.9,2.1z' />
        </svg>
      </button>
      <main className='h-screen w-full bg-neutral-950 text-neutral-50 flex flex-col items-center gap-2 justify-center'>
        <Card>
          <h1 className='text-xl font-bold'>Random Meme Generator</h1>
        </Card>
        <Card>
          {!isLoading && data ? (
            <img
              className='rounded-md'
              src={data?.preview?.[data?.preview.length - 1]}
              alt={data?.title}
            />
          ) : (
            <p>Loading...</p>
          )}
        </Card>
        {!isLoading ? (
          <Card>
            <button
              className='px-4 py-2 bg-neutral-950 hover:bg-neutral-900 transition-all border-2 border-neutral-800 rounded-md'
              onClick={() => toggleIsClicked()}
            >
              Generate Random Meme
            </button>
          </Card>
        ) : null}
      </main>
    </>
  );
}

export default App;

