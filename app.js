require('dotenv').config();
const express = require('express')
const cors = require('cors')
const morgan = require('morgan');
const authRouter = require('./src/routes/auth-route');
const notFound = require('./src/middlewares/not-found');
const errorMiddleware = require('./src/middlewares/error');
const branchRouter = require('./src/routes/branch-route');
const reservationRouter = require('./src/routes/reservation-route');
const roomRouter = require('./src/routes/room-route');
const paymentRouter = require('./src/routes/payment-route');
const roomTypeRouter = require('./src/routes/roomType-route');
const authenticate = require('./src/middlewares/authenticate');
const { isAdmin } = require('./src/middlewares/isAdmin');
const adminRouter = require('./src/routes/admin-route');


const app = express( );


app.use(cors())
app.use(morgan('dev'));
app.use(express.json());


// user
app.use('/auth',authRouter)
app.use('/branch',branchRouter)
app.use('/room', roomRouter)
app.use('/roomType',roomTypeRouter)
app.use('/reservation',authenticate,reservationRouter)
app.use('/payment', authenticate, paymentRouter)

//admin
app.use('/admin',authenticate,isAdmin,adminRouter)




app.use(notFound);
app.use(errorMiddleware);


port = process.env.PORT

app.listen(port, ()=>console.log(`running Server Port ${port}`))

