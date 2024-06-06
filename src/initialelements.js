// initialElements.js
export const initialNodes = [
    {
      id: '1',
      type: 'customNode',
      data: { label: 'Welcome to the Chatbot Flow Builder' },
      position: { x: 250, y: 5 },
    },
    {
      id: '2',
      type: 'customNode',
      data: { label: 'This is another text node' },
      position: { x: 250, y: 100 },
    }
  ];
  
  export const initialEdges = [
    {
      id: 'e1-2',
      source: '1',
      target: '2',
      animated: true,
    }
  ];
  