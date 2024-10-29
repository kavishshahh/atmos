// Modal.tsx
import mermaid from 'mermaid';
import React, { useEffect, useRef } from 'react';

interface OrderRoutingData {
  [key: string]: {
    percentage: number;
    nextStep: string | null;
    nextValue: string | null;
  };
}

interface ModalProps {
  orderRoutingData: OrderRoutingData;
  isOpen: boolean;
  onClose: () => void;
}

const MermaidDiagram: React.FC<{ data: string }> = ({ data }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      mermaid.initialize({
        startOnLoad: true,
        theme: 'default',
      });
      mermaid.contentLoaded();
    }
  }, []);

  return (
    <div ref={containerRef}>
      <div className="mermaid">{data}</div>
    </div>
  );
};

const Modal: React.FC<ModalProps> = ({ orderRoutingData, isOpen, onClose }) => {
  if (!isOpen) return null;

  const mermaidData = `
    stateDiagram
    classDef yourState font-style:italic,font-weight:bold,fill:white

    yswsii: Your state with spaces in it
    [*] --> yswsii:::yourState
    [*] --> SomeOtherState
    SomeOtherState --> YetAnotherState
    yswsii --> YetAnotherState
    YetAnotherState --> [*]

  `;

  return (
    <div
      className="fixed z-10 inset-0 overflow-y-auto"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      {/* ... (rest of the modal structure) */}
      <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4 md:px-8 md:pt-6 md:pb-6">
        <div className="sm:flex sm:items-start">
          <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
            <h3
              className="text-lg leading-6 font-medium text-gray-900"
              id="modal-title"
            >
              Order Routing
            </h3>
            <MermaidDiagram data={mermaidData} />
            <button
              onClick={onClose}
              className="mt-4 text-blue-500 hover:text-blue-700"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;