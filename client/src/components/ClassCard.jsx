import { IconButton } from "@material-ui/core";
import { AssignmentIndOutlined, FolderOpenOutlined } from "@material-ui/icons";
import React from "react";
// import { useHistory } from "react-router-dom";
import ClassCardcss from "../styleSheets/ClassCard.module.css";
function ClassCard({ name, creatorName, creatorPhoto, id, style }) {
  //   const history = useHistory();
  const goToClass = () => {
    // history.push(`/class/${id}`);
  };
  return (
    <div className={ClassCardcss.classCard} style={style} onClick={goToClass}>
      <div className={ClassCardcss.classCard__upper}>
        <div className={ClassCardcss.classCard__className}>{name}</div>
        <div className={ClassCardcss.classCard__creatorName}>{creatorName}</div>
        <img
          src={creatorPhoto}
          className={ClassCardcss.classCard__creatorPhoto}
        />
      </div>
      <div className={ClassCardcss.classCard__middle}></div>
      <div className={ClassCardcss.classCard__lower}>
        <IconButton>
          <FolderOpenOutlined />
        </IconButton>
        <IconButton>
          <AssignmentIndOutlined />
        </IconButton>
      </div>
    </div>
  );
}
export default ClassCard;
