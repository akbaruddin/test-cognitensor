# Test

- Must explain Tech Stack
- Must explain Implementation architecture
- Must explain choice of plugins, packages and why to use?
- Must explain basic flow of Data end to end
- Must be deployable code
- Must share implementation/API

Tach Stack
- Front end
    - React with Vitejs(Build Tool)
    - react-data-table-component - to display data table with filter and other features
    - jspdf - render PDf if required
- Backend
    - Node.js
    - Redis for temp cache
    - MySql for main database

In AWS(Route manage by Route 53)
- Frontend with AWS amplify + Cloudfront to provide cache
- Backend with AWS EC2 machine run application + Cloudfront for cache

Flow
-> user start interaction then call goto Route 53

-> for front go to AWS amplify

-> for backend got to Cloudfront to provide cache value
-> if data no available then go to EC2 machine and generate data

