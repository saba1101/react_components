import React, { useState } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';

const ColumnConfigure = ({ items }) => {
  const [listItems, setListItems] = useState(items);

  const handleDragEnd = (result) => {
    if (!result.destination) return;
    const newListItems = Array.from(listItems);
    const [reorderedItem] = newListItems.splice(result.source.index, 1);
    newListItems.splice(result.destination.index, 0, reorderedItem);
    setListItems(newListItems);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="dropdown-list">
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {listItems.map((item, index) => (
              <Draggable key={item.id} draggableId={item.id} index={index}>
                {(provided) => (
                  <div
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    ref={provided.innerRef}
                  >
                    {item.label}
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default ColumnConfigure;
