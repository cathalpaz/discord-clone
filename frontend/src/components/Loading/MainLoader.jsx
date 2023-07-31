import { quotesArray } from "./loadingQuotes";

import "../../styles/components/MainLoader.css";

export function MainLoader() {
  return (
    <div className='loading-container'>
      <div className='loading-container__content'>
        <i className='fa-brands fa-discord'></i>
        <p>{quotesArray[Math.floor(Math.random() * quotesArray.length)]}</p>
      </div>
    </div>
  );
}
