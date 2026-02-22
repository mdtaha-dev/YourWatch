import TagChip from './TagChip';

interface FilterBarProps {
    selectedTags: string[];
    onToggleTag: (tag: string) => void;
    language: string;
    onLanguageChange: (lang: string) => void;
    minRating: number;
    onRatingChange: (val: number) => void;
}

const ALL_TAGS = [
    'Action', 'Horror', 'Sci-Fi', 'Romance', 'Thriller', 'Comedy',
    'Mind-bending', 'Emotional', 'Dark', 'Feel-good', 'Fast-paced'
];

const FilterBar = ({
    selectedTags, onToggleTag, language, onLanguageChange, minRating, onRatingChange
}: FilterBarProps) => {
    return (
        <div className="bg-surface p-6 rounded-2xl border border-secondary sticky top-24 z-30 shadow-xl space-y-6">
            <div>
                <h4 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4">Tags</h4>
                <div className="flex flex-wrap gap-2">
                    {ALL_TAGS.map(tag => (
                        <TagChip
                            key={tag}
                            tag={tag}
                            active={selectedTags.includes(tag)}
                            onClick={onToggleTag}
                        />
                    ))}
                </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-6">
                <div className="flex-1">
                    <h4 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-3">Language</h4>
                    <select
                        value={language}
                        onChange={(e) => onLanguageChange(e.target.value)}
                        className="w-full bg-zinc-800 text-white rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-indigo-500 border-none"
                    >
                        <option className="bg-zinc-800 text-white" value="">
                            All Languages
                        </option>
                        <option className="bg-zinc-800 text-white" value="English">
                            English
                        </option>
                        <option className="bg-zinc-800 text-white" value="Hindi">
                            Hindi
                        </option>
                        <option className="bg-zinc-800 text-white" value="Korean">
                            Korean
                        </option>
                    </select>
                </div>

                <div className="flex-1">
                    <h4 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-3">
                        Min Rating: <span className="text-primary">{minRating}</span>
                    </h4>
                    <input
                        type="range"
                        min="0"
                        max="10"
                        step="0.1"
                        value={minRating}
                        onChange={(e) => onRatingChange(parseFloat(e.target.value))}
                        className="w-full accent-primary bg-secondary h-2 rounded-lg appearance-none cursor-pointer"
                    />
                </div>
            </div>
        </div>
    );
};

export default FilterBar;
