import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  Input,Typography
} from "@material-ui/core";
import React, { useState } from "react";
//   import { useAuthState } from "react-firebase-hooks/auth";
//   import { useRecoilState } from "recoil";
//   import { auth, db } from "../firebase";
//   import { createDialogAtom } from "../utils/atoms";
function CreateClass() {
  const [open, setOpen] = useState(true);
  const [className, setClassName] = useState("");

  const handleClose = () => {
    setOpen(false);
  };
  const createClass = async () => {
    //   try {
    //     const newClass = await db.collection("classes").add({
    //       creatorUid: user.uid,
    //       name: className,
    //       creatorName: user.displayName,
    //       creatorPhoto: user.photoURL,
    //       posts: [],
    //     });
    //     // add to current user's class list
    //     const userRef = await db
    //       .collection("users")
    //       .where("uid", "==", user.uid)
    //       .get();
    //     const docId = userRef.docs[0].id;
    //     const userData = userRef.docs[0].data();
    //     let userClasses = userData.enrolledClassrooms;
    //     userClasses.push({
    //       id: newClass.id,
    //       name: className,
    //       creatorName: user.displayName,
    //       creatorPhoto: user.photoURL,
    //     });
    //     const docRef = await db.collection("users").doc(docId);
    //     await docRef.update({
    //       enrolledClassrooms: userClasses,
    //     });
    //     handleClose();
    //     alert("Classroom created successfully!");
    //   } catch (err) {
    //     alert(`Cannot create class - ${err.message}`);
    //   }
  };
  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        maxWidth
      >
        <DialogTitle id="form-dialog-title">Create class</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Name..."
            type="text"
            fullWidth
            value={className}
            onChange={(e) => setClassName(e.target.value)}
          />

        <TextField
            autoFocus
            margin="dense"
            label="Description..."
            type="textArea"
            fullWidth
            value={className}
            onChange={(e) => setClassName(e.target.value)}
            multiline rows={4}
          />

        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={createClass} color="primary">
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
export default CreateClass;
