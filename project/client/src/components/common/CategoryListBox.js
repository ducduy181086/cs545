import { useEffect, useState } from "react";
import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from "@headlessui/react";


const CategoryListbox = (props) => {

    const { categoryData, onSelectCategory, selectedCategory, disabled = false } = props;

    const [selected, setSelected] = useState(null);

    const handleSelected = (e) => {
        console.log('eee = ', e)
        if (disabled) return;
        console.log('setSelected = ', e)

        setSelected(e)
        onSelectCategory(e)
    }

    useEffect(() => {
        console.log('setSelected = ', selectedCategory)
        if (selectedCategory) {
            setSelected(selectedCategory);
        }
    }, [selectedCategory]);

    return (
        <Listbox value={selected} onChange={handleSelected} disabled={disabled}>
            <div className="relative mt-1">
                <ListboxButton
                    className={`relative w-full cursor-default rounded-md ${disabled ? "bg-gray-100" : "bg-white"
                        } py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 sm:text-sm`}
                >
                    <span className="flex items-center">
                        <span className="ml-1 block truncate">
                            {selected ? selected.name : "Select a category"}
                        </span>
                    </span>
                </ListboxButton>
                {
                    !disabled &&

                    // <ListboxOptions className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                    //     {renderCategories(hierarchicalData)}
                    // </ListboxOptions>
                     <ListboxOptions className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                        {categoryData.map((category) => (
                            <div key={category.id}>
                                <ListboxOption
                                    value={category}
                                    className="group relative cursor-default select-none py-2 pl-3 pr-9 text-gray-900 data-[focus]:bg-indigo-600 data-[focus]:text-white"
                                >
                                    <span className="font-bold">{category.name}</span>
                                </ListboxOption>

                                {category?.subCategories?.map((subcategory) => (
                                    <ListboxOption
                                        key={subcategory.id}
                                        value={subcategory}
                                        className="group relative cursor-default select-none py-2 pl-6 pr-9 text-gray-700 data-[focus]:bg-indigo-600 data-[focus]:text-white"
                                    >
                                        <span className="block truncate">{subcategory.name}</span>
                                    </ListboxOption>
                                ))}
                            </div>
                        ))}
                    </ListboxOptions>
                }
            </div>
        </Listbox>
    );
}

export default CategoryListbox;