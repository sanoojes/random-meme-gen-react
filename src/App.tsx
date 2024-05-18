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

