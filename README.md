for backend : {
cd backend 
npm i 
nodemon

.env : {MONGO_URI="mongo_url"
HUBSPOT_API_KEY="api"
PORT=5000}
}

for frontend : {
cd client 
npm i 
npm start

.env:{
    REACT_APP_API_URL=http://localhost:5000/api
}
}