import { useEffect, useRef, useState } from 'react';
import './App.css';
import { Simple } from './components';
import { generateId } from './utils';

function App() {

  const [elements, setElements] = useState([]);
  const refApp = useRef(null);

  useEffect(() => {

    const appElem = refApp.current;


    let observer = new MutationObserver((mutationRecords) => {
      console.log(mutationRecords);
      if(mutationRecords[0].addedNodes.length > 0) {

        let addedElem = mutationRecords[0].addedNodes[0];
        console.log(addedElem); // console.log(изменения)
        console.log(addedElem.innerHTML);
        addedElem.innerHTML = addedElem.innerText;
        console.log(addedElem.innerHTML);
        addedElem.id = generateId();

        // let observer_child = new MutationObserver((mutRecords) => {
        //   console.log('Child mutation:');
        //   console.log(mutRecords);
        // });
        // observer_child.observe(addedElem, {
        //   childList: true, // наблюдать за непосредственными детьми
        //   // subtree: true, // и более глубокими потомками
        //   characterDataOldValue: true, // передавать старое значение в колбэк
        // });

        // appElem.removeChild(addedElem);
        // addedElem.remove();
        // setElements((elements) => {
        //   return [...elements];
        // });
      };
    });
    observer.observe(appElem, {
      childList: true, // наблюдать за непосредственными детьми
      // subtree: true, // и более глубокими потомками
      characterDataOldValue: true, // передавать старое значение в колбэк
    });

    setElements([<Simple key={1} />]);
  }, [setElements]);

  console.log('render');

  return (
    <div
      ref={refApp}
      className="App"
      contentEditable
      suppressContentEditableWarning
    >
      {elements}
    </div>
  );
}

export default App;
