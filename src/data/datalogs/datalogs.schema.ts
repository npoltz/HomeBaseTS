import { Schema, Types } from "mongoose";

const DataLogSchema = new Schema({
    Id: {
        type: String,
        default: Types.ObjectId()
    },
    SensorId: String,
    Timestamp: {
        type: Date,
        default: new Date()
    },
    Temperature: Number,
    RelativeHumidity: Number
});

export default DataLogSchema;