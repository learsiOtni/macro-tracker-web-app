<!-- PROJECT LOGO -->

<br />
<div align="center" id="readme-top">
  <a href="https://github.com/learsiOtni/macro-tracker-web-app">
    <h1 align="center">Macro Tracker</h1>
  </a>


  <p align="center">
    A web app to track your daily macros, helping you with your fitness goals.
    <br />
    <br />
    <a href="https://macro-tracker-5e99c.web.app/signin">
      <strong>View Demo</strong>
    </a>
    <br />
    <br />
  </p>
</div>


<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li>
      <a href="#usage">Usage</a>
      <ul>
        <li><a href="#authentication-page">Authentication Page</a></li>
        <li><a href="#search-page">Search Page</a></li>
        <li><a href="#overview-page">Overview Page</a></li>
        <li><a href="#dashboard-page">Dashboard Page</a></li>
      </ul>
    </li>
    <li><a href="#future-features">Future Features</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
# About The Project

![Macro Tracker](https://github.com/learsiOtni/macro-tracker-web-app/blob/main/screenshots/home.png "Macro Tracker")

Macro Tracker is a web application where users can log their daily food intake, and in turn, the app will show the total amount of protein, carbs, fat, and calories each meal has. The users can set their macros goal, go to the search page, select a category: breakfast; snacks; lunch; dinner, and start adding a food. They can search for particular items or even add items to their favourites for easier filtering. Each category calculates the total amount of protein, carbs, fat, and calories for the food it contains, separate from the total of the day. There is also an overview page where the users can see their macros and calories in a weekly view.

One of my hobbies was going to the gym and staying fit. Before developing this web app, the way I tracked my macros and calories was manually, using an Excel spreadsheet. In the Excel spreadsheet, I stored a data list of the food I ate. I would create a page template and start copying and pasting food items from the data list. Also, it was very difficult to tweak or edit things such as changing 100g to 80g. I also tried some fitness tracker apps but you have to pay after 2 weeks of free trial. That was when I decided to develop this macro tracker app. I use this app whenever I am cutting or reducing my calorie intake in preparation for the summer holidays.

</br>

### Built With

* React
* MaterialUI
* Redux
* Firebase
* Axios

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- GETTING STARTED -->
## Getting Started

Get the project running on your local server.

### Prerequisites

Install the latest npm version.
* npm
  ```sh
  npm install npm@latest -g
  ```

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/learsiOtni/macro-tracker-web-app
   ```
2. Install NPM packages
   ```sh
   npm install
   ```


<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- USAGE EXAMPLES -->
## Usage

### Authentication Page

A simple Login page.

![Login Page](https://github.com/learsiOtni/macro-tracker-web-app/blob/main/screenshots/login.png "Login Page")

You can log in by creating your account or using the following credentials:

>email: admin@gmail.com  
>password: password

</br>

A simple Signup Page.

![Signup Page](https://github.com/learsiOtni/macro-tracker-web-app/blob/main/screenshots/signup.png "Signup Page")

Both the Login and Signup pages provide form validation.

</br>
<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Search Page

![Search Page](https://github.com/learsiOtni/macro-tracker-web-app/blob/main/screenshots/search.png "Search Page")

Select a category: Breakfast, Snack, Lunch, Dinner. Browse through the food list, edit its quantity if needed, and add the item to the selected category. The total macros value will be reflected upon changes.

![Search](https://user-images.githubusercontent.com/108980854/195131318-7f61dc34-4f10-4322-b3ad-b81a5f95b30c.gif)

#### Features

* Pop-up form to add/change the current macros goal.
* Datepicker, coded from scratch, to navigate freely between dates. Vital for planning ahead.
* Categories section to select which category to add to. Also, it provides a dropdown option to view the current total macros only for that selected category. Useful for counting macros per meal. 
  * Delete button for each item. Useful for managing the macros.
* Simple search filter to search for a particular food using its name.
* Favourite button to display a list of the users' favourite food.
* Food section to display a list of food each containing their macros information. Each food card features:
  * Buttons to change the default quantity. The macros information is re-calculated for every quantity change.
    * `+` to increase the quantity by 1
    * `-` to decrease the quantity by 1
    * Edit button to enter a new value, which can be decimal, in an input field. Provides input validation.
  * Add button to add the food to the selected category. User feedback message appears after adding. 
  * Heart button to add the food to favourites.

</br>
<p align="right">(<a href="#readme-top">back to top</a>)</p>


### Overview Page

![Overview Page](https://github.com/learsiOtni/macro-tracker-web-app/blob/main/screenshots/overview.png "Overview Page")

Select a day from the weekly overview, click 'Edit Mode', browse through each category, change the quantity of some items, remove some items, and save the changes.

![Overview](https://user-images.githubusercontent.com/108980854/195131455-f2f3ae16-5afd-42c3-a5d6-4e9ac3b31631.gif)

#### Features

* Pop-up form to add/change the current macros goal.
* Weekly overview to visualize the total macros of each day against the user's macros goals. Useful for making small changes.
  * Remove button for each item.
  * Edit Mode button that reveals the quantity controls for each item. The total macros are re-calculated for every quantity change.
  * Save Changes button to save all the changes made during Edit Mode.

</br>

### Dashboard Page

![Dashboard Page](https://github.com/learsiOtni/macro-tracker-web-app/blob/main/screenshots/dashboard.png "Dashboard Page")

#### Features

* Pop-up form to add/change the current macros goal.
* Meal plan of the day section to view today's list of food with quantity.

A lot more features are to be implemented.

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- ROADMAP -->
## Future Features

- App
    - [ ] Mobile-friendly design
    - [ ] Logo
    - [ ] Increase food database
    - [ ] Implement a feature to Copy and Paste a list of items
- Authentication
    - [ ] Forgot password page
    - [ ] Terms and conditions page
- Dashboard
    - [ ] Able to track other goals such as water intake
- Search
    - [ ] More complex search engine
- Bugs
    - [ ] Search Page - Quantity controls do not work if categories are changed very fast.

<p align="right">(<a href="#readme-top">back to top</a>)</p>
