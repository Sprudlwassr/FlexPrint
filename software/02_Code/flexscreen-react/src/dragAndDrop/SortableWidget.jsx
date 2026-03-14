import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

export const SortableWidget = ({ id, title, children }) => {
    // setNodeRef: Damit weiss die Library, welches div man bewegen darf
    // listeners: Event-Handler -> Damit das Widget weiss, ob eine Maus oder ein Finger es Bewegt
    // attributes: Infos für den Browser
    // transform: Die Bewegungsanimation
    // transition: Geschmeidige animation -> Widget gleitet in das div
    // isDragging: damit weiss man, ob das Widget benutzt wird oder nicht -> um beim ziehen das aussehen zu ändern 
    const { 
    attributes, listeners, setNodeRef, 
    transform, transition, isDragging 
  } = useSortable({ id });

  const style = { // Damit kann man das Widget einstellen, während es sich bewegt
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 100 : 1,
    opacity: isDragging ? 0.4 : 1,
    scale: isDragging ? '1.02' : '1',
  };

  return (
    <div ref={setNodeRef} style={style} className="widget-tile">
      <div className="widget-header" {...attributes} {...listeners}>
        {title}
      </div>
      <div className="widget-content">
        {children}
      </div>
    </div>
  );
};