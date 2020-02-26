import * as React from 'react';
import './style.css';

function initArray(size) {
  return Array(size).fill(0);
}

const Masonry = (props: { children: JSX.Element[] }) => {
  let gridRef = null;
  let gridFilledBoundary = [];

  React.useEffect(() => {
    window.addEventListener('resize', _layout);
    _layout();
    return () => { window.removeEventListener('resize', _layout); }
  }, []);

  /**
   *  Loop through the gridFilledBoundary
   *  Find optimal position (Magic?)
   *  Min(y) that satisfies for x to x + element.offsetWidth
   *  If y found that satisfies, skip till next y < currentMinY
   *  Update gridFilledBoundary
   *
   * @param {HTMLElement} element
   */
  const _addChild = (element) => {
    let optimalPosition = { x: 0, y: Math.max(...gridFilledBoundary) };
    const width = element.offsetWidth;

    for (let x = 0; x < gridFilledBoundary.length - width; x++) {
      const columnHeight = gridFilledBoundary[x];

      // For compact stacking, minimize Y, Early return if columnHeight > foundMinY
      if (columnHeight >= optimalPosition.y) continue;

      // Element can fit at given Y co-ordianate
      if (_canFit(x, element)) {
        optimalPosition = {
          x,
          y: columnHeight,
        };
      }
    }

    _updateGridBoundary(element, optimalPosition);
    requestAnimationFrame(() => {
      _placeElement(element, optimalPosition);
    })
  }

  /**
   * Checks if an element can fit at Position(x)
   *
   * @param {Number} x
   * @param {HTMLElement} element
   */
  const _canFit = (x, element) => {
    const gridFilledBoundaryCopy = [...gridFilledBoundary];

    const width = element.offsetWidth;
    const y = gridFilledBoundaryCopy[x];

    const portion = gridFilledBoundaryCopy.slice(x, x + width);

    return portion.every(value => value <= y);
  }

  const _placeElement = (element, position) => {
    element.style.top = `${position.y}px`;
    element.style.left = `${position.x}px`;
  }

  /**
   * Update the gridFilledBoundary post element placement
   *
   * @param {HTMLElement} element
   * @param {Position} position
   */
  const _updateGridBoundary = (element, position) => {
    const width = element.offsetWidth;
    const boundaryY = position.y + element.offsetHeight;

    for (let x = position.x; x < position.x + width; x++) {
      gridFilledBoundary[x] = boundaryY;
    }
  }

  const _layout = () => {
    if (!gridRef) {
      return;
    }
    gridFilledBoundary = initArray(gridRef.offsetWidth);
    const children = gridRef.children;
    for (let child of children) {
      _addChild(child);
    }
  }

  return (
    <div
      className='masonry-grid'
      ref={node => {
        gridRef = node;
      }}>
      {React.Children.map(props.children, child => (
        <div className='grid-item'>{child}</div>
      ))}
    </div>
  );
}

export default Masonry;