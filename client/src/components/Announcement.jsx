import { IconButton } from "@material-ui/core";
import { Menu, MoreVert } from "@material-ui/icons";
import React from "react";
import styles from "../styleSheets/Announcement.module.css";
function Announcement({ image, name, date, content, authorId }) {
  return (
    <div className={styles.announcement}>
      <div className={styles.announcement__informationContainer}>
        <div className={styles.announcement__infoSection}>
          <div className={styles.announcement__imageContainer}>
            <img src={image} alt="Profile photo" />
          </div>
          <div className={styles.announcement__nameAndDate}>
            <div className={styles.announcement__name}>{name}</div>
            <div className={styles.announcement__date}>{date}</div>
          </div>
        </div>
        <div className={styles.announcement__infoSection}>
          <IconButton>
            <MoreVert />
          </IconButton>
        </div>
      </div>
      <div className="announcement__content">{content}</div>
    </div>
  );
}
export default Announcement;