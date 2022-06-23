# vintri-client

This is Vue3 front-end client for the beers API server, http://localhost:5000

## Start

### Start the server
Before starting the client, start the server first
```
$ git clone https://github.com/allenhwkim/vintri-server.git
$ cd vintri-server
$ nvm use 16
$ npm i
$ npm start
```

### Start the client
Now, in a different terminal, start this client
```
$ git clone https://github.com/allenhwkim/vintri-client.git
$ cd vintri-client
$ nvm use 16
$ npm i
$ npm start
```

## Usage

### Login
You will see the browser open for http://localhost:5000  
<img width="400" alt="image" src="https://user-images.githubusercontent.com/1437734/175408187-8bc2f62a-ee57-4e6c-8673-662415a98387.png">

To login, enter a valid email address and confirm email addrss as the same,  e.g. allenhwkim@gmail.com. 
<img width="400" alt="image" src="https://user-images.githubusercontent.com/1437734/175411799-491322b3-b0ac-459f-87d9-bf96a8056291.png">

### List beers
Once logged in, you will be redirect to list of beers.  
You can try different pages, or search beers.  
<img width="400" alt="image" src="https://user-images.githubusercontent.com/1437734/175414959-319d3b9c-4b9c-464f-aad7-18cf871e1ad1.png">
<img width="400" alt="image" src="https://user-images.githubusercontent.com/1437734/175422824-792030b8-ca56-40a8-bee7-c9fdc886b05b.png">

### Detail of a beer
To see the detail of a beer, click `detail` from the list.  
<img width="400" alt="image" src="https://user-images.githubusercontent.com/1437734/175420823-9712bdf5-3457-4d04-8768-5560a2a7d896.png">

To submit the rating of the beer, mark your stars,  fillout comments, then click "Submit rate and comments". 
<img width="400" alt="image" src="https://user-images.githubusercontent.com/1437734/175422404-deffc3d0-46e4-48c7-b4cc-41f2ea9e9755.png">
<img width="400" alt="image" src="https://user-images.githubusercontent.com/1437734/175422601-c6b071ad-9194-47cd-a520-734be1964d97.png">

To go back to list of beers, click "Back to see all beers"

### Logout
To logout, click "Logout.  
<img width="400" alt="image" src="https://user-images.githubusercontent.com/1437734/175423357-6a007842-8d80-4618-99ea-2d325b263539.png">
