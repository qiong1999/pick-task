import React, { useEffect, useRef, useState } from "react";

function WithMouse(WrappedComponent) {
  const divNode = useRef(null);
  const [dragStatus, setDrag] = useState({
    position: "static",
    draging: false,
    mouseDown: false,
    startX: 0,
    startY: 0,
    moveX: 0,
    moveY: 0,
  });
  useEffect(() => {
    let style;

    if (dragStatus.mouseDown) {
      style = `
      
        position:${dragStatus.position};
        top:${dragStatus.moveY}px;
        left:${dragStatus.moveX}px;
        z-index:10000;
        `;
    } else if (divNode.current) {
      style = `
     
        position:${dragStatus.position};
        top:${divNode.current.getClientRects()[0].top}px;
        left:${divNode.current.getClientRects()[0].left}px;
        `;
    }
    if (divNode.current) {
      divNode.current.setAttribute("style", style);
    }
  }, [dragStatus]);
  return (props) => {

    
    return (
      <div
        ref={divNode}
        onMouseDown={(e) => {
          setDrag({
            ...dragStatus,
            mouseDown: true,
            startX: e.clientX - divNode.current.getClientRects()[0].left,
            startY: e.clientY - divNode.current.getClientRects()[0].top,
          });
          // console.log(dragStatus.current);
        }}
        onMouseMove={(e) => {
          if (dragStatus.mouseDown) {
            setDrag({
              ...dragStatus,
              position: "fixed",
              draging: true,
              moveX: e.clientX - dragStatus.startX,
              moveY: e.clientY - dragStatus.startY,
            });
          }
        }}
        onMouseUp={(e) => {
          setDrag({
            ...dragStatus,
            draging: false,
            mouseDown: false,
            position: "static",
          });
          props.handleClick({x:e.target.getClientRects()[0].left,y:e.target.getClientRects()[0].top,id:e.target.id})
        
        }}
      >
        <WrappedComponent {...props}></WrappedComponent>
      </div>
    );
  };
}

export default WithMouse;
