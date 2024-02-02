import React, {useEffect, useState} from "react";
import Icon from "../Icon/Icon";

export interface GridListProps {
    onChecked?: (checked: boolean) => void;
    checked?: boolean;
    disabled?: boolean;
}

export const GridList: React.FC<GridListProps> = ({ onChecked, checked, disabled }) => {
    const [state, setState] = useState<boolean>(checked || false);
    const handle = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChecked && onChecked(e.target.checked);   
        setState(e.target.checked ? true : false);
    };

    useEffect(() => {
        setState(checked || false);
    }, [checked]);

    let selectedColor = "#FFFFFF";
    selectedColor = disabled ? "#FFFFFF"+80 : selectedColor;

    return (
        <label htmlFor="Toggle4" className={"flex justify-center items-center bg-white/10 rounded-[4px] max-w-max " + (disabled === true  ? "cursor-not-allowed" : "cursor-pointer")}>
            <input id="Toggle4" type="checkbox" className={"hidden peer" } onChange={handle} disabled={disabled} />
            <span className={state ? "flex items-center justify-center h-[28px] w-[30px] pl-[6px] bg-gray-400 bg-transparent border rounded-[4px] border-transparent transition-all duration-100 ease-in" : "transition-all duration-100 ease-in flex items-center justify-center w-[36px] h-[28px]  bg-gray-400 border border-white/30 rounded-[4px]"}>
                <Icon name={"GridIcon"} width="20" height="20" fillColor={state ? "#FFFFFF"+80 : selectedColor}/>
            </span>
            <span className={state ? "flex items-center justify-center w-[36px] h-[28px]  pr-[0px] border border-white/30 rounded-[4px] bg-gray-400 transition-all duration-100 ease-in" : "transition-all duration-100 ease-in flex items-center justify-center w-[30px] h-[28px] pr-[6px] border border-transparent rounded-[4px]"}>
                <Icon name={"ListIcon"} width="20" height="20" fillColor={state ? selectedColor : "#FFFFFF"+80} />
            </span>
        </label>
    );
};