# 💌 TDTU Notification Center Clone 💌
## 🧑‍🤝‍🧑 DT-Squad Pre-make 

<!-- [![standard-readme compliant](https://img.shields.io/badge/readme%20style-standard-brightgreen.svg?style=flat-square)](https://github.com/RichardLitt/standard-readme) -->

<!-- A standard style for README files -->

*Good morning to everyone* 🌅, especially morning heads out there who do wake up in the morning and code and work and solve problems... I am here to introduce to you all, a simple full-stack social network site based on TDTU Notification Center site.

This repository contains:

1. Client side source code
2. Server side source code
3. Original template source code (*Coming soon*)
4. README.md for instruction
<!-- 5. [Examples of standard READMEs](example-readmes/) - such as this file you are reading. -->

<!-- Standard Readme is designed for open source libraries. Although it’s [historically](#background) made for Node and npm projects, it also applies to libraries in other languages and package managers. -->


## 🍱 Table of Contents 🍱

- [Introduce](#introduce)
- 	- [Purpose](#purpose)
- 	- [Function 1](#funtion)
- 	- [Function 2](#funtion)
- 	- [Function 3](#funtion)		
- 	- [Interface ](#interface)
- [Usage](#usage)

- [Badge](#badge)
- [Example Readmes](#example-readmes)
- [Related Efforts](#related-efforts)
- [Maintainers](#maintainers)
- [Contributing](#contributing)
- [License](#license)

## Introduce

### Purpose

This is the final project of the advanced web course of Ton Duc Thang University. In the increasingly complicated situation of COVID, the Faculty of Information Technology (IT) wants to enhance the interaction between students on the Internet. online platform. Therefore, the Faculty of Information Technology wants to improve the existing Notification system in the Student Portal, adding features to help students exchange, interact online and receive feedback. Better school support.
This system can be considered as a miniature social network where the school can post announcements, and students can post to exchange and share.

The website has 3 roles as follows: 

• Admin, has full decision rights in the system. 

• Department/Faculty, has the right to manage content in the category under his/her charge. 

• Student.

### Function 1: Log in :see_no_evil: :hear_no_evil: :sun_with_face:

Admin logs into the system with username and password (initialized by database).

Department/Faculty log in to the system with username and password. This username and password are created by the Admin.

Students who want to access the system must log in. Students do not create an account by themselves, but log in using the "Sign in with" function
Google” (https://developers.google.com/identity/sign-in/web/sign-in). So the password authentication will be done by Google.
Only accounts whose email is @student.tdtu.edu.vn are allowed to log in to the system. When the student successfully logged in
For the first time, the system will create an account for the student in the database based on the information obtained from the Google account.

<p float="left">
  <img src="https://scontent-hkt1-2.xx.fbcdn.net/v/t1.15752-9/207803636_169745245180448_1207026719217597573_n.png?_nc_cat=108&ccb=1-3&_nc_sid=ae9488&_nc_ohc=H-K2fLjnruQAX-PBFQx&_nc_ht=scontent-hkt1-2.xx&oh=c5d3897068f4fa30acf1670ddfbde177&oe=60E6EACC" width="400" />
  <img src="https://scontent-hkt1-2.xx.fbcdn.net/v/t1.15752-9/208303885_397460385010345_974051759622177465_n.png?_nc_cat=108&ccb=1-3&_nc_sid=ae9488&_nc_ohc=gKgv_dbt5EcAX_RCzAf&_nc_ht=scontent-hkt1-2.xx&oh=508e7b73f389a3176ac37652d47938e3&oe=60E62FFF" width="400" /> 
</p>

<!-- ![alt text]()
<h3 align="center">Student login screen</h3>


![alt text]()
<h3 align="center">Login screen of admin and dean</h3> -->


### Function 2: Create an account and update account information :crystal_ball: :key: 🔓 

Admin has the right to create an account for the Department/Faculty. When creating an account, the Admin can grant permission to the Department/Department to post for one or
many categories.

The Department/Faculty only has the right to post for the category(s) it is in charge of. Department/Faculty can change the default password by Admin level at first.

Students after successful login can update the following personal information: Display name, Class, Faculty and avatar image (profile)
picture).


### Function 3: Content Management :straight_ruler:  :pencil2: :books:

Students have the right to post  (like facebook, post on their own wall). When students post articles, they can include images or videos (only videos from youtube ). All student posts are public and can be seen by others:
![alt text](https://scontent-hkg4-1.xx.fbcdn.net/v/t1.15752-9/211609747_351952109675876_73019969499302235_n.png?_nc_cat=105&ccb=1-3&_nc_sid=ae9488&_nc_ohc=iycdO4xz2YYAX_IQwx4&tn=0JcI-QG68uJ_S0jT&_nc_ht=scontent-hkg4-1.xx&oh=3bfd58eb4b45e4f1524bd3a7dd443aa5&oe=60E48C4B)


Students can edit and delete content that they have posted. When a post is deleted, the comments related to that post are also deleted.
The function of creating, deleting, and editing posts must be done by AJAX (no page reload).Users (Admin, Department/Faculty, Students) can comment on any post. Comment function must be done by AJAX(no page reload).Users can view all comments. Users can delete their own comments.The Department/Faculty has the right to post articles in the category it is in charge of. If assigned to be in charge of more than one category, when Post an article, you can choose the category you want to post in.

### Interface display :muscle: :dvd: :hearts:

• The website is user-friendly, has a logical layout, has menus and navigation.

• All pages are capable responsive and works stably on any type of device.

## Usage

To deploy the website, we used https://www.heroku.com/ for hosting and MongoDB Atlas for the database (https://www.mongodb.com/cloud/atlas)

Here is the link to our website: https://tdtu-noticlone.herokuapp.com/


## Badge

If your README is compliant with Standard-Readme and you're on GitHub, it would be great if you could add the badge. This allows people to link back to this Spec, and helps adoption of the README. The badge is **not required**.

[![standard-readme compliant](https://img.shields.io/badge/readme%20style-standard-brightgreen.svg?style=flat-square)](https://github.com/RichardLitt/standard-readme)

To add in Markdown format, use this code:

```
[![standard-readme compliant](https://img.shields.io/badge/readme%20style-standard-brightgreen.svg?style=flat-square)](https://github.com/RichardLitt/standard-readme)
```

## Example Readmes

To see how the specification has been applied, see the [example-readmes](example-readmes/).

## Related Efforts

- [Art of Readme](https://github.com/noffle/art-of-readme) - 💌 Learn the art of writing quality READMEs.
- [open-source-template](https://github.com/davidbgk/open-source-template/) - A README template to encourage open-source contributions.

## Maintainers

[@NhutNguyen236](https://github.com/NhutNguyen236).

## Contributing

Feel free to dive in! [Open an issue](https://github.com/NhutNguyen347/TDTU-NotiClone/issues) or submit PRs.

<!-- Standard Readme follows the [Contributor Covenant](http://contributor-covenant.org/version/1/3/0/) Code of Conduct. -->

### Contributors

This project exists thanks to all the people who contribute. 

<table>
  	<tr>
        <td align="center">
            <a href="https://github.com/BrandonTuan777"><img src="https://github.com/BrandonTuan777.png" width="100px;" alt=""/><br/>
            <sub><b>Morisaki Tuan</b></sub></a><br /><a href="#question-kentcdodds" title="Answering Questions">💬</a> <a href="https://github.com/all-contributors/all-contributors/commits?author=kentcdodds" title="Documentation">📖</a> <a href="#talk-kentcdodds" title="Talks">📢</a>
        </td>
            <td align="center"><a href="https://github.com/NhutNguyen236"><img src="https://github.com/NhutNguyen236.png" width="100px;" alt=""/><br/>
            <sub><b>Nhut Nguyen</b></sub></a><br /><a href="#question-kentcdodds" title="Answering Questions">💬</a> <a href="https://github.com/all-contributors/all-contributors/commits?author=kentcdodds" title="Documentation">📖</a> <a href="https://github.com/all-contributors/all-contributors/pulls?q=is%3Apr+reviewed-by%3Akentcdodds" title="Reviewed Pull Requests">👀</a> <a href="https://github.com/all-contributors/all-contributors/commits?author=MatheusRV" title="Code">💻</a> <a href="#maintenance-tbenning" title="Maintenance">🚧</a> 
        </td>
	</tr>
</table>

## License

[MIT](LICENSE) © Nhut & Brandon
