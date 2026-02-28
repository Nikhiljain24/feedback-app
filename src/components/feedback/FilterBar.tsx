import React from 'react';
import { Segmented } from 'antd';

interface FilterBarProps {
    categories: string[];
    selectedCategory: string;
    onSelectCategory: (category: string) => void;
}

const FilterBar: React.FC<FilterBarProps> = ({ categories, selectedCategory, onSelectCategory }) => {
    return (
        <div style={{ marginBottom: 24, textAlign: 'center' }}>
            <Segmented
                options={categories}
                value={selectedCategory}
                onChange={(value) => onSelectCategory(value as string)}
            />
        </div>
    );
};

export default FilterBar;
