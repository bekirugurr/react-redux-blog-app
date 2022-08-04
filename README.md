# React Redux Blog App
[Go to project 🚀](https://react-redux-blogapp.vercel.app/)
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
<p > <span style=" display: inline-block;"> In this project   </span> <img style="padding: 0 0.7rem; margin-top: 0.4rem; text-align:center;" src="https://logos-download.com/wp-content/uploads/2016/09/React_logo_wordmark-700x235.png"  alt="react" height="20"> <span style=" display: inline-block;"> is used for frontend,</span> <img style="padding: 0 0.7rem; margin-bottom: -0.4rem; text-align:center;" src="https://logos-download.com/wp-content/uploads/2019/06/Django_Logo.png"  alt="react" height="20"><span style=" display: inline-block;"> and </span><img style="padding: 0 0.7rem; margin-bottom: -0.4rem; text-align:center;" src="https://user-images.githubusercontent.com/94041207/182884012-aac975c0-b0ae-4d09-8765-e25b6fbaafc2.png"  alt="django rest framework" height="20"><span style=" display: inline-block;"> are used for backend.</span>
</p>

<p > <span style=" display: inline-block;">While in development process   </span> <img style="padding: 0 0.7rem; margin-top: 0.4rem; text-align:center;" src="https://logos-download.com/wp-content/uploads/2018/09/SQLite_Logo-450x193.png"  alt="react" height="20"> <span style=" display: inline-block;"> is used, in production process </span><span style=" display: inline-block;"> In this project   </span> <img style="padding: 0 0.7rem; margin-bottom: -0.4rem; text-align:center;" src="https://icon-library.com/images/postgresql-icon/postgresql-icon-13.jpg"  alt="react" height="20"> <span style=" display: inline-block;"> is used. </span></p>



