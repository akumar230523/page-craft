import { getBlockDefinition } from '../constants/blockTypes';

export function createBlock(type) {
    const definition = getBlockDefinition(type);
    if (!definition) throw new Error(`Unknown block type: ${type}`);

    return {
        id: crypto.randomUUID(),
        type,
        content: { ...definition.defaultContent },
    };
}

export function reorderBlocks(list, fromIndex, toIndex) {
    const result = [...list];
    const [removed] = result.splice(fromIndex, 1);
    result.splice(toIndex, 0, removed);
    return result;
}

export function updateBlockContent(blocks, id, changes) {
    return blocks.map(block =>
        block.id === id
            ? { ...block, content: { ...block.content, ...changes } }
            : block
    );
}

export function removeBlock(blocks, id) {
    return blocks.filter(block => block.id !== id);
}