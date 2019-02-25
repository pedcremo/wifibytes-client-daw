This comments comes from the inspection of the current master branch 19/02/2019

# TO FIX

* Login -> When I click recover password I don't get any notification about the action. I don't know if has arriveed to server none if the server has sent the email. As a user I would demand more awareness of what is happenig

* Profile -> I can't create a new address

* Profile -> Changing password doesn't work too 

* Cart -> total price appears twice times

* Contracts -> When I see contracts close button in modal is misaligned and there's no enough padding in all margins

* Contracts -> Some contract fields are not filled automatically: Provincia, DNI , bank account....

* Contracts -> I can't see how two or more contracts are handled

* Payment -> Confirm payment screen a little bit caotic look and feel . 

* Safari and firefox show ratesboxes sticked together

* Checkout shortcut has disapeared. When I've initiated the checkout I want a direct access in navbar

* Tests fails 

* Some i18n translations are bad and/or incomplete

* I don't want to see commented code not used anymore.

* I want code perfectly indented.

* It will be apreciated names of variables, functions or methods with some kind of meaning that could help us understand better the code.

* Better documentation. Try to explain what is not obvious in your code. What is behind the curtain. Why some decissions has been taken

* Style should be homogenous through whole application. SO PLEASE USE bootstrap 4 classes for CSS (not semantic-ui). Don't do anything else. I don' want a frankenstein web app. I want a simple, nice and RESPONSIVE web app

* There is a SUPER IMPORTANT CONCEPT in redux reducers that seems not so clear to some of you. STATE should remain INMUTABLE, so please, recreate your state from a previous state but never modify directly not even any single part of it. READ PLEASE https://redux.js.org/recipes/structuring-reducers/immutable-update-patterns

* The problems of your partners are your problems too. If something happens in other part of the code that don’t let you continue with your own code don’t stay quiet and waiting to be fixed by others. Try to cooperate and solve the problem. we are a team and we are responsible of the overall app as an unique entity not as a bunch of isolated and unrelated pieces.

* If you need to get some share state from other parts of the app use REDUX store not LOCALSTORAGE.  Redux store is our single source of true through whole app don't use any other source NEVER.

* The code has been linked to Redux DevTools google chrome extension. Install it and use it in order to debug and follow state changes in your redux store that can lead you to chase bugs in a easier way

* Use any kind of consensus to do the same things always the same way. If you decide to put all actions or reducers in one single app folder, do it, but all of you with no exception. In the other hand, if you decide each component should maintain its owns reducers and actions in component-private folders do it. You should reach some kind of agreement and all of you must follow the same rules.

* As stated in previous item we can follow the same principles in matters of style. How we name variables, how we use semicolons,how we enclose strings(single or double quote),tabs ... What is commonly known as linting rules. Which ones we adhere

* All APP tests should be fixed to pass and obviously all your code should be tested to pass at least a minimum coverage of 80 % of your code

* We should remove from package.json all libraries that are not used anymore. Otherwise it would be nice to import all css libraries and third party javascript that at the moment are imported by www/index.html using ES6 importing mechanism and installing those libraries as nam libraries

* Maybe we need a litle refactoring of our app. Some react components are outside components folder and it seems confusing

NOTE:As at the moment of this code checking in deep it’s quite evident there are tons of bugs and things need to be fixed in your app. What is quite clear is that the most evident misbehavior on the APP is it doesn’t work as expected. It fails at every level. So in order to prioritize your efforts my tip is; PLEASE!, make it works properly.


# Evaluation
70% of your mark will be your code job and 30% a quiz test about javascript, react, redux and other related technologies used in class.

How your team code will be marked:
* Testing 15%
* It works as expected 50%
* Documentation 10%
* style and quality 5%
* Amount of effort 20%


# List of specific things don’t work or I don’t like it too much 

* Personal data component is still very flawed. There is nonsense to specify details 
* Vegas component some times is loaded in web views are not expected to be in
* In chrome rates boxes appear sticked together without any kind of padding among them
* The navbar language combobox don't like it (ugly).It's not applying selectpicker bootstrap classname. Maybe some collision with semantic-ui or other style rule. Check it
* datosEmpresaActions2 is used? It seems is using cross-fetch module to do async calls (ajax)  to server. Maybe we should evaluate again this technology because It appears to be quite interesting because polyfills fetch wheter is not suported and moreover is a multiplatform feching mechanism could be used in mobiles apps too.
* Navbar->Catalog filters and product family chooser is not working. It has not been finished
* Navbar->Rates filter some times fails. In some occasions you click and the button filter is not selected neither the filter itself is apllied.
* Navbar-> Our company . Any suggestion to finish with an original look and feel this section?
* Contact. Check if the form sends data via POST endpoint 'contacto'
* -------------REMOVED FROM THE APP--------------secretInfo.js? It is necessary if we have a settings.js file designed for these third party API keys and other related client configurations?
* Navabar-> Rates the under boxes don't change i18n but n the server do you have the option to specify texts boxes by language

   

