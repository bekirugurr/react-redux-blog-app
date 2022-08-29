# React Redux Blog App
<p><a href="#"><img src="https://logos-download.com/wp-content/uploads/2016/09/React_logo_wordmark-700x235.png"  alt="react" height="30"> </a>  <a href="#"> <img src="https://user-images.githubusercontent.com/94041207/182909807-b86d1342-c3f0-4bb1-af92-3e2edb489943.png"  alt="material ui" height="30"> </a>  <a href="#"> <img src="https://user-images.githubusercontent.com/94041207/182910142-56b24d69-e5d7-4d2f-8557-c3649ed6b8ea.png"  alt="redux" height="30"></a>  <a href="#"> <img src="https://user-images.githubusercontent.com/94041207/182919629-cb95a2ee-7628-4899-bb7b-275e1dbd3a85.png"  alt="axios" height="30"> </a>  <a href="#"><img src="https://user-images.githubusercontent.com/94041207/182910527-3818a588-68a6-41c4-919f-75325d63112f.jpg"  alt="formik_yup" height="30"> </a>  <a href="#"> <img src="https://user-images.githubusercontent.com/94041207/182910558-4b78b2e3-7a72-4c98-98a8-b42e421c0c8a.png"  alt="react_toastify" height="30"> </a>  <a href="#"> <img src="https://user-images.githubusercontent.com/94041207/182910604-1134b4d8-b7ab-438e-8dcf-1dd85961a5eb.png"  alt="vercel" height="30"> </a> </p>
<p><a href="#"><img src="https://user-images.githubusercontent.com/94041207/182887053-c5c9c8cf-9182-48a6-aa02-800ee0e5e24f.png"  alt="django rest framework" height="30"> </a>  <a href="#"> <img src="https://logos-download.com/wp-content/uploads/2018/09/SQLite_Logo-450x193.png"  alt="sqlite" height="30"> </a>  <a href="#"> <img src="https://icon-library.com/images/postgresql-icon/postgresql-icon-13.jpg"  alt="postgresql" height="30"> </a>  <a href="#"> <img src="https://user-images.githubusercontent.com/94041207/182912844-075185f7-3c3f-4d77-9f49-740dbdadd14d.png"  alt="heroku" height="30"></a> </p>

## <a href="https://react-redux-blogapp.vercel.app/" target="_blank"> Go to project 🚀 </a>
## Preview of the project:
https://user-images.githubusercontent.com/94041207/182843431-693a7c36-42d8-4161-b916-0f59de46456e.mp4
## Description 
<p>In this project, it is aimed to create blog posts and display them on the dashboard. There are six cards on the dashboard. When the <b>View More</b> button is clicked, six more cards are loaded thanks to <b>pegination</b> (if there is six more cards). </p>
<p>Anonymous user could enter dashboard page and see post cards. He/She could not enter detail page thanks to <b>private routing</b>. Only authenticated user can enter detail page. So to enter detail page anonymous user must log in or register.  </p>
<p>Post card and detail page include post title, post picture, post category, post content, number of likes, number of views, number of comments, writer name, writed profile picture and how long ago was post created. In detail page, there is also like/dislike button, comment form and comments. Every comment div includes not only comment content but also who made the comment and how long ago was comment created.  </p>
<p>The number of views is unique for each authenticated user. In other words, <b>when a authenticated user re-opens the detail page, the number of views will not increase.</b> </p>
<p><b>Authenticated user can add , delete and update blog posts.</b> While post creation if authenticated user select ‘Publish’ on the combo box the post will be shown in de dashboard, if he/she select ‘Draft’ the post won’t be shown. <b>He/She also can update his/her profile informations.</b></p>
<p>If the user has not uploaded the post picture, a default post picture will be seen as post picture. The same is true for the profile picture.   </p>
<p>After registration, log in, log out, post adding, deleting, update, profile update or comment adding  processes a notify div will appear for a while thanks to <b>react toastify.</b> This div tell whether the process is done successfully or not. If process is succesfull this div will be green, if not it will be red.</p>

## What is in the project? 
In this project:   
* Frontend was made by using  <img src="https://logos-download.com/wp-content/uploads/2016/09/React_logo_wordmark-700x235.png"  alt="react" height="30"> 
* Backend was made by using <img src="https://user-images.githubusercontent.com/94041207/182887053-c5c9c8cf-9182-48a6-aa02-800ee0e5e24f.png"  alt="django rest framework" height="30">
### In Frontend
* Style operations were made by using <img src="https://user-images.githubusercontent.com/94041207/182909807-b86d1342-c3f0-4bb1-af92-3e2edb489943.png"  alt="material ui" height="30"> 
* State management was made by using <img src="https://user-images.githubusercontent.com/94041207/182910142-56b24d69-e5d7-4d2f-8557-c3649ed6b8ea.png"  alt="redux" height="30">
* CRUD operations were made by using <img src="https://user-images.githubusercontent.com/94041207/182919629-cb95a2ee-7628-4899-bb7b-275e1dbd3a85.png"  alt="axios" height="30">
* Form validations were made by using <img src="https://user-images.githubusercontent.com/94041207/182910527-3818a588-68a6-41c4-919f-75325d63112f.jpg"  alt="formik_yup" height="30">
* Notifications were made by using react <img src="https://user-images.githubusercontent.com/94041207/182910558-4b78b2e3-7a72-4c98-98a8-b42e421c0c8a.png"  alt="react_toastify" height="30">
* Frontend part was deployed to <img src="https://user-images.githubusercontent.com/94041207/182910604-1134b4d8-b7ab-438e-8dcf-1dd85961a5eb.png"  alt="vercel" height="30">
* **React Router Dom** was used for changing gage. Also **private router** was used to prevent anonymous user to enter some pages.
* **Pegination** was used. 
* **Loading gif** was used for every waiting time passing for fetching data from dababase. 
* Default post picture and profile picture were used for the situations that user does not upload.
* **Responsiveness** for different screen size was done. 
### In Backend
Backend [repository link 🚀](https://github.com/bekirugurr/blog-API-django) for to look and [project link 🚀](https://blogapp-react-redux.herokuapp.com/) for to check with postman
* In developoment process database is <img src="https://logos-download.com/wp-content/uploads/2018/09/SQLite_Logo-450x193.png"  alt="sqlite" height="30">
* In production process database is <img src="https://icon-library.com/images/postgresql-icon/postgresql-icon-13.jpg"  alt="postgresql" height="30"> 
* Backend part was deployed to <img src="https://user-images.githubusercontent.com/94041207/182912844-075185f7-3c3f-4d77-9f49-740dbdadd14d.png"  alt="heroku" height="30"> 
* **dj rest auth** package was used for login, logout and authentication. However register view and serializer were hard coded.
* **Concrete views** and **Viewsets** were used as views. 
* **Nested serializers** were used. 
* **Token authentication** was used for authentication.
* **Custom permissions** and **object permissions** were used for authorization/permission. 
* **Cursor pegination** was choosed for pegination.
* **Search filter** was choosed for filtering.
* Although **form validation** was done in frontend, **it was also done in the backend.**
* **Swagger**, **redoc**, **debug toolbar** were used. And debug was made true for other users to check easily. 
* Finally as tiny details: 
**select_related** method was preferred for query optimisation. 
**SerializerMethodField** was preferred for field customization.
**Some methods were overridden** to create custom functionalities.
 
