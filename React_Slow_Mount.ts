///////////////////////////////////// https://itnext.io/improving-slow-mounts-in-react-apps-cff5117696dc /////////////////////////////////////

* Improving slow mounts in React apps

////////////////////////////// Defer.jsx //////////////////////////////

const Defer = ({ chunkSize, children }) => {
  const [renderedItemsCount, setRenderedItemsCount] = React.useState(chunkSize);

  const childrenArray = React.useMemo(() => React.Children.toArray(children), [
    children
  ]);

  React.useEffect(() => {
    if (renderedItemsCount < childrenArray.length) {
      window.requestIdleCallback(
        () => {
          setRenderedItemsCount(
            Math.min(renderedItemsCount + chunkSize, childrenArray.length)
          );
        },
        { timeout: 200 }
      );
    }
  }, [renderedItemsCount, childrenArray.length, chunkSize]);

  return childrenArray.slice(0, renderedItemsCount);
};
      
////////////////////////////// ComponentWithDefer.jsx //////////////////////////////

import Defer from './Defer';
import Card from './Cefer';

const Component = ({ items }) => {
  return (
    <Defer chunkSize={5}>
      {items.map(item => <Card key={item.id} item={item} />)}
    </Defer>
  )
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
