# CAlerts

* [Technical Approach](#technical-approach)
* [US Digital Services Playbook Checklist](#us-digital-services-playbook-checklist)
* [Responses to the prompts in Section 2 of the RFI](#responses-to-the-prompts-in-section-2-of-the-rfi)

##Technical Approach

I initially thought this should be a narrative of how we chose to do development on the prototype and why we made the choices we did, but re-reading the requirement ("Documentation must show code flow from client UI, to JavaScript library, to REST service to database, pointing to code in the GitHub repository") it seems like it needs to be more of a walkthrough of the major components of the code showing how the general flow works. Most of the questions about our choices can be answered in response to the prompts from Section 2.

* How the UI collects data from the user
  * Form implementation
  * Visual design considerations
* How React components collect that data
  * How state is stored
  * Implementation of reusable components
* How React communicates with the API
  * Use of fetch
  * Collecting and passing the authentication headers
* How the API is implemented
  * Rails API-only project
  * How routes are defined
  * How controllers handle actions
  * How models serialize themselves to JSON
  * How messages are sent to users (Twilio/SendGrid/ActionMailer)
* Data storage
  * Sample Rails model
  * Selection of PostgreSQL
  * Pointer to the table schema
* Special considerations for geo data
  * How we pull in the data, and how it is stored
  * Using PostGIS features for place intersections
* How this fits together in the deployed app
  * S3 for static asset storage/hosting
  * Heroku for dynamic server deployment
  * CORS settings for allowing these to work together

##US Digital Services Playbook Checklist

### Understand what people need
- [x] Early in the project, spend time with current and prospective users of the service
- [x] Use a range of qualitative and quantitative research methods to determine people’s goals, needs, and behaviors; be thoughtful about the time spent
- [ ] Test prototypes of solutions with real people, in the field if possible
- [x] Document the findings about user goals, needs, behaviors, and preferences
- [ ] Share findings with the team and agency leadership
- [x] Create a prioritized list of tasks the user is trying to accomplish, also known as “user stories”
- [ ] As the digital service is being built, regularly test it with potential users to ensure it meets people’s needs

### Address the whole experience, from start to finish

- [ ] Understand the different points at which people will interact with the service – both online and in person
- [ ] Identify pain points in the current way users interact with the service, and prioritize these according to user needs
- [ ] Design the digital parts of the service so that they are integrated with the offline touch points people use to interact with the service
- [ ] Develop metrics that will measure how well the service is meeting user needs at each step of the service

### Make it simple and intuitive
- [x] Use a simple and flexible design style guide for the service. Use the U.S. Web Design Standards as a default
- [x] Use the design style guide consistently for related digital services
- [ ] Give users clear information about where they are in each step of the process
- [ ] Follow accessibility best practices to ensure all people can use the service
- [x] Provide users with a way to exit and return later to complete the process
- [ ] Use language that is familiar to the user and easy to understand
- [ ] Use language and design consistently throughout the service, including online and offline touch points

### Build the service using agile and iterative practices
- [x] Ship a functioning “minimum viable product” (MVP) that solves a core user need as soon as possible, no longer than three months from the beginning of the project, using a “beta” or “test” period if needed
- [ ] Run usability tests frequently to see how well the service works and identify improvements that should be made
- [x] Ensure the individuals building the service communicate closely using techniques such as launch meetings, war rooms, daily standups, and team chat tools
- [x] Keep delivery teams small and focused; limit organizational layers that separate these teams from the business owners
- [x] Release features and improvements multiple times each month
- [x] Create a prioritized list of features and bugs, also known as the “feature backlog” and “bug backlog”
- [x] Use a source code version control system
- [x] Give the entire project team access to the issue tracker and version control system
- [x] Use code reviews to ensure quality

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

### Assign one leader and hold that person accountable
- [x] A product owner has been identified
- [x] All stakeholders agree that the product owner has the authority to assign tasks and make decisions about features and technical implementation details
- [x] The product owner has a product management background with technical experience to assess alternatives and weigh tradeoffs
- [ ] The product owner has a work plan that includes budget estimates and identifies funding sources
- [ ] The product owner has a strong relationship with the contracting officer

### Bring in experienced teams
- [x] Member(s) of the team have experience building popular, high-traffic digital services
- [x] Member(s) of the team have experience designing mobile and web applications
- [x] Member(s) of the team have experience using automated testing frameworks
- [x] Member(s) of the team have experience with modern development and operations (DevOps) techniques like continuous integration and continuous deployment
- [x] Member(s) of the team have experience securing digital services
- [ ] A Federal contracting officer is on the internal team if a third party will be used for development work
- [ ] A Federal budget officer is on the internal team or is a partner
- [ ] The appropriate privacy, civil liberties, and/or legal advisor for the department or agency is a partner

### Choose a modern technology stack
- [x] Choose software frameworks that are commonly used by private-sector companies creating similar services
- [x] Whenever possible, ensure that software can be deployed on a variety of commodity hardware types
- [x] Ensure that each project has clear, understandable instructions for setting up a local development environment, and that team members can be quickly added or removed from projects
- [x] Consider open source software solutions at every layer of the stack

### Deploy in a flexible hosting environment
- [x] Resources are provisioned on demand
- [ ] Resources scale based on real-time user demand
- [x] Resources are provisioned through an API
- [ ] Resources are available in multiple regions
- [x] We only pay for resources we use
- [ ] Static assets are served through a content delivery network
- [x] Application is hosted on commodity hardware

All of these are things that we would definitely do in a production environment, but some may not be applicable to a prototype. For example, we did not make an attempt at autoscaling or a multi-region deployment because the demands of the prototype do not warrant it.

### Automate testing and deployments
- [ ] Create automated tests that verify all user-facing functionality
- [x] Create unit and integration tests to verify modules and components
- [x] Run tests automatically as part of the build process
- [x] Perform deployments automatically with deployment scripts, continuous delivery services, or similar techniques
- [ ] Conduct load and performance tests at regular intervals, including before public launch

Again here, load and performance testing don't seem applicable to a prototype but are definitely things we would undertake in production.

### Manage security and privacy through reusable processes
- [ ] Contact the appropriate privacy or legal officer of the department or agency to determine whether a System of Records Notice (SORN), Privacy Impact Assessment, or other review should be conducted
- [ ] Determine, in consultation with a records officer, what data is collected and why, how it is used or shared, how it is stored and secured, and how long it is kept
- [ ] Determine, in consultation with a privacy specialist, whether and how users are notified about how personal information is collected and used, including whether a privacy policy is needed and where it should appear, and how users will be notified in the event of a security breach
- [ ] Consider whether the user should be able to access, delete, or remove their information from the service
- [ ] “Pre-certify” the hosting infrastructure used for the project using FedRAMP
- [x] Use deployment scripts to ensure configuration of production environment remains consistent and controllable

### Use data to drive decisions
- [ ] Monitor system-level resource utilization in real time
- [x] Monitor system performance in real-time (e.g. response time, latency, throughput, and error rates)
- [ ] Ensure monitoring can measure median, 95th percentile, and 98th percentile performance
- [ ] Create automated alerts based on this monitoring
- [ ] Track concurrent users in real-time, and monitor user behaviors in the aggregate to determine how well the service meets user needs
- [ ] Publish metrics internally
- [ ] Publish metrics externally
- [ ] Use an experimentation tool that supports multivariate testing in production

### Default to open
- [ ] Offer users a mechanism to report bugs and issues, and be responsive to these reports
- [ ] Provide datasets to the public, in their entirety, through bulk downloads and APIs (application programming interfaces)
- [ ] Ensure that data from the service is explicitly in the public domain, and that rights are waived globally via an international public domain dedication, such as the “Creative Commons Zero” waiver
- [ ] Catalog data in the agency’s enterprise data inventory and add any public datasets to the agency’s public data listing
- [ ] Ensure that we maintain the rights to all data developed by third parties in a manner that is releasable and reusable at no cost to the public
- [ ] Ensure that we maintain contractual rights to all custom software developed by third parties in a manner that is publishable and reusable at no cost
- [x] When appropriate, create an API for third parties and internal users to interact with the service directly
- [x] When appropriate, publish source code of projects or components online
- [x] When appropriate, share your development process and progress publicly

##Responses to the prompts in Section 2 of the RFI

#### a. Assigned one (1) leader and gave that person authority and responsibility and held that person accountable for the quality of the prototype submitted

We assigned Leanna Miller Sharkey to be the Product Owner. More about that role and the activities she performed.

#### b. Assembled a multidisciplinary and collaborative team that includes, at a minimum, five (5) of the labor categories as identified in Attachment B: PQVP DS-AD Labor Category Descriptions

* Greg Gershman: final approver of all, reviewer for Technical Approach— how we manage the process deliverables
* Daniel X. O’Neil: Proposal manager, research, help out with documentation
* Leanna Miller Sharkey: Administrative Requirements, help out with research
* Danny Chapman: Do the design and front-end on Working Prototype
* Aubrey Holland: Do coding of Working Prototype
* Juliana Neelbauer: Reviewer on Administrative Requirements
* Mel Woodward: Review design
* Wryen: product manager for the Working Prototype

#### c. Understood what people needed, by including people in the prototype development and design process

#### d. Used at least a minimum of three (3) “user-centric design” techniques and/or tools

#### e. Used GitHub to document code commits

All of the code we've written has been stored in a [GitHub repo](https://github.com/adhocteam/ca-alert), with all commits listed [here](https://github.com/adhocteam/ca-alert/commits/master). In addition, [code reviews](https://github.com/adhocteam/ca-alert/pulls) have been performed there for all commits before merging them into master. GitHub has also been used as our [issue tracking system](https://github.com/adhocteam/ca-alert/issues).

#### f. Used Swagger to document the RESTful API, and provided a link to the Swagger API

Swagger documentation has been included in all commits affecting the API endpoints since the beginning of our work. An example commit containing Swagger documentation can be found [here](https://github.com/adhocteam/ca-alert/commit/fccc9b6dda5385c9027fdad2de2ff70c4c27e347). The Swagger JSON documentation is served [by the API](https://ca-alert.herokuapp.com/apidocs). To view the documentation, open Swagger UI or visit [their demo site](http://petstore.swagger.io/) and enter the URL for the documentation (https://ca-alert.herokuapp.com/apidocs).

#### g. Complied with Section 508 of the Americans with Disabilities Act and WCAG 2.0

#### h. Created or used a design style guide and/or a pattern library

#### i. Performed usability tests with people

#### j. Used an iterative approach, where feedback informed subsequent work or versions of the prototype

#### k. Created a prototype that works on multiple devices, and presents a responsive design

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

???????????????????????????????????????
I'm not sure what to say here. All of our tools are open and free, but the app relies on Twilio to deliver SMS messages. I guess what I can do is make a fake Twilio client to use in development so that the app can be run locally without this requirement. I will write up a ticket to create that.
