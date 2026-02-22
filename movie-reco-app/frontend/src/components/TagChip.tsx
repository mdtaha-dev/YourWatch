interface TagChipProps {
    tag: string;
    active?: boolean;
    onClick?: (tag: string) => void;
}

const TagChip = ({ tag, active, onClick }: TagChipProps) => {
    return (
        <button
            onClick={() => onClick?.(tag)}
            className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${active
                    ? 'bg-primary text-white'
                    : 'bg-secondary text-gray-300 hover:bg-gray-700'
                }`}
        >
            {tag}
        </button>
    );
};

export default TagChip;
