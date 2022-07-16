import {
  Box,
  TextField,
  Card,
  Container,
  Typography,
  Button,
} from "@mui/material";
import React from "react";

const example = {
  id: "6",
  img: "https://gonullu.pardus.org.tr/wp-content/uploads/2021/12/pythondjango.jpg",
  header: "Django",
  date: `${new Date()}`.slice(4, 15),
  text: "Django is a Python-based free and open-source web framework that follows the model-template-views architectural pattern. It is maintained by the Django Software Foundation, an American independent organization established as a 501 non-profit.",
  writerEmail: "harris@clarusway.com",
  comments: [
    "Django is a Python-based",
    "independent organization established",
    "web framework that follows the",
    "Python-based free and open-source",
  ],
  whoLiked: [
    "billy@clarusway.com",
    "jonathan@clarusway.com",
    "harry@clarusway.com",
    "marry@clarusway.com",
    "joshua@clarusway.com",
    "luke@clarusway.com",
    "tom@clarusway.com",
    "daniel@clarusway.com",
    "edward@clarusway.com",
  ],
};

const BlogForm = () => {
  return (
    <Box component="form" autoComplete="off" >
      <TextField
        id="outlined-basic-title"
        label="Title"
        variant="outlined"
        name="title"
        fullWidth
        required
        sx={{ mb: "1rem" }}
      />
      <TextField
        id="outlined-basic-image"
        label="Image URL"
        variant="outlined"
        name="imageURL"
        fullWidth
        required
        sx={{ mb: "1rem" }}
      />
      <TextField
        id="outlined-basic-content"
        label="Content"
        variant="outlined"
        name="content"
        fullWidth
        required
        multiline
        minRows={10}
        sx={{ mb: "1rem" }}
      />
      <Button
        variant="contained"
        fullWidth
        type="submit"
        sx={{
          ":hover": {
            bgcolor: "#D5D5D5", 
            color: "#046582",
          },
        }}
      >
        SUBMIT
      </Button>
    </Box>
  );
};

export default BlogForm;
