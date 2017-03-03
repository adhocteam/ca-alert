## Overview

Our goal is two rounds of research during this project:
- One round of individual interviews with the goal of discovering user needs at the beginning of the project to inform product and design decisions
- One round of interface testing with the goal of assessing our design's success at meeting user needs to inform improvements to the product and design

## Round One Research Goal and Plan: Discovery of User Needs

**Goal**
Speak to 3-5 Californians who might be affected by emergencies in their areas to learn about their current means of learning about emergencies, what doesn't work well about those for them, and what might work better to inform them.

**Research Questions**

- How do people currently get information about emergencies?
- Are there ways that notifications and messages could be changed to better inform them?
- What kinds of preferences do residents have about notifications they might receive?
- What kinds of emergency information are most useful to residents?

### Research Participant Recruitment

For this design exercise, we used our Cohorts community to recruit feedback participants. Cohorts allows us to survey and recruit participants who are the best fit for the project. In this sample exercise, we asked two quantitative questions:

- How have you found out about emergencies in your area in the last six months?
![Respondents find out about emergencies via SMS alerts, social media, and word of mouth](https://github.com/adhocteam/ca-alert/blob/master/research/EmergencyInfoSources.png)

- What is most important to you when learning about emergencies?
![Respondents want to trust the source of emergency information and get notifications on their phone](https://github.com/adhocteam/ca-alert/blob/master/research/LearningAboutEmergencies.png)


In similar projects, we speak to five to seven people who are representative of each main user type. In this case, we would speak with residents of California, and Government employees who communicate with the public about warnings and emergencies. We would seek to recruit people from a range of areas from urban to rural, and whose communication styles and uses of technology vary. 

### User Research Conversation Guide

#### Introduction

- Thank you for taking the time to speak with me today. Our goal of this conversation is to learn about how you find out about things going on in your area, especially emergency situations.
- I have a bunch of questions for you, but there are no right or wrong answers - we just want to learn from your experiences.
- My colleague (name) is on the call taking notes, and we'd like to record our voices in case we miss something. Is that okay with you?

#### Questions

- To start, can you tell me a little bit about your life in California?
- Have you heard about emergency situations in your area in the past six months?
 - What were they?
 - How did you hear about them?
 - What did you do when you heard?
 - Are there ways you tried to get more information? How?
- Have you signed up for any ways to get information about emergencies in your area?
 - Are there any ways you automatically get information about emergencies in your area?
 - (If not mentioned) What about Amber Alerts?
 - Do you use any services or tools you use to get emergency alerts? Which ones? How do they work for you?
 - (If no) Have you looked for services or tools to get emergency alerts?
 - Have you talked about emergency alerts with friends or family in the last few months?
- Are there any ways that finding out about emergencies hasn’t quite worked for you?
 - How could those go better?
 - If you could wave a magic wand and change it, what would your ideal way to get this kind of information be?
 - What kind of things would it tell you?
 - How would it get to you?
 - What places would it tell you about things? (Where you are? Where loved ones are?)

#### Closing

- Thank you again for your time and for sharing with us.
- Do you have any questions for me?

### Findings

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

#### Next Steps

- Implement ability for user to name locations instead of choosing from a drop-down
- Explore the difference between emergency and non-emergency messages
- Allow sign-in through Google accounts
- Allow seeing nearby alerts without signing in
- Create a way to see past alerts that the user may have dismissed


## Round Two Research Goal and Plan: Usability testing our wireframe-based prototype

**Goal**
Speak to 2-3 Californians who might be affected by emergencies in their areas to learn whether our prototype meets their needs and 2-3 Government employees who share or send information to the public to learn whether the admin portion of our prototype meets their needs.

**Research Questions**

- Resident users
 - How well does our design succeed at meeting user needs?
 - How might it be improved?
- Government admin users
 - How well does our admin design succeed at meeting Government employee needs?
 - How might it be improved?

### User Research Conversation Guide - California resident

#### Introduction

- Thank you for taking the time to speak with me today. Our goal of this conversation is to learn about how you find out about things going on in your area, especially emergency situations.
- I have a bunch of questions for you, but there are no right or wrong answers - we just want to learn from your experiences.
- My colleague (name) is on the call taking notes, and we'd like to record our voices in case we miss something. Is that okay with you?

#### Questions

- Can you tell me a little bit about your life in California?
- Have you heard about emergency situations in your area in the past six months?
 - What were they?
 - How did you hear about them?
 - Have you signed up for any ways to get information about emergencies in your area?
 - Are there any ways you automatically get information about emergencies in your area?
 - What did you do when you heard?
 - Are there ways you tried to get more information? How?
- Are there any ways that finding out about emergencies hasn’t quite worked for you?
 - How could those go better?
 - If you could wave a magic wand and change it, what would your ideal way to get this kind of information be?
 - What kind of things would it tell you?
 - What places would it tell you about things? (Where you are? Where loved ones are?)
- (Begin screen-share and show prototype)
 - General questions for different parts of the prototype:
   - What can you see and do on this screen?
   - What would you do next? Did that do what you expected?
   - Are there ways we could make this better?
 - Show sign-up, focused on SMS: did that do what you expected?
 - Add places, set communication preferences
 - Get an alert
   - View alert details
   - What do you think of seeing this information?
   - Is there anything that’s missing here?
 - Non-signed in version - nearby alerts
   - If you were not signed in and saw something like this, what are your impressions of this?
 - Wrap-up, general questions
   - How did that work for you?
   - Is there a way that could be better for you?

####Closing

- Thank you so much for your time and feedback.
- Are there any other things we should consider to make this easier?


### User Research Conversation Guide - Government employee

#### Introduction

- Thank you for taking the time to speak with me today. Our goal of this conversation is to learn about how you share or send information to people in your area as a Government employee, especially emergency situations.
- I have a bunch of questions for you, but there are no right or wrong answers - we just want to learn from your experiences.
- My colleague (name) is on the call taking notes, and we'd like to record our voices in case we miss something. Is that okay with you?

#### Questions

- Can you tell me about your role in government? 
 - How do you send or share things to residents in your area?
 - Are there things that could be better in the ways you do that?
 - Are there any ways that your work needs to be approved before it goes to the public? How does that work? Are there ways it could be easier?
- Ok, let’s pretend your role involved sending alerts to residents - I'm going to show you an in-progress system that could help you do that, walk me through, etc. (share screen, show prototype)
 - Add admin user
   - What can you see and do here? How did that work for you?
 - Create an alert
 - Preview & send alert
   - What can you see and do here? How did that work for you?
- Wrap-up, general questions
 - Overall, how easy or difficult was that to use?
 - Are there ways it could be better to send alerts to residents?

####Closing

- Thank you so much for your time and feedback.
- Are there any other things we should consider to make this easier?

### Findings

- For Government employee
 - Clarify difference between alerts and hazards
 - Remove lat/long location entry
 - Differentiate between active and expired alerts
 - It would be helpful to allow admin users to have message templates and see character limits for different types of messages
 - Government employees may want to see how many residents a message might go to
- For California resident
 - Zip codes can be unexpected areas that don't meet users' needs; consider other ways to work with radius and area
 - Residents think of different locations as different levels of importance, so it would be helpful for them to be able to choose to receive all alerts or just emergency alerts for each of their places



#### Next Steps
Future work and features are in the backlog to be groomed and prioritized.

