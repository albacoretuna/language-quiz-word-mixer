import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import shuffle from "lodash.shuffle";
import styled from "styled-components";

// fake data generator
const getItems = (sentence) =>
  shuffle(
    sentence.split(" ").map((k, i) => ({
      id: `${i}`,
      content: k
    }))
  );

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const grid = 10;

const getItemStyle = (isDragging, draggableStyle, isCorrect) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: "none",
  padding: grid * 2,
  margin: `0 ${grid}px 0 0`,

  // change background colour if dragging
  background: isDragging || isCorrect ? "lightgreen" : "lightpink",

  // styles we need to apply on draggables
  ...draggableStyle
});

const getListStyle = (isDraggingOver) => ({
  background: isDraggingOver ? "lightblue" : "#ddd",
  display: "flex",
  padding: grid,
  overflow: "auto"
});

const Question = ({sentence}) => {
  const [isCorrect, setIsCorrect] = useState(false);
  const [items, setItems] = useState(getItems(sentence));

  const isWordOrderCorrect = (items) => {
    const wordOrders = items.map((item) => {
      return item.id;
    });
    const sortedWordOrders = [...wordOrders].sort((a, b) => a - b);

    return wordOrders.join("") === sortedWordOrders.join("");
  };
  const onDragEnd = (result) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const newWordOrder = reorder(items, result.source.index, result.destination.index);

    setItems(newWordOrder);
    setIsCorrect(isWordOrderCorrect(newWordOrder));
  };

  // Normally you would want to split things out into separate components.
  // But in this example everything is just done in one place for simplicity

  return (
    <div style={{margin:"20px auto"}}>
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable" direction="horizontal">
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              style={getListStyle(snapshot.isDraggingOver)}
              {...provided.droppableProps}
            >
              {items.map((item, index) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={getItemStyle(
                        snapshot.isDragging,
                        provided.draggableProps.style,
                        isCorrect
                      )}
                    >
                      {item.content}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
              {isCorrect && <h4>Correct!</h4>}
            </div>
          )}
         
        </Droppable>
      </DragDropContext>
      
    </div>
  );
};

export default Question;
