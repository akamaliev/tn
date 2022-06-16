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

  let counter = useRef(0);


  useEffect(() => {
    const appElem = refApp.current;

    let observer = new MutationObserver((mutationRecords) => {
      console.log(mutationRecords);
      let mut = mutationRecords[0];
      let sibling = mut.previousSibling || mut.nextSibling;
      console.log(' ');
      // console.log('sibling.id: ', sibling.id);
      // console.log('mut.addedNodes[0].id: ', mut.addedNodes[0].id);
      if (sibling && mut.addedNodes.length > 0 && sibling.id === mut.addedNodes[0].id) {
        // let addedElem = mutationRecords[0].addedNodes[0];
        // console.log(addedElem); // console.log(изменения)
        // console.log(addedElem.innerHTML);
        // addedElem.innerHTML = addedElem.innerText;
        // console.log(addedElem.innerHTML);
        // mut.addedNodes[0].id = 'changedId_' + generateId() + '_n' + counter.current;
        // counter.current = counter.current + 1;
        let elemId = generateId();
        // mut.addedNodes[0].id = elemId;
        let innerhtml = mut.addedNodes[0].innerHTML;
        appElem.removeChild(mut.addedNodes[0]);
        addElem(sibling.id, elemId, innerhtml);

        console.log(
          sibling.id,
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
