import { useState } from 'react';
import { DndContext, closestCenter } from '@dnd-kit/core';
import { arrayMove, SortableContext, rectSortingStrategy } from '@dnd-kit/sortable';
import { SortableWidget } from '../SortableWidget.jsx';

const Dashboard = () => {
  const [items, setItems] = useState([
    { id: 'status', title: 'Drucker Status', content: 'Bereit' },
    { id: 'temp', title: 'Temperatur', content: '185°C' },
    { id: 'progress', title: 'Fortschritt', content: '45%' },
    { id: 'cam', title: 'Kamera', content: '[Live Feed]' }
  ]);

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      setItems((prev) => {
        const oldIndex = prev.findIndex(i => i.id === active.id);
        const newIndex = prev.findIndex(i => i.id === over.id);
        return arrayMove(prev, oldIndex, newIndex);
      });
    }
  };

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <div className="menuBodyWidgetBox"> {/* Dies ist nun dein Haupt-Grid */}
        <SortableContext items={items} strategy={rectSortingStrategy}>
          {items.map((item) => (
            <SortableWidget key={item.id} id={item.id} title={item.title}>
              {item.content}
            </SortableWidget>
          ))}
        </SortableContext>
      </div>
    </DndContext>
  );
};

export default Dashboard;