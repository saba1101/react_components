import React, { useEffect, useState } from 'react';
import IconConfigure from '@/assets/icons/svg/configure.svg';
import style from './ColumnConfigure.module.scss';
import CheckBox from '@/components/Form/FormControls/Checkbox/Checkbox.jsx'
import IconDrag from '@/assets/icons/svg/drag.svg'

const ColumnConfigure = ({ items,change}) => {
  const [listItems, setListItems] = useState(items);
  const [draggedIndex, setDraggedIndex] = useState(null);
  const [listVisible, setListVisible] = useState(false);

  const handleDragStart = (event, index) => {
    setDraggedIndex(index);
    event.dataTransfer.effectAllowed = 'move';
    event.dataTransfer.setData('text/plain', index);
    // event.target.style.opacity = '0.5';
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleDragEnter = (event, targetIndex) => {
    if (targetIndex === draggedIndex) return;

    const updatedItems = [...listItems];
    const draggedItemData = updatedItems[draggedIndex];
    updatedItems.splice(draggedIndex, 1);
    updatedItems.splice(targetIndex, 0, draggedItemData);
    setListItems(updatedItems);
    setDraggedIndex(targetIndex);
  };

  const handleDragEnd = () => {
    setDraggedIndex(null);
    // resetItemOpacity();
    sortItems();
    change(listItems)
  };

  // const resetItemOpacity = () => {
  //   const list = document.getElementsByClassName('draggable-list')[0];
  //   const items = list.getElementsByClassName('draggable-item');
  //   Array.from(items).forEach((item) => {
  //     item.style.opacity = '1';
  //   });
  // };

  const sortItems = () => {
    setListItems((prevItems) => [...prevItems].sort((a, b) => a.orderIndex - b.orderIndex));
  };

  useEffect(() => {
    setListItems(listItems.map((el, ind) => ({ ...el, orderIndex: ind })));
  }, [draggedIndex]);

  // useEffect(() => {
  //   sortItems()
  // },[listItems])

  const handleCheckboxChange = (index) => {
    setListItems((prevItems) =>
      prevItems.map((item, i) =>
        i === index ? { ...item, visible: !item.visible } : item
      )
    );
  };

  const ExpandList = () => {
    setListVisible((state) => !state);
  };

  return (
    <div className={style.configureWrapper}>
      <div className={style.iconWrapper} onClick={ExpandList}>
        <img src={IconConfigure} alt="" />
      </div>
      {listVisible && (
        <ul className="draggable-list">
          {listItems.map((item, index) => (
            <li
              key={index}
              className={`draggable-item${index === draggedIndex ? ' dragged' : ''} ${!item.visible ? style.notVisible : ''}`}
              draggable
              onDragStart={(event) => handleDragStart(event, index)}
              onDragOver={handleDragOver}
              onDragEnter={(event) => handleDragEnter(event, index)}
              onDragEnd={handleDragEnd}
            >
              <div className={style.iconDrag}> 
                <img src={IconDrag} alt="" />
              </div>
                <CheckBox
                  checked={item.visible || false}
                  change={() => (handleCheckboxChange(index),change(listItems))}
                />
                <span>{item.columnName}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ColumnConfigure;
