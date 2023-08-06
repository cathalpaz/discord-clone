import { quotesArray } from "./loadingQuotes";

import "../../styles/components/MainLoader.css";

export function MainLoader() {
  return (
    <div className="loading-container">
      <div className="loading-container__content">
        <video autoPlay loop muted src="../../public/loading.mp4" />
        <p>{quotesArray[Math.floor(Math.random() * quotesArray.length)]}</p>
      </div>
    </div>
  );
}
