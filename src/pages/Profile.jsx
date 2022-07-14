import React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

const Profile = () => {
  return (
    <div style={{ marginTop: "5rem" }}>
      <label htmlFor="upload-photo">
        <TextField
          sx={{ display: "none" }}
          name="upload-photo"
          id="upload-photo"
          type="file"
        />

        <Button color="secondary" variant="contained" component="span">
          Upload button
        </Button>
      </label>
    </div>
  );
};

export default Profile;
