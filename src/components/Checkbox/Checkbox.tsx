import config from "../../../tailwind.config";
import CheckIcon from "../../utils/icons/CheckIcon";
import React from "react";

const Checkbox = () => {
  const [checked, setChecked] = React.useState<boolean>(false);
  return (
    <div className="h-[16.25px] w-[16.25px] flex justify-center align-center">
      <input
        className={`cursor-pointer mr-[-16.25px] appearance-none bg-transparent border-[1.11px] rounded-[4.44px] border-gray-300 h-[16.25px] w-[16.25px] hover:bg-gray-300/20 checked:bg-primary-400 checked:hover:bg-primary-500 checked:border-none`}
        type="checkbox"
        onClick={() => setChecked(!checked)}
      />
      {checked && (
          <CheckIcon width={"16.25px"} height={"16.25px"} fillColor={"gray"} />
      )}
    </div>
  );
};

export default Checkbox;
