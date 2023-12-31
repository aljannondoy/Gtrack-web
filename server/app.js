require('dotenv').config();
const express=require('express');
var cors = require('cors')
var bodyParser = require('body-parser');
const cookieParser=require("cookie-parser");

const app=express();
app.use(express());
app.use(cors())
app.use(bodyParser.json());
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cookieParser());

//INCLUDE MODULES HERE (MOBILE)
const accountRoutes=require('./routes/mobile/accountRoutes');
const announcementRoutes=require('./routes/mobile/announcementRoutes');
const eventRoutes=require('./routes/mobile/eventRoutes');
const profileRoutes=require('./routes/mobile/profileRoutes');
const concernRoutes=require('./routes/mobile/concernRoutes');
const wasteCollectionRoutes=require('./routes/mobile/wasteCollectionRoutes');
const reportRoutes=require('./routes/mobile/reportRoutes');
const scheduleRoutes=require('./routes/mobile/scheduleRoutes');
const dumpsterRoutes=require('./routes/mobile/dumpsterRoutes');

//INCLUDE MODULES HERE (WEB)
const scheduleWebRoutes=require('./routes/web/scheduleRoutes');
const adminDashboardRoutes  = require("./routes/web/adminDashboardRoutes");
const adminRoutes = require("./routes/web/adminRoutes");
const adminDumpsterRoutes = require("./routes/web/adminDumpsterRoutes");
const adminAnnouncementRoutes = require('./routes/web/adminAnnouncementRoutes');
const assignmentRoutes = require('./routes/web/assignmentRoutes');
const adminEventRoutes = require('./routes/web/adminEventRoutes');
const adminProfileRoutes = require('./routes/web/adminProfileRoutes');
const truckWebRoutes = require('./routes/web/truckRoutes');
const reportsandConcernsRoutes = require('./routes/web/reportRoutes');

//MOBILE ROUTES HERE
app.use("/mobile",accountRoutes);
app.use("/mobile/announcement",announcementRoutes);
app.use("/mobile/event",eventRoutes);
app.use("/mobile/profile",profileRoutes);
app.use("/mobile/concern",concernRoutes);
app.use("/mobile/waste-collection",wasteCollectionRoutes);
app.use("/mobile/report",reportRoutes);
app.use("/mobile/schedule",scheduleRoutes);
app.use("/mobile/dumpster",dumpsterRoutes);

//WEB ROUTES HERE
app.use("/admin/schedule",scheduleWebRoutes);
app.use("/admin", adminRoutes);
app.use("/admin/dashboard", adminDashboardRoutes);
app.use("/admin/dumpster", adminDumpsterRoutes);
app.use("/admin/announcement",adminAnnouncementRoutes);
app.use("/admin/assignment", assignmentRoutes);
app.use("/admin/event",adminEventRoutes);
app.use("/admin/profile",adminProfileRoutes);
app.use("/admin/truck", truckWebRoutes);
app.use("/admin/report", reportsandConcernsRoutes)

// if (process.env.NODE_ENV === 'production') {
//     // Serve any static files
//     app.use(express.static(path.join(__dirname, '../client/build')));
//     // Handle React routing, return all requests to React app
//     app.get('*', function(req, res) {
//       res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
//     });
//   }

app.listen(process.env.PORT || 8000,()=> console.log("Back end is running at port 8000"));
