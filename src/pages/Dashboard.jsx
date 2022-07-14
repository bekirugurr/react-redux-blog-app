import React, { useEffect } from "react";
import BlogCard from "../components/BlogCard";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { Typography } from "@mui/material";
import axios from 'axios';
import { useDispatch } from "react-redux";

const Dashboard = () => {
  const dispatch = useDispatch()
  const info = [
    {
      id:'1', 
      img: "https://www.alastyr.com/blog/wp-content/uploads/2021/04/Javascript-framework-nedir-768x323.jpg",
      header: "JavaScript",
      date: `${new Date()}`.slice(4, 15),
      text: "JavaScript, often abbreviated as JS, is a programming language that conforms to the ECMAScript specification. JavaScript is high-level, often just-in-time compiled, and multi-paradigm. It has curly-bracket syntax, dynamic typing, prototype-based object-orientation, and first-class functions.",
      email: "walter@clarusway.com",
    },
    {
      id:'2', 
      img: "https://gonullu.pardus.org.tr/wp-content/uploads/2021/12/pythondjango.jpg",
      header: "Django",
      date: `${new Date()}`.slice(4, 15),
      text: "Django is a Python-based free and open-source web framework that follows the model-template-views architectural pattern. It is maintained by the Django Software Foundation, an American independent organization established as a 501 non-profit.",
      email: "harris@clarusway.com",
    },
    {
      id:'3', 
      img: "https://www.alastyr.com/blog/wp-content/uploads/2021/04/Javascript-framework-nedir-768x323.jpg",
      header: "JavaScript",
      date: `${new Date()}`.slice(4, 15),
      text: "JavaScript, often abbreviated as JS, is a programming language that conforms to the ECMAScript specification. JavaScript is high-level, often just-in-time compiled, and multi-paradigm. It has curly-bracket syntax, dynamic typing, prototype-based object-orientation, and first-class functions.",
      email: "walter@clarusway.com",
    },
    {
      id:'4', 
      img: "https://gonullu.pardus.org.tr/wp-content/uploads/2021/12/pythondjango.jpg",
      header: "Django",
      date: `${new Date()}`.slice(4, 15),
      text: "Django is a Python-based free and open-source web framework that follows the model-template-views architectural pattern. It is maintained by the Django Software Foundation, an American independent organization established as a 501 non-profit.",
      email: "harris@clarusway.com",
    },
    {
      id:'5', 
      img: "https://www.alastyr.com/blog/wp-content/uploads/2021/04/Javascript-framework-nedir-768x323.jpg",
      header: "JavaScript",
      date: `${new Date()}`.slice(4, 15),
      text: "JavaScript, often abbreviated as JS, is a programming language that conforms to the ECMAScript specification. JavaScript is high-level, often just-in-time compiled, and multi-paradigm. It has curly-bracket syntax, dynamic typing, prototype-based object-orientation, and first-class functions.",
      email: "walter@clarusway.com",
    },
    {
      id:'6', 
      img: "https://gonullu.pardus.org.tr/wp-content/uploads/2021/12/pythondjango.jpg",
      header: "Django",
      date: `${new Date()}`.slice(4, 15),
      text: "Django is a Python-based free and open-source web framework that follows the model-template-views architectural pattern. It is maintained by the Django Software Foundation, an American independent organization established as a 501 non-profit.",
      email: "harris@clarusway.com",
    },
  ];

  const getPosts = () => {
    axios.get('http://127.0.0.1:8000/post/post/')
    .then(response => {
      console.log(response.data);
      const postsData = {
        nextPage : response.data.next,
        previousPage : response.data.previous,
        postsList : response.data.results
      }
      console.log(postsData)
      // dispatch(setCurrentUser(response.data))
      // navigate('/')
    })
    .catch((error) => {
      console.log(error);
    });
  }
  useEffect(() => {
    getPosts()
  }, [])
  

  return (
    <Container>
      <Typography
        variant="h3"
        sx={{ fontFamily: "Girassol", mb: "1.5rem", mt:"1rem", color: "#04617D" }}
      >
        ──── Dashboard ────
      </Typography>
      <Grid
        container
        spacing={5}
        sx={{ p: "0 2rem 5rem", justifyContent: "center" }}
      >
        {info.map((item) => (
          <Grid key={item.id} item lg={4} md={6} sm={12}>
            <BlogCard {...item} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Dashboard;
