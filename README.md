# Masterplan

Masterplan is a tool that helps with planning your master at LTH or Campus Helsingborg. Essentially it utilises the content available via LU's API:s but adds some features such as calculating average grade. 


## WIP :construction:
The project is currently under development and many features that we want to see in the finished product has not yet implemented.


## Planned Features
- [x] average grade
- [x] information regarding examination form and assignments by heuristic search in course plan documents.
- [ ] different methods of choosing a master programme
  - [ ] tinder like swipe
  - [ ] process of elimination
  - [ ] results page showing which masters that are the best fit
- [ ] Master programme overview, including how many more A/G credits are needed in specialization etc.
  
  
## Installation
### Client
```
cd client
npm install
npm start
```

### Server
Needed for examination form information because of CORS.
```
cd server
npm install
npm start
```
