import React from "react";

interface HideListProp {
  hideList: boolean;
  setHideList: React.Dispatch<React.SetStateAction<boolean>>;
}
const HideList:React.FC<HideListProp> = ({hideList,setHideList}) => {
  return (
    <div className=" hidelist">
      {hideList ? (
        <button
          onClick={() => setHideList(false)}
          className=" hidelistBtn hide"
        >
          Hide List
        </button>
      ) : (
        <button onClick={() => setHideList(true)} className=" hidelistBtn show">
          Show List
        </button>
      )}
    </div>
  );
};

export default HideList;
