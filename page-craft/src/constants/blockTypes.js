import TitleIcon from '@mui/icons-material/Title';
import TextFieldsIcon from '@mui/icons-material/TextFields';
import ImageIcon from '@mui/icons-material/Image';
import CodeIcon from '@mui/icons-material/Code';

export const BLOCK_TYPES = {
    HEADER: 'header',
    TEXT: 'text',
    IMAGE: 'image',
    MARKDOWN: 'markdown',
};

export const BLOCK_DEFINITIONS = [
    {
        type: BLOCK_TYPES.HEADER,
        label: 'Header',
        description: 'Title or heading',
        icon: TitleIcon,
        defaultContent: {
            text: 'Your Heading',
            level: 1,
            align: 'left',
            color: '#1A1614',
        },
    },
    {
        type: BLOCK_TYPES.TEXT,
        label: 'Rich Text',
        description: 'Styled paragraph',
        icon: TextFieldsIcon,
        defaultContent: {
            text: 'Write your content here...',
            fontSize: 'base',
            bold: false,
            italic: false,
            align: 'left',
            color: '#3D332E',
        },
    },
    {
        type: BLOCK_TYPES.IMAGE,
        label: 'Image',
        description: 'Image from URL',
        icon: ImageIcon,
        defaultContent: {
            url: '',
            alt: 'Image',
            caption: '',
            size: 'full',
            rounded: 'md',
        },
    },
    {
        type: BLOCK_TYPES.MARKDOWN,
        label: 'Markdown',
        description: 'Write Markdown',
        icon: CodeIcon,
        defaultContent: {
            content: '# Hello Markdown!\n\nWrite **bold** or *italic* text.\n\n- List item 1\n- List item 2',
        },
    },
];

export const getBlockDefinition = (type) =>
    BLOCK_DEFINITIONS.find(def => def.type === type);