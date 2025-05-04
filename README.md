# Peck-In
Simplifying event check-in for student clubs.
![Peck-In Logo](https://github.com/aGreenCat/Peck-In/blob/master/assets/logo.png)
---
## Inspiration
Imagine you’re a student trying to attend one of Hunter College’s student club events. You make your way to Thomas Hunter Hall, only to get stuck behind a crowd of people scanning a QR code taped to the wall. You awkwardly fumble with your phone, open the camera, and wait for the link to pop up—just to fill out the same Google Form again. Peck-In was built to replace this clunky, repetitive process with a streamlined, mobile-first solution.

##  What it does
Peck-In makes club attendance fast, secure, and seamless. Students create a one-time profile and receive a personal QR code. Clubs can generate QR codes for each event, and check-in can happen in two different modes depending on the club’s needs. 
- **Efficiency Mode**: Students independently scan the event’s QR code to check in instantly.
- **Security Mode**: Organizers scan student QR codes using the app to confirm individual attendance.
All attendance data is stored in Supabase, where clubs can view stats, export lists, and analyze punctuality trends.

## How we built it
1. Expo and React Native to develop a cross-platform mobile app.
2. TypeScript to ensure type safety and data integrity.
3. Supabase for secure authentication, user profile storage, and attendance logging.
4. Libraries like React Navigation, AsyncStorage, React Native QR Code, and expo-camera to power a smooth mobile user experience with persistent profile storage and real-time scanning.

## Challenges we ran into

We ran into issues with cross-platform mobile compatibility, especially for camera permissions. The Android version experienced bugs with the camera: when switching from the scan tab to another and then back, the camera would go black. This was a highly specific issue that would affect a big proportion of our users, so we took a deep dive down Stack Overflow to finally find the root cause and corresponding solution.

## Accomplishments that we're proud of

In under 48 hours, our team successfully developed a fully functional mobile application. This achievement represents a scalable proof-of-concept built upon a robust code foundation. By consistently applying best practices in Git, we effectively prevented significant version control issues throughout our rapid development process.

## What we learned

How strict TypeScript is with types, but how valuable it is for reducing developers errors down the line. 

## What's next for Peck-In

Peck-In can be more than a centralized event check-in app for Hunter. The app can be extended to allow students to scan *each others’* QR codes to opt-in to a Hunter social network.

Additional features like the option to add club logos to event QR codes or profile pictures to personal QR codes can be added. Customization can spice up check-ins and turn them into something fun and enjoyable.
