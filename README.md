# CAlerts

https://ca-alert-prototype.s3.amazonaws.com/index.html

* [Project Overview](#project-overview)
* [Demo Accounts](#demo-accounts)
* [Technical Approach](#technical-approach)
* [Responses to the prompts in Section 2 of the RFI](#responses-to-the-prompts-in-section-2-of-the-rfi)
* [US Digital Services Playbook Checklist](#us-digital-services-playbook-checklist)

##Project Overview

Ad Hoc chose to compete for a spot in the _Pre-Qualified Vendor Pool for Digital Services – Agile Development_ because we are experienced in and committed to to building the best software for people at the lowest possible cost to government. We know that the most important factor of success in any project is the team, so we brought together a lean team of talented people who are working on other government projects and who thoughtfully and aggressively built this prototype.

We chose prototype B because it was focused on directly meeting the needs of the people of California. This is central to our core values as a [company](https://adhocteam.us/about/).

We began by talking directly to residents of California to discover their needs for emergency and non-emergency alerts. We developed a detailed process map from which we designed screen-by-screen mockups. These mockups reflect our best thinking about the future state of this product if we were to build it in the real world. From these, we pulled out the features that allow us to meet the requirements of the assignment while meeting our standards of product quality.

This prototype is our Minimum Viable Product, along with one week of iterations based on user feedback.


## Demo Accounts

For testing the application, we have created two accounts:

* A resident, who has a number of places being monitored for alerts: `resident@calerts.ca.gov`
* An admin, who can both create and receive alerts: `admin@calerts.ca.gov`

The password for each of these users is `abcd-1234`.

##Technical Approach

1,934 words

### Introduction

CAlerts is an implementation of Prototype B for the State of California's RFI #CDT–ADPQ–0117. It is a system that allows residents to sign up for notifications on hazards occurring in their area and for administrators to manage those hazards and view reports. Residents can specify any number of places to be notified about as well as a number of communication channels by which they would like to be notified. Administrators can generate hazards manually as well as automatically based on the provided real data sources. In addition to creating hazards, administrators can also view analytics about user activity and recent alerts and can also manage the list of administrators. This document describes our technical decision-making process in the creation of the prototype as well as a description of how data flows through the system.


### Technical Overview

Our standard set of tools for building web applications includes [Ruby on Rails](http://rubyonrails.org/) for server-side development and [React](https://facebook.github.io/react/) for creating single-page client-side applications. For this small prototype, we considered creating a monolithic Rails application with no Javascript framework for expediency, but the requirements indicated that the backend should be an API and a framework should be used. Therefore, the prototype consists of two separate apps: the [backend](https://github.com/adhocteam/ca-alert/tree/master/backend) Rails application and the client-side [React app](https://github.com/adhocteam/ca-alert/tree/master/web). The directories for these apps contain instructions for configuring and running them locally.

The two apps also require separate deployment strategies. The React app is [built](https://github.com/adhocteam/ca-alert/blob/master/web/webpack.config.js) using [WebPack](https://webpack.github.io/), which compiles the Javascript, CSS, and HTML into static assets which are then deployed via remote sync to a bucket on [AWS S3](https://aws.amazon.com/s3/). The Rails app has been deployed via a push to [Heroku](https://heroku.com), a PaaS tool that makes deployment, provisioning, and configuration easy to do. Both apps are deployed automatically after passing tests via [CodeShip](https://codeship.com/), a continuous integration service that can perform automated deployments.

### The client-side React app

The client-side React app includes the visual interface for the prototype, tools for collecting and displaying input, data visualizations, and site navigation.

#### Visual interface design

We have based our design on the [USDS web standards](https://standards.usa.gov/), using [their NPM package](https://github.com/18F/web-design-standards) to pull in the assets required. We have used their [grid system](https://github.com/adhocteam/ca-alert/blob/master/web/src/SignInForm.jsx#L148) to set the basic page layout, as well as other components like [buttons](https://github.com/adhocteam/ca-alert/blob/master/web/src/Button.jsx#L7) and [form controls](https://github.com/adhocteam/ca-alert/blob/master/web/src/EditPlaceForm.jsx#L93). Most of the HTML for the app is defined in [JSX](https://facebook.github.io/react/docs/jsx-in-depth.html) code included in React components like [this one](https://github.com/adhocteam/ca-alert/blob/master/web/src/Button.jsx). The page is bootstrapped and assets are loaded in through a static [index.html](https://github.com/adhocteam/ca-alert/blob/master/web/index.html) page.

#### Collecting and displaying input

Forms are implemented as React components, using JSX to describe the markup. The [form for adding places](https://github.com/adhocteam/ca-alert/blob/master/web/src/AddPlaceForm.jsx) is an example of this pattern. Form components [store their state](https://github.com/adhocteam/ca-alert/blob/master/web/src/AddPlaceForm.jsx#L12) as Javascript Objects that are updated as the data in the form changes. The submission of the form [is bound to](https://github.com/adhocteam/ca-alert/blob/master/web/src/AddPlaceForm.jsx#L177) a [handleSubmit function](https://github.com/adhocteam/ca-alert/blob/master/web/src/AddPlaceForm.jsx#L58) which takes the current state of the form, encodes it into query parameters, and sends the appropriate request to the API for storing the data.

Displaying data is done in a similar way, with React components like the [PlaceList](https://github.com/adhocteam/ca-alert/blob/master/web/src/PlaceList.jsx) using the API to [fetch the appropriate data](https://github.com/adhocteam/ca-alert/blob/master/web/src/PlaceList.jsx#L16), storing that data [in the state](https://github.com/adhocteam/ca-alert/blob/master/web/src/PlaceList.jsx#L21), and using JSX to [render the appropriate markup](https://github.com/adhocteam/ca-alert/blob/master/web/src/PlaceList.jsx#L62).

For collecting and displaying data, React's virtual DOM allows us to seamlessly update the page without worrying about what individual parts of the markup have changed. We have also taken advantage of the reusability of React components by creating multi-use tools like [buttons](https://github.com/adhocteam/ca-alert/blob/master/web/src/Button.jsx) and [error messages](https://github.com/adhocteam/ca-alert/blob/master/web/src/Error.jsx).

#### Handling geographic requirements

We used the [Google Maps Javascript API](https://developers.google.com/maps/documentation/javascript/) for rendering location data throughout the app, with a [custom React component](https://github.com/adhocteam/ca-alert/blob/master/web/src/Map.jsx) to make it easily reusable. In addition, we used Google's [Geocoder API](https://developers.google.com/maps/documentation/geocoding/start) [for converting addresses to coordinates](https://github.com/adhocteam/ca-alert/blob/master/web/src/lib.js#L52). For the prototype, we are storing the results of the geocoder, which is against Google's terms of service. In a production app we would look either to move to a less restrictive geocoding tool like [Mapzen's](https://mapzen.com/products/search/) or [MapBox's](https://www.mapbox.com/geocoding/) or consider implementing our own geocoder based on open-source tools.

We used [HTML5's geolocation browser capability](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/Using_geolocation) to
geolocate the user when they are creating or editing a place to track, or when
an admin is manually creating a hazard for an alert.

#### Site navigation

We used [react-router](https://github.com/ReactTraining/react-router) to handle rendering of the appropriate React components based on the current URL and for updating the URL based on user actions. It allows us to [define a set of routes](https://github.com/adhocteam/ca-alert/blob/master/web/src/index.jsx#L33) and to specify which component should be rendered when each is visited. When a user action requires a change to the path, we [update the hashHistory](https://github.com/adhocteam/ca-alert/blob/master/web/src/ConfirmPhone.jsx#L58), which automatically changes the URL and renders the appropriate components based on the change.

#### Communication with the API

Calls to the API are made through the use of the Javascript [fetch function](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API). Because this is [not available on all browsers](http://caniuse.com/#feat=fetch), we have [included a polyfill](https://www.npmjs.com/package/whatwg-fetch) to make it universally available. [Calls to fetch](https://github.com/adhocteam/ca-alert/blob/master/web/src/lib.js#L72) return a [promise](https://developers.google.com/web/fundamentals/getting-started/primers/promises), which allows us to handle the API responses [asynchronously](https://github.com/adhocteam/ca-alert/blob/master/web/src/HazardList.jsx#L14).

Authentication with the API is handled by passing `uid`, `access-token`, and `client` [headers with each request](https://github.com/adhocteam/ca-alert/blob/master/web/src/lib.js#L77). Because this is universally required, we have a [library function](https://github.com/adhocteam/ca-alert/blob/master/web/src/lib.js#L72) that adds the headers automatically. The authentication headers are [collected when the user logs in](https://github.com/adhocteam/ca-alert/blob/master/web/src/SignInForm.jsx#L94) and [stored in local storage](https://github.com/adhocteam/ca-alert/blob/master/web/src/session.js#L41) to make them available across browser windows.

#### Testing

We run tests for the front-end via [Mocha](https://mochajs.org/) as a test runner and Istanbul's [NYC](https://github.com/istanbuljs/nyc) tool for code coverage. Both can be triggered from the [Makefile](https://github.com/adhocteam/ca-alert/blob/master/web/Makefile) with `make test` and `make coverage`, for testing and code coverage, respectively. Front-end testing makes heavy use of Airbnb's [Enzyme](https://github.com/airbnb/enzyme) library to isolate and test individual React components. Using Enzyme, components can be [mounted](https://github.com/adhocteam/ca-alert/blob/master/web/test/signin_spec.js#L9), their [state altered](https://github.com/adhocteam/ca-alert/blob/master/web/test/signin_spec.js#L10), and then the [virtual DOM can be inspected](https://github.com/adhocteam/ca-alert/blob/master/web/test/signin_spec.js#L20) to make sure it meets the test conditions. Tests were developed alongside the features they verify and were run automatically by CodeShip on each push to GitHub.

We performed manual 508 compliance testing. See [Design README](https://github.com/adhocteam/ca-alert/tree/master/design). For an actual product, we would also write automated tests.

### The server-side Rails API

We implemented the REST API for this project as an [API-only](http://edgeguides.rubyonrails.org/api_app.html) Rails project that supports a JSON interface for accessing and updating data in the application. It is backed by a [PostgreSQL](https://www.postgresql.org/) database using the [PostGIS](http://www.postgis.net/) extensions for geographic data, uses [Twilio](https://www.twilio.com/) for SMS delivery, provides [Swagger](http://swagger.io/) documentation using the [swagger-blocks](https://github.com/fotinakis/swagger-blocks) gem, handles authentication using the [devise_token_auth gem](https://github.com/lynndylanhurley/devise_token_auth), and is fully tested using a suite of [Rspec](http://rspec.info/) tests.

#### Request handling

The [routes.rb configuration file](https://github.com/adhocteam/ca-alert/blob/master/backend/config/routes.rb) in the app defines the set of actions the API responds to. Each line in that file corresponds to one or more controller actions, and the controllers take the request parameters and transform them into a JSON response. The [places controller](https://github.com/adhocteam/ca-alert/blob/master/backend/app/controllers/places_controller.rb) is an example that implements the full set of [CRUD](https://en.wikipedia.org/wiki/Create,_read,_update_and_delete) actions, allowing clients to manage the set of places for which users would like to receive alerts. The [create action](https://github.com/adhocteam/ca-alert/blob/master/backend/app/controllers/places_controller.rb#L25), for example, uses a set of allowable parameters to create a new place tied to the user account and returns a JSON document containing the new place on success. Error conditions [also return a JSON document](https://github.com/adhocteam/ca-alert/blob/master/backend/app/controllers/places_controller.rb#L36) that includes information about the individual errors that occurred.

#### Authentication and authorization

User authentication is handled through the [devise_token_auth gem](https://github.com/lynndylanhurley/devise_token_auth), which adds endpoints under the `/auth` namespace for handling account creation, login, and updating. It also contains an `authenticate_user!` helper method that [controllers can use](https://github.com/adhocteam/ca-alert/blob/master/backend/app/controllers/places_controller.rb#L2) to ensure there is a valid user before processing a request. If authentication headers do not validate correctly for a user, the controller will automatically render a 401 status code with a message indicating that authentication has failed.

Authorization is implemented using the [rolify](https://github.com/RolifyCommunity/rolify) gem, which makes it easy to add, remove, and verify roles for users. We [have an action](https://github.com/adhocteam/ca-alert/blob/master/backend/app/controllers/admin/users_controller.rb#L15) for making a user an admin by id that adds the role. Then, actions requiring admin permissions for access can use the [require_admin](https://github.com/adhocteam/ca-alert/blob/master/backend/app/controllers/application_controller.rb#L8) helper to [ensure the user](https://github.com/adhocteam/ca-alert/blob/master/backend/app/controllers/admin/hazards_controller.rb#L3) is allowed access.

#### Data storage and serialization

[ActiveRecord](http://guides.rubyonrails.org/active_record_basics.html) handles the connection to the database with [a simple configuration file](https://github.com/adhocteam/ca-alert/blob/master/backend/config/database.yml) and allows us to express queries using Ruby in most cases. The schema for the database is defined in the [schema.rb](https://github.com/adhocteam/ca-alert/blob/master/backend/db/schema.rb) file.

ActiveRecord has a set of tools for serializing models into JSON that are applied automatically, but there are [some cases](https://github.com/adhocteam/ca-alert/blob/master/backend/app/models/hazard.rb#L15) where we need to customize the fields in order to add data that isn't represented by a column in the database.

#### Twilio integration

To support delivery of SMS messages, the app uses the [twilio-ruby](https://github.com/twilio/twilio-ruby) gem. The app [must be configured](https://github.com/adhocteam/ca-alert/blob/master/backend/README.md#twilio-configuration-for-sms-delivery) with a set of Twilio credentials in order to deliver messages but will also work fine without them, instead logging the SMS messages to the Rails log.

#### Swagger documentation

Swagger was used for API documentation via the [swagger-blocks](https://github.com/fotinakis/swagger-blocks) gem, which allowed us to build out the documentation in Ruby rather than maintaining a JSON file. The resulting JSON file is publicly available [here](https://ca-alert.herokuapp.com/apidocs) and can be viewed using [Swagger UI](http://swagger.io/swagger-ui/).

The documentation is served up from the [apidocs controller](https://github.com/adhocteam/ca-alert/blob/master/backend/app/controllers/apidocs_controller.rb), and rendered by swagger_blocks. Models [define their swagger representations](https://github.com/adhocteam/ca-alert/blob/master/backend/app/models/hazard.rb#L23) in their own files, but for controllers the blocks became so verbose that we [factored them out into the lib directory](https://github.com/adhocteam/ca-alert/tree/master/backend/lib), where they [use plain Ruby objects](https://github.com/adhocteam/ca-alert/blob/master/backend/lib/phone_numbers_controller_swagger_blocks.rb) to define the blocks.

#### Handling geographic data

The app uses multiple sources of geographic and spatial data, as well as spatial
libraries, databases, tools, and browser capabilities to import spatial data,
perform geolocation, geocode addresses, render maps, and compute intersections
of hazards and tracked places to generate relevant alerts.

At the database layer, the app uses PostgreSQL with
the [PostGIS](http://postgis.net/) extension, which enables the database to
store spatial data and perform analysis and manipulation of same. Hazard and
place locations are stored in the database.

At the application later, the Rails app uses the [RGeo](https://github.com/rgeo)
library, which provides spatial data functions in Ruby, as well as related
adapters for connecting to the PostGIS database and extend ActiveRecord models
with spatial data types. For example, when a new alert is created, the
application computes the intersection of the hazard's alert area and all stored
places that users have tracked to determine which users to notify.

We referred to the Prototype B Resources PDF appendix of the RFI for sources of
public data to be used as hazard data. We reviewed each endpoint, which were all
ArcGIS REST API endpoints, and from there determined a single layer for each to
represent that data type, for example, earthquakes, high winds, and
wildfires.

For importing the available data sources described in the RFI, we used a [tool](https://github.com/tannerjt/AGStoShapefile) to
retrieve all features of each layer and convert them to GeoJSON. Having GeoJSON enabled us to use `ogr2ogr`, of
the [GDAL](http://www.gdal.org/) suite, to import the hazard feature data into
the PostGIS database, mapping each data type to a table. From there, we used
a [Rake](https://github.com/ruby/rake) task to normalize each data type -- for
example, determining which field of the feature contains the name to use in
alerts -- and create a hazard model in the Rails app for each feature. The Rails application is
[set up](https://github.com/adhocteam/ca-alert/blob/master/backend/app/models/hazard.rb#L98)
to automatically create and send an alert after the hazard is created to each
user place that is spatially within the defined radius of the hazard's centroid.

#### Testing

We wrote [tests](https://github.com/adhocteam/ca-alert/tree/master/backend/spec) using Rspec along with Rcov for code coverage calculations. In general, our focus was on [controller specs](https://github.com/adhocteam/ca-alert/tree/master/backend/spec/controllers), which are the equivalent of integration tests for an API-based application. We also wrote unit tests [for models](https://github.com/adhocteam/ca-alert/tree/master/backend/spec/models) in cases where specific conditions needed to be covered. Code coverage has remained > 99% for the duration of the development process. See [the backend README file](https://github.com/adhocteam/ca-alert/blob/master/backend/README.md) for instructions on configuring the app and running the tests locally.

END TECHNICAL APPROACH


##Responses to the prompts in Section 2 of the RFI

#### a. Assigned one (1) leader and gave that person authority and responsibility and held that person accountable for the quality of the prototype submitted

We assigned Leanna Miller Sharkey as the product manager for this project. She is a technical project manager for our vets.gov program and has led teams to many successful product launches. As the product manager, Leanna worked with the delivery manager to translate of the prototype requirements into a prioritized product backlog. Next, she worked closely with user research to define the research strategy, recruitment of participants, and the specific questions to ask to meet the goals.

Daily, Leanna groomed and prioritized the backlog, translated user feedback into specific user stories, and approved completed stories. She worked closely with design to define and iterate on the process map and wireframes. She worked in concert with the technical architect to weigh the technical implications of product decisions.

#### b. Assembled a multidisciplinary and collaborative team that includes, at a minimum, five (5) of the labor categories as identified in Attachment B: PQVP DS-AD Labor Category Descriptions

1. Product Manager: Leanna Miller
2. Technical Architect: Aubrey Holland
3. User Researcher/Usability Tester: Laura Ellena
4. Visual Designer: Danny Chapman, Mel Woodard
5. Frontend Web Developers: Graham Smith, Paul Smith
6. Backend Web Developer: Aubrey Holland, Paul Smith
7. Delivery Manager: Wryen Meek

#### c. Understood what people needed, by including people in the prototype development and design process

In similar projects, we speak at least five to seven people who are representative of each main user type. In this case, before we designed or developed anything, we conducted quantitative and qualitative discovery with residents of California of varying ages and technical abilities. We documented these findings [here](https://github.com/adhocteam/ca-alert/blob/master/research/ResearchDocumentation.md). We did a second round of interviews with residents and government employees to test our wireframes and collect feedback for iterating on this product.

In Discovery, these themes emerged and we implemented the feedback in the wireframes and prototype:
- What makes emergency messages helpful
 - People wanted multiple locations, such as their home and office, and their current location
 - Users want messages if “something in my life is affected by it.”
 - Is there an action they need to take, like move their car or evacuate?
 - Messages that "cut through the clutter" of other notifications are good for emergency situations
 - There are levels of importance that call for different types of messages and notifications: warnings vs. emergencies, something they need to react to vs. notice of something in a loved one's region, etc.
- Accessing messages
 - Phone alerts were more useful than email
 - Signing in with Google is something people like
 - Users want to be able to review information in case they dismiss a notification without getting the details
 - Mid-crisis, users wanted to be able to see current alerts without signing in
 - A chat bot to enroll would make this more accessible for low tech/low SES residents

[Complete user research plan, process, and findings are available here](https://github.com/adhocteam/ca-alert/blob/master/research/ResearchDocumentation.md)


#### d. Used at least a minimum of three (3) “user-centric design” techniques and/or tools

 We used the following user-centric design techniques and tools:

- Early and often contact with potential users
- Tested prototypes of solutions with real people
- Documented and presented findings to product owner, who sat in interviews and user tests
- Qualitative interviews
- Surveys
- Built to user needs based on feedback
- User testing of wireframes
- Built user types to inform design and functionality
- Designed intuitive, simple interface and followed US web design standards

#### e. Used GitHub to document code commits

All of the code we've written has been stored in a [GitHub repository](https://github.com/adhocteam/ca-alert), with all commits listed [here](https://github.com/adhocteam/ca-alert/commits/master). In addition, we used GitHub's pull request features for [code reviews](https://github.com/adhocteam/ca-alert/pulls) of each commit before merging it into master. GitHub has also been used as our [issue tracking system](https://github.com/adhocteam/ca-alert/issues), and we have used the [projects feature as a board](https://github.com/adhocteam/ca-alert/projects/1) for project management.

#### f. Used Swagger to document the RESTful API, and provided a link to the Swagger API

Swagger documentation has been included in all commits affecting the API endpoints since the beginning of our work. An example commit containing Swagger documentation can be found [here](https://github.com/adhocteam/ca-alert/commit/fccc9b6dda5385c9027fdad2de2ff70c4c27e347). The Swagger JSON documentation is served [by the API](https://ca-alert.herokuapp.com/apidocs). To view the documentation, open Swagger UI or visit [their demo site](http://petstore.swagger.io/) and enter the URL for the documentation (https://ca-alert.herokuapp.com/apidocs).

#### g. Complied with Section 508 of the Americans with Disabilities Act and WCAG 2.0

We tested the public facing pages to confirm they met 508 standards.


#### h. Created or used a design style guide and/or a pattern library

We built a pattern library using Pattern Lab (http://patternlab.io/), a platform to help us scale design and UX patterns. This pattern library serves as an internal reference for the design and development teams and as an external resource for other development teams to use.

#### i. Performed usability tests with people

Research documentation: Details of research plan, participant recruitment, conversation guide, findings, design decisions, and next steps.
[Process map:](https://app.moqups.com/greg@adhocteam.us/l73eNlBLo3/view) Flow diagram used to understand the process and potential paths a resident or user might follow.
[User type (PDF):](https://github.com/adhocteam/ca-alert/blob/master/design/user-type/user-types.pdf) An archetype of likely users, used to help define user stories.
[Usability testing prototype:](https://ca-alert-prototype.s3.amazonaws.com/index.html#/) Live prototype used to get feedback from California residents on our work thus far.
Usability testing video (LINK): Video showing some of the most compelling anecdotes from our usability research.
=======
We completed two rounds of research during this project:
- One round of qualitative individual interviews with the goal of discovering user needs at the beginning of the project to inform product and design decisions
- One round of interface testing with the goal of assessing our design's success at meeting user needs to inform improvements to the product and design
[Complete user research plan, process, findings, and how we implemented what we learned are available here](https://github.com/adhocteam/ca-alert/blob/master/research/ResearchDocumentation.md)

#### j. Used an iterative approach, where feedback informed subsequent work or versions of the prototype

User feedback was key to our design and development of this product. The product owner listened to user feedback sessions, translated ideas into user stories, and prioritized them in the backlog. Many of them remain to be developed, and user feedback informed a number of added features, including:

- Ability to sign in with an existing account, like Facebook or Google
- Ability to add multiple locations to monitor
- Ability to see current alerts in one's area without signing in
- Ability to review past alerts for more information

#### k. Created a prototype that works on multiple devices, and presents a responsive design

We used the USDS web design standards and designed mobile first to provide a responsive design that works for all devices. In addition, to truly practice mobile-first thinking, all wireframes and user feedback were based on mobile wireframes.

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
* The client-side code is built with [WebPack](https://webpack.github.io/) and deployed as static assets to an [S3](https://aws.amazon.com/s3/) bucket on [AWS](https://aws.amazon.com/). That bucket has been configured to serve up the assets publicly over HTTP and serves as the [root URL for our application](https://ca-alert-prototype.s3.amazonaws.com/index.html). S3 is an Iaas service.

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

To understand what people need, we conducted a thorough research plan, consisting of two rounds of testing. One round consisted of qualitative individual interviews with realistic potential users with the goal of discovering user needs before we began design or development to inform product and design decisions. The second, completed after the initial build, tested the mockups and prototypes with California residents and government communications professionals. We shared findings with the entire team and modified the prototype via issues as a prioritized list. For example.- A [complete user research plan, process, findings, and how we implemented what we learned are available here](https://github.com/adhocteam/ca-alert/blob/master/research/ResearchDocumentation.md)


### Address the whole experience, from start to finish

The second round of testing uncovered pain points in the way users interacted with the service, and we prioritized those issues in our development plan. We focused our research on the actual service, rather than in-person and offline touchpoints. In a larger project, we would research all aspects of how people interact with the service and alerts in general— television, radio, word of mouth, and son on.

### Make it simple and intuitive

We used the the U.S. Web Design Standards as the baseline for our product. The system gives users clear information about where they are in each step of the process, from signup to profile management to alerts. The system passes 508 tests, we use plain language in all communication, and the design is consistent throughout the service.

### Build the service using agile and iterative practices

Our [Team]() launched the project on 2/15/17 with a [project kickoff](https://github.com/adhocteam/ca-alert/wiki/Kickoff-Call-Agenda-&-Meeting-Notes) meeting to establish team goals & roles. We launched the project by defining a minimum viable product from the project  requirements to be informed by [user research](https://github.com/adhocteam/ca-alert/blob/master/research/ResearchDocumentation.md) as the project progressed. We used 3-4 workday sprint cycles to keep our prioritization in line with what we were learning with user research and engineering development. [Daily Standups](https://github.com/adhocteam/ca-alert/wiki/Standup-Notes) kept the team on the same page and constant slack communication kept collaboration levels high for all team members throughout the project. As end user features were completed they were peer reviewed and validated in our production application every evening. Bugs discovered in testing were prioritized by the team every evening in our standups during the final week of production.

### Structure budgets and contracts to support delivery - N/A

We assigned a team that conducted research, discovery, and prototyping activities in lean but robust fashion. In general, we practice agile software development, which is designed for frequent deliverables. In the context of a contract, we seek to abide by all of the elements of this play. This allows for quick procurement and fast delivery at the lowest cost to government and taxpayers.


### Assign one leader and hold that person accountable

We assigned Leanna Miller Sharkey as the product manager for this project. She is a technical project manager for our vets.gov program, where we have a strong relationship with the contracting officer, and has led teams to many successful product launches. The development team worked smoothly, with constant communication and daily standups that allowed her to lead the program.


### Bring in experienced teams

We chose the technical team for this project from the most senior members of the company. While the team was small, we have a wide range of experience with building web and mobile applications, deploying them, and maintaining them in production. Because we were not working with a government agency, government officers were not solicited for the project.


### Choose a modern technology stack

Modern, open source tools have been used throughout our development of the prototype. We have avoided using exotic tools that are difficult to deploy, favoring software and processes that we use every day on existing projects. Documentation on [running](https://github.com/adhocteam/ca-alert/blob/master/backend/README.md) the [apps](https://github.com/adhocteam/ca-alert/blob/master/web/README.md) locally has been provided and updated throughout the development process.

### Deploy in a flexible hosting environment

Most of these requirements are met through the use of Heroku as a PaaS provider. It enables API-based provisioning of resources and allows us to scale those resources up and down easily and with no downtime. In a production system, we would seek to increase the reliability of the application by using a multi-region approach with demand-based autoscaling, and the static assets would be served up behind a CDN.

### Automate testing and deployments

Automated testing and deployment have been a part of our development since the beginning of the process. As documented above, both the web app and the API have extensive testing, and we have used CodeShip to provide continuous integration and automatic deploys throughout the process. Load and performance testing were deemed unnecessary for the implementation of a prototype.

### Manage security and privacy through reusable processes

See Technical Approach document for security details. Ad Hoc is adept at following industry best practices in security and privacy. All of our projects, including vets.gov and healthcare.gov, require stringent protections.

### Use data to drive decisions

Heroku provides a number of these tools to us automatically, but we chose not to expand upon them because they were not required for the prototype. In a production system, we would assemble a DevOps team to manage systems that track system performance data in real time and create alerts as errors occur. On existing deployments, we have used a combination of [Prometheus](https://prometheus.io/), [Sentry](https://sentry.io/welcome/), [Grafana](http://grafana.org/), and [PagerDuty](https://www.pagerduty.com/) to implement such a system.

### Default to open

Many of the concepts here do not apply to the development of a prototype, but we have done our development under a public GitHub repository that includes all of the code commits, issues filed, and documents created. Also, we developed the API so access is publicly available.
