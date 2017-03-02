# CAlerts

* [Overview 
* [Technical Approach](#technical-approach)
* [US Digital Services Playbook Checklist](#us-digital-services-playbook-checklist)
* [Responses to the prompts in Section 2 of the RFI](#responses-to-the-prompts-in-section-2-of-the-rfi)


##Overview

add narrative here? If not, we can put it further down. 

##Technical Approach (2,000 words)

"Documentation must show code flow from client UI, to JavaScript library, to REST service to database, pointing to code in the GitHub repository."

### Introduction

CAlerts is an implementation of Prototype B for the State of California's RFI #CDT–ADPQ–0117. It is a system that allows residents to sign up for notifications on hazards occurring in their area and for administrators to manage those hazards and view reports. Residents can specify any number of places to be notified about as well as a number of communication channels by which they would like to be notified. Administrators can generate hazards are generated manually as well as automatically generated based on the provided real data sources. In addition to creating hazards, administrators can also view analytics about user activity and recent alerts and can also manage the list of administrators. This document describes our technical decision-making process in the creation of the prototype as well as a description of how data flows through the system.


### Overview

Our standard set of tools for building web applications includes [Ruby on Rails](http://rubyonrails.org/) for server-side development and [React](https://facebook.github.io/react/) for creating single-page client-side applications. For this small prototype, we considered creating a monolithic Rails application with no Javascript framework for expediency, but the requirements indicated that the backend should be an API and a framework should be used. Therefore, the prototype consists of two separate apps: the [backend](https://github.com/adhocteam/ca-alert/tree/master/backend) Rails application and the client-side [React app](https://github.com/adhocteam/ca-alert/tree/master/web). The directories for these apps contain instructions for configuring and running them locally.

The two apps also require separate deployment strategies. The React app is [built](https://github.com/adhocteam/ca-alert/blob/master/web/webpack.config.js) using [WebPack](https://webpack.github.io/), which compiles the Javascript, CSS, and HTML into static assets which are then deployed via remote sync to a bucket on [AWS S3](https://aws.amazon.com/s3/). The Rails app has been deployed via a push to [Heroku](https://heroku.com), a PaaS tool that makes deployment, provisioning, and configuration easy to do. Both apps are deployed automatically after passing tests via [CodeShip](https://codeship.com/), a continuous integration service that can perform automated deployments.

### The client-side React app

The client-side React app includes the visual interface for the prototype, tools for collecting and displaying input, data visualizations, and site navigation.

#### Visual interface design

We have based our design on the [USDS web standards](https://standards.usa.gov/), using [their NPM package](https://github.com/18F/web-design-standards) to pull in the assets required. We have used their [grid system](https://github.com/adhocteam/ca-alert/blob/tech_approach/web/index.html#L13) to set the basic page layout, as well as other components like [buttons](https://github.com/adhocteam/ca-alert/blob/tech_approach/web/src/Button.jsx#L7) and [form controls](https://github.com/adhocteam/ca-alert/blob/tech_approach/web/src/EditPlaceForm.jsx#L93). Most of the HTML for the app is defined in [JSX](https://facebook.github.io/react/docs/jsx-in-depth.html) code included in React components like [this one](https://github.com/adhocteam/ca-alert/blob/master/web/src/Button.jsx). The page is bootstrapped and assets are loaded in through a static [index.html](https://github.com/adhocteam/ca-alert/blob/master/web/index.html) page.

#### Collecting and displaying input

Forms are implemented as React components, using JSX to describe the markup. The [form for adding places](https://github.com/adhocteam/ca-alert/blob/master/web/src/AddPlaceForm.jsx) is an example of this pattern. Form components [store their state](https://github.com/adhocteam/ca-alert/blob/master/web/src/AddPlaceForm.jsx#L12) as Javascript Objects that are updated as the data in the form changes. The submission of the form [is bound to](https://github.com/adhocteam/ca-alert/blob/master/web/src/AddPlaceForm.jsx#L184) a [handleSubmit function](https://github.com/adhocteam/ca-alert/blob/master/web/src/AddPlaceForm.jsx#L62) which takes the current state of the form, encodes it into query parameters, and sends the appropriate request to the API for storing the data.

Displaying data is done in a similar way, with React components like the [PlaceList](https://github.com/adhocteam/ca-alert/blob/master/web/src/PlaceList.jsx) using the API to [fetch the appropriate data](https://github.com/adhocteam/ca-alert/blob/master/web/src/PlaceList.jsx#L16), storing that data [in the state](https://github.com/adhocteam/ca-alert/blob/master/web/src/PlaceList.jsx#L21), and using JSX to [render the appropriate markup](https://github.com/adhocteam/ca-alert/blob/master/web/src/PlaceList.jsx#L62).

For collecting and displaying data, React's virtual DOM allows us to seamlessly update the page without worrying about what individual parts of the markup have changed. We have also taken advantage of the reusability of React components by creating multi-use tools like [buttons](https://github.com/adhocteam/ca-alert/blob/master/web/src/Button.jsx) and [error messages](https://github.com/adhocteam/ca-alert/blob/master/web/src/Error.jsx).

#### Usage of Google Maps and Geocoder

We used the [Google Maps Javascript API](https://developers.google.com/maps/documentation/javascript/) for rendering location data throughout the app, with a [custom React component](https://github.com/adhocteam/ca-alert/blob/4619c26e87143d8697ae1d8bcea46540ede98ea7/web/src/Map.jsx) to make it easily reusable. In addition, Google's [Geocoder API](https://developers.google.com/maps/documentation/geocoding/start) has [been used](https://github.com/adhocteam/ca-alert/blob/b25bf273d59ce3e14fb386eab7b662c4afa86fc5/web/src/lib.js#L52) for converting addresses to lat/lon positions. For the prototype, we are storing the results of the geocoder, which is against Google's terms of service. In a production app we would look either to move to a less restrictive geocoding tool like [Mapzen's](https://mapzen.com/products/search/) or [MapBox's](https://www.mapbox.com/geocoding/) or consider implementing our own geocoder based on open-source tools.

#### Site navigation

We used [react-router](https://github.com/ReactTraining/react-router) to handle rendering of the appropriate React components based on the current URL and for updating the URL based on user actions. It allows us to [define a set of routes](https://github.com/adhocteam/ca-alert/blob/master/web/src/index.jsx#L28) and to specify which component should be rendered when they each is visited. When a user action requires a change to the path, we [update the hashHistory](https://github.com/adhocteam/ca-alert/blob/afc6cbe05d54287095397aaa745e91069194e8ba/web/src/ConfirmPhone.jsx#L58), which automatically changes the URL and renders the appropriate components based on the change.

#### Communication with the API

Calls to the API are made through the use of the Javascript [fetch function](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API). Because this is [not available on all browsers](http://caniuse.com/#feat=fetch), we have [included a polyfill](https://www.npmjs.com/package/whatwg-fetch) to make it universally available. [Calls to fetch](https://github.com/adhocteam/ca-alert/blob/master/web/src/lib.js#L87) return a [promise](https://developers.google.com/web/fundamentals/getting-started/primers/promises), which allows us to handle the API responses [asynchronously](https://github.com/adhocteam/ca-alert/blob/master/web/src/HazardList.jsx#L14).

Authentication with the API is handled by passing `uid`, `access-token`, and `client` [headers with each request](https://github.com/adhocteam/ca-alert/blob/master/web/src/HazardList.jsx#L14). Because this is universally required, we have a [library function](https://github.com/adhocteam/ca-alert/blob/master/web/src/lib.js#L76) that adds the headers automatically. The authentication headers are [collected when the user logs in](https://github.com/adhocteam/ca-alert/blob/cc9fbda8eadda1fb51853776f0b60b12f86d4761/web/src/SignInForm.jsx#L94) and [stored in local storage](https://github.com/adhocteam/ca-alert/blob/master/web/src/session.js#L5) to make them available across browser windows.

#### Testing

We run tests for the front-end via [Mocha](https://mochajs.org/) as a test runner and Istanbul's [NYC](https://github.com/istanbuljs/nyc) tool for code coverage. Both can be triggered from the [Makefile](https://github.com/adhocteam/ca-alert/blob/master/web/Makefile) with `make test` and `make coverage`, for testing and code coverage, respectively. Front-end testing makes heavy use of Airbnb's [Enzyme](https://github.com/airbnb/enzyme) library to isolate and test individual React components.

### The server-side Rails API

We implemented the REST API for this project as an [API-only](http://edgeguides.rubyonrails.org/api_app.html) Rails project that supports a JSON interface for accessing and updating data in the application. It is backed by a [PostgreSQL](https://www.postgresql.org/) database using the [PostGIS](http://www.postgis.net/) extensions for geographic data, uses [Twilio](https://www.twilio.com/) for SMS delivery, provides [Swagger](http://swagger.io/) documentation using the [swagger-blocks](https://github.com/fotinakis/swagger-blocks) gem, handles authentication using the [devise_token_auth gem](https://github.com/lynndylanhurley/devise_token_auth), and is fully tested using a suite of [Rspec](http://rspec.info/) tests.

#### Request handling

The [routes.rb configuration file](https://github.com/adhocteam/ca-alert/blob/master/backend/config/routes.rb) in the app defines the set of actions the API responds to. Each line in that file corresponds to one or more controller actions, and the controllers take the request parameters and transform them into a JSON response. The [places controller](https://github.com/adhocteam/ca-alert/blob/master/backend/app/controllers/places_controller.rb) is an example that implements the full set of [CRUD](https://en.wikipedia.org/wiki/Create,_read,_update_and_delete) actions, allowing clients to manage the set of places for which users would like to receive alerts. The [create action](https://github.com/lynndylanhurley/devise_token_auth), for example, uses a set of allowable parameters to create a new place tied to the user account and returns a JSON document containing the new place on success. Error conditions [also return a JSON document](https://github.com/adhocteam/ca-alert/blob/master/backend/app/controllers/places_controller.rb#L36) that includes information about the individual errors that occurred.

#### Authentication and authorization

User authentication is handled through the [devise_token_auth gem](https://github.com/lynndylanhurley/devise_token_auth), which adds endpoints under the `/auth` namespace for handling account creation, login, and updating. It also contains an `authenticate_user!` helper method that [controllers can use](https://github.com/adhocteam/ca-alert/blob/master/backend/app/controllers/places_controller.rb#L2) to ensure there is a valid user before processing a request. If authentication headers do not validate correctly for a user, the controller [will automatically render a 401 status code](https://github.com/adhocteam/ca-alert/blob/master/backend/app/controllers/places_controller.rb#L2) with a message indicating that authentication has failed.

Authorization is implemented using the [rolify](https://github.com/RolifyCommunity/rolify) gem, which makes it easy to add, remove, and verify roles for users. We [have an action](https://github.com/adhocteam/ca-alert/blob/master/backend/app/controllers/admin/users_controller.rb#L15) for making a user an admin by id that adds the role. Then, actions requiring admin permissions for access can use the [require_admin](https://github.com/adhocteam/ca-alert/blob/master/backend/app/controllers/application_controller.rb#L8) helper to [ensure the user](https://github.com/adhocteam/ca-alert/blob/master/backend/app/controllers/admin/hazards_controller.rb#L3) is allowed access.

#### Data storage and serialization

Data is stored in a PostgreSQL database using the PostGIS extensions for geographic data. PostGIS allows us to [store geometry](https://github.com/adhocteam/ca-alert/blob/master/backend/db/schema.rb#L136) in the database and also to [perform intersections](https://github.com/adhocteam/ca-alert/blob/master/backend/app/models/place.rb#L11) directly via a SQL query. [ActiveRecord](http://guides.rubyonrails.org/active_record_basics.html) handles the connection to the database with [a simple configuration file](https://github.com/adhocteam/ca-alert/blob/master/backend/config/database.yml) and allows us to express queries using Ruby in most cases. The schema for the database is defined in the [schema.rb](https://github.com/adhocteam/ca-alert/blob/master/backend/db/schema.rb) file.

ActiveRecord has a set of tools for serializing models into JSON that are applied automatically, but there are [some cases](https://github.com/adhocteam/ca-alert/blob/master/backend/app/models/hazard.rb#L15) where we need to customize the fields in order to add data that isn't represented by a column in the database.

#### Twilio integration

To support delivery of SMS messages, the app uses the [twilio-ruby](https://github.com/twilio/twilio-ruby) gem. The app [must be configured](https://github.com/adhocteam/ca-alert/blob/master/backend/README.md#twilio-configuration) with a set of Twilio credentials in order to deliver messages but will also work fine without them, instead logging the SMS messages to the Rails log.

#### Swagger documentation

Swagger was used for API documentation via the [swagger-blocks](https://github.com/fotinakis/swagger-blocks) gem, which allowed us to build out the documentation in Ruby rather than maintaining a JSON file. The resulting JSON file is publicly available [here](https://ca-alert.herokuapp.com/apidocs) and can be viewed using [Swagger UI](http://swagger.io/swagger-ui/).

The documentation is served up from the [apidocs controller](https://github.com/adhocteam/ca-alert/blob/master/backend/app/controllers/apidocs_controller.rb), and rendered by swagger_blocks. Models [define their swagger representations](https://github.com/adhocteam/ca-alert/blob/master/backend/app/models/hazard.rb#L23) in their own files, but for controllers the blocks became so verbose that I [factored them out into the lib directory](https://github.com/adhocteam/ca-alert/tree/master/backend/lib), where they [use plain Ruby objects](https://github.com/adhocteam/ca-alert/blob/master/backend/lib/phone_numbers_controller_swagger_blocks.rb) to define the blocks.

#### Handling geographic data

!!!!PAUL TO FILL THIS IN!!!!

#### Testing

Tests [have been written](https://github.com/adhocteam/ca-alert/tree/master/backend/spec) using Rspec along with Rcov for code coverage calculations. In general, our focus was on [controller specs](https://github.com/adhocteam/ca-alert/tree/master/backend/spec/controllers), which are the equivalent of integration tests for an API-based application. Unit tests have also been written [for models](https://github.com/adhocteam/ca-alert/tree/master/backend/spec/models) in cases where specific conditions needed to be covered. Code coverage has remained > 99% for the duration of the development process. See [the backend README file](https://github.com/adhocteam/ca-alert/blob/master/backend/README.md) for instructions on configuring the app and running the tests locally.

### Conclusion?

!!!! NOT SURE IF WE NEED A CONCLUSION HERE OR IF THERE IS MORE TO COVER !!!!
-NATIVE APP
-DIVERSITY OF AUDIENCE
-USER TYPES
-FITTING WITH EXISTING SYSTEMS - TWITTER, NATIVE APPS



##Responses to the prompts in Section 2 of the RFI

#### a. Assigned one (1) leader and gave that person authority and responsibility and held that person accountable for the quality of the prototype submitted

LEANNA

#### b. Assembled a multidisciplinary and collaborative team that includes, at a minimum, five (5) of the labor categories as identified in Attachment B: PQVP DS-AD Labor Category Descriptions

1. Product Owner: Leanna Miller
2. Technical Architect: Aubrey Holland
3. User Researcher/Usability Tester: Laura Ellena
4. Visual Designer: Danny Chapman
5. Front End Web Developer: Paul Smith
6. Backend Web Developer: Aubrey Holland
7. Delivery Manager: Wryen Meek

#### c. Understood what people needed, by including people in the prototype development and design process

Laura - discovery and user research - adapt copy from beneficiary 

Link to user research notes 

- Signing in with google is something people like writing
- People wanted multiple locations writing
- Phone alerts were more useful than email 
- Chat bot for low tech/low SES future feature,  writing
- See current alerts without signing in writing
- A way to review information in case you dismiss a notification without getting the details writing


#### d. Used at least a minimum of three (3) “user-centric design” techniques and/or tools

- qualitative interviews in discovery
- surveys about needs
- built to user need based on discovery 
- user testing of wireframes 
- built user types to inform design and functionality 
- CALL OUT FIRST THREE PLAYS IN USDS
- made it simple, usds web design standards
- tested extensively with wireframes 

#### e. Used GitHub to document code commits

All of the code we've written has been stored in a [GitHub repo](https://github.com/adhocteam/ca-alert), with all commits listed [here](https://github.com/adhocteam/ca-alert/commits/master). In addition, [code reviews](https://github.com/adhocteam/ca-alert/pulls) have been performed there for all commits before merging them into master. GitHub has also been used as our [issue tracking system](https://github.com/adhocteam/ca-alert/issues).

#### f. Used Swagger to document the RESTful API, and provided a link to the Swagger API

Swagger documentation has been included in all commits affecting the API endpoints since the beginning of our work. An example commit containing Swagger documentation can be found [here](https://github.com/adhocteam/ca-alert/commit/fccc9b6dda5385c9027fdad2de2ff70c4c27e347). The Swagger JSON documentation is served [by the API](https://ca-alert.herokuapp.com/apidocs). To view the documentation, open Swagger UI or visit [their demo site](http://petstore.swagger.io/) and enter the URL for the documentation (https://ca-alert.herokuapp.com/apidocs).

#### g. Complied with Section 508 of the Americans with Disabilities Act and WCAG 2.0

- Steal from beneficiary reporting 
- Test with screen reader 
- Automated tests with any real project 

#### h. Created or used a design style guide and/or a pattern library

- LEANNA steal copy from QPP

#### i. Performed usability tests with people

- LAURA summary of what we did copy from QPP and adapt and provide links to full details 

#### j. Used an iterative approach, where feedback informed subsequent work or versions of the prototype

- Review of user suggestions already implemented and how to reference
##### ADMIN
- Clarified difference between alerts and hazards - ensure this cleanup is complete wireframe 
- Removal of lat long - this is removed from the app, ensure it’s removed from wireframes 
##### RESIDENT
- Implemented ability to personally name - ensure this in wireframes
Review of user suggestions that we should reflect in wireframe 
ADMIN
Wireframe: I would wonder why an old alert is still active. How long does it take to expire. - some way of differentiating between active and expired alerts
TEMPLATES for admins - future feature - leanna will create a card
Future feature how many potential people this message would reach
Character count - wireframe and future feature
Different formats - future feature 
RESIDENT
What about wonkiness of zip codes? Copy change and radius - future feature 

#### k. Created a prototype that works on multiple devices, and presents a responsive design

- yes 
- leanna look for copy from QPP 

#### l. Used at least five (5) modern and open-source technologies, regardless of architectural layer (frontend, backend, etc.)

The app has been built with entirely open-source technologies, and the versions we're using have been released within the past five years. Some examples include:

* [Ruby on Rails](http://rubyonrails.org/) 5.0.1, released 12/2016
* [React](https://facebook.github.io/react/) 15.4.2, released 1/2017
* [PostgreSQL](https://www.postgresql.org/) 9.6, released 9/2016
* [RSpec](http://rspec.info/) 3.5.4, released 10/2016
* [WebPack](https://webpack.github.io/) 2.2.1, released 1/2017

#### m. Deployed the prototype on an Infrastructure as a Service (IaaS) or Platform as Service (PaaS) provider, and indicated which provider they used

The app is deployed in two places:

* The API is deployed on [Heroku](https://heroku.com), a PaaS service that makes it easy to deploy, configure, and provision web applications. The root of the deployed API can be found [here](ca-alert.herokuapp.com).
* The client-side code is built with [WebPack](https://webpack.github.io/) and deployed as static assets to an [S3](https://aws.amazon.com/s3/) bucket on [AWS](https://aws.amazon.com/). That bucket has been configured to serve up the assets publicly over HTTP and serves as the [root URL for our application](https://ca-alert-prototype.s3.amazonaws.com/index.html).

#### n. Developed automated unit tests for their code

Automated tests exist for both the API and the client-side app:

* The API uses [RSpec](http://rspec.info/) for testing and [rcov](https://github.com/relevance/rcov) for code coverage analysis. The root directory for the tests can be found [here](https://github.com/adhocteam/ca-alert/tree/master/backend/spec). Rcov is configured to block any builds in which the code coverage falls below 95%, and in practice it has remained above 99% during development. The tests can be run using `rake` fron the root directory of the backend project.
* The Front-end code uses [Mocha](https://mochajs.org/) for testing and [Enzyme](https://github.com/airbnb/enzyme) for individual component testing. The root directory for the tests can be found [here](https://github.com/adhocteam/ca-alert/tree/master/web/test). The tests can be run using `make test` from the root directory of the front-end project.

#### o. Setup or used a continuous integration system to automate the running of tests and continuously deployed their code to their IaaS or PaaS provider

We used [CodeShip](https://codeship.com/) as our continuous integration provider. It was configured to run checks against each push to any branch of the repository, and pull requests were not allowed to be merged unless those checks passed. Pushes to master included a deployment step that automatically deployed to Heroku and pushed to the S3 bucket. The GitHub wiki for the project [includes a document](https://github.com/adhocteam/ca-alert/wiki/Code-review,-continuous-integration,-and-deployment-processes) that describes our testing and deployment process in more depth.

#### p. Setup or used configuration management

Because we used Heroku for deployment, there was no need for a system like Ansible of Chef to be used for configuration management. Heroku allows us to [provision resources](https://devcenter.heroku.com/articles/managing-add-ons) within its UI, API, or command-line tools. It also manages [configuration and environment changes](https://devcenter.heroku.com/articles/config-vars) in the same manner.

#### q. Setup or used continuous monitoring

[Pingdom](https://www.pingdom.com/) was used for continuous monitoring, with a simple check against an API endpoint to verify that the app is still running. The GitHub wiki for the project [contains a document](https://github.com/adhocteam/ca-alert/wiki/Continuous-Monitoring) describing our continuous monitoring setup in more detail.

#### r. Deployed their software in an open source container, such as Docker (i.e., utilized operating-system-level virtualization)

By using Heroku, we weren't required to manage containers manually, but Heroku's dynos do [run within virtualized Unix containers](https://devcenter.heroku.com/articles/how-heroku-works#running-applications-on-dynos).

#### s. Provided sufficient documentation to install and run their prototype on another machine

Because we have a split between the server-side and client-side apps, a developer will need to run each of them in order to view the app locally. We have provided README files in both the [backend directory](https://github.com/adhocteam/ca-alert/blob/master/backend/README.md) and [web directory](https://github.com/adhocteam/ca-alert/blob/master/web/README.md) that give instructions for running the apps. These instructions assume the user is a developer familiar with installing tools in Unix-like systems.

#### t. Prototype and underlying platforms used to create and run the prototype are openly licensed and free of charge

This is the case for all of the tools required to run the app except for the Twilio API integrations. To ensure that we can meet this requirement, we have made the app handle the case where no Twilio credentials are supplied by stubbing out the Twilio client and logging the SMS messages.

------------------------------

For more detail on how we used the USDS Playbook, please read below. 

##US Digital Services Playbook Checklist

### Understand what people need
- [x] Early in the project, spend time with current and prospective users of the service
- [x] Use a range of qualitative and quantitative research methods to determine people’s goals, needs, and behaviors; be thoughtful about the time spent
- [x] Test prototypes of solutions with real people, in the field if possible
- [x] Document the findings about user goals, needs, behaviors, and preferences
- [x] Share findings with the team and agency leadership
- [x] Create a prioritized list of tasks the user is trying to accomplish, also known as “user stories”
- [x] As the digital service is being built, regularly test it with potential users to ensure it meets people’s needs

#### Notes

LAURA

### Address the whole experience, from start to finish

- [x] Understand the different points at which people will interact with the service – both online and in person
- [x] Identify pain points in the current way users interact with the service, and prioritize these according to user needs
- [ ] Design the digital parts of the service so that they are integrated with the offline touch points people use to interact with the service
- [ ] Develop metrics that will measure how well the service is meeting user needs at each step of the service

#### Notes

DANNY AND GREG - link to process map, wtf offline, wtf metrics?

### Make it simple and intuitive
- [x] Use a simple and flexible design style guide for the service. Use the U.S. Web Design Standards as a default
- [x] Use the design style guide consistently for related digital services
- [x] Give users clear information about where they are in each step of the process
- [x] Follow accessibility best practices to ensure all people can use the service
- [x] Provide users with a way to exit and return later to complete the process
- [x] Use language that is familiar to the user and easy to understand
- [x] Use language and design consistently throughout the service, including online and offline touch points

#### Notes

DANNY

### Build the service using agile and iterative practices
- [x] Ship a functioning “minimum viable product” (MVP) that solves a core user need as soon as possible, no longer than three months from the beginning of the project, using a “beta” or “test” period if needed
- [x] Run usability tests frequently to see how well the service works and identify improvements that should be made
- [x] Ensure the individuals building the service communicate closely using techniques such as launch meetings, war rooms, daily standups, and team chat tools
- [x] Keep delivery teams small and focused; limit organizational layers that separate these teams from the business owners
- [x] Release features and improvements multiple times each month
- [x] Create a prioritized list of features and bugs, also known as the “feature backlog” and “bug backlog”
- [x] Use a source code version control system
- [x] Give the entire project team access to the issue tracker and version control system
- [x] Use code reviews to ensure quality

#### Notes

WRYEN

### Structure budgets and contracts to support delivery - N/A
- [ ] Budget includes research, discovery, and prototyping activities
- [ ] Contract is structured to request frequent deliverables, not multi-month milestones
- [ ] Contract is structured to hold vendors accountable to deliverables
- [ ] Contract gives the government delivery team enough flexibility to adjust feature prioritization and delivery schedule as the project evolves
- [ ] Contract ensures open source solutions are evaluated when technology choices are made
- [ ] Contract specifies that software and data generated by third parties remains under our control, and can be reused and released to the public as appropriate and in accordance with the law
- [ ] Contract allows us to use tools, services, and hosting from vendors with a variety of pricing models, including fixed fees and variable models like “pay-for-what-you-use” services
- [ ] Contract specifies a warranty period where defects uncovered by the public are addressed by the vendor at no additional cost to the government
- [ ] Contract includes a transition of services period and transition-out plan

#### Notes

This is not applicable to this project. 

### Assign one leader and hold that person accountable
- [x] A product owner has been identified
- [x] All stakeholders agree that the product owner has the authority to assign tasks and make decisions about features and technical implementation details
- [x] The product owner has a product management background with technical experience to assess alternatives and weigh tradeoffs
- [ ] The product owner has a work plan that includes budget estimates and identifies funding sources *NA*
- [ ] The product owner has a strong relationship with the contracting officer *NA*

#### Notes

LEANNA

### Bring in experienced teams
- [x] Member(s) of the team have experience building popular, high-traffic digital services
- [x] Member(s) of the team have experience designing mobile and web applications
- [x] Member(s) of the team have experience using automated testing frameworks
- [x] Member(s) of the team have experience with modern development and operations (DevOps) techniques like continuous integration and continuous deployment
- [x] Member(s) of the team have experience securing digital services
- [ ] A Federal contracting officer is on the internal team if a third party will be used for development work *NA*
- [ ] A Federal budget officer is on the internal team or is a partner *NA*
- [ ] The appropriate privacy, civil liberties, and/or legal advisor for the department or agency is a partner *NA*

#### Notes

AUBREY

### Choose a modern technology stack
- [x] Choose software frameworks that are commonly used by private-sector companies creating similar services
- [x] Whenever possible, ensure that software can be deployed on a variety of commodity hardware types
- [x] Ensure that each project has clear, understandable instructions for setting up a local development environment, and that team members can be quickly added or removed from projects
- [x] Consider open source software solutions at every layer of the stack

#### Notes

Modern, open source tools have been used throughout our development of the prototype. We have avoided using exotic tools that are difficult to deploy, favoring software and processes that we use every day on existing projects. Documentation on [running](https://github.com/adhocteam/ca-alert/blob/master/backend/README.md) the [apps](https://github.com/adhocteam/ca-alert/blob/master/web/README.md) locally has been provided and updated throughout the development process.

### Deploy in a flexible hosting environment
- [x] Resources are provisioned on demand
- [x] Resources scale based on real-time user demand
- [x] Resources are provisioned through an API
- [x] Resources are available in multiple regions
- [x] We only pay for resources we use
- [ ] Static assets are served through a content delivery network
- [x] Application is hosted on commodity hardware

#### Notes

Most of these requirements are met through the use of Heroku as a PaaS provider. It enables API-based provisioning of resources and allows us to scale those resources up and down easily and with no downtime. In a production system, we would seek to increase the reliability of the application by using a multi-region approach with demand-based autoscaling, and the static assets would be served up behind a CDN.

### Automate testing and deployments
- [x] Create automated tests that verify all user-facing functionality
- [x] Create unit and integration tests to verify modules and components
- [x] Run tests automatically as part of the build process
- [x] Perform deployments automatically with deployment scripts, continuous delivery services, or similar techniques
- [ ] Conduct load and performance tests at regular intervals, including before public launch

#### Notes

Automated testing and deployment have been a part of our development since the beginning of the process. As documented above, both the web app and the API have extensive testing, and we have used CodeShip to provide continuous integration and automatic deploys throughout the process. Load and performance testing were deemed unnecessary for the implementation of a prototype.

### Manage security and privacy through reusable processes
- [ ] Contact the appropriate privacy or legal officer of the department or agency to determine whether a System of Records Notice (SORN), Privacy Impact Assessment, or other review should be conducted 
- [ ] Determine, in consultation with a records officer, what data is collected and why, how it is used or shared, how it is stored and secured, and how long it is kept
- [ ] Determine, in consultation with a privacy specialist, whether and how users are notified about how personal information is collected and used, including whether a privacy policy is needed and where it should appear, and how users will be notified in the event of a security breach
- [ ] Consider whether the user should be able to access, delete, or remove their information from the service
- [ ] “Pre-certify” the hosting infrastructure used for the project using FedRAMP
- [x] Use deployment scripts to ensure configuration of production environment remains consistent and controllable

#### Notes

LEANNA

### Use data to drive decisions
- [ ] Monitor system-level resource utilization in real time
- [x] Monitor system performance in real-time (e.g. response time, latency, throughput, and error rates)
- [ ] Ensure monitoring can measure median, 95th percentile, and 98th percentile performance
- [ ] Create automated alerts based on this monitoring
- [ ] Track concurrent users in real-time, and monitor user behaviors in the aggregate to determine how well the service meets user needs
- [ ] Publish metrics internally
- [ ] Publish metrics externally
- [ ] Use an experimentation tool that supports multivariate testing in production

#### Notes

Heroku provides a number of these tools to us automatically, but we chose not to expand upon them because they were not required for the prototype. In a production system, we would assemble a DevOps team to manage systems that track system performance data in real time and create alerts as errors occur. On existing deployments, we have used a combination of [Prometheus](https://prometheus.io/), [Sentry](https://sentry.io/welcome/), [Grafana](http://grafana.org/), and [PagerDuty](https://www.pagerduty.com/) to implement such a system.

### Default to open
- [ ] Offer users a mechanism to report bugs and issues, and be responsive to these reports
- [x] Provide datasets to the public, in their entirety, through bulk downloads and APIs (application programming interfaces)
- [ ] Ensure that data from the service is explicitly in the public domain, and that rights are waived globally via an international public domain dedication, such as the “Creative Commons Zero” waiver
- [ ] Catalog data in the agency’s enterprise data inventory and add any public datasets to the agency’s public data listing
- [ ] Ensure that we maintain the rights to all data developed by third parties in a manner that is releasable and reusable at no cost to the public
- [ ] Ensure that we maintain contractual rights to all custom software developed by third parties in a manner that is publishable and reusable at no cost
- [x] When appropriate, create an API for third parties and internal users to interact with the service directly
- [x] When appropriate, publish source code of projects or components online
- [x] When appropriate, share your development process and progress publicly

#### Notes

Many of the concepts here do not apply to the development of a prototype, but we have done our development under a public GitHub repository that includes all of the code commits, issues filed, and documents created. Also, we developed the API so access is publicly available.
