import { useEffect, useRef, useState } from 'react';
import './App.css';
import { Simple } from './components';
import { generateId } from './utils';

function App() {

  const [elements, setElements] = useState([]);
  const refApp = useRef(null);

  let addElem = (previousElemId, elemId, innerHtml) => {
    setElements((elements) => {
      return elements.reduce((accum, current) => {
        accum.push(current);
        if (current.props.id === previousElemId) {
          accum.push(
            <Simple key={elemId} id={elemId}>
              {innerHtml}
            </Simple>
          );
        }
        return accum;
      }, []);
    });
  };


  useEffect(() => {
    const appElem = refApp.current;

    let observer = new MutationObserver((mutationRecords) => {
      console.log(mutationRecords);
      if (mutationRecords[0].addedNodes.length > 0) {
        // let addedElem = mutationRecords[0].addedNodes[0];
        // console.log(addedElem); // console.log(изменения)
        // console.log(addedElem.innerHTML);
        // addedElem.innerHTML = addedElem.innerText;
        // console.log(addedElem.innerHTML);
        let elemId = generateId();
        let mut = mutationRecords[0];
        addElem(mut.previousSibling.id, elemId, mut.addedNodes[0].innerHTML);

        console.log(
          mut.previousSibling.id,
          elemId,
          mut.addedNodes[0].innerHTML
        );

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
      }
    });
    observer.observe(appElem, {
      childList: true, // наблюдать за непосредственными детьми
      // subtree: true, // и более глубокими потомками
      characterDataOldValue: true, // передавать старое значение в колбэк
    });
    let elemId = generateId();
    setElements([<Simple key={elemId} id={elemId}>Hello</Simple>]);
    // addElem(null, generateId(), "<b>Zirnyi</b> <i>cursive</i>");
  }, []);

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
