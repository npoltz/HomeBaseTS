import { Schema } from "mongoose";

const SensorSchema = new Schema({
    SensorId: String,
    Name: String
});

export default SensorSchema;