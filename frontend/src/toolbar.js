// toolbar.js

import { DraggableNode } from './draggableNode';

export const PipelineToolbar = () => {

    return (
        <div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', justifyContent: 'center' }}>
                <DraggableNode type='customInput' label='Input' />
                <DraggableNode type='llm' label='LLM' />
                <DraggableNode type='customOutput' label='Output' />
                <DraggableNode type='text' label='Text' />
                <DraggableNode type='switch' label='Switch' />
                <DraggableNode type='dropdown' label='Dropdown' />
                <DraggableNode type='number' label='Number' />
                <DraggableNode type='info' label='Info' />
                <DraggableNode type='SearchBox' label='Search' />
                {/* Add more nodes as needed */}
            </div>
        </div>
    );
};
