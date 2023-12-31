const {DataTypes} = require('sequelize');
const instance = require('../connection');


const event = instance.sequelize.define("events",{
    event_id:{
        type:DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
        allowNull:  false,
    },
    admin_id:{
        type:DataTypes.BIGINT,
        allowNull: false
    },
    attachment_line_id:{
        type:DataTypes.BIGINT,
        allowNull: false
    },
    event_name:{
        type:DataTypes.STRING,
        allowNull: false
    },
    description:{
        type:DataTypes.TEXT,
        allowNull: false
    },
    target_participants:{
        type:DataTypes.STRING,
        allowNull: false
    },
    status:{
        type: DataTypes.ENUM('Ongoing','Canceled','Ended'),
        allowNull: false
    },
    startDate:{
        type:DataTypes.DATE,
        allowNull: false
    },
    endDate:{
        type:DataTypes.DATE,
        allowNull: false
    },
    registration_form_url:{
        type:DataTypes.STRING,
        allowNull:false
    },
    street:{
        type:DataTypes.STRING,
        allowNull: false
    },
    purok:{
        type:DataTypes.STRING,
        allowNull: false
    },
    barangay:{
        type:DataTypes.STRING,
        allowNull: false
    },
    town:{
        type:DataTypes.STRING,
        allowNull: false
    },
    postal_code:{
        type:DataTypes.STRING,
        allowNull: false
    }
   
},{
    createdAt: true,
    updatedAt: true,
    deletedAt: true,
    tableName: "events"
}

);
exports.model = event;